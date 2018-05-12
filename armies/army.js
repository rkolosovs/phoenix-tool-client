"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const hexFunctions_1 = require("../libraries/hexFunctions");
const constants_1 = require("../constants");
const mobileEntity_1 = require("./mobileEntity");
class Army extends mobileEntity_1.MobileEntity {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        super(id, owner, position, movePoints, heightPoints);
        this.lightCatapultCount = 0;
        this.heavyCatapultCount = 0;
        this.lightCatapultsShot = 0;
        this.heavyCatapultsShot = 0;
        this.multiArmyField = false;
        this.targetList = [];
        this.isGuard = false;
        this.wasShotAt = false;
        this.possibleTargets = [];
        this.troopCount = Math.max(0, troopCount);
        this.officerCount = Math.max(0, officerCount);
        if (isGuard != undefined) {
            this.isGuard = isGuard;
        }
        this.setLightCatapultCount(lightCatapultCount);
        this.setHeavyCatapultCount(heavyCatapultCount);
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        //Common functionality of the transfer functions of all army types.
        if (this.constructor !== armyToTransferTo.constructor &&
            troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer <= 0) {
            //Transferring officers only.
            if (this.movePoints < this.getMaxMovePoints()) {
                throw new Error("Can only transfer officers from armies that haven't moved yet.");
            }
            if (this.officerCount < leadersToTransfer) {
                throw new Error("Not enough officers.");
            }
            this.officerCount -= leadersToTransfer;
            armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        }
        else if (this.constructor !== armyToTransferTo.constructor) {
            //Different army types but attempting to transfer not only officers.
            throw new Error("Can't transfer troops (only officers) between armies of different types.");
        }
        else if (this.troopCount < troopsToTransfer || this.officerCount < leadersToTransfer ||
            this.lightCatapultCount < lkpToTransfer || this.heavyCatapultCount < skpToTransfer) {
            //Same army type but not enough troops/officers/catapults to transfer.
            throw new Error("Not enough troops to transfer.");
        }
    }
    getTroopCount() {
        return this.troopCount;
    }
    getMaxMovePoints() {
        return Army.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return Army.MAX_HEIGHT_POINTS;
    }
    setTroopCount(value) {
        this.troopCount = Math.max(0, value);
    }
    getOfficerCount() {
        return this.officerCount;
    }
    setOfficerCount(value) {
        this.officerCount = Math.max(0, value);
    }
    getLightCatapultCount() {
        return this.lightCatapultCount;
    }
    setLightCatapultCount(value) {
        if (this.canHaveCatapults()) {
            this.lightCatapultCount = Math.max(0, value);
        }
    }
    getHeavyCatapultCount() {
        return this.heavyCatapultCount;
    }
    setHeavyCatapultCount(value) {
        if (this.canHaveCatapults()) {
            this.heavyCatapultCount = Math.max(0, value);
        }
    }
    getHeavyCatapultsShot() {
        return this.heavyCatapultsShot;
    }
    addHeavyCatapultsShot(value) {
        if (this.getHeavyCatapultsShot() + Math.max(0, value) <= this.getHeavyCatapultCount()) {
            this.heavyCatapultsShot += Math.max(0, value);
        }
    }
    getLightCatapultsShot() {
        return this.lightCatapultsShot;
    }
    addLightCatapultsShot(value) {
        if (this.getLightCatapultsShot() + Math.max(0, value) <= this.getLightCatapultCount()) {
            this.lightCatapultsShot += Math.max(0, value);
        }
    }
    //to find all fields in a two tile proximity
    findShootingTargets() {
        this.targetList = [];
        let tilesInRange = [];
        if (this.heavyCatapultCount - this.heavyCatapultsShot > 0) { //in a 2 tile range
            tilesInRange = hexFunctions_1.HexFunction.neighborInRange(this.position, 2);
        }
        else if (this.lightCatapultCount - this.lightCatapultsShot > 0) { //one tile range
            tilesInRange = hexFunctions_1.HexFunction.neighborInRange(this.position, 1);
        }
        this.targetList = this.checkAllShootingConditions(tilesInRange);
    }
    shootAt(targetCoordinate, target, lkpToShootCount, skpToShootCount) {
        if (this.lightCatapultCount - this.lightCatapultsShot < lkpToShootCount) {
            //check if remaining Lkp that have not shot yet
            throw new Error("Die Armee hat nur noch " + (this.lightCatapultCount - this.lightCatapultsShot) +
                " leichte Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
        }
        if (this.heavyCatapultCount - this.heavyCatapultsShot < skpToShootCount) {
            //check if remaining Skp that have not shot yet
            throw new Error("Die Armee hat nur noch " + (this.heavyCatapultCount - this.heavyCatapultsShot) +
                " schwere Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
        }
        if (lkpToShootCount > 0 &&
            this.checkShootingCondition(targetCoordinate, false) === 5 /* Impossible */) {
            throw new Error("Die leichten Katapulte/Kriegsschiffe können nicht so weit schießen. " +
                "Schieße nur mit schweren Katapulten/Kriegsschiffe oder suche dir ein anderes Ziel aus.");
        }
        if (skpToShootCount > 0 &&
            this.checkShootingCondition(targetCoordinate, true) === 5 /* Impossible */) {
            throw new Error("Ungültiges Ziel.");
        }
        this.lightCatapultsShot += lkpToShootCount;
        this.heavyCatapultsShot += skpToShootCount;
        //check to see if shooting after moving and stop the army if it moved this turn.
        if (this.movePoints < this.getMaxMovePoints()) {
            this.movePoints = 0;
            this.possibleMoves = [];
        }
    }
    checkAllShootingConditions(targetTileList) {
        let hasSKP = this.heavyCatapultCount - this.heavyCatapultsShot > 0;
        //filter out all impossible shots
        return targetTileList.filter(target => this.checkShootingCondition(target, hasSKP) !== 5 /* Impossible */);
    }
    checkShootingCondition(target, skpShot) {
        let condition = 5 /* Impossible */;
        let range = hexFunctions_1.HexFunction.distance(this.position, target);
        if (skpShot) { //skp shooting
            if (range === 1) { //for range of 1
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 2) {
                    condition = 3 /* High */;
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 1) {
                    condition = 1 /* Near */;
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) === 1 &&
                    hexFunctions_1.HexFunction.findWallInWay(this.position, target).length > 0) {
                    condition = 3 /* High */;
                }
            }
            else if (range === 2) { //for range of 2
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 1) {
                    condition = 2 /* FarAndHigh */;
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) < 1) {
                    condition = 0 /* Far */;
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) === 0 &&
                    hexFunctions_1.HexFunction.findWallInWay(this.position, target).length > 0) {
                    condition = 2 /* FarAndHigh */;
                }
                //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
                let commonNeig = hexFunctions_1.HexFunction.findCommonNeighbor(this.position, target);
                let walls = hexFunctions_1.HexFunction.findWallInWay(this.position, target);
                for (let i = 0; i < commonNeig.length; i++) {
                    if (walls.length > 0) {
                        for (let j = 0; j < walls.length; j++) {
                            if (((hexFunctions_1.HexFunction.height([commonNeig[i][0], commonNeig[i][1]]) -
                                hexFunctions_1.HexFunction.height(this.position) === 1)
                                && gameState_1.GameState.buildings[walls[j]].getPosition()[0] === commonNeig[i][0] &&
                                gameState_1.GameState.buildings[walls[j]].getPosition()[1] === commonNeig[i][1])) {
                                condition = 5 /* Impossible */;
                            }
                        }
                    }
                    if (hexFunctions_1.HexFunction.height(commonNeig[i]) - hexFunctions_1.HexFunction.height(this.position) > 1) {
                        condition = 5 /* Impossible */;
                    }
                }
            }
        }
        else { //for lkp shooting
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 1) {
                condition = 6 /* LightCatapults */;
            }
        }
        return condition;
    }
    conquer() {
        if (this.canConquer()) {
            let field = gameState_1.GameState.fields[hexFunctions_1.HexFunction.positionInList(this.position)];
            gameState_1.GameState.realms.forEach(realm => {
                let index = realm.territory.indexOf(field);
                if (index !== -1) {
                    realm.territory.splice(index, 1);
                }
            });
            this.owner.territory.push(field); //add to owner's realm's territory
        }
    }
    takeDamage(losses) {
        let factor = losses / this.troopCount;
        this.setTroopCount(this.troopCount - Math.floor(losses));
        this.setOfficerCount(this.officerCount - Math.floor(this.officerCount * factor));
        this.setLightCatapultCount(this.lightCatapultCount - Math.floor(this.lightCatapultCount * factor));
        this.setHeavyCatapultCount(this.heavyCatapultCount - Math.floor(this.heavyCatapultCount * factor));
    }
    getRoomPoints() {
        return this.getRoomPointsSansOfficers() + this.officerCount * constants_1.Constants.OFFICER_RP;
    }
    leaderGp() {
        let gp = 0;
        if (this.officerCount < 101) {
            gp += this.officerCount;
        }
        else if (this.officerCount < 201) {
            gp += (100 + (this.officerCount - 100) / 2);
        }
        else {
            gp += 200;
        }
        if (this.isGuard) {
            gp += 300;
        }
        return gp;
    }
    isAlive() {
        //TODO: Check for character leaders on the field once characters are implemented.
        return this.getRoomPointsSansOfficers() >= 100 && this.officerCount >= 1;
    }
}
exports.Army = Army;
