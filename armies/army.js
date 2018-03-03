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
        this.targetList = []; //TODO: this needs to be reviewed, together with findShottingTargets ect.
        this.isGuard = false;
        this.wasShotAt = false;
        this.possibleTargets = [];
        this.setTroopCount(troopCount);
        this.setOfficerCount(officerCount);
        if (isGuard != undefined) {
            this.isGuard = isGuard;
        }
        this.setLightCatapultCount(lightCatapultCount);
        this.setHeavyCatapultCount(heavyCatapultCount);
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
        if (this.heavyCatapultCount - this.heavyCatapultsShot > 0) {
            tilesInRange = hexFunctions_1.HexFunction.neighborInRange(this.position, 2);
        }
        else if (this.lightCatapultCount - this.lightCatapultsShot > 0) {
            tilesInRange = hexFunctions_1.HexFunction.neighborInRange(this.position, 1);
        }
        this.targetList = this.checkAllShootingConditions(tilesInRange);
    }
    checkAllShootingConditions(targetTileList) {
        let templist = targetTileList.slice();
        let hasSKP = false;
        if (this.heavyCatapultCount - this.heavyCatapultsShot > 0) {
            hasSKP = true;
        }
        //to find out the conditions and maybe kick out if not shootable
        for (let i = templist.length - 1; i >= 0; i--) {
            if (this.checkShootingCondition(templist[i], hasSKP) === 'impossible shot') {
                targetTileList.splice(i, 1);
            }
        }
        return targetTileList;
    }
    checkShootingCondition(target, skpShot) {
        let condition = 'impossible shot';
        let range = hexFunctions_1.HexFunction.distance(this.position, target);
        if (skpShot) {
            if (range == 1) {
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 2) {
                    condition = 'high';
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 1) {
                    condition = 'short';
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) === 1 &&
                    hexFunctions_1.HexFunction.findWallInWay(this.position, target).length > 0) {
                    condition = 'high';
                }
            }
            else if (range == 2) {
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 1) {
                    condition = 'farAndUp';
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) < 1) {
                    condition = 'far';
                }
                if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) === 0 &&
                    hexFunctions_1.HexFunction.findWallInWay(this.position, target).length > 0) {
                    condition = 'farAndUp';
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
                                condition = 'impossible shot';
                            }
                        }
                    }
                    if (hexFunctions_1.HexFunction.height(commonNeig[i]) - hexFunctions_1.HexFunction.height(this.position) > 1) {
                        condition = 'impossible shot';
                    }
                }
            }
        }
        else {
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height(this.position) <= 1) {
                condition = 'lkp';
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
