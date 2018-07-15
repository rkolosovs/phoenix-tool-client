(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../constants":16,"../gameState":28,"../libraries/hexFunctions":49,"./mobileEntity":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const hexFunctions_1 = require("../libraries/hexFunctions");
const battleResult_1 = require("./battleResult");
const landArmy_1 = require("./landArmy");
const fleet_1 = require("./fleet");
const riderArmy_1 = require("./riderArmy");
const footArmy_1 = require("./footArmy");
const armyFunctions_1 = require("../libraries/armyFunctions");
class BattleHandler {
    constructor(participants, location) {
        this.attackerArmies = [];
        this.defenderArmies = [];
        this.unsortedArmies = participants;
        this.location = location;
    }
    resolve(attackDie, defenceDie) {
        let battleResult = this.calculateResult(this.attackerArmies.map((val) => (val)), this.defenderArmies.map((val) => (val)), [], [], this.location, attackDie, defenceDie);
        if (battleResult.result === 1 /* ATTACKER_OVERRUN */) {
            this.attackerArmies.forEach(function (item) {
                item.setMovePoints(item.getMovePoints() - 7);
                item.conquer(); //try to conquer the land
            });
            this.defenderArmies.forEach(function (item) {
                item.takeDamage(item.getTroopCount());
            });
        }
        else if (battleResult.result === 3 /* DEFENDER_OVERRUN */) {
            this.attackerArmies.forEach(function (item) {
                item.takeDamage(item.getTroopCount());
            });
        }
        else {
            if (battleResult.result === 0 /* ATTACKER_VICTORY */) {
                //wipe the looser out
                this.defenderArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                //null move points of the victor and inflict losses
                this.attackerArmies.forEach(function (item, index) {
                    item.setMovePoints(0);
                    item.takeDamage(battleResult.attackerLosses[index]);
                    item.conquer(); //try to conquer the land
                }, this);
            }
            else if (battleResult.result === 2 /* DEFENDER_VICTORY */) {
                //wipe the looser out
                this.attackerArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                //null move points of the victor and inflict losses
                this.defenderArmies.forEach(function (item, index) {
                    item.takeDamage(battleResult.defenderLosses[index]);
                }, this);
            }
            else if (battleResult.result === 4 /* TIE */) {
                //wipe all combatants out
                this.attackerArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                this.defenderArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
            }
            else {
                console.log("Battle resolution error.");
            }
        }
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
    }
    static armyArrayCount(armyArray, fieldType) {
        return armyArray.filter((val) => ((val instanceof fleet_1.Fleet && fieldType <= 1) || (fieldType >= 2 && val instanceof landArmy_1.LandArmy)), this).
            reduce((total, elem) => (elem.getTroopCount() + total), 0);
    }
    static terrainGP(army, attacker, fieldType, location) {
        let buildingsOnTheField = gameState_1.GameState.buildings.filter(current => (current.getPosition()[0] === location[0] && current.getPosition()[1] === location[1] && current.type <= 4));
        if (buildingsOnTheField.length > 0) { //production buildings on field negate usual terrain bonus
            if (attacker) {
                return 0;
            }
            if (buildingsOnTheField[0].owner !== army.owner) {
                return 50;
            }
            switch (buildingsOnTheField[0].type) {
                case 0: return 100;
                case 1: return 200;
                case 2: return 300;
                case 3: return 400;
                case 4: return 500;
                default: return 0;
            }
        }
        else { //usual terrain bonus applies
            let terrainGPBonus = 0;
            let findRealm = gameState_1.GameState.realms.find(realm => (realm === army.owner));
            let homeTurf = 0 /* SHALLOWS */;
            if (findRealm != undefined) {
                homeTurf = findRealm.homeTurf;
            }
            if (homeTurf === fieldType || (homeTurf === 5 /* HIGHLANDS */ && fieldType === 6 /* MOUNTAINS */) ||
                (homeTurf === 6 /* MOUNTAINS */ && fieldType === 5 /* HIGHLANDS */)) { //home terrain bonus applies
                terrainGPBonus += 50;
            }
            if ((army instanceof footArmy_1.FootArmy && (fieldType === 3 /* WOODS */ || fieldType === 8 /* SWAMP */)) ||
                (army instanceof riderArmy_1.RiderArmy && (fieldType === 2 /* LOWLANDS */ || fieldType === 4 /* HILLS */ ||
                    fieldType === 7 /* DESERT */))) { //footmen/rider terrain bonus
                terrainGPBonus += 140;
            }
            return terrainGPBonus;
        }
    }
    static characterGP(army, characters) {
        //TODO: compute GP from own character fighting in battle.
        //BLOCKER: requires characters to be a thing.
        return 0;
    }
    static directionalTerrainGP(army, attacker, attackingArmies) {
        let result = 0;
        let armyPosition = army.getPosition();
        let oldArmyPosition = army.getOldPosition();
        if (attacker) {
            if (hexFunctions_1.HexFunction.height(oldArmyPosition) >
                hexFunctions_1.HexFunction.height(armyPosition)) {
                result += 20;
            } //fighting downhill
            if (hexFunctions_1.HexFunction.fieldType(armyPosition) === 7 /* DESERT */ ||
                hexFunctions_1.HexFunction.fieldType(armyPosition) === 8 /* SWAMP */) {
                result += 20;
            } //attacking into swamp or desert
            if (hexFunctions_1.HexFunction.fieldType(oldArmyPosition) === 3 /* WOODS */) {
                result += 20;
            } //attacking out of a forest
            if (hexFunctions_1.HexFunction.hasStreet(armyPosition)) {
                result += 20;
            } //attacking onto a street
        }
        else {
            let adjacentWalls = hexFunctions_1.HexFunction.walls(armyPosition);
            let adjacentRivers = hexFunctions_1.HexFunction.fluesse(armyPosition);
            let adjacentBridges = hexFunctions_1.HexFunction.bridges(armyPosition);
            let neighbor = hexFunctions_1.HexFunction.neighbors(armyPosition);
            let downhillBonus = false;
            let wallBonus = false;
            let bridgeBonus = false;
            let riverBonus = false;
            attackingArmies.forEach((attackingArmy) => {
                if (hexFunctions_1.HexFunction.height(oldArmyPosition) < hexFunctions_1.HexFunction.height(armyPosition)) {
                    downhillBonus = true;
                }
                neighbor.forEach((neighbor, index) => {
                    if (neighbor[0] === oldArmyPosition[0] && neighbor[1] === oldArmyPosition[1]) {
                        if (adjacentWalls[index] === true) {
                            wallBonus = true;
                        }
                        if (adjacentRivers[index] === true) {
                            if (adjacentBridges[index] === true) {
                                bridgeBonus = true;
                            }
                            else {
                                riverBonus = true;
                            }
                        }
                    }
                });
            });
            result = (downhillBonus ? 20 : 0) + (wallBonus ? 50 : 0) + (riverBonus ? 50 : 0) + (bridgeBonus ? 30 : 0);
        }
        return result;
    }
    static computeCombatRating(strengthArmy, totalArmyGP) {
        return strengthArmy.map((elem, index) => (elem * (1 + (totalArmyGP[index] / 200))));
    }
    static computeLossFactor(ownForces, enemyForces, victorious) {
        let baseFactor = (ownForces / enemyForces) / 10;
        if (victorious && ownForces >= enemyForces) {
            return -baseFactor;
        }
        else if (victorious && ownForces < enemyForces) {
            return 0.2 - baseFactor;
        }
        else {
            return 0;
        }
    }
    static computeFinalLosses(baseArmyLosses, armyGPDiff, armyStrength, totalStrength) {
        let lossesWithGP = 0;
        if (armyGPDiff >= 0) {
            lossesWithGP = baseArmyLosses / (1 + armyGPDiff);
        }
        else {
            lossesWithGP = baseArmyLosses * (1 - armyGPDiff);
        }
        return (lossesWithGP / totalStrength) * armyStrength;
    }
    calculateResult(armiesAttack, armiesDefense, charsAttack, charsDefense, location, attackDieRoll, defenseDieRoll) {
        let fieldType = hexFunctions_1.HexFunction.fieldType(location);
        let overrunAttack = BattleHandler.armyArrayCount(armiesAttack, fieldType) >=
            10 * BattleHandler.armyArrayCount(armiesDefense, fieldType) &&
            armiesDefense.filter((elem) => (elem.isGuard)).length === 0 &&
            BattleHandler.armyArrayCount(armiesAttack, fieldType) > 0;
        let overrunDefense = 10 * BattleHandler.armyArrayCount(armiesAttack, fieldType) <=
            BattleHandler.armyArrayCount(armiesDefense, fieldType) &&
            armiesAttack.filter((elem) => (elem.isGuard)).length === 0 &&
            BattleHandler.armyArrayCount(armiesDefense, fieldType) > 0;
        let totalStrengthAttackerArmy = armiesAttack.map((elem) => (elem.getTroopCount()));
        let totalStrengthDefenderArmy = armiesDefense.map((elem) => {
            if (elem instanceof fleet_1.Fleet) {
                return elem.getTroopCount() + elem.getLightCatapultCount() * 5 + elem.getHeavyCatapultCount() * 10;
            }
            else {
                return elem.getTroopCount();
            }
        });
        let totalAttackerArmyGP = armiesAttack.map((elem) => (attackDieRoll + elem.leaderGp() + BattleHandler.terrainGP(elem, true, fieldType, location) +
            BattleHandler.characterGP(elem, charsAttack) + BattleHandler.directionalTerrainGP(elem, true, [])));
        let totalDefenderArmyGP = armiesDefense.map((elem) => (defenseDieRoll + elem.leaderGp() + BattleHandler.terrainGP(elem, false, fieldType, location) +
            BattleHandler.characterGP(elem, charsDefense) + BattleHandler.directionalTerrainGP(elem, false, armiesAttack)));
        let combatRatingAttackerArmy = BattleHandler.computeCombatRating(totalStrengthAttackerArmy, totalAttackerArmyGP);
        let combatRatingDefenderArmy = BattleHandler.computeCombatRating(totalStrengthDefenderArmy, totalDefenderArmyGP);
        let totalAttackerStrength = totalStrengthAttackerArmy.reduce((total, elem) => (total + elem), 0);
        let totalDefenderStrength = totalStrengthDefenderArmy.reduce((total, elem) => (total + elem), 0);
        let attackerTotalCombatRating = combatRatingAttackerArmy.reduce((total, elem) => (total + elem), 0);
        let defenderTotalCombatRating = combatRatingDefenderArmy.reduce((total, elem) => (total + elem), 0);
        let result;
        if (overrunAttack) {
            result = 1 /* ATTACKER_OVERRUN */;
        }
        else if (attackerTotalCombatRating > defenderTotalCombatRating) {
            result = 0 /* ATTACKER_VICTORY */;
        }
        else if (overrunDefense) {
            result = 3 /* DEFENDER_OVERRUN */;
        }
        else if (attackerTotalCombatRating < defenderTotalCombatRating) {
            result = 2 /* DEFENDER_VICTORY */;
        }
        else {
            result = 4 /* TIE */;
        }
        let attackerBaseLosses = totalDefenderStrength;
        let defenderBaseLosses = totalAttackerStrength;
        let attackerLossFactor = BattleHandler.computeLossFactor(totalAttackerStrength, totalDefenderStrength, (result === 0 /* ATTACKER_VICTORY */ || result === 1 /* ATTACKER_OVERRUN */));
        let defenderLossFactor = BattleHandler.computeLossFactor(totalDefenderStrength, totalAttackerStrength, (result === 2 /* DEFENDER_VICTORY */ || result === 3 /* DEFENDER_OVERRUN */));
        //multiplication and subsequent division by 100 done for reasons of numerical stability
        let attackerNewBaseLosses = Math.floor((attackerBaseLosses * (100 + (attackerLossFactor * 100))) / 100);
        let defenderNewBaseLosses = Math.floor((defenderBaseLosses * (100 + (defenderLossFactor * 100))) / 100);
        let baseLossesAttackerArmy = totalStrengthAttackerArmy.map((elem) => ((elem / totalAttackerStrength) * attackerNewBaseLosses));
        let baseLossesDefenderArmy = totalStrengthDefenderArmy.map((elem) => ((elem / totalDefenderStrength) * defenderNewBaseLosses));
        let attackerMeanGP = ((attackerTotalCombatRating / totalAttackerStrength) - 1) * 100;
        let defenderMeanGP = ((defenderTotalCombatRating / totalDefenderStrength) - 1) * 100;
        let attackerGPDiffArmy = totalAttackerArmyGP.map((elem) => ((elem / 200) - (defenderMeanGP / 100)));
        let defenderGPDiffArmy = totalDefenderArmyGP.map((elem) => ((elem / 200) - (attackerMeanGP / 100)));
        let finalLossesAttackerArmy = baseLossesAttackerArmy.map((elem, index) => (BattleHandler.computeFinalLosses(elem, attackerGPDiffArmy[index], totalStrengthAttackerArmy[index], totalStrengthAttackerArmy[index])));
        let finalLossesDefenderArmy = baseLossesDefenderArmy.map((elem, index) => (BattleHandler.computeFinalLosses(elem, defenderGPDiffArmy[index], armiesDefense[index].getTroopCount(), totalStrengthDefenderArmy[index])));
        return new battleResult_1.BattleResult(result, finalLossesAttackerArmy, finalLossesDefenderArmy);
    }
}
exports.BattleHandler = BattleHandler;

},{"../gameState":28,"../libraries/armyFunctions":48,"../libraries/hexFunctions":49,"./battleResult":3,"./fleet":4,"./footArmy":5,"./landArmy":6,"./riderArmy":9}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BattleResult {
    constructor(result, attackerLosses, defenderLosses) {
        this.result = result;
        this.attackerLosses = attackerLosses;
        this.defenderLosses = defenderLosses;
    }
}
exports.BattleResult = BattleResult;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const army_1 = require("./army");
const constants_1 = require("../constants");
var SHIP_RP = constants_1.Constants.SHIP_RP;
var GUARD_RP_MULT = constants_1.Constants.GUARD_RP_MULT;
var LIGHT_WS_RP = constants_1.Constants.LIGHT_WS_RP;
var HEAVY_WS_RP = constants_1.Constants.HEAVY_WS_RP;
const hexFunctions_1 = require("../libraries/hexFunctions");
const move_1 = require("./move");
var SHIP_BP = constants_1.Constants.SHIP_BP;
var HEAVY_WS_BP = constants_1.Constants.HEAVY_WS_BP;
var LIGHT_WS_BP = constants_1.Constants.LIGHT_WS_BP;
var SHIP_TRANSPORT_CAPACITY = constants_1.Constants.SHIP_TRANSPORT_CAPACITY;
const gameState_1 = require("../gameState");
const armyFunctions_1 = require("../libraries/armyFunctions");
const footArmy_1 = require("./footArmy");
class Fleet extends army_1.Army {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, 0, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, 0);
        }
        this.transportedArmies = [];
    }
    getErkenfaraID() {
        return 300 + this.id;
    }
    canHaveCatapults() {
        return !this.isGuard;
    }
    canHaveMounts() {
        return false;
    }
    getMaxMovePoints() {
        return Fleet.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return Fleet.MAX_HEIGHT_POINTS;
    }
    getRoomPointsSansOfficers() {
        if (this.isGuard) {
            return this.troopCount * SHIP_RP * GUARD_RP_MULT +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
        else {
            return this.troopCount * SHIP_RP +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
    }
    move(direction) {
        let move = this.possibleMoves.find(possMove => possMove.direction === direction);
        if (move != undefined) {
            this.oldPosition[0] = this.position[0];
            this.oldPosition[1] = this.position[1];
            this.position[0] = move.destination[0];
            this.position[1] = move.destination[1];
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.transportedArmies.forEach(transportedArmy => transportedArmy.changePosition(move.destination));
        }
        else {
            throw new Error("Move not possible.");
        }
    }
    checkForPossibleMove(direction) {
        let neighborCoords = hexFunctions_1.HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let neighborsOfNeighbors = hexFunctions_1.HexFunction.neighbors(target).
            map((neighbor) => hexFunctions_1.HexFunction.neighbors(neighbor)).
            reduce((total, current) => (total.concat(current)), []);
        // TODO: Effects of diplomacy go here.
        let coastalSailing = this.owner.territory.some(field => neighborsOfNeighbors.some(neighbor => field.coordinates[0] === neighbor[0] &&
            field.coordinates[1] === neighbor[1]));
        switch (hexFunctions_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */: //shallow sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) { //shallow sea & no warships
                    if (coastalSailing && this.movePoints >= 5) { //shallow sea, coast & no warships
                        return new move_1.Move(5, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 7) { //shallow sea, no coast & no warships
                        return new move_1.Move(7, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) { //shallow sea & heavy warships
                    if (coastalSailing && this.movePoints >= 7) { //shallow sea, coast & heavy warships
                        return new move_1.Move(7, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 10) { //shallow sea, no coast & heavy warships
                        return new move_1.Move(10, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) { //shallow sea & light warships
                    if (coastalSailing && this.movePoints >= 6) { //shallow sea, coast & light warships
                        return new move_1.Move(6, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 8) { //shallow sea, no coast & light warships
                        return new move_1.Move(8, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case 1 /* DEEPSEA */: //deep sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) { //deep sea & no warships
                    if (coastalSailing && this.movePoints >= 8) { //deep sea, coast & no warships
                        return new move_1.Move(8, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 12) { //deep sea, no coast & no warships
                        return new move_1.Move(12, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) { //deep sea & heavy warships
                    if (coastalSailing && this.movePoints >= 14) { //deep sea, coast & heavy warships
                        return new move_1.Move(14, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 21) { //deep sea, no coast & heavy warships
                        return new move_1.Move(21, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) { //deep sea & light warships
                    if (coastalSailing && this.movePoints >= 14) { //deep sea, coast & light warships
                        return new move_1.Move(14, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 21) { //deep sea, no coast & light warships
                        return new move_1.Move(21, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case 2 /* LOWLANDS */:
            case 3 /* WOODS */:
            case 4 /* HILLS */:
            case 5 /* HIGHLANDS */:
            case 6 /* MOUNTAINS */:
            case 7 /* DESERT */:
            case 8 /* SWAMP */: throw new Error("You can't drive your ships up land.");
            default: throw new Error("Unknown terrain type.");
        }
    }
    canConquer() {
        return false;
    }
    totalBP() {
        return this.troopCount * SHIP_BP + this.lightCatapultCount * LIGHT_WS_BP +
            this.heavyCatapultCount * HEAVY_WS_BP;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * SHIP_BP / totalBP) / SHIP_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_WS_BP /
            totalBP) / LIGHT_WS_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_WS_BP /
            totalBP) / HEAVY_WS_BP);
        this.killTransportedTroops();
        this.wasShotAt = true;
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        this.lightCatapultCount -= lkpToTransfer;
        this.heavyCatapultCount -= skpToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToTransfer);
        armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToTransfer);
        if (troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer > 0) {
            armyToTransferTo.setMovePoints(Math.min(this.movePoints, armyToTransferTo.getMovePoints()));
        }
    }
    split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId) {
        if (this.isGuard) {
            throw new Error("Guard can't be split.");
        }
        if (troopsToSplit > this.troopCount) {
            throw new Error("Not enough troops.");
        }
        if (leadersToSplit > this.officerCount) {
            throw new Error("Not enough officers.");
        }
        if (troopsToSplit * constants_1.Constants.SHIP_TRANSPORT_CAPACITY > this.freeTransportCapacity()) {
            throw new Error("Du kannst keine beladenen Schiffe abspalten.");
        }
        if (lightCatapultsToSplit > this.lightCatapultCount) {
            throw new Error("Not enough light catapults.");
        }
        if (heavyCatapultsToSplit > this.heavyCatapultCount) {
            throw new Error("Not enough heavy catapults.");
        }
        if (troopsToSplit + 1 > this.troopCount || leadersToSplit + 1 > this.officerCount) {
            if (!confirm("The remaining fleet is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (troopsToSplit < 1 || leadersToSplit < 1) {
            if (!confirm("The new fleet is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        gameState_1.GameState.armies.push(new footArmy_1.FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, 0, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
        this.lightCatapultCount -= lightCatapultsToSplit;
        this.heavyCatapultCount -= heavyCatapultsToSplit;
    }
    merge(fromArmy) {
        if (!(fromArmy instanceof Fleet)) {
            throw new Error("Can't merge armies other than fleets with a fleet.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        this.lightCatapultCount += fromArmy.getLightCatapultCount();
        this.heavyCatapultCount += fromArmy.getHeavyCatapultCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        armyFunctions_1.ArmyFunctions.deleteArmy(fromArmy);
        let discardedArmies = 0;
        fromArmy.transportedArmies.forEach(transportedArmy => {
            fromArmy.unloadArmy(transportedArmy);
            try {
                this.loadArmy(transportedArmy);
            }
            catch (e) {
                discardedArmies++;
            }
        });
        if (discardedArmies > 0) {
            window.alert("" + discardedArmies + "armies have been thrown overboard.");
        }
    }
    getLightCatapultDamage(diceRolls, conditions) {
        if (conditions === 6 /* LightCatapults */) {
            return diceRolls.map(roll => constants_1.Constants.LIGHT_WS_DAMAGE[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    getHeavyCatapultDamage(diceRolls, conditions) {
        if (conditions === 1 /* Near */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_WS_DAMAGE_NEAR[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 3 /* High */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_WS_DAMAGE_HIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 2 /* FarAndHigh */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_WS_DAMAGE_FARANDHIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 0 /* Far */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_WS_DAMAGE_FAR[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    takeDamage(losses) {
        super.takeDamage(losses);
        this.killTransportedTroops();
    }
    usedTransportCapacity() {
        let loaded = 0;
        this.transportedArmies.forEach(transportedArmy => loaded += transportedArmy.getRoomPoints());
        return loaded;
    }
    maxTransportCapacity() {
        return this.troopCount * SHIP_TRANSPORT_CAPACITY;
    }
    freeTransportCapacity() {
        return this.maxTransportCapacity() - this.usedTransportCapacity();
    }
    canLoad(armyToLoad) {
        return this.freeTransportCapacity() >= armyToLoad.getRoomPoints();
    }
    loadArmy(army) {
        if (army.getRoomPoints() <= this.freeTransportCapacity()) {
            this.transportedArmies.push(army);
            army.transportingFleet = this;
        }
        else {
            throw new Error("This army is too big for this fleet.");
        }
    }
    unloadArmy(army) {
        let armyIndex = this.transportedArmies.indexOf(army);
        if (armyIndex >= 0) {
            this.transportedArmies.splice(armyIndex, 1);
        }
        army.transportingFleet = undefined;
    }
    killTransportedTroops() {
        let usedCapacity = this.usedTransportCapacity();
        let overload = usedCapacity - this.maxTransportCapacity();
        if (overload > 0) {
            this.transportedArmies.forEach(transportedArmy => transportedArmy.takeRPDamage(Math.ceil(overload * (transportedArmy.getRoomPoints() / usedCapacity))));
        }
    }
}
Fleet.MAX_HEIGHT_POINTS = 0;
exports.Fleet = Fleet;

},{"../constants":16,"../gameState":28,"../libraries/armyFunctions":48,"../libraries/hexFunctions":49,"./army":1,"./footArmy":5,"./move":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const landArmy_1 = require("./landArmy");
const gameState_1 = require("../gameState");
const fleet_1 = require("./fleet");
const constants_1 = require("../constants");
var FOOTMAN_RP = constants_1.Constants.FOOTMAN_RP;
var LIGHT_CATA_RP = constants_1.Constants.LIGHT_CATA_RP;
var HEAVY_CATA_RP = constants_1.Constants.HEAVY_CATA_RP;
var MOUNT_RP = constants_1.Constants.MOUNT_RP;
var FOOTMAN_BP = constants_1.Constants.FOOTMAN_BP;
var MOUNT_BP = constants_1.Constants.MOUNT_BP;
var LIGHT_CATA_BP = constants_1.Constants.LIGHT_CATA_BP;
var HEAVY_CATA_BP = constants_1.Constants.HEAVY_CATA_BP;
var OFFICER_RP = constants_1.Constants.OFFICER_RP;
const riderArmy_1 = require("./riderArmy");
const controlVariables_1 = require("../controls/controlVariables");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const armyFunctions_1 = require("../libraries/armyFunctions");
const mountEvent_1 = require("../events/mountEvent");
class FootArmy extends landArmy_1.LandArmy {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, mountCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
        }
        this.mountCount = mountCount;
    }
    getErkenfaraID() {
        return 100 + this.id;
    }
    getMaxMovePoints() {
        return FootArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return FootArmy.MAX_HEIGHT_POINTS;
    }
    getMountCount() {
        return this.mountCount;
    }
    setMountCount(value) {
        if (this.canHaveMounts()) {
            this.mountCount = Math.max(0, value);
        }
    }
    computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target) {
        switch (hexFunctions_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */: //watter
                //already embarked
                if (this.transportingFleet != undefined) {
                    throw new Error("You are already embarked on a Fleet.");
                    // there are no viable fleets on destination
                }
                else if (gameState_1.GameState.armies.filter(army => army instanceof fleet_1.Fleet && army.getPosition()[0] === target[0] &&
                    army.getPosition()[1] === target[1] && army.owner === this.owner && army.canLoad(this)).length === 0) {
                    throw new Error("You can't walk on Water.");
                    // at least one fleet on destination
                }
                else {
                    return 0; //embarking doesn't cost move points
                }
            case 2 /* LOWLANDS */:
            case 4 /* HILLS */:
            case 7 /* DESERT */: if (thereIsARiver && !thereIsABridge) { //plains, hills, desert
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //right of passage
                    if (this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 4) { //catapults, street & right of passage
                        return 4;
                    }
                    else if (this.movePoints >= 3) { //no catapults, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.movePoints >= 4) { //street & no right of passage
                    return 4;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else { //no street
                if (rightOfPassage) { //right of passage
                    if (this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 7) { //catapults, no street & right of passage
                        return 7;
                    }
                    else if (this.movePoints >= 4) { //no catapults, no street & right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.movePoints >= 7) { //no street & no right of passage
                    return 7;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            case 5 /* HIGHLANDS */: if (thereIsARiver && !thereIsABridge) { //highlands
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //street & right of passage
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) { //heavy catas, street & right of passage
                        return 7;
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light catas, street & right of passage
                        return 4;
                    }
                    else if (this.lightCatapultCount + this.heavyCatapultCount <= 0 && this.movePoints >= 3) { //no catas, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, street & no right of passage
                        if (this.movePoints >= 7) {
                            return 7;
                        }
                        else {
                            throw new Error("You don't have enough movement Points.");
                        }
                    }
                    else if (this.movePoints >= 4) { //light or no catas, street & no right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else { //no street
                if (rightOfPassage) { //no street & right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & right of passage
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light catas, no street & right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) { //no catas, no street & right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //no street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & no right of passage
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light or no catas, no street & no right of passage
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            case 6 /* MOUNTAINS */: if (thereIsARiver && !thereIsABridge) { //mountains
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //street & right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, street & right of passage
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light catas, street & right of passage
                        return 4;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3) { //no catas, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, street & no right of passage
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light catas, street & no right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) { //no catas, street & no right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else { //no street
                if (this.heavyCatapultCount + this.lightCatapultCount > 0) { //light or heavy catas, no street
                    throw new Error("You need a street to move into the mountains with catapults.");
                }
                else { //no catas, no street
                    if (rightOfPassage && this.movePoints >= 4) { //no catas, no street & right of passage
                        return 4;
                    }
                    else if (this.movePoints >= 7) { //no catas, no street & no right of passage
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            case 3 /* WOODS */:
            case 8 /* SWAMP */: if (thereIsARiver && !thereIsABridge) { //forest, swamp
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //street & right of passage
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) { //heavy catas, street & right of passage
                        return 7;
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light catas, street & right of passage
                        return 4;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3) { //no catas, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //street & no right of passage
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) { //heavy catas, street & no right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light or no catas, street & no right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else { //no street
                if (rightOfPassage) { //no street & right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & right of passage
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light catas, no street & right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) { //no catas, no street & right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //no street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & no right of passage
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light or no catas, no street & no right of passage
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
        }
    }
    takeRPDamage(rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (FOOTMAN_RP +
            OFFICER_RP * (this.officerCount / this.troopCount) +
            this.mountCount / this.troopCount +
            LIGHT_CATA_RP * (this.lightCatapultCount / this.troopCount) +
            HEAVY_CATA_RP * (this.heavyCatapultCount / this.troopCount))));
    }
    canHaveCatapults() {
        return !this.isGuard;
    }
    canHaveMounts() {
        return !this.isGuard;
    }
    getRoomPointsSansOfficers() {
        return this.troopCount * FOOTMAN_RP +
            this.lightCatapultCount * LIGHT_CATA_RP +
            this.heavyCatapultCount * HEAVY_CATA_RP +
            this.mountCount * MOUNT_RP;
    }
    totalBP() {
        return this.troopCount * FOOTMAN_BP + this.mountCount * MOUNT_BP +
            this.lightCatapultCount * LIGHT_CATA_BP + this.heavyCatapultCount * HEAVY_CATA_BP;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * FOOTMAN_BP / totalBP) / FOOTMAN_BP);
        this.setMountCount(this.mountCount - bpDamage * (this.mountCount * MOUNT_BP / totalBP) / MOUNT_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_CATA_BP /
            totalBP) / LIGHT_CATA_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_CATA_BP /
            totalBP) / HEAVY_CATA_BP);
        this.wasShotAt = true;
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
        if (this.mountCount < mountsToTransfer) {
            throw new Error("Not enough mounts to transfer");
        }
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        this.lightCatapultCount -= lkpToTransfer;
        this.heavyCatapultCount -= skpToTransfer;
        this.mountCount -= mountsToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToTransfer);
        armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToTransfer);
        armyToTransferTo.setMountCount(armyToTransferTo.getMountCount() + mountsToTransfer);
        if (troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer > 0) {
            armyToTransferTo.setMovePoints(Math.min(this.movePoints, armyToTransferTo.getMovePoints()));
        }
    }
    split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId) {
        if (this.isGuard) {
            throw new Error("Guard can't be split.");
        }
        if (troopsToSplit > this.troopCount) {
            throw new Error("Not enough troops.");
        }
        if (leadersToSplit > this.officerCount) {
            throw new Error("Not enough officers (at least 1 officer must stay with the old army).");
        }
        if (troopsToSplit + 100 > this.troopCount || leadersToSplit + 1 > this.officerCount) {
            if (!confirm("The remaining army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (troopsToSplit < 100 || leadersToSplit < 1) {
            if (!confirm("The new army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (mountsToSplit > this.mountCount) {
            throw new Error("Not enough mounts.");
        }
        if (lightCatapultsToSplit > this.lightCatapultCount) {
            throw new Error("Not enough light catapults.");
        }
        if (heavyCatapultsToSplit > this.heavyCatapultCount) {
            throw new Error("Not enough heavy catapults.");
        }
        gameState_1.GameState.armies.push(new FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
        this.mountCount -= mountsToSplit;
        this.lightCatapultCount -= lightCatapultsToSplit;
        this.heavyCatapultCount -= heavyCatapultsToSplit;
    }
    merge(fromArmy) {
        if (!(fromArmy instanceof FootArmy)) {
            throw new Error("Can't merge armies other than foot armies with a foot army.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        this.mountCount += fromArmy.getMountCount();
        this.lightCatapultCount += fromArmy.getLightCatapultCount();
        this.heavyCatapultCount += fromArmy.getHeavyCatapultCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        armyFunctions_1.ArmyFunctions.deleteArmy(fromArmy);
    }
    getLightCatapultDamage(diceRolls, conditions) {
        if (conditions === 6 /* LightCatapults */) {
            return diceRolls.map(roll => constants_1.Constants.LIGHT_CATA_DAMAGE[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    getHeavyCatapultDamage(diceRolls, conditions) {
        if (conditions === 1 /* Near */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_NEAR[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 3 /* High */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_HIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 2 /* FarAndHigh */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_FARANDHIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 0 /* Far */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_FAR[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    // mounting with parameters
    mount(toMount, leadersToMount, newArmyId) {
        // generiere armyId falls keine vorhanden
        if (newArmyId == undefined) {
            newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(2, this.owner);
        }
        // sitzen genug Truppen auf?
        if (toMount < 50) {
            window.alert("Es müssen mindestens 50 Reiter in einem Reiterheer sein.");
            return false;
        }
        // sitzen genug Heerführer auf?
        if (leadersToMount < 1) {
            window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
            return false;
        }
        // bleibt ein Hf bei der armee zurück?
        if (toMount != this.troopCount && leadersToMount === this.officerCount) {
            window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
            return false;
        }
        // genug Truppen vorhanden?
        if (toMount != this.troopCount && (toMount * 2 > this.getRoomPointsSansOfficers() - 100)) {
            window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
            return false;
            // genug Reittiere vorhanden?
        }
        // genug Truppen vorhanden?
        if (toMount > this.troopCount) {
            window.alert("Du hast zu wenige Truppen zum aufsitzen");
            return false;
            // genug Reittiere vorhanden?
        }
        else if (toMount > this.mountCount) {
            window.alert("Du hast zu wenige Reittiere zum aufsitzen");
            return false;
            // Sitzen alle auf?
        }
        else if (toMount === this.troopCount) {
            // neues Reiterheer mit generierter Id an selben Koordinaten
            let newArmy = new riderArmy_1.RiderArmy(newArmyId, this.owner, toMount, this.officerCount, this.getPosition(), 0, this.heightPoints, this.isGuard);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else {
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            }
            // Nachricht, falls Katapulte vorhanden waren.
            if (this.heavyCatapultCount > 0 || this.lightCatapultCount > 0) {
                window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.");
            }
            // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
            gameState_1.GameState.armies.push(newArmy);
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toMount, leadersToMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            armyFunctions_1.ArmyFunctions.deleteArmy(this);
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
        }
        else if (leadersToMount >= this.officerCount) {
            window.alert("Du hast zu wenige Heerführer zum aufsitzen");
            return false;
        }
        else if (this.isGuard) {
            window.alert("Die Garde muss zusammen bleiben");
            return false;
        }
        else {
            // neues Reiterheer mit generierter Id an selben Koordinaten
            let newArmy = new riderArmy_1.RiderArmy(newArmyId, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, toMount, leadersToMount, this.getPosition(), 0, this.heightPoints, false);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else {
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            }
            // zahlen im alten Heer anpassen
            this.setTroopCount(this.troopCount - toMount);
            this.setOfficerCount(this.officerCount - leadersToMount);
            this.setMountCount(this.mountCount - toMount);
            // in GameState.armies einfügen
            gameState_1.GameState.armies.push(newArmy);
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toMount, leadersToMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            // Controls.selectedArmyIndex zeigt auf neues Heer
            controlVariables_1.Controls.selectedArmyIndex = gameState_1.GameState.armies.length - 1;
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
        }
    }
}
FootArmy.MAX_MOVE_POINTS = 9;
exports.FootArmy = FootArmy;

},{"../constants":16,"../controls/controlVariables":18,"../events/mountEvent":23,"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../libraries/armyFunctions":48,"../libraries/hexFunctions":49,"./fleet":4,"./landArmy":6,"./riderArmy":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const army_1 = require("./army");
const move_1 = require("./move");
const fleet_1 = require("./fleet");
const hexFunctions_1 = require("../libraries/hexFunctions");
class LandArmy extends army_1.Army {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
        }
    }
    getMaxMovePoints() {
        return LandArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return LandArmy.MAX_HEIGHT_POINTS;
    }
    isTransported() {
        return this.transportingFleet != undefined;
    }
    move(direction) {
        let move = this.possibleMoves.find(possMove => possMove.direction === direction);
        if (move != undefined) {
            if (move.unloading && this.isTransported()) {
                this.transportingFleet.unloadArmy(this);
            }
            else if (move.loading && !this.isTransported()) {
                let fleetsOnDestination = gameState_1.GameState.armies.filter(army => army instanceof fleet_1.Fleet && army.getPosition()[0] === move.destination[0] &&
                    army.getPosition()[1] === move.destination[1]).map(army => army);
                if (fleetsOnDestination.length === 0) {
                    throw new Error("You can't walk on Water.");
                }
                else if (fleetsOnDestination.length === 1) {
                    fleetsOnDestination[0].loadArmy(this);
                }
                else {
                    let fleetString = fleetsOnDestination.reduce((accumulator, fleet) => accumulator += " " + fleet.getErkenfaraID(), "");
                    let chosenFleet = prompt("Mögliche Flotten sind: " + fleetString);
                    if (chosenFleet == undefined) {
                        throw new Error("Embarkation canceled.");
                    }
                    else if (chosenFleet != undefined && chosenFleet !== '') {
                        let foundFleet = fleetsOnDestination.find(fleet => fleet.getErkenfaraID() === parseInt(chosenFleet));
                        if (foundFleet != undefined) {
                            foundFleet.loadArmy(this);
                        }
                        else {
                            window.alert("Bitte wähle eine der angegebenen Flotten aus.");
                        }
                    }
                }
            }
            this.oldPosition[0] = this.position[0];
            this.oldPosition[1] = this.position[1];
            this.position[0] = move.destination[0];
            this.position[1] = move.destination[1];
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.setHeightPoints(this.getHeightPoints() - move.heightPoints);
        }
        else {
            throw new Error("Move not possible.");
        }
    }
    checkForPossibleMove(direction) {
        let neighborCoords = hexFunctions_1.HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let heightCost = 0;
        let thereIsAStreet = false;
        let thereIsABridge = false;
        let thereIsAHarbor = false;
        // TODO: effects of diplomacy go here
        let rightOfPassage = gameState_1.GameState.realms.some((realm) => (realm === this.owner && realm.territory.some((field) => (target[0] === field.coordinates[0] && target[1] === field.coordinates[1]))));
        let thereIsARiver = gameState_1.GameState.rivers.some((river) => (river.leftBank[0] === this.position[0] && river.leftBank[1] === this.position[1] && river.rightBank[0] === target[0] && river.rightBank[1] === target[1]) ||
            (river.leftBank[0] === target[0] && river.leftBank[1] === target[1] && river.rightBank[0] === this.position[0] && river.rightBank[1] === this.position[1]));
        // check if there is a steet, a harbor or a bridge on the route
        gameState_1.GameState.buildings.forEach(building => {
            if (building.type === 8 /* STREET */ &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsAStreet = true;
            }
            if (building.type === 6 /* HARBOR */ &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsAHarbor = true;
            }
            if (building.type === 7 /* BRIDGE */ &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsABridge = true;
            }
            //TODO: Walls!
        });
        // check if there is a change in height on the route
        if (hexFunctions_1.HexFunction.height(this.position) != hexFunctions_1.HexFunction.height(target)) {
            if (Math.abs(hexFunctions_1.HexFunction.height(this.position) - hexFunctions_1.HexFunction.height(target)) >= 2) {
                throw new Error("The height difference is too big.");
            }
            else if ((this.heightPoints < 2 && (!thereIsAStreet || !thereIsAHarbor)) || this.heightPoints < 1) {
                throw new Error("Not enough height points left.");
            }
            else {
                heightCost = (thereIsAStreet || thereIsABridge) ? 1 : 2;
                if (thereIsARiver) {
                    throw new Error("Can't traverse height difference with a river.");
                }
            }
        }
        let moveCost = this.computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target);
        return new move_1.Move(moveCost, heightCost, (hexFunctions_1.HexFunction.fieldType(target) === 0 /* SHALLOWS */ ||
            hexFunctions_1.HexFunction.fieldType(target) === 1 /* DEEPSEA */), (hexFunctions_1.HexFunction.fieldType(this.position) === 0 /* SHALLOWS */ ||
            hexFunctions_1.HexFunction.fieldType(this.position) === 1 /* DEEPSEA */), target, direction);
    }
    canConquer() {
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}
exports.LandArmy = LandArmy;

},{"../gameState":28,"../libraries/hexFunctions":49,"./army":1,"./fleet":4,"./move":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEntity_1 = require("../map/mapEntity");
const gameState_1 = require("../gameState");
class MobileEntity extends mapEntity_1.MapEntity {
    constructor(id, owner, position, movePoints, heightPoints) {
        super(position, owner);
        this.oldPosition = [0, 0];
        this.movePoints = MobileEntity.MAX_MOVE_POINTS;
        this.heightPoints = MobileEntity.MAX_HEIGHT_POINTS;
        this.possibleMoves = [];
        this.onMultifield = false;
        // copy the position so that this object doesn't share a reference with anything else
        this.id = id;
        this.oldPosition[0] = position[0];
        this.oldPosition[1] = position[1];
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }
    clickedMoves() {
        if (this.owner.tag === gameState_1.GameState.login || gameState_1.GameState.login === "sl") {
            this.possibleMoves = [];
            //goes through all neighbors to see if the army can move there
            this.possibleMoves.push(this.checkForPossibleMove(0 /* NW */));
            this.possibleMoves.push(this.checkForPossibleMove(1 /* NE */));
            this.possibleMoves.push(this.checkForPossibleMove(2 /* E */));
            this.possibleMoves.push(this.checkForPossibleMove(3 /* SE */));
            this.possibleMoves.push(this.checkForPossibleMove(4 /* SW */));
            this.possibleMoves.push(this.checkForPossibleMove(5 /* W */));
        }
    }
    changePosition(newPos) {
        this.oldPosition[0] = newPos[0];
        this.oldPosition[1] = newPos[1];
        this.position[0] = newPos[0];
        this.position[1] = newPos[1];
    }
    getOldPosition() {
        return [this.oldPosition[0], this.oldPosition[1]];
    }
    getMovePoints() {
        return this.movePoints;
    }
    getMaxMovePoints() {
        return MobileEntity.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return MobileEntity.MAX_HEIGHT_POINTS;
    }
    setMovePoints(value) {
        this.movePoints = Math.min(this.getMaxMovePoints(), Math.max(0, value));
    }
    getHeightPoints() {
        return this.heightPoints;
    }
    setHeightPoints(value) {
        this.heightPoints = Math.min(this.getMaxHeightPoints(), Math.max(0, value));
    }
    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value % 100;
    }
}
MobileEntity.MAX_MOVE_POINTS = 42;
MobileEntity.MAX_HEIGHT_POINTS = 2;
exports.MobileEntity = MobileEntity;

},{"../gameState":28,"../map/mapEntity":52}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Move {
    constructor(movePoints, heightPoints, loading, unloading, destination, direction) {
        this.movePoints = movePoints;
        this.heightPoints = heightPoints;
        this.loading = loading;
        this.unloading = unloading;
        this.destination = destination;
        this.direction = direction;
    }
}
exports.Move = Move;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const landArmy_1 = require("./landArmy");
const gameState_1 = require("../gameState");
const fleet_1 = require("./fleet");
const constants_1 = require("../constants");
var RIDER_RP = constants_1.Constants.RIDER_RP;
var OFFICER_RP = constants_1.Constants.OFFICER_RP;
var RIDER_BP = constants_1.Constants.RIDER_BP;
const controlVariables_1 = require("../controls/controlVariables");
const multifieldFunctions_1 = require("../gui/multifieldFunctions");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const footArmy_1 = require("./footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const armyFunctions_1 = require("../libraries/armyFunctions");
const mountEvent_1 = require("../events/mountEvent");
class RiderArmy extends landArmy_1.LandArmy {
    constructor(id, owner, troopCount, officerCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints);
        }
    }
    getErkenfaraID() {
        return 200 + this.id;
    }
    getMaxMovePoints() {
        return RiderArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return RiderArmy.MAX_HEIGHT_POINTS;
    }
    computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target) {
        switch (hexFunctions_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */: //watter
                //already embarked
                if (this.transportingFleet != undefined) {
                    throw new Error("You are already embarked on a Fleet.");
                    // there are no viable fleets on destination
                }
                else if (gameState_1.GameState.armies.filter(army => army instanceof fleet_1.Fleet && army.getPosition()[0] === target[0] &&
                    army.getPosition()[1] === target[1] && army.owner === this.owner && army.canLoad(this)).length === 0) {
                    throw new Error("You can't walk on Water.");
                    // at least one fleet on destination
                }
                else {
                    return 0; //embarking doesn't cost move points
                }
            case 2 /* LOWLANDS */:
            case 4 /* HILLS */:
            case 7 /* DESERT */: if (thereIsARiver && !thereIsABridge) { //plains, hills, desert
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage && this.movePoints >= 3) { //street & right of passage
                    return 3;
                }
                else if (this.movePoints >= 4) { //street & no right of passage
                    return 4;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && this.movePoints >= 4) { //no street & right of passage
                return 4;
            }
            else if (this.movePoints >= 7) { //no street & no right of passage
                return 7;
            }
            else {
                throw new Error("You don't have enough movement Points.");
            }
            case 5 /* HIGHLANDS */: if (thereIsARiver && !thereIsABridge) { //highlands
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && this.movePoints >= 4) { //street & right of passage
                    return 4;
                }
                else if (this.movePoints >= 7) { //street & no right of passage
                    return 7;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && this.movePoints >= 7) { //no street & right of passage
                return 7;
            }
            else if (this.movePoints >= 21) { //no street & no right of passage
                return 21;
            }
            else {
                throw new Error("You don't have enough movement Points.");
            }
            case 6 /* MOUNTAINS */: throw new Error("Cavalry can not move through the mountains."); //mountains
            case 3 /* WOODS */:
            case 8 /* SWAMP */: if (thereIsARiver && !thereIsABridge) { //forest, swamp
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && this.getMovePoints() >= 3) { //street & right of passage
                    return 3;
                }
                else if (this.getMovePoints() >= 5) { //street & no right of passage
                    return 5;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && this.getMovePoints() >= 5) { //no street && right of passage
                return 5;
            }
            else if (this.getMovePoints() >= 10) { //no street & no right of passage
                return 10;
            }
            else {
                throw new Error("You don't have enough movement Points.");
            }
            default: throw new Error("Unknown terrain type.");
        }
    }
    takeRPDamage(rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (RIDER_RP + OFFICER_RP * (this.officerCount / this.troopCount))));
    }
    canHaveCatapults() {
        return false;
    }
    canHaveMounts() {
        return false;
    }
    getRoomPointsSansOfficers() {
        return this.troopCount * RIDER_RP;
    }
    totalBP() {
        return this.troopCount * RIDER_BP;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage / RIDER_BP);
        this.wasShotAt = true;
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        if (troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer > 0) {
            armyToTransferTo.setMovePoints(Math.min(this.movePoints, armyToTransferTo.getMovePoints()));
        }
    }
    split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId) {
        if (this.isGuard) {
            throw new Error("Guard can't be split.");
        }
        if (troopsToSplit > this.troopCount) {
            throw new Error("Not enough troops.");
        }
        if (leadersToSplit > this.officerCount) {
            throw new Error("Not enough officers.");
        }
        if (troopsToSplit + 50 > this.troopCount || leadersToSplit + 1 > this.officerCount) {
            if (!confirm("The remaining army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (troopsToSplit < 50 || leadersToSplit < 1) {
            if (!confirm("The new army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (leadersToSplit < 1) {
            throw new Error("New army must have at least 1 officer.");
        }
        gameState_1.GameState.armies.push(new footArmy_1.FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, 0, 0, 0, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
    }
    merge(fromArmy) {
        if (!(fromArmy instanceof RiderArmy)) {
            throw new Error("Can't merge armies other than rider armies with a rider army.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        armyFunctions_1.ArmyFunctions.deleteArmy(fromArmy);
    }
    shootAt(targetCoordinate, target, lkpToShootCount, skpToShootCount) {
        throw new Error("Riders can't have catapults.");
    }
    getLightCatapultDamage(diceRolls, conditions) {
        return 0;
    }
    getHeavyCatapultDamage(diceRolls, conditions) {
        return 0;
    }
    // the unMount function of the unMount box
    dismount(toUnMount, leadersToUnMount, newArmyId) {
        // generiere armyId falls keine vorhanden
        if (newArmyId == undefined) {
            newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(1, this.owner);
        }
        // sitzen genug Truppen ab?
        if (toUnMount < 100) {
            window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
            return false;
        }
        // bleibt ein hf be der Armee?
        if (toUnMount != this.troopCount && leadersToUnMount === this.officerCount) {
            window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
            return false;
        }
        // genug Truppen vorhanden?
        if (toUnMount != this.troopCount && (toUnMount * 2 > this.getRoomPointsSansOfficers() - 100)) {
            window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
            return false;
            // genug Reittiere vorhanden?
        }
        // sitzen genug Heerführer ab?
        if (leadersToUnMount < 1) {
            window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
            return false;
        }
        if (toUnMount > this.troopCount) {
            window.alert("So viele Truppen hast du nicht zum absitzen");
            return false;
            // genug Truppen vorhanden?
        }
        else if ((toUnMount == this.troopCount)) {
            // neues Heer mit generierter Id an selben Koordinaten
            let newArmy = new footArmy_1.FootArmy(newArmyId, this.owner, toUnMount, this.officerCount, 0, 0, toUnMount, this.position, 0, this.heightPoints, this.isGuard);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
            gameState_1.GameState.armies.push(newArmy);
            if (this.multiArmyField === true) {
                multifieldFunctions_1.MultiFieldFunctions.addToMultifield(this, newArmy);
                // deleteFromMultifield(this);
            }
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toUnMount, leadersToUnMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            armyFunctions_1.ArmyFunctions.deleteArmy(this);
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
            // genug Heerführer?
        }
        else if (leadersToUnMount >= this.officerCount) {
            window.alert("Du hast zu wenige Heerführer zum absitzen");
            return false;
        }
        else if (this.isGuard) {
            window.alert("Die Garde muss zusammen bleiben");
            return false;
        }
        else {
            // neues Heer mit generierter Id an selben Koordinaten
            let newArmy = new footArmy_1.FootArmy(newArmyId, this.owner, toUnMount, leadersToUnMount, 0, 0, toUnMount, this.position, 0, this.heightPoints, false);
            if (this.getMovePoints() !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            // zahlen im alten Reiterheer anpassen
            this.setTroopCount(this.troopCount - toUnMount);
            this.setOfficerCount(this.officerCount - leadersToUnMount);
            // in GameState.armies einfügen
            gameState_1.GameState.armies.push(newArmy);
            if (this.multiArmyField === true) {
                multifieldFunctions_1.MultiFieldFunctions.addToMultifield(this, newArmy);
                // deleteFromMultifield(this);
            }
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toUnMount, leadersToUnMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            // armyIndex zeigt auf neues Heer
            controlVariables_1.Controls.selectedArmyIndex = gameState_1.GameState.armies.length - 1;
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
        }
    }
}
RiderArmy.MAX_MOVE_POINTS = 21;
exports.RiderArmy = RiderArmy;

},{"../constants":16,"../controls/controlVariables":18,"../events/mountEvent":23,"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../gui/multifieldFunctions":42,"../libraries/armyFunctions":48,"../libraries/hexFunctions":49,"./fleet":4,"./footArmy":5,"./landArmy":6}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const armyFunctions_1 = require("../libraries/armyFunctions");
var ShootingFunctions;
(function (ShootingFunctions) {
    function inflictRangedDamage(diceRollsLight, diceRollsHeavy, shooter, target, targetField, chars) {
        let charGpSum = 0;
        if (chars != undefined) {
            let cLen = chars.length;
            for (let i = 0; i < cLen; i++) {
                charGpSum += chars[i].gp;
            }
        }
        let damage = shooter.getLightCatapultDamage(diceRollsLight, shooter.checkShootingCondition(targetField, false)) +
            shooter.getHeavyCatapultDamage(diceRollsHeavy, shooter.checkShootingCondition(targetField, true));
        let allTargets = [];
        let sumAllBP = 0;
        if (target === 0 /* OnField */) {
            for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
                if (gameState_1.GameState.buildings[i].getPosition()[0] === targetField[0] &&
                    gameState_1.GameState.buildings[i].getPosition()[1] === targetField[1] &&
                    gameState_1.GameState.buildings[i].type < 5) {
                    //TODO building takes 2/3 damage
                    //building[i].takeFire(damage * (2/3));
                    damage = damage * (1 / 3);
                }
            }
            for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                if (gameState_1.GameState.armies[i].getPosition()[0] === targetField[0] &&
                    gameState_1.GameState.armies[i].getPosition()[1] === targetField[1]) {
                    allTargets.push(gameState_1.GameState.armies[i]);
                    sumAllBP += gameState_1.GameState.armies[i].totalBP();
                }
            }
            for (let i = 0; i < allTargets.length; i++) {
                //target may be a building. GameState.buildings need to have this funktion
                allTargets[i].takeBPDamage(damage / (1 + (allTargets[i].leaderGp() + charGpSum) / 100) *
                    (allTargets[i].totalBP() / sumAllBP));
            }
        }
        //TODO Wall Damage
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
    }
    ShootingFunctions.inflictRangedDamage = inflictRangedDamage;
})(ShootingFunctions = exports.ShootingFunctions || (exports.ShootingFunctions = {}));

},{"../gameState":28,"../libraries/armyFunctions":48}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEntity_1 = require("../map/mapEntity");
class Building extends mapEntity_1.MapEntity {
    constructor(type, position, owner) {
        super(position, owner);
        this.type = type;
    }
}
exports.Building = Building;

},{"../map/mapEntity":52}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
const constants_1 = require("../constants");
class DestructibleBuilding extends building_1.Building {
    constructor(type, position, owner, buildPoints) {
        super(type, position, owner);
        this.buildPoints = buildPoints;
    }
    getMaxBP() {
        switch (this.type) {
            case 0 /* CASTLE */: return constants_1.Constants.CASTLE_BP;
            case 1 /* CITY */: return constants_1.Constants.CITY_BP;
            case 2 /* FORTRESS */: return constants_1.Constants.FORTRESS_BP;
            case 3 /* CAPITAL */: return constants_1.Constants.CAPITAL_BP;
            case 4 /* CAPITAL_FORT */: return constants_1.Constants.CAPITAL_FORTRESS_BP;
            default: return 0;
        }
    }
    setBuildPoints(newBP) {
        this.buildPoints = Math.min(Math.max(0, newBP), this.getMaxBP());
    }
    getBuildPoints() {
        return this.buildPoints;
    }
}
exports.DestructibleBuilding = DestructibleBuilding;

},{"../constants":16,"./building":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
class NonDestructibleBuilding extends building_1.Building {
    constructor(type, position, secondPosition, owner) {
        super(type, position, owner);
        //as per Erkenfara rules all non-destructible buildings go over two fields
        this.secondPosition = [0, 0];
        this.secondPosition = secondPosition;
    }
    getSecondPosition() {
        return this.secondPosition;
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': this.secondPosition[0], 'secondY': this.secondPosition[0],
            'direction': undefined, 'guardCount': undefined, 'buildPoints': undefined };
    }
}
exports.NonDestructibleBuilding = NonDestructibleBuilding;

},{"./building":11}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destructibleBuilding_1 = require("./destructibleBuilding");
class ProductionBuilding extends destructibleBuilding_1.DestructibleBuilding {
    constructor(type, name, position, owner, buildPoints) {
        super(type, position, owner, buildPoints);
        this.name = name;
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': this.name, 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined, 'direction': undefined,
            'guardCount': undefined, 'buildPoints': this.buildPoints };
    }
    setName(newName) {
        this.name = newName;
    }
    getName() {
        return this.name;
    }
}
exports.ProductionBuilding = ProductionBuilding;

},{"./destructibleBuilding":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../map/direction");
const destructibleBuilding_1 = require("./destructibleBuilding");
const constants_1 = require("../constants");
const gameState_1 = require("../gameState");
class Wall extends destructibleBuilding_1.DestructibleBuilding {
    constructor(type, position, owner, buildPoints, facing, guardCount) {
        super(type, position, owner, buildPoints);
        this.facing = facing;
        this.guardCount = guardCount;
    }
    getMaxBP() {
        return constants_1.Constants.WALL_BP;
    }
    getGuardCount() {
        return this.guardCount;
    }
    setGuardCount(newCount) {
        this.guardCount = Math.min(Math.max(0, newCount), constants_1.Constants.WALL_MAX_GUARD);
        if (this.guardCount === 0) {
            gameState_1.GameState.buildings.splice(gameState_1.GameState.buildings.findIndex(building => building === this), 1);
        }
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined,
            'direction': direction_1.directionToString(this.facing), 'guardCount': this.guardCount, 'buildPoints': this.buildPoints };
    }
}
exports.Wall = Wall;

},{"../constants":16,"../gameState":28,"../map/direction":50,"./destructibleBuilding":12}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//This collects all the rule based "magic numbers" in addition to some useful mathematical constants.
var Constants;
(function (Constants) {
    Constants.SQRT3 = Math.sqrt(3); //about 1.732050808...
    Constants.SIN60 = 0.5 * Constants.SQRT3; //about 0.8660254037...
    Constants.OFFICER_RP = 100;
    Constants.SHIP_RP = 100;
    Constants.GUARD_RP_MULT = 3;
    Constants.LIGHT_WS_RP = 1000;
    Constants.HEAVY_WS_RP = 2000;
    Constants.SHIP_TRANSPORT_CAPACITY = 100;
    Constants.FOOTMAN_RP = 1;
    Constants.RIDER_RP = 2;
    Constants.LIGHT_CATA_RP = 1000;
    Constants.HEAVY_CATA_RP = 2000;
    Constants.MOUNT_RP = 1;
    Constants.FOOTMAN_BP = 0.1;
    Constants.MOUNT_BP = 0.1;
    Constants.RIDER_BP = 0.2;
    Constants.SHIP_BP = 10;
    Constants.LIGHT_CATA_BP = 200;
    Constants.HEAVY_CATA_BP = 400;
    Constants.LIGHT_WS_BP = 200;
    Constants.HEAVY_WS_BP = 400;
    Constants.CASTLE_BP = 1000;
    Constants.CITY_BP = 2000;
    Constants.FORTRESS_BP = 3000;
    Constants.CAPITAL_BP = 5000;
    Constants.CAPITAL_FORTRESS_BP = 6000;
    Constants.WALL_BP = 100;
    Constants.WALL_MAX_GUARD = 400;
    Constants.LIGHT_CATA_DAMAGE = [225, 200, 175, 150, 125, 100, 70, 40, 10, 5];
    Constants.HEAVY_CATA_DAMAGE_NEAR = [300, 270, 240, 210, 180, 150, 120, 90, 60, 30];
    Constants.HEAVY_CATA_DAMAGE_HIGH = [120, 100, 80, 65, 50, 40, 30, 10, 5, 0];
    Constants.HEAVY_CATA_DAMAGE_FARANDHIGH = [150, 120, 100, 80, 65, 50, 40, 30, 10, 5];
    Constants.HEAVY_CATA_DAMAGE_FAR = [150, 130, 110, 90, 70, 50, 30, 10, 5, 0];
    Constants.LIGHT_WS_DAMAGE = [175, 150, 125, 100, 75, 50, 25, 10, 5, 0];
    Constants.HEAVY_WS_DAMAGE_NEAR = [250, 220, 190, 160, 130, 100, 70, 40, 10, 5];
    Constants.HEAVY_WS_DAMAGE_HIGH = [100, 80, 65, 50, 40, 30, 10, 5, 0, 0];
    Constants.HEAVY_WS_DAMAGE_FARANDHIGH = [120, 100, 80, 65, 50, 40, 30, 10, 5, 0];
    Constants.HEAVY_WS_DAMAGE_FAR = [100, 80, 60, 40, 20, 10, 5, 0, 0, 0];
})(Constants = exports.Constants || (exports.Constants = {}));

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const savingFunctions_1 = require("../serverInteraction/savingFunctions");
const gameState_1 = require("../gameState");
const controlVariables_1 = require("./controlVariables");
const riderArmy_1 = require("../armies/riderArmy");
const footArmy_1 = require("../armies/footArmy");
const armyFunctions_1 = require("../libraries/armyFunctions");
const fleet_1 = require("../armies/fleet");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const shootingFunctions_1 = require("../armies/shootingFunctions");
const shootEvent_1 = require("../events/shootEvent");
const mergeEvent_1 = require("../events/mergeEvent");
const splitEvent_1 = require("../events/splitEvent");
const transferEvent_1 = require("../events/transferEvent");
var ButtonFunctions;
(function (ButtonFunctions) {
    var show = boxVisibilty_1.BoxVisibility.show;
    var hide = boxVisibilty_1.BoxVisibility.hide;
    function mainButton() {
        boxVisibilty_1.BoxVisibility.toggleVisibility(gui_1.GUI.getBigBox().getSelf());
    }
    ButtonFunctions.mainButton = mainButton;
    function toggleShootingMode() {
        if (boxVisibilty_1.BoxVisibility.shootingModeOn) {
            boxVisibilty_1.BoxVisibility.closeShootBox();
        }
        else if (!boxVisibilty_1.BoxVisibility.shootingModeOn) {
            boxVisibilty_1.BoxVisibility.switchModeTo("shootingModeOn");
            show(gui_1.GUI.getShootBox());
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].findShootingTargets();
            drawingFunctions_1.Drawing.drawStuff();
        }
    }
    ButtonFunctions.toggleShootingMode = toggleShootingMode;
    function activateSplitbox() {
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof footArmy_1.FootArmy) {
            show(gui_1.GUI.getSplitBox());
        }
        else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof riderArmy_1.RiderArmy) {
            show(gui_1.GUI.getSplitMountedBox());
        }
        else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof fleet_1.Fleet) {
            show(gui_1.GUI.getSplitFleetBox());
        }
        hide(gui_1.GUI.getInfoBox().getSelf());
    }
    ButtonFunctions.activateSplitbox = activateSplitbox;
    function nextTurn() {
        let message = "";
        if (gameState_1.GameState.currentTurn.realm == undefined) {
            message = "Do you want to end the pre-turn phase?";
        }
        else if (gameState_1.GameState.currentTurn.status === 'fi') {
            message = "Do you want to end processing the turn of " + gameState_1.GameState.currentTurn.realm + "?";
        }
        else if (gameState_1.GameState.login === 'sl') {
            message = "Do you want to end the turn of " + gameState_1.GameState.currentTurn.realm + "?";
        }
        else {
            message = "Do you want to end your turn?";
        }
        if (confirm(message)) {
            savingFunctions_1.Saving.sendEvents();
        }
    }
    ButtonFunctions.nextTurn = nextTurn;
    // the splitArmy funtion of the split box
    function splitSelectedArmy() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        if (gameState_1.GameState.login === 'sl' || gameState_1.GameState.login === selectedArmy.owner.tag) {
            try {
                let troopsToSplit = parseInt(gui_1.GUI.getSplitInput().value);
                let leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
                let mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
                let lightCatapultsToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
                let heavyCatapultsToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
                let newArmyId = -1;
                if (selectedArmy instanceof footArmy_1.FootArmy) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit) || isNaN(mountsToSplit) ||
                        isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))) {
                        newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(1, selectedArmy.owner);
                    }
                    else {
                        throw new Error("All values have to be a valid number.");
                    }
                }
                else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit))) {
                        lightCatapultsToSplit = 0;
                        heavyCatapultsToSplit = 0;
                        mountsToSplit = 0;
                        newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(2, selectedArmy.owner);
                    }
                    else {
                        throw new Error("Troops and leaders have to be a valid number.");
                    }
                }
                else if (selectedArmy instanceof fleet_1.Fleet) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit) ||
                        isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))) {
                        mountsToSplit = 0;
                        newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(3, selectedArmy.owner);
                    }
                    else {
                        throw new Error("All values have to be a valid number.");
                    }
                }
                else {
                    throw new Error("Unknown army type.");
                }
                selectedArmy.split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId);
                gameState_1.GameState.newEvents.push(new splitEvent_1.SplitEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, selectedArmy.getErkenfaraID(), newArmyId, selectedArmy.owner, troopsToSplit, leadersToSplit, mountsToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, selectedArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Man muss eingeloggt sein, um Armeen aufzusplaten.");
        }
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        drawingFunctions_1.Drawing.drawStuff();
    }
    ButtonFunctions.splitSelectedArmy = splitSelectedArmy;
    // the mount function of the mount box
    function mountSelected() {
        if (gui_1.GUI.getMountInput().value === "" || gui_1.GUI.getMountLeaderInput().value === "" ||
            gui_1.GUI.getMountInput().value == undefined || gui_1.GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toMount = parseInt(gui_1.GUI.getMountInput().value);
        let leadersToMount = parseInt(gui_1.GUI.getMountLeaderInput().value);
        if (isNaN(toMount) || isNaN(leadersToMount)) {
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].mount(toMount, leadersToMount);
    }
    ButtonFunctions.mountSelected = mountSelected;
    // the unMount function of the unMount box
    function unMountSelected() {
        if (gui_1.GUI.getUnMountInput().value === "" || gui_1.GUI.getMountLeaderInput().value === "" ||
            gui_1.GUI.getUnMountLeaderInput().value == undefined || gui_1.GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toUnMount = parseInt(gui_1.GUI.getUnMountInput().value);
        let leadersToUnMount = parseInt(gui_1.GUI.getUnMountLeaderInput().value);
        if (isNaN(toUnMount) || isNaN(leadersToUnMount)) {
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].dismount(toUnMount, leadersToUnMount);
    }
    ButtonFunctions.unMountSelected = unMountSelected;
    function allMountSelected() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        selectedArmy.mount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }
    ButtonFunctions.allMountSelected = allMountSelected;
    function allUnMountSelected() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        selectedArmy.dismount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }
    ButtonFunctions.allUnMountSelected = allUnMountSelected;
    // move troops or leaders from Controls.selectedArmyIndex to the army at position mergeId in GameState.armies
    function transferTroopsFromSelectedArmy(transferToId) {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        let armyToTransferTo = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === transferToId && army.owner === selectedArmy.owner);
        if (armyToTransferTo != undefined) {
            let troopsToTransfer = parseInt(gui_1.GUI.getSplitInput().value);
            let leadersToTransfer = parseInt(gui_1.GUI.getSplitLeadersInput().value);
            let mountsToTransfer = parseInt(gui_1.GUI.getSplitMountsInput().value);
            let lkpToTransfer = parseInt(gui_1.GUI.getSplitLkpInput().value);
            let skpToTransfer = parseInt(gui_1.GUI.getSplitSkpInput().value);
            if (isNaN(troopsToTransfer) || isNaN(leadersToTransfer)) {
                window.alert("Give a proper number of troops and officers to be transferred.");
                return;
            }
            else {
                if (selectedArmy instanceof riderArmy_1.RiderArmy || armyToTransferTo instanceof riderArmy_1.RiderArmy) {
                    mountsToTransfer = 0;
                    lkpToTransfer = 0;
                    skpToTransfer = 0;
                }
                else {
                    if (isNaN(lkpToTransfer) || isNaN(skpToTransfer)) {
                        window.alert("Give a proper number of catapults to be transferred.");
                        return;
                    }
                    else {
                        if (selectedArmy instanceof fleet_1.Fleet || armyToTransferTo instanceof fleet_1.Fleet) {
                            mountsToTransfer = 0;
                        }
                        else if (isNaN(mountsToTransfer)) {
                            window.alert("Give a proper number of mounts to be transferred.");
                            return;
                        }
                    }
                }
            }
            //All relevant input values are valid. Executing the actual transfer now.
            try {
                selectedArmy.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
                gameState_1.GameState.newEvents.push(new transferEvent_1.TransferEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, selectedArmy.getErkenfaraID(), armyToTransferTo.getErkenfaraID(), selectedArmy.owner, troopsToTransfer, leadersToTransfer, mountsToTransfer, lkpToTransfer, skpToTransfer, selectedArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Die Zielarmee existiert nicht.");
        }
    }
    ButtonFunctions.transferTroopsFromSelectedArmy = transferTroopsFromSelectedArmy;
    // merges selectedArmy with the army at position mergeId in GameState.armies
    function mergeSelectedArmy(fromArmyId) {
        let toArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === fromArmyId && army.owner === toArmy.owner);
        if (fromArmy != undefined) {
            try {
                toArmy.merge(fromArmy);
                gameState_1.GameState.newEvents.push(new mergeEvent_1.MergeEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, fromArmy.getErkenfaraID(), toArmy.getErkenfaraID(), toArmy.owner, toArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            drawingFunctions_1.Drawing.drawStuff();
        }
        else {
            window.alert("Army to be merged into selected army doesn't exist.");
        }
    }
    ButtonFunctions.mergeSelectedArmy = mergeSelectedArmy;
    //read the proper inputs, check validity and construct a shoot event
    function shootWithSelectedArmy() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        if (gameState_1.GameState.login === 'guest') {
            window.alert("Du musst eingeloggt sein um das zu tun.");
            return;
        }
        else if (gameState_1.GameState.login !== 'sl' && gameState_1.GameState.login !== selectedArmy.owner.tag) {
            window.alert("Du kannst nur mit deinen eigenen Armeen schießen.");
            return;
        }
        let lkpToShootCount = parseInt(gui_1.GUI.getShootingLKPInput().value);
        let skpToShootCount = parseInt(gui_1.GUI.getShootingSKPInput().value);
        if (isNaN(lkpToShootCount)) {
            lkpToShootCount = 0;
        }
        if (isNaN(skpToShootCount)) {
            skpToShootCount = 0;
        }
        if (lkpToShootCount === 0 && skpToShootCount === 0) {
            window.alert("Du muss mit mindestens einem Katapult schießen.");
            return;
        }
        if (controlVariables_1.Controls.selectedFields.length < 2) {
            window.alert("Wählen Sie ein Feld auf das Sie schießen wollen.");
            return;
        }
        let shootingTarget = controlVariables_1.Controls.shootingTarget;
        if (selectedArmy.targetList.length < 1) {
            window.alert("No available targets.");
            return;
        }
        else if (!selectedArmy.targetList.some(field => field[0] ===
            shootingTarget[0] && field[1] === shootingTarget[1])) {
            window.alert("Ungültiges Ziel.");
            return;
        }
        //TODO: Shoot at things other than the field (mainly the wall).
        let target = 0 /* OnField */;
        try {
            selectedArmy.shootAt(shootingTarget, target, lkpToShootCount, skpToShootCount);
        }
        catch (e) {
            window.alert(e.message);
        }
        gameState_1.GameState.newEvents.push(new shootEvent_1.ShootEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getID(), shootingTarget, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition(), lkpToShootCount, skpToShootCount, target));
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        window.alert("Die Geschosse sind unterwegs. Warte auf die Zugauswertung, um das Ergebnis zu erfahren!");
        drawingFunctions_1.Drawing.drawStuff();
    }
    ButtonFunctions.shootWithSelectedArmy = shootWithSelectedArmy;
    function shootButtonLogic(shootEvent) {
        let shootBox = gui_1.GUI.getShootingBigBox();
        let shooter = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === shootEvent.getShooterId() && army.owner === shootEvent.getRealm());
        let lkpRolls = [];
        let skpRolls = [];
        for (let i = 0; i < 10; i++) { //creating the dice roll array
            let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
            let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
            if (!isNaN(currentRollLKP) && currentRollLKP !== 0) {
                for (let j = 0; j < currentRollLKP; j++) {
                    lkpRolls.push(i);
                }
            }
            if (!isNaN(currentRollSKP) && currentRollSKP !== 0) {
                for (let j = 0; j < currentRollSKP; j++) {
                    skpRolls.push(i);
                }
            }
        }
        //TODO check target field
        if (lkpRolls.length < shootEvent.getLightCatapultCount()) {
            window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen.");
            return;
        }
        else if (skpRolls.length < shootEvent.getHeavyCatapultCount()) {
            window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen.");
            return;
        }
        else if (lkpRolls.length > shootEvent.getLightCatapultCount()) {
            window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen.");
            return;
        }
        else if (skpRolls.length > shootEvent.getHeavyCatapultCount()) {
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen.");
            return;
        }
        else if (shooter == undefined) {
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return;
        }
        else {
            shootingFunctions_1.ShootingFunctions.inflictRangedDamage(lkpRolls, skpRolls, shooter, shootEvent.getTarget(), shootEvent.getTo(), null);
            shooter.shootAt(shootEvent.getTo(), shootEvent.getTarget(), shootEvent.getLightCatapultCount(), shootEvent.getHeavyCatapultCount());
            // TODO chars
            boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
            shootEvent.setStatus(0 /* Checked */);
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
            return;
        }
    }
    ButtonFunctions.shootButtonLogic = shootButtonLogic;
})(ButtonFunctions = exports.ButtonFunctions || (exports.ButtonFunctions = {}));

},{"../armies/fleet":4,"../armies/footArmy":5,"../armies/riderArmy":9,"../armies/shootingFunctions":10,"../events/mergeEvent":22,"../events/shootEvent":25,"../events/splitEvent":26,"../events/transferEvent":27,"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../gui/gui":36,"../libraries/armyFunctions":48,"../serverInteraction/savingFunctions":58,"./controlVariables":18}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controls {
}
Controls.selectedFields = []; // list of fields to be highlighted
Controls.selectedArmyIndex = -1; // index of the currently selected army in the GameState.armies
Controls.scrollSpeed = 0.2; // increment to scroll with each step
Controls.changedFields = []; // Fields that were changes with World Builder
// boolean is true if added or changed, false if removed
Controls.changedBuildings = [];
Controls.leftMousePressed = false; // was the left mouse button clicked but not yet released?
Controls.rightMousePressed = false; // was the right mouse button clicked but not yet released?
Controls.isDragging = false; // was the mouse moved while the button is down?
//coordinate of the origin in respect to which all drawing is done
Controls.origin = [900, 490];
//coordinate of the point where the mouse was clicked
Controls.click = [0, 0];
//distance the mouse was dragged
Controls.move = [0, 0];
exports.Controls = Controls;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlVariables_1 = require("./controlVariables");
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const riderArmy_1 = require("../armies/riderArmy");
const hexFunctions_1 = require("../libraries/hexFunctions");
const footArmy_1 = require("../armies/footArmy");
const fleet_1 = require("../armies/fleet");
const field_1 = require("../map/field");
const moveEvent_1 = require("../events/moveEvent");
const battleEvent_1 = require("../events/battleEvent");
var MouseFunctions;
(function (MouseFunctions) {
    var armyIdBuffer = boxVisibilty_1.BoxVisibility.armyIdBuffer;
    var armyWithNextClick = boxVisibilty_1.BoxVisibility.armyWithNextClick;
    var switchBtnBoxTo = boxVisibilty_1.BoxVisibility.switchBtnBoxTo;
    var switchModeTo = boxVisibilty_1.BoxVisibility.switchModeTo;
    var worldCreationModeOnClick = boxVisibilty_1.BoxVisibility.worldCreationModeOnClick;
    var changeFieldToType = boxVisibilty_1.BoxVisibility.changeFieldToType;
    var shootingModeOn = boxVisibilty_1.BoxVisibility.shootingModeOn;
    var restoreInfoBox = boxVisibilty_1.BoxVisibility.restoreInfoBox;
    var updateInfoBox = boxVisibilty_1.BoxVisibility.updateInfoBox;
    function mouseDown(event) {
        if (event.button === 0) {
            controlVariables_1.Controls.leftMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[1] = event.pageY;
        }
        else if (event.button === 2) {
            controlVariables_1.Controls.rightMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[1] = event.pageY;
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseDown = mouseDown;
    function mouseUp(event) {
        if (controlVariables_1.Controls.leftMousePressed && event.button === 0) {
            if (controlVariables_1.Controls.isDragging) { // mouse was dragged; run panning finish routine
                // add the x offset from dragged mouse to the current x origin for drawing
                controlVariables_1.Controls.origin[0] += controlVariables_1.Controls.move[0];
                // add the y offset from dragged mouse to the current y origin for drawing
                controlVariables_1.Controls.origin[1] += controlVariables_1.Controls.move[1];
            }
            else {
                registerLeftClick(); // do whatever has to be done on leftclick
            }
            // reset mouse click parameters
            controlVariables_1.Controls.leftMousePressed = false; // mouse is no longer pressed
            controlVariables_1.Controls.isDragging = false; // mouse is no longer being dragged
            controlVariables_1.Controls.click = [0, 0]; // reset click registration
            controlVariables_1.Controls.move = [0, 0]; // reset move registration
        }
        else if (controlVariables_1.Controls.rightMousePressed && event.button === 2) {
            if (!controlVariables_1.Controls.isDragging) {
                registerRightClick();
            }
            // reset mouse click parameters
            controlVariables_1.Controls.rightMousePressed = false; // mouse is no longer pressed
            controlVariables_1.Controls.isDragging = false; // mouse is no longer being dragged
            controlVariables_1.Controls.click = [0, 0]; // reset click registration
            controlVariables_1.Controls.move = [0, 0]; // reset move registration
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseUp = mouseUp;
    function mouseMove(event) {
        if (controlVariables_1.Controls.leftMousePressed === true) {
            controlVariables_1.Controls.isDragging = true; // for later click detection; no click if mouse was previously dragged
            controlVariables_1.Controls.move[0] = event.pageX - controlVariables_1.Controls.click[0]; // compute the x offset from dragged mouse
            controlVariables_1.Controls.move[1] = event.pageY - controlVariables_1.Controls.click[1]; // compute the y offset from dragged mouse
            drawingFunctions_1.Drawing.drawStuff();
        }
    }
    MouseFunctions.mouseMove = mouseMove;
    function mouseWheel(event) {
        let deltaY = event.deltaY; // get amount scrolled
        let mouse = [event.pageX, event.pageY]; // get current mouse position
        // get the tile the mouse is currently in (and the position in the tile)
        let pos = [(mouse[0] - controlVariables_1.Controls.origin[0]) / drawingFunctions_1.Drawing.scale,
            (mouse[1] - controlVariables_1.Controls.origin[1]) / drawingFunctions_1.Drawing.scale];
        if (deltaY < 0) { // do the actuall scrolling
            drawingFunctions_1.Drawing.scale *= 1 + controlVariables_1.Controls.scrollSpeed;
        }
        else {
            drawingFunctions_1.Drawing.scale *= 1 - controlVariables_1.Controls.scrollSpeed;
        }
        drawingFunctions_1.Drawing.setHexParts(drawingFunctions_1.Drawing.scale); // compute the scale dependant values used for map drawing
        // compute the new distance of mouse from origin
        let newPos = [pos[0] * drawingFunctions_1.Drawing.scale, pos[1] * drawingFunctions_1.Drawing.scale];
        // move origin so that the tile stays the same  with the new scaling
        controlVariables_1.Controls.origin = [mouse[0] - newPos[0], mouse[1] - newPos[1]];
        drawingFunctions_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseWheel = mouseWheel;
    function registerLeftClick() {
        let clickedField = getClickedField(); // get selected field
        // If mount or unmount is activated, cancel it.
        if (armyWithNextClick) {
            let owner = gameState_1.GameState.realms.find(realm => realm.tag === boxVisibilty_1.BoxVisibility.ownerBuffer);
            if (owner == undefined) {
                throw new Error("Realm not found.");
            }
            switch (Math.floor(armyIdBuffer / 100)) {
                case 3:
                    gameState_1.GameState.armies.push(new fleet_1.Fleet(boxVisibilty_1.BoxVisibility.armyIdBuffer, owner, boxVisibilty_1.BoxVisibility.countBuffer, boxVisibilty_1.BoxVisibility.leaderBuffer, boxVisibilty_1.BoxVisibility.lkpBuffer, boxVisibilty_1.BoxVisibility.skpBuffer, clickedField, fleet_1.Fleet.MAX_MOVE_POINTS, boxVisibilty_1.BoxVisibility.guardBuffer));
                    break;
                case 2:
                    gameState_1.GameState.armies.push(new riderArmy_1.RiderArmy(boxVisibilty_1.BoxVisibility.armyIdBuffer, owner, boxVisibilty_1.BoxVisibility.countBuffer, boxVisibilty_1.BoxVisibility.leaderBuffer, clickedField, riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS, boxVisibilty_1.BoxVisibility.guardBuffer));
                    break;
                case 1:
                    gameState_1.GameState.armies.push(new footArmy_1.FootArmy(boxVisibilty_1.BoxVisibility.armyIdBuffer, owner, boxVisibilty_1.BoxVisibility.countBuffer, boxVisibilty_1.BoxVisibility.leaderBuffer, boxVisibilty_1.BoxVisibility.lkpBuffer, boxVisibilty_1.BoxVisibility.skpBuffer, boxVisibilty_1.BoxVisibility.mountsBuffer, clickedField, footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS, boxVisibilty_1.BoxVisibility.guardBuffer));
                    break;
            }
            boxVisibilty_1.BoxVisibility.ownerBuffer = gui_1.GUI.getArmyGeneratorBox().getOwnerField().value;
            boxVisibilty_1.BoxVisibility.armyIdBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getArmyNumberField().value = "0";
            boxVisibilty_1.BoxVisibility.countBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getCountField().value = "0";
            boxVisibilty_1.BoxVisibility.leaderBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getLeaderField().value = "0";
            boxVisibilty_1.BoxVisibility.mountsBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getMountsField().value = "0";
            boxVisibilty_1.BoxVisibility.lkpBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getLKPField().value = "0";
            boxVisibilty_1.BoxVisibility.skpBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getSKPField().value = "0";
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
            switchModeTo("none");
        }
        else if (worldCreationModeOnClick) {
            let posi = hexFunctions_1.HexFunction.positionInList(clickedField);
            if (changeFieldToType === -1) {
                // checks if Field should be changed to a specific type, if not use
                // normal world creation mode on click
                if (gameState_1.GameState.fields[posi].type === 8 || gameState_1.GameState.fields[posi].type === 9) {
                    gameState_1.GameState.fields[posi].type = 0;
                }
                else {
                    gameState_1.GameState.fields[posi].type++;
                }
            }
            else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
                gameState_1.GameState.fields[posi].type = changeFieldToType;
            }
            let found = false;
            for (let i = 0; i < controlVariables_1.Controls.changedFields.length; i++) {
                if ((controlVariables_1.Controls.changedFields[i].coordinates[0] === gameState_1.GameState.fields[posi].coordinates[0]) &&
                    (controlVariables_1.Controls.changedFields[i].coordinates[1] === gameState_1.GameState.fields[posi].coordinates[1])) {
                    controlVariables_1.Controls.changedFields[i].type = gameState_1.GameState.fields[posi].type;
                    found = true;
                }
            }
            if (!found) {
                controlVariables_1.Controls.changedFields.push(new field_1.Field(gameState_1.GameState.fields[posi].coordinates, gameState_1.GameState.fields[posi].type));
            }
        }
        else {
            // Feldauswahl
            let index = -1;
            let sf = controlVariables_1.Controls.selectedFields[0];
            if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
                controlVariables_1.Controls.selectedFields = [];
            }
            else {
                controlVariables_1.Controls.selectedFields[0] = clickedField;
            }
            // Armeeauswahl
            restoreInfoBox();
            controlVariables_1.Controls.selectedArmyIndex = -1;
            let possibleSelections = [];
            gameState_1.GameState.armies.forEach((army, index) => {
                if (army.getPosition()[0] === clickedField[0] && army.getPosition()[1] === clickedField[1]) {
                    possibleSelections.push(index);
                    controlVariables_1.Controls.selectedArmyIndex = index;
                }
            });
            if (document.getElementById("btnSection") != undefined) {
                let d = gui_1.GUI.getButtonsBox();
                d.removeChild(document.getElementById("btnSection"));
            }
            if (possibleSelections.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "btnSection");
                for (let i = 0; i < possibleSelections.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = gameState_1.GameState.armies[possibleSelections[i]].getErkenfaraID() + " " +
                        gameState_1.GameState.armies[possibleSelections[i]].owner.tag;
                    let t = document.createTextNode("" + gameState_1.GameState.armies[possibleSelections[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let idToSearchFor = this.name.split(" ")[0];
                        let ownerToSearchFor = this.name.split(" ")[1];
                        for (let j = 0; j < gameState_1.GameState.armies.length; j++) {
                            if (gameState_1.GameState.armies[j].getErkenfaraID() === parseInt(idToSearchFor) &&
                                gameState_1.GameState.armies[j].owner.tag === ownerToSearchFor) {
                                controlVariables_1.Controls.selectedArmyIndex = j;
                            }
                        }
                        updateInfoBox();
                        restoreInfoBox();
                        if (controlVariables_1.Controls.selectedArmyIndex !== undefined) {
                            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].clickedMoves();
                        }
                        drawingFunctions_1.Drawing.drawStuff();
                    });
                    x.appendChild(btn);
                }
                gui_1.GUI.getButtonsBox().appendChild(x);
            }
            updateInfoBox();
            if (controlVariables_1.Controls.selectedArmyIndex !== undefined) {
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].clickedMoves();
            }
        }
    }
    function registerRightClick() {
        let clickedField = getClickedField();
        if (worldCreationModeOnClick) {
            let posi = hexFunctions_1.HexFunction.positionInList(clickedField);
            if (changeFieldToType == -1) {
                // checks if Field should be changed to a specific type (then
                // rightclick is disabled)
                if (gameState_1.GameState.fields[posi].type === 0 || gameState_1.GameState.fields[posi].type === 9) {
                    gameState_1.GameState.fields[posi].type = 8;
                }
                else {
                    gameState_1.GameState.fields[posi].type--;
                }
                let found = false;
                for (let i = 0; i < controlVariables_1.Controls.changedFields.length; i++) {
                    if ((controlVariables_1.Controls.changedFields[i].coordinates[0] == gameState_1.GameState.fields[posi].coordinates[0]) &&
                        (controlVariables_1.Controls.changedFields[i].coordinates[1] == gameState_1.GameState.fields[posi].coordinates[1])) {
                        controlVariables_1.Controls.changedFields[i].type = gameState_1.GameState.fields[posi].type;
                        found = true;
                    }
                }
                if (!found) {
                    controlVariables_1.Controls.changedFields.push(new field_1.Field(gameState_1.GameState.fields[posi].coordinates, gameState_1.GameState.fields[posi].type));
                }
            }
        }
        else if (shootingModeOn) {
            //for shooting the bastards
            controlVariables_1.Controls.shootingTarget = clickedField;
        }
        else {
            if (controlVariables_1.Controls.selectedArmyIndex === undefined) {
                console.log("Can't move with no army selected");
            }
            else {
                let clickedArmy = [gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[0],
                    gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[1]];
                let localNeighbors = hexFunctions_1.HexFunction.neighbors(clickedArmy);
                for (let i = 0; i < localNeighbors.length; i++) {
                    if (localNeighbors[i][0] === clickedField[0] && localNeighbors[i][1] === clickedField[1]) {
                        let moveSuccessfull = true;
                        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner.tag === gameState_1.GameState.login || gameState_1.GameState.login === "sl") {
                            try {
                                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].move(i);
                            }
                            catch (e) {
                                console.log(e);
                                moveSuccessfull = false;
                            }
                        }
                        else {
                            console.log("Can only move your own armies.");
                        }
                        if (moveSuccessfull) {
                            gameState_1.GameState.newEvents.push(new moveEvent_1.MoveEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getErkenfaraID(), clickedArmy, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()));
                            let battlePossible = false;
                            let participants = [];
                            for (let j = 0; j < gameState_1.GameState.armies.length; j++) {
                                let someArmy = gameState_1.GameState.armies[j];
                                if (someArmy.getPosition()[0] === gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[0] &&
                                    someArmy.getPosition()[1] === gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[1]
                                    && someArmy !== gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex]) {
                                    participants.push({ id: someArmy.getErkenfaraID(), realm: someArmy.owner.tag });
                                    //in case they are enemies
                                    if (someArmy.owner !== gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner) {
                                        battlePossible = true;
                                    }
                                    //MultipleArmies - even if not friendly
                                    //5 cases
                                    //1. move to create multifield
                                    //2. move to existing multifield
                                    //3. move from multi and leaving regular field
                                    //4. move from multi but still multifield left
                                    //5. move from multi to multi
                                }
                            }
                            if (battlePossible) {
                                let inserted = false;
                                participants.push({ id: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getErkenfaraID(),
                                    realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner.tag });
                                for (let j = 0; j < gameState_1.GameState.newEvents.length; j++) {
                                    let newEvent = gameState_1.GameState.newEvents[j];
                                    if (gameState_1.GameState.newEvents[j] instanceof battleEvent_1.BattleEvent &&
                                        newEvent.getPosition() === gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()) {
                                        newEvent.addParticipants(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getErkenfaraID(), gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner.tag);
                                        inserted = true;
                                    }
                                }
                                if (!inserted) {
                                    gameState_1.GameState.newEvents.push(new battleEvent_1.BattleEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, participants, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()));
                                }
                            }
                            else { //no battle -> conquer land (TODO: diplomacy goes here)
                                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].conquer();
                            }
                        }
                    }
                }
                updateInfoBox();
            }
        }
    }
    function getClickedField() {
        let x = controlVariables_1.Controls.click[0] - controlVariables_1.Controls.origin[0]; // reverse our x/y origin offset
        let y = controlVariables_1.Controls.click[1] - controlVariables_1.Controls.origin[1];
        let m = drawingFunctions_1.Drawing.c / (drawingFunctions_1.Drawing.gW * 0.5); // the inclination of the hexes upper triangle side
        let row = Math.floor(y / drawingFunctions_1.Drawing.gH); // get the rectangle clicked in
        let rowIsOdd = (row % 2 !== 0);
        let column = Math.floor((rowIsOdd ? ((x + 0.5 * drawingFunctions_1.Drawing.gW) / drawingFunctions_1.Drawing.gW) : (x / drawingFunctions_1.Drawing.gW)));
        let relY = y - (row * drawingFunctions_1.Drawing.gH); // compute relative position of the click in
        // respect to the rectangle
        let relX = rowIsOdd ? ((x + 0.5 * drawingFunctions_1.Drawing.gW) - (column * drawingFunctions_1.Drawing.gW)) : (x - (column * drawingFunctions_1.Drawing.gW));
        if (relY < (-m) * relX + drawingFunctions_1.Drawing.c) { // click is in upper left corner
            row--;
            if (rowIsOdd) {
                column--;
            }
        }
        else if (relY < m * relX - drawingFunctions_1.Drawing.c) { // click is in upper right corner
            row--;
            if (!rowIsOdd) {
                column++;
            }
        }
        return [column, row]; // return result
    }
})(MouseFunctions = exports.MouseFunctions || (exports.MouseFunctions = {}));

},{"../armies/fleet":4,"../armies/footArmy":5,"../armies/riderArmy":9,"../events/battleEvent":20,"../events/moveEvent":24,"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../gui/gui":36,"../libraries/hexFunctions":49,"../map/field":51,"./controlVariables":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
class BattleEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, participants, position, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.participants = participants;
        this.position = position;
    }
    typeAsString() {
        return "battle";
    }
    getContent() {
        return "{'x': " + this.position[0] + ", 'y': " + this.position[1] +
            ", 'participants': [" + this.participants.map(participant => "{'armyId': " + participant.id + ", 'realm': " + participant.realm + "}").reduce((total, current) => total + current, "") + "]}";
    }
    getPosition() {
        return [this.position[0], this.position[1]];
    }
    getParticipants() {
        return this.participants;
    }
    addParticipants(id, realm) {
        this.participants.push({ id, realm });
    }
    validGameState() {
        //Every participating army exists and is located at the position of the battle.
        return this.participants.every(participant => gameState_1.GameState.armies.some(army => army.getErkenfaraID() === participant.id &&
            army.owner.tag === participant.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]));
    }
    checkEvent() {
        let battleBox = gui_1.GUI.getBattleBox();
        boxVisibilty_1.BoxVisibility.show(battleBox.getSelf());
        let participatingArmies = [];
        this.participants.forEach(participant => {
            let army = gameState_1.GameState.armies.find(candidate => {
                return (participant.realm === candidate.owner.tag && (participant.id === candidate.getErkenfaraID()));
            });
            if (army != undefined) {
                participatingArmies.push(army);
            }
            else {
                throw new Error("A participating army is missing.");
            }
        });
        battleBox.newBattle(participatingArmies, this.position);
        battleBox.getAttackDiceRoll().onchange = function () { battleBox.updateDisplay(); };
        battleBox.getDefenseDiceRoll().onchange = function () { battleBox.updateDisplay(); };
        let battleButton = gui_1.GUI.getBattleBox().getBattleButton();
        battleButton.addEventListener("click", (e) => this.battleButtonLogic(battleBox));
        battleButton.disabled = true;
        battleButton.style.cursor = "not-allowed";
        gui_1.GUI.getBattleBox().getCloseBattleButton().onclick = function () {
            boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
        };
    }
    makeEventListItemText() {
        let result = "Battle at (" + this.position[0] + ", " + this.position[1] + ") involving";
        for (let j = 0; j < this.participants.length; j++) {
            result += " [" + this.participants[j].realm + " " + this.participants[j].id + "]";
        }
        return result;
    }
    battleButtonLogic(battleBox) {
        battleBox.battleHandler.resolve(parseInt(battleBox.getAttackDiceRoll().value), parseInt(battleBox.getDefenseDiceRoll().value));
        boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
}
exports.BattleEvent = BattleEvent;

},{"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../gui/gui":36,"./event":21}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
class PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, databasePrimaryKey) {
        this.listPosition = listPosition;
        this.status = status;
        this.prerequisiteEvents = prerequisiteEvents;
        this.databasePrimaryKey = databasePrimaryKey;
    }
    asStringifiedJSON() {
        return JSON.stringify({ 'type': this.typeAsString(), 'content': JSON.parse(this.getContent()) });
    }
    asJSON() {
        return JSON.parse(this.asStringifiedJSON());
    }
    determineEventStatus() {
        if (this.validGameState() && this.prerequisiteEvents.every(prereqEvent => gameState_1.GameState.loadedEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
            (event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */)))) {
            //The event is available if the GM has attended to all prerequisite events and the board state allows it.
            this.status = 4 /* Available */;
        }
        else if (!this.validGameState() && this.prerequisiteEvents.every(prereqEvent => gameState_1.GameState.loadedEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
            (event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */)))) {
            //The event is not available because the board state doesn't allow it and it won't become available in the
            //future because all prerequisite events have been attended to by the GM. The GM has to manually fix the
            //board state to make the event available or delete it.
            this.status = 2 /* Impossible */;
        }
        else {
            //The event is not available but might become available in the future because the board state doesn't allow
            //it but some prerequisite events haven't been attended to by a GM yet and they might fix the board state.
            this.status = 3 /* Withheld */;
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.listPosition;
        eli.innerHTML = "<div>" + this.makeEventListItemText() + "</div>";
        let deleteButton = document.createElement("BUTTON");
        deleteButton.id = "delBtn" + this.listPosition;
        deleteButton.classList.add("eventListButton");
        deleteButton.classList.add("eventListDeleteButton");
        deleteButton.addEventListener("click", (e) => this.deleteEvent());
        let checkButton = document.createElement("BUTTON");
        checkButton.id = "checkBtn" + this.listPosition;
        checkButton.classList.add("eventListButton");
        checkButton.classList.add("eventListCheckButton");
        checkButton.addEventListener("click", (e) => this.checkEvent());
        eli.appendChild(deleteButton);
        eli.appendChild(checkButton);
        if (this.status === 0 /* Checked */) {
            eli.classList.add("checkedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        }
        else if (this.status === 1 /* Deleted */) {
            eli.classList.add("deletedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        }
        else if (this.status === 2 /* Impossible */) {
            eli.classList.add("impossibleELI");
            checkButton.disabled = true;
        }
        else if (this.status === 3 /* Withheld */) {
            eli.classList.add("withheldELI");
            checkButton.disabled = true;
        }
        else if (this.status === 4 /* Available */) {
            eli.classList.add("availableELI");
        }
        return eli;
    }
    deleteEvent() {
        this.status = 1 /* Deleted */;
        gui_1.GUI.getBigBox().fillEventList();
    }
    getListPosition() {
        return this.listPosition;
    }
    setListPosition(newPosition) {
        this.listPosition = newPosition;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getDatabasePrimaryKey() {
        return this.databasePrimaryKey;
    }
}
exports.PhoenixEvent = PhoenixEvent;

},{"../gameState":28,"../gui/gui":36}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
class MergeEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, toArmyId, realm, position, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.toArmyId = toArmyId;
        this.realm = realm;
        this.position = position;
    }
    typeAsString() {
        return "merge";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId + ", 'toArmy', " +
            this.toArmyId + "'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //Both armies exist and are in position.
        let ownArmiesOnCorrectField = gameState_1.GameState.armies.filter(army => army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        return ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.fromArmyId) &&
            ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.toArmyId);
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm);
        if (fromArmy != undefined && toArmy != undefined) {
            toArmy.merge(fromArmy);
        }
        else {
            throw new Error("One of the armies to be merged does not exist.");
        }
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " merges with army " + this.toArmyId + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MergeEvent = MergeEvent;

},{"../gameState":28,"../gui/drawingFunctions":34,"../gui/gui":36,"./event":21}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const riderArmy_1 = require("../armies/riderArmy");
const footArmy_1 = require("../armies/footArmy");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class MountEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, newArmyId, realm, troops, leaders, position, prerequisiteEvents, databasePrimaryKey) {
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.newArmyId = newArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.position = position;
    }
    typeAsString() {
        return "mount/dismount";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId +
            ", 'newArmy': " + this.newArmyId + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //The from-army exists and is in position.
        let fromArmy = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy == undefined) {
            return false;
        }
        //The new army doesn't yet exist.
        if (gameState_1.GameState.armies.some(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.newArmyId)) {
            return false;
        }
        if (fromArmy instanceof footArmy_1.FootArmy) { //Mount case
            //There are enough troops, officers and mounts. No check for viability of the remaining army is made since
            //abandoning a few stragglers or the catapults is not prohibited by the rules.
            if (fromArmy.getTroopCount() < this.troops ||
                fromArmy.getOfficerCount() < this.leaders ||
                fromArmy.getMountCount() < this.troops) {
                return false;
            }
        }
        else { //Dismount case
            //There are enough troops and officers. No check for viability of the remaining army is made since
            //abandoning a few stragglers in not prohibited by the rules.
            if (fromArmy.getTroopCount() < this.troops || fromArmy.getOfficerCount() < this.leaders) {
                return false;
            }
        }
        return true;
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined) {
            if (fromArmy instanceof footArmy_1.FootArmy) {
                fromArmy.mount(this.troops, this.leaders, this.newArmyId);
            }
            else if (fromArmy instanceof riderArmy_1.RiderArmy) {
                fromArmy.dismount(this.troops, this.leaders, this.newArmyId);
            }
            else {
                throw new Error("Army to mount/dismount from was neither a foot army nor a rider army.");
            }
            this.status = 0 /* Checked */;
            armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
        }
        else {
            throw new Error("Army to mount/dismount from does not exist or isn't in position.");
        }
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " mounts " + this.troops + " troops, and " +
            this.leaders + " leaders to " + this.newArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MountEvent = MountEvent;

},{"../armies/footArmy":5,"../armies/riderArmy":9,"../gameState":28,"../gui/drawingFunctions":34,"../gui/gui":36,"../libraries/armyFunctions":48,"./event":21}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
const battleEvent_1 = require("./battleEvent");
class MoveEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, realm, armyId, from, to, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.realm = realm;
        this.armyId = armyId;
        this.from = from;
        this.to = to;
    }
    typeAsString() {
        return "move";
    }
    getContent() {
        return "{'armyId': " + this.armyId + ", 'realm': " + this.realm.tag +
            ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
            ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] + "}";
    }
    validGameState() {
        //The army exists, is positioned on the from-field and the army can move to the to-field.
        let army = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if (army != undefined) {
            try {
                army.checkForPossibleMove(hexFunctions_1.HexFunction.getDirectionToNeighbor(this.from, this.to));
            }
            catch (e) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    checkEvent() {
        let army = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if (army != undefined) {
            let direction = hexFunctions_1.HexFunction.getDirectionToNeighbor(this.from, this.to);
            army.checkForPossibleMove(direction);
            army.move(direction);
            if (!gameState_1.GameState.loadedEvents.some(event => (event instanceof battleEvent_1.BattleEvent) &&
                !(event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */) &&
                event.getPosition()[0] === this.to[0] &&
                event.getPosition()[1] === this.to[1] &&
                event.getParticipants().some(participant => army.getErkenfaraID() === participant.id &&
                    army.owner.tag === participant.realm))) {
                army.conquer();
            }
            this.status = 0 /* Checked */;
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
        }
        else {
            window.alert("Army not found.");
        }
    }
    makeEventListItemText() {
        return "Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " + this.from[1] +
            ") to (" + this.to[0] + ", " + this.to[1] + ")";
    }
}
exports.MoveEvent = MoveEvent;

},{"../gameState":28,"../gui/drawingFunctions":34,"../gui/gui":36,"../libraries/hexFunctions":49,"./battleEvent":20,"./event":21}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
const buttonFunctions_1 = require("../controls/buttonFunctions");
class ShootEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, realm, shooterId, to, from, lkpCount, skpCount, target, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.realm = realm;
        this.shooterId = shooterId;
        this.to = to;
        this.from = from;
        this.lkpCount = lkpCount;
        this.skpCount = skpCount;
        this.target = target;
    }
    typeAsString() {
        return "shoot";
    }
    getContent() {
        return "{'armyId': " + this.shooterId + ", 'realm': " + this.realm.tag +
            ", 'LKPcount': " + this.lkpCount + ", 'SKPcount': " + this.skpCount +
            ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
            ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] +
            ", 'target': " + (this.target === 0 /* OnField */) ? "on field" : "wall" + "}";
    }
    validGameState() {
        //Shooter exists, is positioned on the from-field, has enough catapults and the target is valid
        let shooter = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.shooterId &&
            army.getPosition()[0] === this.from[0] &&
            army.getPosition()[1] === this.from[1]);
        if (shooter != undefined) {
            shooter.findShootingTargets();
            return (shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() >= this.lkpCount) &&
                (shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() >= this.skpCount) &&
                shooter.targetList.some(target => target[0] === this.to[0] && target[1] === this.to[1]);
        }
        else {
            return false;
        }
    }
    getLightCatapultCount() {
        return this.lkpCount;
    }
    getHeavyCatapultCount() {
        return this.skpCount;
    }
    getTo() {
        return this.to;
    }
    getTarget() {
        return this.target;
    }
    getShooterId() {
        return this.shooterId;
    }
    getRealm() {
        return this.realm;
    }
    checkEvent() {
        let shootBox = gui_1.GUI.getShootingBigBox();
        boxVisibilty_1.BoxVisibility.show(shootBox.getSelf());
        shootBox.getShooterTitleText().innerHTML = this.shooterId + ", " + this.realm.tag;
        ;
        shootBox.getAttackersLKPText().innerHTML = this.lkpCount.toString();
        shootBox.getAttackersSKPText().innerHTML = this.skpCount.toString();
        shootBox.getTargetText().innerHTML = this.target === 0 /* OnField */ ? "On Field" : "Wall";
        shootBox.getXTargetText().innerHTML = this.to[0].toString();
        shootBox.getYTargetText().innerHTML = this.to[1].toString();
        let shootButton = shootBox.getRangedBattleButton();
        shootButton.addEventListener("click", (e) => buttonFunctions_1.ButtonFunctions.shootButtonLogic(this));
        shootBox.getCloseRangedBattleButton().onclick = function () {
            boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
        };
        gui_1.GUI.getBigBox().fillEventList();
        //sendCheckEvent(event.pk, event.type);
        drawingFunctions_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.shooterId + " shoots a Field (" + this.to[0] + ", " + this.to[1] + ") with " +
            this.lkpCount + " LKP and " + this.skpCount + " SKP";
    }
}
exports.ShootEvent = ShootEvent;

},{"../controls/buttonFunctions":17,"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../gui/gui":36,"./event":21}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class SplitEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, newArmyId, realm, troops, leaders, mounts, lkp, skp, position, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.newArmyId = newArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.position = position;
    }
    typeAsString() {
        return "split";
    }
    getContent() {
        return "{'fromArmyId': " + this.fromArmyId + ", 'newArmyId': " + this.newArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //The from-army exists and is in position.
        let fromArmy = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy == undefined) {
            return false;
        }
        //The new army doesn't yet exist.
        if (gameState_1.GameState.armies.some(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.newArmyId)) {
            return false;
        }
        //There are enough troops, officers, catapults and if at least one mount has to be split, there are enough of
        //those and army to be split from is a foot army. No check for viability of the remaining army is made since
        //abandoning a few stragglers or the catapults is not prohibited by the rules.
        return this.troops <= fromArmy.getTroopCount() &&
            this.leaders <= fromArmy.getOfficerCount() &&
            this.lkp <= fromArmy.getLightCatapultCount() &&
            this.skp <= fromArmy.getHeavyCatapultCount() &&
            ((this.mounts > 0 && fromArmy instanceof footArmy_1.FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }
    checkEvent() {
        let armyToSplitFrom = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId &&
            army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (armyToSplitFrom != undefined) {
            try {
                armyToSplitFrom.split(this.troops, this.leaders, this.lkp, this.skp, this.mounts, this.newArmyId);
                this.status = 0 /* Checked */;
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        // TODO: detailed explanation
        let result = "" + this.realm.tag + "'s army " + this.fromArmyId + " splits off army " +
            this.newArmyId + " with ";
        if (this.troops !== 0) {
            result += this.troops + " troops, ";
        }
        if (this.leaders !== 0) {
            result += this.leaders + " leaders, ";
        }
        if (this.mounts !== 0) {
            result += this.mounts + " mounts, ";
        }
        if (this.lkp !== 0) {
            result += this.lkp + " lkp, ";
        }
        if (this.skp !== 0) {
            result += this.skp + " skp ";
        }
        return result + "in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.SplitEvent = SplitEvent;

},{"../armies/footArmy":5,"../gameState":28,"../gui/drawingFunctions":34,"../gui/gui":36,"../libraries/armyFunctions":48,"./event":21}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class TransferEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, toArmyId, realm, troops, leaders, mounts, lkp, skp, position, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.toArmyId = toArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.position = position;
    }
    typeAsString() {
        return "transfer";
    }
    getContent() {
        return "{'fromArmyId': " + this.fromArmyId + ", 'toArmyId': " + this.toArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        //Both armies exist, are in position and have the same type.
        //There are enough troops, officers, catapults and if at least one mount has to be split, there are enough
        //of those and army to be split from is a foot army. No check for viability of the remaining army is made
        //since abandoning a few stragglers or the catapults is not prohibited by the rules.
        return fromArmy != undefined &&
            toArmy != undefined &&
            fromArmy.constructor === toArmy.constructor &&
            this.troops <= fromArmy.getTroopCount() &&
            this.leaders <= fromArmy.getOfficerCount() &&
            this.lkp <= fromArmy.getLightCatapultCount() &&
            this.skp <= fromArmy.getHeavyCatapultCount() &&
            ((this.mounts > 0 && fromArmy instanceof footArmy_1.FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined && toArmy != undefined) {
            try {
                fromArmy.transferTo(toArmy, this.troops, this.leaders, this.lkp, this.skp, this.mounts);
                this.status = 0 /* Checked */;
                armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
                gui_1.GUI.getBigBox().fillEventList();
                drawingFunctions_1.Drawing.drawStuff();
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Army to be transferred to of from does not exist.");
        }
    }
    makeEventListItemText() {
        let result = "" + this.realm.tag + "'s army " + this.fromArmyId + " transfers ";
        if (this.troops !== 0) {
            result += this.troops + " troops, ";
        }
        if (this.leaders !== 0) {
            result += this.leaders + " leaders, ";
        }
        if (this.mounts !== 0) {
            result += this.mounts + " mounts, ";
        }
        if (this.lkp !== 0) {
            result += this.lkp + " lkp, ";
        }
        if (this.skp !== 0) {
            result += this.skp + " skp ";
        }
        return result + "to " + this.toArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.TransferEvent = TransferEvent;

},{"../armies/footArmy":5,"../gameState":28,"../gui/drawingFunctions":34,"../gui/gui":36,"../libraries/armyFunctions":48,"./event":21}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameState {
    static reset() {
        this.realms = [];
        this.fields = [];
        this.rivers = [];
        this.armies = [];
        this.buildings = [];
        this.newEvents = [];
        this.loadedEvents = [];
        this.login = "guest";
        this.currentTurn = { 'turn': 0, 'realm': "sl", 'status': "st" };
    }
}
GameState.realms = [];
GameState.fields = [];
GameState.rivers = [];
GameState.armies = [];
GameState.buildings = [];
GameState.newEvents = [];
GameState.loadedEvents = [];
GameState.login = "guest"; // either realm tag, "sl", or "guest"
//"st" for start, "fi" for finished
GameState.currentTurn = { 'turn': 0, 'realm': "sl", 'status': "st" };
exports.GameState = GameState;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmyGeneratorBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("armyGeneratorBox");
        }
        return this.self;
    }
    getOwnerField() {
        if (this.ownerField == undefined) {
            this.ownerField = document.getElementById("ownerField");
        }
        return this.ownerField;
    }
    getArmyNumberField() {
        if (this.armyNumberField == undefined) {
            this.armyNumberField = document.getElementById("armyNumberField");
        }
        return this.armyNumberField;
    }
    getCountField() {
        if (this.countField == undefined) {
            this.countField = document.getElementById("countField");
        }
        return this.countField;
    }
    getLeaderField() {
        if (this.leaderField == undefined) {
            this.leaderField = document.getElementById("leaderField");
        }
        return this.leaderField;
    }
    getMountsField() {
        if (this.mountsField == undefined) {
            this.mountsField = document.getElementById("mountsField");
        }
        return this.mountsField;
    }
    getLKPField() {
        if (this.lkpField == undefined) {
            this.lkpField = document.getElementById("lkpField");
        }
        return this.lkpField;
    }
    getSKPField() {
        if (this.skpField == undefined) {
            this.skpField = document.getElementById("skpField");
        }
        return this.skpField;
    }
    getGuardField() {
        if (this.guardField == undefined) {
            this.guardField = document.getElementById("guardField");
        }
        return this.guardField;
    }
    getGenerateArmyBtn() {
        if (this.generateArmyBtn == undefined) {
            this.generateArmyBtn = document.getElementById("GenerateArmyBtn");
        }
        return this.generateArmyBtn;
    }
}
exports.ArmyGeneratorBox = ArmyGeneratorBox;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleHandler_1 = require("../armies/battleHandler");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
class BattleBox {
    constructor() {
        this.attackSoldiers = 0;
        this.attackOfficers = 0;
        this.attackRiders = 0;
        this.attackGuardSoldiers = 0;
        this.attackGuardRiders = 0;
        this.attackShips = 0;
        this.attackLightWarships = 0;
        this.attackHeavyWarships = 0;
        this.attackGuardShips = 0;
        this.defenseSoldiers = 0;
        this.defenseOfficers = 0;
        this.defenseRiders = 0;
        this.defenseGuardSoldiers = 0;
        this.defenseGuardRiders = 0;
        this.defenseShips = 0;
        this.defenseLightWarships = 0;
        this.defenseHeavyWarships = 0;
        this.defenseGuardShips = 0;
    }
    newBattle(participants, location) {
        this.battleHandler = new battleHandler_1.BattleHandler(participants, location);
        this.updateTroopCounts();
        this.updateDisplay();
    }
    moveToAttack(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.unsortedArmies.splice(i, 1);
            ctx.battleHandler.attackerArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    moveToDefense(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.unsortedArmies.splice(i, 1);
            ctx.battleHandler.defenderArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    removeFromDefense(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.defenderArmies.splice(i, 1);
            ctx.battleHandler.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    removeFromAttack(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.attackerArmies.splice(i, 1);
            ctx.battleHandler.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    updateTroopCounts() {
        this.attackSoldiers = 0;
        this.attackOfficers = 0;
        this.attackRiders = 0;
        this.attackGuardSoldiers = 0;
        this.attackGuardRiders = 0;
        this.attackShips = 0;
        this.attackLightWarships = 0;
        this.attackHeavyWarships = 0;
        this.attackGuardShips = 0;
        this.defenseSoldiers = 0;
        this.defenseOfficers = 0;
        this.defenseRiders = 0;
        this.defenseGuardSoldiers = 0;
        this.defenseGuardRiders = 0;
        this.defenseShips = 0;
        this.defenseLightWarships = 0;
        this.defenseHeavyWarships = 0;
        this.defenseGuardShips = 0;
        let ctx = this;
        this.battleHandler.attackerArmies.forEach(function (item) {
            if (item instanceof footArmy_1.FootArmy) { //footman army
                if (item.isGuard) {
                    ctx.attackGuardSoldiers += item.getTroopCount();
                }
                else {
                    ctx.attackSoldiers += item.getTroopCount();
                }
            }
            else if (item instanceof riderArmy_1.RiderArmy) { //rider army
                if (item.isGuard) {
                    ctx.attackGuardRiders += item.getTroopCount();
                }
                else {
                    ctx.attackRiders += item.getTroopCount();
                }
            }
            else if (item instanceof fleet_1.Fleet) { //navy
                if (item.isGuard) {
                    ctx.attackGuardShips += item.getTroopCount();
                }
                else {
                    ctx.attackShips += item.getTroopCount();
                }
                ctx.attackLightWarships += item.getLightCatapultCount();
                ctx.attackHeavyWarships += item.getHeavyCatapultCount();
            }
            ctx.attackOfficers += item.getOfficerCount();
        });
        this.battleHandler.defenderArmies.forEach(function (item) {
            if (item instanceof footArmy_1.FootArmy) { //footman army
                if (item.isGuard) {
                    ctx.defenseGuardSoldiers += item.getTroopCount();
                }
                else {
                    ctx.defenseSoldiers += item.getTroopCount();
                }
            }
            else if (item instanceof riderArmy_1.RiderArmy) { //rider army
                if (item.isGuard) {
                    ctx.defenseGuardRiders += item.getTroopCount();
                }
                else {
                    ctx.defenseRiders += item.getTroopCount();
                }
            }
            else if (item instanceof fleet_1.Fleet) { //navy
                if (item.isGuard) {
                    ctx.defenseGuardShips += item.getTroopCount();
                }
                else {
                    ctx.defenseShips += item.getTroopCount();
                }
                ctx.defenseLightWarships += item.getLightCatapultCount();
                ctx.defenseHeavyWarships += item.getHeavyCatapultCount();
            }
            ctx.defenseOfficers += item.getOfficerCount();
        });
    }
    updateDisplay() {
        //enable / disable the battle button
        if (this.battleHandler.attackerArmies.length === 0 || this.battleHandler.defenderArmies.length === 0) {
            this.getBattleButton().disabled = true;
            this.getBattleButton().style.cursor = "not-allowed";
        }
        else {
            this.getBattleButton().disabled = false;
            this.getBattleButton().style.cursor = "initial";
        }
        this.updateArmyLists();
        this.updateTroopSummaries();
        this.updateResultPreview();
    }
    updateArmyLists() {
        //fill the sortable lists of armies
        this.getAttackArmiesBox().innerHTML = "";
        this.battleHandler.attackerArmies.forEach((item, index) => {
            let listItem = document.createElement("DIV");
            this.getAttackArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.owner + " " + item.getErkenfaraID();
            listItem.appendChild(div);
            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveRightButton");
            moveBtn.onclick = this.removeFromAttack(index);
            listItem.appendChild(moveBtn);
        }, this);
        this.getUnsortedArmiesBox().innerHTML = "";
        this.battleHandler.unsortedArmies.forEach((item, index) => {
            let listItem = document.createElement("DIV");
            this.getUnsortedArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");
            let moveLeftBtn = document.createElement("BUTTON");
            moveLeftBtn.classList.add("armyListButton");
            moveLeftBtn.classList.add("moveLeftButton");
            moveLeftBtn.onclick = this.moveToAttack(index);
            listItem.appendChild(moveLeftBtn);
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.owner + " " + item.getErkenfaraID();
            listItem.appendChild(div);
            let moveRightBtn = document.createElement("BUTTON");
            moveRightBtn.classList.add("armyListButton");
            moveRightBtn.classList.add("moveRightButton");
            moveRightBtn.onclick = this.moveToDefense(index);
            listItem.appendChild(moveRightBtn);
        }, this);
        this.getDefenseArmiesBox().innerHTML = "";
        this.battleHandler.defenderArmies.forEach((item, index) => {
            let listItem = document.createElement("DIV");
            this.getDefenseArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");
            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveLeftButton");
            moveBtn.onclick = this.removeFromDefense(index);
            listItem.appendChild(moveBtn);
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.owner + " " + item.getErkenfaraID();
            listItem.appendChild(div);
        }, this);
    }
    updateTroopSummaries() {
        //write the troop count summaries
        this.getAttackBattleSide().innerHTML = "";
        this.getDefenseBattleSide().innerHTML = "";
        if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
            this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
            //naval combat
            if (this.attackShips > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Shiffe: " + this.attackShips + "</p>";
            }
            if (this.attackGuardShips > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Gardeschiffe: " + this.attackGuardShips + "</p>";
            }
            if (this.defenseShips > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Shiffe: " + this.defenseShips + "</p>";
            }
            if (this.defenseGuardShips > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Gardeschiffe: " + this.defenseGuardShips + "</p>";
            }
            if (this.defenseLightWarships > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Leichte Kreigsschiffe: " + this.defenseLightWarships + "</p>";
            }
            if (this.defenseHeavyWarships > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Schwere Kriegsschiffe: " + this.defenseHeavyWarships + "</p>";
            }
        }
        else {
            //land combat
            if (this.attackSoldiers > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Soldaten: " + this.attackSoldiers + "</p>";
            }
            if (this.attackRiders > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Reiter: " + this.attackRiders + "</p>";
            }
            if (this.attackGuardSoldiers > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Gardesoldaten: " + this.attackGuardSoldiers + "</p>";
            }
            if (this.attackGuardRiders > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Gardereiter: " + this.attackGuardRiders + "</p>";
            }
            if (this.defenseSoldiers > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Soldaten: " + this.defenseSoldiers + "</p>";
            }
            if (this.defenseRiders > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Reiter: " + this.defenseRiders + "</p>";
            }
            if (this.defenseGuardSoldiers > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Gardesoldaten: " + this.defenseGuardSoldiers + "</p>";
            }
            if (this.defenseGuardRiders > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Gardereiter: " + this.defenseGuardRiders + "</p>";
            }
        }
        if (this.attackOfficers > 0) {
            this.getAttackBattleSide().innerHTML += "<p>Heerführer: " + this.attackOfficers + "</p>";
        }
        if (this.defenseOfficers > 0) {
            this.getDefenseBattleSide().innerHTML += "<p>Heerführer: " + this.defenseOfficers + "</p>";
        }
        this.getAttackBattleSide().innerHTML += "<p>Würfelwurf: " + this.getAttackDiceRoll().value + "</p>";
        this.getDefenseBattleSide().innerHTML += "<p>Würfelwurf: " + this.getDefenseDiceRoll().value + "</p>";
    }
    updateResultPreview() {
        //Instant result preview (remove if not desired)
        let battleResult = this.battleHandler.calculateResult(this.battleHandler.attackerArmies.map((val) => (val)), this.battleHandler.defenderArmies.map((val) => (val)), [], [], this.battleHandler.location, parseInt(this.getAttackDiceRoll().value), parseInt(this.getDefenseDiceRoll().value));
        let attackFootLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof footArmy_1.FootArmy && !this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackCavLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof riderArmy_1.RiderArmy && !this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackFleetLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof fleet_1.Fleet && !this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardFootLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof footArmy_1.FootArmy && this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardCavLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof riderArmy_1.RiderArmy && this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardFleetLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof fleet_1.Fleet && this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseFootLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof footArmy_1.FootArmy && !this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseCavLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof riderArmy_1.RiderArmy && !this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseFleetLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof fleet_1.Fleet && !this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardFootLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof footArmy_1.FootArmy && this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardCavLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof riderArmy_1.RiderArmy && this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardFleetLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof fleet_1.Fleet && this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        if (battleResult.result === 1 /* ATTACKER_OVERRUN */ || battleResult.result === 0 /* ATTACKER_VICTORY */) {
            if (battleResult.result === 1 /* ATTACKER_OVERRUN */) {
                this.getDefenseBattleSide().innerHTML += "<p class=\"red\">Überrant!</p>";
            }
            else {
                this.getDefenseBattleSide().innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.getAttackBattleSide().innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((attackFleetLosses + attackGuardFleetLosses) / (this.attackShips + this.attackGuardShips));
                    let officerLosses = Math.round(lossProportion * this.attackOfficers);
                    if (this.attackShips > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Schiffe: " +
                            this.attackShips + "<div class=\"red inline\"> -" + attackFleetLosses + "</div></div>";
                    }
                    if (this.attackGuardShips > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardeschiffe: " +
                            this.attackGuardShips + "<div class=\"red inline\"> -" + attackGuardFleetLosses + "</div></div>";
                    }
                    if (this.attackOfficers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Heerführer: " +
                            this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
                else {
                    //land battle
                    let officerLosses = Math.round(((attackFootLosses + attackCavLosses + attackGuardFootLosses + attackGuardCavLosses) /
                        (this.attackSoldiers + this.attackRiders + this.attackGuardSoldiers + this.attackGuardRiders)) * this.attackOfficers);
                    if (this.attackSoldiers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Soldaten: " +
                            this.attackSoldiers + "<div class=\"red inline\"> -" + attackFootLosses + "</div></div>";
                    }
                    if (this.attackRiders > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Reiter: " +
                            this.attackRiders + "<div class=\"red inline\"> -" + attackCavLosses + "</div></div>";
                    }
                    if (this.attackGuardSoldiers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardesoldaten: " +
                            this.attackGuardSoldiers + "<div class=\"red inline\"> -" + attackGuardFootLosses + "</div></div>";
                    }
                    if (this.attackGuardRiders > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardereiter: " +
                            this.attackGuardRiders + "<div class=\"red inline\"> -" + attackGuardCavLosses + "</div></div>";
                    }
                    if (this.attackOfficers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Heerführer: " +
                            this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
            }
        }
        else if (battleResult.result === 3 /* DEFENDER_OVERRUN */ || battleResult.result === 2 /* DEFENDER_VICTORY */) {
            if (battleResult.result === 3 /* DEFENDER_OVERRUN */) {
                this.getAttackBattleSide().innerHTML += "<p class=\"red\">Überrant!</p>";
            }
            else {
                this.getAttackBattleSide().innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.getDefenseBattleSide().innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((defenseFleetLosses + defenseGuardFleetLosses) / (this.defenseShips + this.defenseGuardShips));
                    let officerLosses = Math.round(lossProportion * this.defenseOfficers);
                    let lightWarshipLosses = Math.round(lossProportion * this.defenseLightWarships);
                    let heavyWarshipLosses = Math.round(lossProportion * this.defenseHeavyWarships);
                    if (this.defenseShips > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Schiffe: " +
                            this.defenseShips + "<div class=\"red inline\"> -" + defenseFleetLosses + "</div></div>";
                    }
                    if (this.defenseGuardShips > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardeschiffe: " +
                            this.defenseGuardShips + "<div class=\"red inline\"> -" + defenseGuardFleetLosses + "</div></div>";
                    }
                    if (this.defenseLightWarships > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Leichte Kriegsschiffe: " +
                            this.defenseLightWarships + "<div class=\"red inline\"> -" + lightWarshipLosses + "</div></div>";
                    }
                    if (this.defenseHeavyWarships > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Schwere Kriegsschiffe: " +
                            this.defenseHeavyWarships + "<div class=\"red inline\"> -" + heavyWarshipLosses + "</div></div>";
                    }
                    if (this.defenseOfficers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Heerführer: " +
                            this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
                else {
                    //land battle
                    let officerLosses = Math.round(((defenseFootLosses + defenseCavLosses + defenseGuardFootLosses + defenseGuardCavLosses) /
                        (this.defenseSoldiers + this.defenseRiders + this.defenseGuardSoldiers + this.defenseGuardRiders)) * this.defenseOfficers);
                    if (this.defenseSoldiers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Soldaten: " +
                            this.defenseSoldiers + "<div class=\"red inline\"> -" + defenseFootLosses + "</div></div>";
                    }
                    if (this.defenseRiders > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Reiter: " +
                            this.defenseRiders + "<div class=\"red inline\"> -" + defenseCavLosses + "</div></div>";
                    }
                    if (this.defenseGuardSoldiers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardesoldaten: " +
                            this.defenseGuardSoldiers + "<div class=\"red inline\"> -" + defenseGuardFootLosses + "</div></div>";
                    }
                    if (this.defenseGuardRiders > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardereiter: " +
                            this.defenseGuardRiders + "<div class=\"red inline\"> -" + defenseGuardCavLosses + "</div></div>";
                    }
                    if (this.defenseOfficers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Heerführer: " +
                            this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
            }
        }
    }
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("battleBox");
        }
        return this.self;
    }
    getCloseBattleButton() {
        if (this.closeBattleButton == undefined) {
            this.closeBattleButton = document.getElementById("closeBattleButton");
        }
        return this.closeBattleButton;
    }
    getAttackersTitleText() {
        if (this.attackersTitleText == undefined) {
            this.attackersTitleText = document.getElementById("attackersTitleText");
        }
        return this.attackersTitleText;
    }
    getDefendersTitleText() {
        if (this.defendersTitleText == undefined) {
            this.defendersTitleText = document.getElementById("defendersTitleText");
        }
        return this.defendersTitleText;
    }
    getAttackArmiesBox() {
        if (this.attackArmiesBox == undefined) {
            this.attackArmiesBox = document.getElementById("attackArmiesBox");
        }
        return this.attackArmiesBox;
    }
    getUnsortedArmiesBox() {
        if (this.unsortedArmiesBox == undefined) {
            this.unsortedArmiesBox = document.getElementById("unsortedArmiesBox");
        }
        return this.unsortedArmiesBox;
    }
    getDefenseArmiesBox() {
        if (this.defenseArmiesBox == undefined) {
            this.defenseArmiesBox = document.getElementById("defenseArmiesBox");
        }
        return this.defenseArmiesBox;
    }
    getAttackBattleSide() {
        if (this.attackBattleSide == undefined) {
            this.attackBattleSide = document.getElementById("attackBattleSide");
        }
        return this.attackBattleSide;
    }
    getAttackDiceRoll() {
        if (this.attackDiceRoll == undefined) {
            this.attackDiceRoll = document.getElementById("attackDiceRoll");
        }
        return this.attackDiceRoll;
    }
    getDefenseDiceRoll() {
        if (this.defenseDiceRoll == undefined) {
            this.defenseDiceRoll = document.getElementById("defenseDiceRoll");
        }
        return this.defenseDiceRoll;
    }
    getDefenseBattleSide() {
        if (this.defenseBattleSide == undefined) {
            this.defenseBattleSide = document.getElementById("defenseBattleSide");
        }
        return this.defenseBattleSide;
    }
    getBattleButton() {
        if (this.battleButton == undefined) {
            this.battleButton = document.getElementById("battleButton");
        }
        return this.battleButton;
    }
}
exports.BattleBox = BattleBox;

},{"../armies/battleHandler":2,"../armies/fleet":4,"../armies/footArmy":5,"../armies/riderArmy":9}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("./gui");
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("./drawingFunctions");
const controlVariables_1 = require("../controls/controlVariables");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const buttonFunctions_1 = require("../controls/buttonFunctions");
var BoxVisibility;
(function (BoxVisibility) {
    BoxVisibility.worldCreationModeOn = false;
    BoxVisibility.worldCreationModeOnClick = false;
    BoxVisibility.riverCreationModeOn = false;
    BoxVisibility.buildingCreationModeOn = false;
    BoxVisibility.streetBuildingModeOn = false;
    BoxVisibility.harborBuildingModeOn = false;
    BoxVisibility.bridgeBuildingModeOn = false;
    BoxVisibility.wallBuildingModeOn = false;
    BoxVisibility.shootingModeOn = false;
    BoxVisibility.changeFieldToType = -1;
    BoxVisibility.armyCreationModeOn = false;
    BoxVisibility.armyWithNextClick = false;
    BoxVisibility.ownerBuffer = "";
    BoxVisibility.armyIdBuffer = 0;
    BoxVisibility.countBuffer = 0;
    BoxVisibility.leaderBuffer = 0;
    BoxVisibility.mountsBuffer = 0;
    BoxVisibility.lkpBuffer = 0;
    BoxVisibility.skpBuffer = 0;
    BoxVisibility.guardBuffer = false;
    function toggleVisibility(element) {
        let classes = element.classList;
        if (classes.contains("invisible")) {
            classes.remove("invisible");
        }
        else {
            classes.add("invisible");
        }
    }
    BoxVisibility.toggleVisibility = toggleVisibility;
    function show(element) {
        let classes = element.classList;
        if (classes.contains("invisible")) {
            classes.remove("invisible");
        }
    }
    BoxVisibility.show = show;
    function hide(element) {
        let classes = element.classList;
        if (!classes.contains("invisible")) {
            classes.add("invisible");
        }
    }
    BoxVisibility.hide = hide;
    // switches bunttonBoxContent.style.visibility to "" and all others to "none"
    function switchBtnBoxTo(buttonBoxContent) {
        hide(gui_1.GUI.getWorldBenderBox().getSelf());
        hide(gui_1.GUI.getRiverBenderBox().getSelf());
        hide(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        hide(gui_1.GUI.getBuildingCreationBox().getSelf());
        hide(gui_1.GUI.getStreetCreationBox().getSelf());
        hide(gui_1.GUI.getHarborCreationBox().getSelf());
        hide(gui_1.GUI.getBridgeCreationBox().getSelf());
        hide(gui_1.GUI.getWallCreationBox().getSelf());
        hide(gui_1.GUI.getButtonsBox());
        hide(gui_1.GUI.getArmyGeneratorBox().getSelf());
        show(buttonBoxContent);
    }
    BoxVisibility.switchBtnBoxTo = switchBtnBoxTo;
    // switches activeMode to True and all others to false
    function switchModeTo(activeMode) {
        BoxVisibility.worldCreationModeOn = false;
        BoxVisibility.worldCreationModeOnClick = false;
        BoxVisibility.riverCreationModeOn = false;
        BoxVisibility.buildingCreationModeOn = false;
        BoxVisibility.streetBuildingModeOn = false;
        BoxVisibility.harborBuildingModeOn = false;
        BoxVisibility.bridgeBuildingModeOn = false;
        BoxVisibility.wallBuildingModeOn = false;
        BoxVisibility.shootingModeOn = false;
        BoxVisibility.changeFieldToType = -1;
        BoxVisibility.armyWithNextClick = false;
        BoxVisibility.armyCreationModeOn = false;
        switch (activeMode) {
            //worldCreationModeOnClick also has worldCreationModeOn enabled
            case "worldCreationModeOnClick": BoxVisibility.worldCreationModeOnClick = true;
            case "worldCreationModeOn":
                BoxVisibility.worldCreationModeOn = true;
                break;
            case "riverCreationModeOn":
                BoxVisibility.riverCreationModeOn = true;
                break;
            case "buildingCreationModeOn":
                BoxVisibility.buildingCreationModeOn = true;
                break;
            case "streetBuildingModeOn":
                BoxVisibility.streetBuildingModeOn = true;
                break;
            case "harborBuildingModeOn":
                BoxVisibility.harborBuildingModeOn = true;
                break;
            case "bridgeBuildingModeOn":
                BoxVisibility.bridgeBuildingModeOn = true;
                break;
            case "wallBuildingModeOn":
                BoxVisibility.wallBuildingModeOn = true;
                break;
            case "armyWithNextClick":
                BoxVisibility.armyWithNextClick = true;
                break;
            case "armyCreationModeOn":
                BoxVisibility.armyCreationModeOn = true;
                break;
            case "shootingModeOn":
                BoxVisibility.shootingModeOn = true;
                break;
            case "none": break;
        }
    }
    BoxVisibility.switchModeTo = switchModeTo;
    function toggleArmyCreationMode() {
        if (BoxVisibility.armyCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.armyCreationModeOn) {
            switchModeTo("armyCreationModeOn");
            switchBtnBoxTo(gui_1.GUI.getArmyGeneratorBox().getSelf());
        }
    }
    BoxVisibility.toggleArmyCreationMode = toggleArmyCreationMode;
    function toggleWorldCreationMode() {
        if (BoxVisibility.worldCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.worldCreationModeOn) {
            switchModeTo("worldCreationModeOn");
            switchBtnBoxTo(gui_1.GUI.getWorldBenderBox().getSelf());
        }
    }
    BoxVisibility.toggleWorldCreationMode = toggleWorldCreationMode;
    function toggleRiverCreationMode() {
        if (BoxVisibility.riverCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.riverCreationModeOn) {
            switchModeTo("riverCreationModeOn");
            switchBtnBoxTo(gui_1.GUI.getRiverBenderBox().getSelf());
        }
    }
    BoxVisibility.toggleRiverCreationMode = toggleRiverCreationMode;
    function toggleBuildingCreationMode() {
        if (BoxVisibility.buildingCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.buildingCreationModeOn) {
            switchBtnBoxTo(gui_1.GUI.getBuildingCreationBox().getSelf());
            switchModeTo("buildingCreationModeOn");
        }
    }
    BoxVisibility.toggleBuildingCreationMode = toggleBuildingCreationMode;
    function toggleStreetBuildingMode() {
        if (BoxVisibility.streetBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.streetBuildingModeOn) {
            switchModeTo("streetBuildingModeOn");
            switchBtnBoxTo(gui_1.GUI.getStreetCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleStreetBuildingMode = toggleStreetBuildingMode;
    function toggleHarborBuildingMode() {
        if (BoxVisibility.harborBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.harborBuildingModeOn) {
            switchModeTo("harborBuildingModeOn");
            switchBtnBoxTo(gui_1.GUI.getHarborCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleHarborBuildingMode = toggleHarborBuildingMode;
    function toggleBridgeBuildingMode() {
        if (BoxVisibility.bridgeBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.bridgeBuildingModeOn) {
            switchModeTo("bridgeBuildingModeOn");
            switchBtnBoxTo(gui_1.GUI.getBridgeCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleBridgeBuildingMode = toggleBridgeBuildingMode;
    function toggleWallBuildingMode() {
        if (BoxVisibility.wallBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.wallBuildingModeOn) {
            switchModeTo("wallBuildingModeOn");
            switchBtnBoxTo(gui_1.GUI.getWallCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleWallBuildingMode = toggleWallBuildingMode;
    function toggleGodModeBar() {
        if (gui_1.GUI.getGodModeBox().getSelf().classList.contains("invisible")) {
            restoreInfoBox();
            writeRealmDropdown();
            show(gui_1.GUI.getGodModeBox().getSelf());
            show(gui_1.GUI.getInfoChangeBox().getSelf());
            hide(gui_1.GUI.getInfoBox().getSelf());
        }
        else {
            hide(gui_1.GUI.getGodModeBox().getSelf());
            hide(gui_1.GUI.getInfoChangeBox().getSelf());
            show(gui_1.GUI.getInfoBox().getSelf());
            updateInfoBox();
        }
    }
    BoxVisibility.toggleGodModeBar = toggleGodModeBar;
    function writeRealmDropdown() {
        let factionsDropdown = gui_1.GUI.getGodModeBox().getFactionToCreateBuildingsFor();
        let factionOptions = "";
        gameState_1.GameState.realms.forEach(realm => {
            if (realm.active) {
                factionOptions += "<option value=" + "'" + realm.tag + "'" + ">" + realm.name + "</option>";
            }
        });
        factionsDropdown.innerHTML = factionOptions;
    }
    BoxVisibility.writeRealmDropdown = writeRealmDropdown;
    // this is used to update the infoBox and the infoChangeBox with the currently selected Army
    function updateInfoBox() {
        let infoBox = gui_1.GUI.getInfoBox();
        let changeBox = gui_1.GUI.getInfoChangeBox();
        if (controlVariables_1.Controls.selectedArmyIndex != undefined) {
            // info Box
            let infoArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
            if (infoArmy.isGuard) {
                infoBox.getGuardText().innerHTML = "Garde";
            }
            else {
                infoBox.getGuardText().innerHTML = "";
            }
            if (infoArmy instanceof footArmy_1.FootArmy || infoArmy instanceof riderArmy_1.RiderArmy) {
                infoBox.getArmyIdText().innerHTML = "Heer " + infoArmy.getErkenfaraID();
            }
            else if (infoArmy instanceof fleet_1.Fleet) {
                infoBox.getArmyIdText().innerHTML = "Flotte " + infoArmy.getErkenfaraID();
            }
            infoBox.getCountText().innerHTML = "Truppen: " + infoArmy.getTroopCount();
            infoBox.getLeadersText().innerHTML = "Heerführer: " + infoArmy.getOfficerCount();
            infoBox.getMountsText().innerHTML = "mitgeführte Reittiere: " + infoArmy.getMountCount();
            if (infoArmy instanceof riderArmy_1.RiderArmy) {
                hide(infoBox.getLKPText());
                hide(infoBox.getSKPText());
            }
            else {
                show(infoBox.getLKPText());
                show(infoBox.getSKPText());
            }
            infoBox.getLKPText().innerHTML = "leichte Katapulte: " + infoArmy.getLightCatapultCount() + " (" +
                (infoArmy.getLightCatapultCount() - infoArmy.getLightCatapultsShot()) + ")";
            infoBox.getSKPText().innerHTML = "schwere Katapulte: " + infoArmy.getHeavyCatapultCount() + " (" +
                (infoArmy.getHeavyCatapultCount() - infoArmy.getHeavyCatapultsShot()) + ")";
            infoBox.getMovePointsText().innerHTML = "Bewegungspunkte: " + infoArmy.getMovePoints();
            infoBox.getHeightPointsText().innerHTML = "Höhenstufen: " + infoArmy.getHeightPoints();
            show(infoBox.getSplitButton());
            if (infoArmy instanceof footArmy_1.FootArmy) {
                show(infoBox.getMountButton());
                hide(infoBox.getUnMountButton());
            }
            else if (infoArmy instanceof riderArmy_1.RiderArmy) {
                hide(infoBox.getMountButton());
                show(infoBox.getUnMountButton());
            }
            else {
                hide(infoBox.getMountButton());
                hide(infoBox.getUnMountButton());
            }
            //show shoot button
            if (infoArmy.getLightCatapultCount() > 0 || infoArmy.getHeavyCatapultCount() > 0 ||
                !infoArmy.isTransported()) {
                show(infoBox.getShootButton());
            }
            else {
                hide(infoBox.getShootButton());
            }
            // change Box (GodMode)
            changeBox.getGuardChangeInput().checked = infoArmy.isGuard;
            show(changeBox.getGuardChangeInput());
            show(changeBox.getOwnerChange());
            changeBox.getOwnerChangeInput().value = infoArmy.owner.tag;
            show(changeBox.getArmyIdChange());
            changeBox.getArmyIdChangeInput().value = "" + infoArmy.getErkenfaraID();
            show(changeBox.getCountChange());
            changeBox.getCountChangeInput().value = "" + infoArmy.getTroopCount();
            show(changeBox.getLeadersChange());
            changeBox.getLeadersChangeInput().value = "" + infoArmy.getOfficerCount();
            show(changeBox.getMountsChange());
            changeBox.getMountsChangeInput().value = "" + infoArmy.getMountCount();
            show(changeBox.getLKPChange());
            changeBox.getLKPChangeInput().value = "" + infoArmy.getLightCatapultCount();
            show(changeBox.getSKPChange());
            changeBox.getSKPChangeInput().value = "" + infoArmy.getHeavyCatapultCount();
            show(changeBox.getMovePointsChange());
            changeBox.getMovePointsChangeInput().value = "" + infoArmy.getMovePoints();
            show(changeBox.getHeightPointsChange());
            changeBox.getHeightPointsChangeInput().value = "" + infoArmy.getHeightPoints();
            show(changeBox.getChangeArmyInfoButton());
        }
        else {
            // info Box
            infoBox.getGuardText().innerHTML = "";
            infoBox.getArmyIdText().innerHTML = "";
            infoBox.getCountText().innerHTML = "";
            infoBox.getLeadersText().innerHTML = "";
            infoBox.getMountsText().innerHTML = "";
            infoBox.getLKPText().innerHTML = "";
            infoBox.getSKPText().innerHTML = "";
            infoBox.getMovePointsText().innerHTML = "";
            infoBox.getHeightPointsText().innerHTML = "";
            hide(infoBox.getMountButton());
            hide(infoBox.getUnMountButton());
            hide(infoBox.getShootButton());
            hide(infoBox.getSplitButton());
            // change Box (GM)
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
        }
    }
    BoxVisibility.updateInfoBox = updateInfoBox;
    function activateMountBox() {
        hide(gui_1.GUI.getInfoBox().getSelf());
        show(gui_1.GUI.getMountBox());
    }
    BoxVisibility.activateMountBox = activateMountBox;
    function activateUnMountBox() {
        hide(gui_1.GUI.getInfoBox().getSelf());
        show(gui_1.GUI.getUnMountBox());
    }
    BoxVisibility.activateUnMountBox = activateUnMountBox;
    function closeShootBox() {
        hide(gui_1.GUI.getShootBox());
        switchModeTo("none");
        if (controlVariables_1.Controls.shootingTarget != undefined) {
            controlVariables_1.Controls.shootingTarget = undefined;
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    BoxVisibility.closeShootBox = closeShootBox;
    function activateTransmuteBox() {
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        // depending on army type different fields are needed
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof footArmy_1.FootArmy) {
            toSplit = parseInt(gui_1.GUI.getSplitInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
            if (toSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getTroopCount() - 100)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (mountsToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getMountCount()) {
                window.alert("So viele Reittiere hast du nicht.");
                return false;
            }
            if (lkpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getLightCatapultCount()) {
                window.alert("So viele leichte Katapulte hast du nicht.");
                return false;
            }
            if (skpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getHeavyCatapultCount()) {
                window.alert("So viele schwere Katapulte hast du nicht.");
                return false;
            }
        }
        else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof riderArmy_1.RiderArmy) {
            toSplit = parseInt(gui_1.GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitMountedLeadersInput().value);
            if (toSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getTroopCount() - 50)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
        }
        else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof fleet_1.Fleet) {
            toSplit = parseInt(gui_1.GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(gui_1.GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(gui_1.GUI.getSplitFleetSkpInput().value);
            if (toSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getTroopCount() - 1)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (toSplit * 100 > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].freeTransportCapacity())) {
                window.alert("Du kannst keine beladenen Schiffe verschieben.");
                return false;
            }
            if (lkpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getLightCatapultCount()) {
                window.alert("So viele leichte Kriegsschiffe hast du nicht.");
                return false;
            }
            if (skpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getHeavyCatapultCount()) {
                window.alert("So viele schwere Kriegsschiffe hast du nicht.");
                return false;
            }
        }
        if (leadersToSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getOfficerCount() - 1)) {
            window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.");
            return false;
        }
        gui_1.GUI.getTransmuteBox().style.display = "";
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            hide(gui_1.GUI.getSplitBox());
        }
        else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            hide(gui_1.GUI.getSplitMountedBox());
        }
        else if (selectedArmy instanceof fleet_1.Fleet) {
            hide(gui_1.GUI.getSplitFleetBox());
        }
        let onlyLeaders = false;
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            if (parseInt(gui_1.GUI.getSplitInput().value) === 0 &&
                parseInt(gui_1.GUI.getSplitLeadersInput().value) > 0 &&
                parseInt(gui_1.GUI.getSplitMountsInput().value) === 0 &&
                parseInt(gui_1.GUI.getSplitLkpInput().value) === 0 &&
                parseInt(gui_1.GUI.getSplitSkpInput().value) === 0) {
                onlyLeaders = true;
            }
        }
        else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            if (parseInt(gui_1.GUI.getSplitMountedInput().value) === 0 &&
                parseInt(gui_1.GUI.getSplitMountedLeadersInput().value) > 0) {
                onlyLeaders = true;
            }
        }
        else if (selectedArmy instanceof fleet_1.Fleet) {
            if (parseInt(gui_1.GUI.getSplitFleetInput().value) === 0 &&
                parseInt(gui_1.GUI.getSplitFleetLeadersInput().value) > 0 &&
                parseInt(gui_1.GUI.getSplitFleetLkpInput().value) === 0 &&
                parseInt(gui_1.GUI.getSplitFleetSkpInput().value) === 0) {
                onlyLeaders = true;
            }
        }
        let selectedPos = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition();
        let possibleTargets = [];
        let targetOwner = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner;
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (i != controlVariables_1.Controls.selectedArmyIndex) {
                if (onlyLeaders) {
                    if (gameState_1.GameState.armies[i].owner === targetOwner &&
                        gameState_1.GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                        gameState_1.GameState.armies[i].getPosition()[1] === selectedPos[1]) {
                        possibleTargets.push(i);
                    }
                }
                else {
                    if (gameState_1.GameState.armies[i].owner === targetOwner &&
                        gameState_1.GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                        gameState_1.GameState.armies[i].getPosition()[1] === selectedPos[1] &&
                        gameState_1.GameState.armies[i].constructor === gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].constructor) {
                        possibleTargets.push(i);
                    }
                }
            }
        }
        if (possibleTargets != []) {
            if (document.getElementById("transmuteArmyButtonsSection") != undefined) {
                let d = gui_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(gui_1.GUI.getActivateTransmuteBox());
            }
            if (possibleTargets.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "transmuteArmyButtonsSection");
                for (let i = 0; i < possibleTargets.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = "transmuteBtn " + possibleTargets[i];
                    let t = document.createTextNode("" + gameState_1.GameState.armies[possibleTargets[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let posiInList = this.name.split(" ")[1];
                        buttonFunctions_1.ButtonFunctions.transferTroopsFromSelectedArmy(parseInt(posiInList));
                    });
                    x.appendChild(btn);
                }
                gui_1.GUI.getTransmuteArmyButtonsPartition().appendChild(x);
                return true;
            }
            return false;
        }
        else {
            if (document.getElementById("transmuteArmyButtonsSection") != undefined) {
                let d = gui_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(gui_1.GUI.getActivateTransmuteBox());
            }
            return false;
        }
    }
    BoxVisibility.activateTransmuteBox = activateTransmuteBox;
    function activateMergeBox() {
        show(gui_1.GUI.getMergeBox());
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            hide(gui_1.GUI.getSplitBox());
        }
        else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            hide(gui_1.GUI.getSplitMountedBox());
        }
        else if (selectedArmy instanceof fleet_1.Fleet) {
            hide(gui_1.GUI.getSplitFleetBox());
        }
        let selectedPos = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition();
        let possibleTargets = [];
        let targetOwner = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner;
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (i != controlVariables_1.Controls.selectedArmyIndex) {
                if (gameState_1.GameState.armies[i].owner === targetOwner &&
                    gameState_1.GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                    gameState_1.GameState.armies[i].getPosition()[1] === selectedPos[1] &&
                    gameState_1.GameState.armies[i].constructor === selectedArmy.constructor) {
                    possibleTargets.push(i);
                }
            }
        }
        if (possibleTargets != []) {
            if (gui_1.GUI.getActivateMergeBox() != undefined) {
                let d = gui_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(gui_1.GUI.getActivateMergeBox());
            }
            if (possibleTargets.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "mergeArmyButtonsSection");
                for (let i = 0; i < possibleTargets.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = "mergeBtn " + possibleTargets[i];
                    let t = document.createTextNode("" + gameState_1.GameState.armies[possibleTargets[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let posiInList = this.name.split(" ")[1];
                        buttonFunctions_1.ButtonFunctions.mergeSelectedArmy(parseInt(posiInList));
                    });
                    x.appendChild(btn);
                }
                gui_1.GUI.getTransmuteArmyButtonsPartition().appendChild(x);
            }
        }
        else {
            if (document.getElementById("mergeArmyButtonsSection") != undefined) {
                let d = gui_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(gui_1.GUI.getActivateMergeBox());
            }
        }
    }
    BoxVisibility.activateMergeBox = activateMergeBox;
    function backToSplitBox() {
        hide(gui_1.GUI.getMergeBox());
        hide(gui_1.GUI.getTransmuteBox());
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof footArmy_1.FootArmy) {
            show(gui_1.GUI.getSplitBox());
            gui_1.GUI.getSplitBox().style.display = "";
        }
        else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof riderArmy_1.RiderArmy) {
            show(gui_1.GUI.getSplitMountedBox());
        }
        else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof fleet_1.Fleet) {
            show(gui_1.GUI.getSplitFleetBox());
        }
    }
    BoxVisibility.backToSplitBox = backToSplitBox;
    // this is the cancel function for the mount/unmount and split boxes
    function restoreInfoBox() {
        hide(gui_1.GUI.getMountBox());
        hide(gui_1.GUI.getUnMountBox());
        hide(gui_1.GUI.getSplitBox());
        hide(gui_1.GUI.getSplitMountedBox());
        hide(gui_1.GUI.getSplitFleetBox());
        hide(gui_1.GUI.getTransmuteBox());
        hide(gui_1.GUI.getMergeBox());
        closeShootBox();
        if (gui_1.GUI.getGodModeBox().getSelf().classList.contains("invisible")) {
            show(gui_1.GUI.getInfoBox().getSelf());
        }
    }
    BoxVisibility.restoreInfoBox = restoreInfoBox;
})(BoxVisibility = exports.BoxVisibility || (exports.BoxVisibility = {}));

},{"../armies/fleet":4,"../armies/footArmy":5,"../armies/riderArmy":9,"../controls/buttonFunctions":17,"../controls/controlVariables":18,"../gameState":28,"./drawingFunctions":34,"./gui":36}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BridgeCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("bridgeCreationBox");
        }
        return this.self;
    }
    getBuildBridge() {
        if (this.buildBridge == undefined) {
            this.buildBridge = document.getElementById("buildBridge");
        }
        return this.buildBridge;
    }
    getAddBridgeNW() {
        if (this.addBridgeNW == undefined) {
            this.addBridgeNW = document.getElementById("addBridgeNW");
        }
        return this.addBridgeNW;
    }
    getAddBridgeNE() {
        if (this.addBridgeNE == undefined) {
            this.addBridgeNE = document.getElementById("addBridgeNE");
        }
        return this.addBridgeNE;
    }
    getAddBridgeE() {
        if (this.addBridgeE == undefined) {
            this.addBridgeE = document.getElementById("addBridgeE");
        }
        return this.addBridgeE;
    }
    getAddBridgeSE() {
        if (this.addBridgeSE == undefined) {
            this.addBridgeSE = document.getElementById("addBridgeSE");
        }
        return this.addBridgeSE;
    }
    getAddBridgeSW() {
        if (this.addBridgeSW == undefined) {
            this.addBridgeSW = document.getElementById("addBridgeSW");
        }
        return this.addBridgeSW;
    }
    getAddBridgeW() {
        if (this.addBridgeW == undefined) {
            this.addBridgeW = document.getElementById("addBridgeW");
        }
        return this.addBridgeW;
    }
    getRemoveBridge() {
        if (this.removeBridge == undefined) {
            this.removeBridge = document.getElementById("removeBridge");
        }
        return this.removeBridge;
    }
    getRemoveBridgeNW() {
        if (this.removeBridgeNW == undefined) {
            this.removeBridgeNW = document.getElementById("removeBridgeNW");
        }
        return this.removeBridgeNW;
    }
    getRemoveBridgeNE() {
        if (this.removeBridgeNE == undefined) {
            this.removeBridgeNE = document.getElementById("removeBridgeNE");
        }
        return this.removeBridgeNE;
    }
    getRemoveBridgeE() {
        if (this.removeBridgeE == undefined) {
            this.removeBridgeE = document.getElementById("removeBridgeE");
        }
        return this.removeBridgeE;
    }
    getRemoveBridgeSE() {
        if (this.removeBridgeSE == undefined) {
            this.removeBridgeSE = document.getElementById("removeBridgeSE");
        }
        return this.removeBridgeSE;
    }
    getRemoveBridgeSW() {
        if (this.removeBridgeSW == undefined) {
            this.removeBridgeSW = document.getElementById("removeBridgeSW");
        }
        return this.removeBridgeSW;
    }
    getRemoveBridgeW() {
        if (this.removeBridgeW == undefined) {
            this.removeBridgeW = document.getElementById("removeBridgeW");
        }
        return this.removeBridgeW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.BridgeCreationBox = BridgeCreationBox;

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuildingCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("buildingCreationBox");
        }
        return this.self;
    }
    getAddCastle() {
        if (this.addCastle == undefined) {
            this.addCastle = document.getElementById("addCastle");
        }
        return this.addCastle;
    }
    getAddCity() {
        if (this.addCity == undefined) {
            this.addCity = document.getElementById("addCity");
        }
        return this.addCity;
    }
    getAddFortress() {
        if (this.addFortress == undefined) {
            this.addFortress = document.getElementById("addFortress");
        }
        return this.addFortress;
    }
    getAddCapital() {
        if (this.addCapital == undefined) {
            this.addCapital = document.getElementById("addCapital");
        }
        return this.addCapital;
    }
    getAddCapitalFortress() {
        if (this.addCapitalFortress == undefined) {
            this.addCapitalFortress = document.getElementById("addCapitalFortress");
        }
        return this.addCapitalFortress;
    }
    getDeleteBuilding() {
        if (this.deleteBuilding == undefined) {
            this.deleteBuilding = document.getElementById("deleteBuilding");
        }
        return this.deleteBuilding;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.BuildingCreationBox = BuildingCreationBox;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const gui_1 = require("./gui");
const controlVariables_1 = require("../controls/controlVariables");
const gameState_1 = require("../gameState");
const boxVisibilty_1 = require("./boxVisibilty");
const hexFunctions_1 = require("../libraries/hexFunctions");
const images_1 = require("./images");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const savingFunctions_1 = require("../serverInteraction/savingFunctions");
const loadingDataFunctions_1 = require("../serverInteraction/loadingDataFunctions");
const multifieldFunctions_1 = require("./multifieldFunctions");
var Drawing;
(function (Drawing) {
    Drawing.c = 1;
    Drawing.gH = 1;
    Drawing.gW = 1;
    Drawing.switchScale = 50;
    // the scale of the elements, specifically the width
    Drawing.scale = 16;
    // tileset name. available tilesets: "erkenfara_altestool", "erkenfara_folienzug", "mbits_painted", "simple"
    Drawing.tileset = "mbits_painted";
    Drawing.listOfMultiArmyFields = [];
    Drawing.months = ['Agul', 'Hawar', 'Rim', 'Naliv', 'Larn', 'Hel', 'Jawan', 'Lud'];
    function setHexParts(scale) {
        Drawing.c = 0.25 * scale;
        Drawing.gH = 0.75 * scale;
        Drawing.gW = constants_1.Constants.SIN60 * scale;
    }
    Drawing.setHexParts = setHexParts;
    // canvas resizing method
    function resizeCanvas() {
        gui_1.GUI.getCanvas().width = window.innerWidth;
        gui_1.GUI.getCanvas().height = window.innerHeight;
        drawStuff();
    }
    Drawing.resizeCanvas = resizeCanvas;
    // all the stuff to be drawn goes in this method
    function drawStuff() {
        gui_1.GUI.getContext().clearRect(0, 0, gui_1.GUI.getCanvas().width, gui_1.GUI.getCanvas().height); // clear
        // do all drawing/element selection in respect to these coordinates
        // current origin for drawing + offset from dragged mouse
        let pos = [controlVariables_1.Controls.origin[0] + controlVariables_1.Controls.move[0], controlVariables_1.Controls.origin[1] + controlVariables_1.Controls.move[1]];
        drawMap(pos, Drawing.scale);
        drawFieldSelection(pos, Drawing.scale);
        drawArmies(pos, Drawing.scale);
        drawArmySelection(pos, Drawing.scale, controlVariables_1.Controls.selectedArmyIndex);
        drawPossibleMoves(pos, Drawing.scale, controlVariables_1.Controls.selectedArmyIndex);
        drawPossibleShootingTargets(pos, Drawing.scale, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex]);
        drawShootingTargetSelection(pos, Drawing.scale);
        writeFieldInfo();
    }
    Drawing.drawStuff = drawStuff;
    function drawMap(pos, scale) {
        drawFields(pos, scale);
        drawRivers(pos, scale);
        drawBorders(pos, scale);
        drawBuildings(pos, scale);
    }
    function drawBorders(pos, scale) {
        let offset = (scale / 13); //set offset of a border from the actual border of two hexes
        gameState_1.GameState.realms.forEach(realm => {
            let color = realm.color;
            gui_1.GUI.getContext().lineWidth = (scale / 14); //line thickness for borders
            gui_1.GUI.getContext().strokeStyle = 'rgb(' + color + ')'; //set line color
            gui_1.GUI.getContext().lineCap = "round";
            gui_1.GUI.getContext().fillStyle = 'rgba(' + color + ', 0.3)'; //set fill color
            let land = realm.territory;
            land.forEach(hex => {
                let point = hexFunctions_1.HexFunction.computePosition(pos, hex.coordinates, scale);
                let neighbours = hexFunctions_1.HexFunction.getAdjacency(hex.coordinates, land.map(field => field.coordinates));
                let start;
                if (neighbours[0]) { //determine start in the top corner
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW), point[1]];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                }
                else {
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW + constants_1.Constants.SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW), (point[1] + offset)];
                    }
                }
                gui_1.GUI.getContext().beginPath(); //begin border drawing
                gui_1.GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) { //go to upper right corner
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) { //go to lower right corner
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) { //go to bottom corner
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW + constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) { //go to lower left corner
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) { //go to upper left corner
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    gui_1.GUI.getContext().moveTo(start[0], start[1]);
                } //back to top corner
                else {
                    gui_1.GUI.getContext().lineTo(start[0], start[1]);
                }
                gui_1.GUI.getContext().stroke();
                gui_1.GUI.getContext().beginPath(); //begin area filling
                gui_1.GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) { //go to upper right corner
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) { //go to lower right corner
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) { //go to bottom corner
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW + constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) { //go to lower left corner
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) { //go to upper left corner
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    gui_1.GUI.getContext().lineTo(start[0], start[1]);
                } //back to top corner
                else {
                    gui_1.GUI.getContext().lineTo(start[0], start[1]);
                }
                gui_1.GUI.getContext().fill();
            });
        });
    }
    function drawBuildings(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = (scale / 8); //line style for roads
        gui_1.GUI.getContext().strokeStyle = "#C8AB37";
        gui_1.GUI.getContext().lineCap = "round";
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            let buildingPos = undefined;
            if (building.type !== 8 /* STREET */) {
                buildingPos = hexFunctions_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
            }
            let tileImg; //declare the tile image variable
            switch (building.type) { //set the tileImg to match the building type
                case 0 /* CASTLE */:
                    tileImg = images_1.Images.castle;
                    break;
                case 1 /* CITY */:
                    tileImg = images_1.Images.city;
                    break;
                case 2 /* FORTRESS */:
                    tileImg = images_1.Images.fortress;
                    break;
                case 3 /* CAPITAL */:
                    tileImg = images_1.Images.capital;
                    break;
                case 4 /* CAPITAL_FORT */:
                    tileImg = images_1.Images.capitalFort;
                    break;
                case 5 /* WALL */:
                    switch (building.facing) {
                        case 0 /* NW */:
                            tileImg = images_1.Images.wallNW;
                            break;
                        case 1 /* NE */:
                            tileImg = images_1.Images.wallNE;
                            break;
                        case 2 /* E */:
                            tileImg = images_1.Images.wallE;
                            break;
                        case 3 /* SE */:
                            tileImg = images_1.Images.wallSE;
                            break;
                        case 4 /* SW */:
                            tileImg = images_1.Images.wallSW;
                            break;
                        case 5 /* W */:
                            tileImg = images_1.Images.wallW;
                            break;
                        default:
                            tileImg = images_1.Images.wallNW;
                            break;
                    }
                    break;
                case 6 /* HARBOR */:
                    let harborDir = hexFunctions_1.HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (harborDir) {
                        case 0 /* NW */:
                            tileImg = images_1.Images.harborNW;
                            break;
                        case 1 /* NE */:
                            tileImg = images_1.Images.harborNE;
                            break;
                        case 2 /* E */:
                            tileImg = images_1.Images.harborE;
                            break;
                        case 3 /* SE */:
                            tileImg = images_1.Images.harborSE;
                            break;
                        case 4 /* SW */:
                            tileImg = images_1.Images.harborSW;
                            break;
                        case 5 /* W */:
                            tileImg = images_1.Images.harborW;
                            break;
                        default:
                            tileImg = images_1.Images.harborNW;
                            break;
                    }
                    break;
                case 7 /* BRIDGE */:
                    let bridgeDir = hexFunctions_1.HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (bridgeDir) {
                        case 0 /* NW */:
                            tileImg = images_1.Images.bridgeNW;
                            break;
                        case 1 /* NE */:
                            tileImg = images_1.Images.bridgeNE;
                            break;
                        case 2 /* E */:
                            tileImg = images_1.Images.bridgeE;
                            break;
                        case 3 /* SE */:
                            tileImg = images_1.Images.bridgeSE;
                            break;
                        case 4 /* SW */:
                            tileImg = images_1.Images.bridgeSW;
                            break;
                        case 5 /* W */:
                            tileImg = images_1.Images.bridgeW;
                            break;
                        default:
                            tileImg = images_1.Images.bridgeNW;
                            break;
                    }
                    break;
                default:
                    tileImg = images_1.Images.default;
                    break;
            }
            if (building.type <= 4 && buildingPos !== undefined) { //regular one tile buildings excluding walls
                gui_1.GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * constants_1.Constants.SIN60, scale); //draw the image
            }
            else if (building.type === 5 && buildingPos !== undefined) { //walls - one tile buildings handled differently from cities
                gui_1.GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * constants_1.Constants.SIN60, scale); //draw the image
            }
            else if (building.type <= 7 && buildingPos !== undefined) { //harbors and bridges - "oversized" buildings
                gui_1.GUI.getContext().drawImage(tileImg, buildingPos[0] - Drawing.gW, buildingPos[1] - (0.5 * scale), 3 * Drawing.gW, 2 * scale); //draw the image
            }
            else if (building.type === 8) { //streets - currently drawn as simple lines
                let posFirst = hexFunctions_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
                let posSecond = hexFunctions_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
                gui_1.GUI.getContext().beginPath();
                gui_1.GUI.getContext().moveTo((posFirst[0] + (0.5 * Drawing.gW)), (posFirst[1] + 2 * Drawing.c));
                gui_1.GUI.getContext().lineTo((posSecond[0] + (0.5 * Drawing.gW)), (posSecond[1] + 2 * Drawing.c));
                gui_1.GUI.getContext().stroke();
            }
        }
    }
    function drawRivers(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = (scale / 8);
        gui_1.GUI.getContext().strokeStyle = "#0099FF";
        gui_1.GUI.getContext().lineCap = "round";
        gameState_1.GameState.rivers.forEach(river => {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, river.leftBank, scale);
            let points = [pos, pos];
            let rowOdd = (((river.leftBank[1]) % 2) !== 0);
            if ((river.leftBank[1]) === (river.rightBank[1])) { //same row (w/e)
                if ((river.leftBank[0]) > (river.rightBank[0])) { //second field left (w)
                    points = [[(pos[0]), (pos[1] + Drawing.c)], [(pos[0]), (pos[1] + Drawing.gH)]];
                }
                else { //second field right (e)
                    points = [[(pos[0] + Drawing.gW), (pos[1] + Drawing.c)], [(pos[0] + Drawing.gW), (pos[1] + Drawing.gH)]];
                }
            }
            else if ((river.leftBank[1]) > (river.rightBank[1])) { //second field above (nw/ne)
                //second field right (ne)
                if ((rowOdd && (river.leftBank[0]) === (river.rightBank[0])) || (!rowOdd && (river.leftBank[0]) < (river.rightBank[0]))) {
                    points = [[(pos[0] + 0.5 * Drawing.gW), (pos[1])], [(pos[0] + Drawing.gW), (pos[1] + Drawing.c)]];
                }
                else { //second field left (nw)
                    points = [[(pos[0]), (pos[1] + Drawing.c)], [(pos[0] + 0.5 * Drawing.gW), (pos[1])]];
                }
            }
            else { //second field below (sw/se)
                //second field right (se)
                if ((rowOdd && (river.leftBank[0]) === (river.rightBank[0])) || (!rowOdd && (river.leftBank[0]) < (river.rightBank[0]))) {
                    points = [[(pos[0] + 0.5 * Drawing.gW), (pos[1] + scale)], [(pos[0] + Drawing.gW), (pos[1] + Drawing.gH)]];
                }
                else { //second field left (sw)
                    points = [[(pos[0]), (pos[1] + Drawing.gH)], [(pos[0] + 0.5 * Drawing.gW), (pos[1] + scale)]];
                }
            }
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().moveTo((points[0][0]), (points[0][1]));
            gui_1.GUI.getContext().lineTo((points[1][0]), (points[1][1]));
            gui_1.GUI.getContext().stroke();
        });
    }
    function drawFields(screenPos, scale) {
        let drawingMode = 'image';
        // let drawingMode = 'primitives';
        if (scale < Drawing.switchScale) {
            drawingMode = 'primitives';
        }
        else {
            drawingMode = 'image';
        }
        let currentField;
        let tileImg; //declare the tile image variable
        let sortedFields = [[], [], [], [], [], [], [], [], [], []];
        gameState_1.GameState.fields.forEach(field => {
            let hexPosition = hexFunctions_1.HexFunction.computePosition(screenPos, field.coordinates, scale);
            switch (field.type) { //set the tileImg to match the field type
                case 0 /* SHALLOWS */:
                    sortedFields[0].push(hexPosition);
                    break;
                case 1 /* DEEPSEA */:
                    sortedFields[1].push(hexPosition);
                    break;
                case 2 /* LOWLANDS */:
                    sortedFields[2].push(hexPosition);
                    break;
                case 3 /* WOODS */:
                    sortedFields[3].push(hexPosition);
                    break;
                case 4 /* HILLS */:
                    sortedFields[4].push(hexPosition);
                    break;
                case 5 /* HIGHLANDS */:
                    sortedFields[5].push(hexPosition);
                    break;
                case 6 /* MOUNTAINS */:
                    sortedFields[6].push(hexPosition);
                    break;
                case 7 /* DESERT */:
                    sortedFields[7].push(hexPosition);
                    break;
                case 8 /* SWAMP */:
                    sortedFields[8].push(hexPosition);
                    break;
                default:
                    sortedFields[9].push(hexPosition);
                    break;
            }
        });
        if (drawingMode === 'image') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0 /* SHALLOWS */:
                        tileImg = images_1.Images.shallows;
                        break;
                    case 1 /* DEEPSEA */:
                        tileImg = images_1.Images.deepsea;
                        break;
                    case 2 /* LOWLANDS */:
                        tileImg = images_1.Images.lowlands;
                        break;
                    case 3 /* WOODS */:
                        tileImg = images_1.Images.woods;
                        break;
                    case 4 /* HILLS */:
                        tileImg = images_1.Images.hills;
                        break;
                    case 5 /* HIGHLANDS */:
                        tileImg = images_1.Images.highlands;
                        break;
                    case 6 /* MOUNTAINS */:
                        tileImg = images_1.Images.mountains;
                        break;
                    case 7 /* DESERT */:
                        tileImg = images_1.Images.desert;
                        break;
                    case 8 /* SWAMP */:
                        tileImg = images_1.Images.swamp;
                        break;
                    default:
                        tileImg = images_1.Images.default;
                        break;
                }
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    //draw the image
                    gui_1.GUI.getContext().drawImage(tileImg, currentField[0], currentField[1], (scale * constants_1.Constants.SIN60), scale);
                }
            }
        }
        else if (drawingMode === 'primitives') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0 /* SHALLOWS */:
                        gui_1.GUI.getContext().fillStyle = '#7dbada';
                        break;
                    case 1 /* DEEPSEA */:
                        gui_1.GUI.getContext().fillStyle = '#35668b';
                        break;
                    case 2 /* LOWLANDS */:
                        gui_1.GUI.getContext().fillStyle = '#82d33d';
                        break;
                    case 3 /* WOODS */:
                        gui_1.GUI.getContext().fillStyle = '#266d16';
                        break;
                    case 4 /* HILLS */:
                        gui_1.GUI.getContext().fillStyle = '#c19663';
                        break;
                    case 5 /* HIGHLANDS */:
                        gui_1.GUI.getContext().fillStyle = '#854f36';
                        break;
                    case 6 /* MOUNTAINS */:
                        gui_1.GUI.getContext().fillStyle = '#d3d0d0';
                        break;
                    case 7 /* DESERT */:
                        gui_1.GUI.getContext().fillStyle = '#e3a72a';
                        break;
                    case 8 /* SWAMP */:
                        gui_1.GUI.getContext().fillStyle = '#7f40aa';
                        break;
                    default:
                        gui_1.GUI.getContext().fillStyle = 'Black';
                        break;
                }
                gui_1.GUI.getContext().beginPath();
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    gui_1.GUI.getContext().moveTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                    gui_1.GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.c));
                    gui_1.GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.gH));
                    gui_1.GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), (currentField[1] + scale));
                    gui_1.GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.gH));
                    gui_1.GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.c));
                    gui_1.GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                }
                gui_1.GUI.getContext().fill();
            }
        }
    }
    //drawing all possible moves to neighboring fields if army was selected
    function drawPossibleMoves(screenPos, scale, selectedArmyIndex) {
        if (selectedArmyIndex != undefined) {
            let moves = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].possibleMoves;
            for (let i = 0; i < moves.length; i++) {
                gui_1.GUI.getContext().lineWidth = scale / 6;
                gui_1.GUI.getContext().strokeStyle = '#00FF00';
                let pos = hexFunctions_1.HexFunction.computePosition(screenPos, moves[i].destination, scale); //get fields position
                gui_1.GUI.getContext().beginPath();
                gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 12, 0, 2 * Math.PI, false);
                gui_1.GUI.getContext().stroke();
            }
        }
    }
    function drawFieldSelection(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = 5;
        gui_1.GUI.getContext().strokeStyle = "blue";
        for (let i = 0; i < controlVariables_1.Controls.selectedFields.length; i++) {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, controlVariables_1.Controls.selectedFields[i], scale);
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2, 0, 2 * Math.PI, false);
            gui_1.GUI.getContext().stroke();
        }
    }
    function drawArmySelection(screenPos, scale, armyIndex) {
        gui_1.GUI.getContext().lineWidth = 5;
        gui_1.GUI.getContext().strokeStyle = "green";
        if (armyIndex != undefined) {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, gameState_1.GameState.armies[armyIndex].getPosition(), scale);
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            gui_1.GUI.getContext().stroke();
        }
    }
    function drawShootingTargetSelection(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = 5;
        gui_1.GUI.getContext().strokeStyle = "red";
        if (controlVariables_1.Controls.shootingTarget != undefined) {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, controlVariables_1.Controls.shootingTarget, scale);
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            gui_1.GUI.getContext().stroke();
        }
    }
    function drawArmies(screenPos, scale) {
        //delete all multifields
        for (let k = 0; k < Drawing.listOfMultiArmyFields.length; k++) {
            for (let l = 0; l < Drawing.listOfMultiArmyFields[k].length; l++) {
                Drawing.listOfMultiArmyFields[k][l].multiArmyField = false;
            }
        }
        Drawing.listOfMultiArmyFields = [];
        //getting the multifield list ready
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            multifieldFunctions_1.MultiFieldFunctions.createMultifield(gameState_1.GameState.armies[i]);
        }
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            let armyData = gameState_1.GameState.armies[i]; // get army coordinates
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, armyData.getPosition(), scale);
            gui_1.GUI.getContext().fillStyle = 'black';
            gui_1.GUI.getContext().textAlign = 'center';
            gui_1.GUI.getContext().textBaseline = 'middle';
            //GUI.getContext().fillText(armyData.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));
            //check if its is on a multifield. if it is ignore
            if (!armyData.onMultifield) {
                if (armyData instanceof footArmy_1.FootArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.troops, pos[0], pos[1], (scale * constants_1.Constants.SIN60), scale);
                }
                else if (armyData instanceof riderArmy_1.RiderArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.mounts, pos[0], pos[1], (scale * constants_1.Constants.SIN60), scale);
                }
                else if (armyData instanceof fleet_1.Fleet) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.boats, pos[0], pos[1], (scale * constants_1.Constants.SIN60), scale);
                }
            }
            if (armyData.owner.tag === gameState_1.GameState.login || gameState_1.GameState.login === "sl") {
                if (armyData.possibleMoves.length > 0) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof footArmy_1.FootArmy && armyData.getMovePoints() === 9) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof riderArmy_1.RiderArmy && armyData.getMovePoints() === 21) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof fleet_1.Fleet && armyData.getMovePoints() >= 42) {
                    drawRemainingMovement(pos, scale);
                }
                //draw if it took fire
                if (armyData.wasShotAt === true) {
                    drawTookFire(pos, scale);
                }
            }
        }
        //drawing the multifield armies
        for (let j = 0; j < Drawing.listOfMultiArmyFields.length; j++) { //for every field
            for (let i = 0; i < Drawing.listOfMultiArmyFields[j].length; i++) { //for every army on that field
                let armyData = Drawing.listOfMultiArmyFields[j][i]; // get army coordinates
                let pos = hexFunctions_1.HexFunction.computePosition(screenPos, Drawing.listOfMultiArmyFields[j][i].getPosition(), scale);
                let circleScale = (scale * constants_1.Constants.SIN60) / Drawing.listOfMultiArmyFields[j].length;
                //const double Angle = (M_PI * 2.0) / n;
                //Für jedes i-te Objekt dann die Position des Mittelpunktes:
                //const double MidPosX = (cos(Angle * i) * RadiusX) + CirclePosX;
                //const double MidPosY =(sin(Angle * i) * RadiusY) + CirclePosY;
                let angle = (Math.PI * 2.0) / Drawing.listOfMultiArmyFields[j].length; //Total armies on field
                let xPosArmy = (Math.cos(angle * i) * scale / 4) + pos[0] + scale / 4;
                let yPosArmy = (Math.sin(angle * i) * scale / 4) + pos[1];
                if (armyData instanceof footArmy_1.FootArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.troops, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof riderArmy_1.RiderArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.mounts, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof fleet_1.Fleet) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.boats, xPosArmy, yPosArmy, circleScale, scale);
                }
            }
        }
    }
    function drawRemainingMovement(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = scale / 8;
        gui_1.GUI.getContext().strokeStyle = '#00FFFF';
        gui_1.GUI.getContext().beginPath();
        gui_1.GUI.getContext().arc(screenPos[0] + (0.5 * scale * constants_1.Constants.SIN60) - Drawing.c, screenPos[1] + (scale * 0.5) - Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        gui_1.GUI.getContext().stroke();
    }
    function drawTookFire(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = scale / 8;
        gui_1.GUI.getContext().strokeStyle = '#FF0000';
        gui_1.GUI.getContext().beginPath();
        gui_1.GUI.getContext().arc(screenPos[0] + (0.5 * scale * constants_1.Constants.SIN60) + Drawing.c, screenPos[1] + (scale * 0.5) + Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        gui_1.GUI.getContext().stroke();
    }
    function drawPossibleShootingTargets(screenPos, scale, selectedArmy) {
        if (selectedArmy != undefined && gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].possibleTargets.length > 0 &&
            boxVisibilty_1.BoxVisibility.shootingModeOn) {
            let targets = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].possibleTargets;
            for (let i = 0; i < targets.length; i++) {
                gui_1.GUI.getContext().lineWidth = scale / 10;
                gui_1.GUI.getContext().strokeStyle = '#FF0000';
                let pos = hexFunctions_1.HexFunction.computePosition(screenPos, targets[i].coordinates, scale); //get fields position
                gui_1.GUI.getContext().beginPath();
                gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 20, 0, 2 * Math.PI, false);
                gui_1.GUI.getContext().stroke();
            }
        }
    }
    function writeFieldInfo() {
        let minimapBox = document.getElementById('minimapBox');
        let index = 0;
        if (boxVisibilty_1.BoxVisibility.shootingModeOn) {
            index = 1;
        }
        if (minimapBox !== null) {
            if (controlVariables_1.Controls.selectedFields[index] == undefined) {
                minimapBox.innerHTML = '';
            }
            else {
                let fieldPositionInList = hexFunctions_1.HexFunction.positionInList(controlVariables_1.Controls.selectedFields[index]);
                let localfieldType = '';
                switch (hexFunctions_1.HexFunction.fieldType(controlVariables_1.Controls.selectedFields[index])) {
                    case 0:
                        localfieldType = 'Wasser';
                        break;
                    case 1:
                        localfieldType = 'Tiefsee';
                        break;
                    case 2:
                        localfieldType = 'Tiefland';
                        break;
                    case 3:
                        localfieldType = 'Wald';
                        break;
                    case 4:
                        localfieldType = 'Hochland';
                        break;
                    case 5:
                        localfieldType = 'Bergland';
                        break;
                    case 6:
                        localfieldType = 'Gebirge';
                        break;
                    case 7:
                        localfieldType = 'Wüste';
                        break;
                    case 8:
                        localfieldType = 'Sumpf';
                        break;
                    default:
                        localfieldType = 'Unbekannt';
                        break;
                }
                let fieldOwner = gameState_1.GameState.realms.find(realm => (realm.territory.some(field => (field.coordinates[0] === controlVariables_1.Controls.selectedFields[index][0] &&
                    field.coordinates[1] === controlVariables_1.Controls.selectedFields[index][1]))));
                let fieldOwnerString = (fieldOwner == undefined) ? 'keiner' : fieldOwner.tag;
                minimapBox.innerHTML = '<p>Feld: (' + controlVariables_1.Controls.selectedFields[index][0] + ', ' + controlVariables_1.Controls.selectedFields[index][1] + ')' +
                    '</p><p>Gelände: ' + localfieldType +
                    '</p><p>Höhe: ' + hexFunctions_1.HexFunction.height(controlVariables_1.Controls.selectedFields[index]) +
                    '</p><p>Besitzer: ' + fieldOwnerString + '</p>';
            }
        }
    }
    function writeTurnNumber() {
        // get the top bar element from the HTML document
        let topBar = gui_1.GUI.getTopBar();
        let nextTurnBtn = document.getElementById('nextTurnButton');
        let stepBtn = document.getElementById('stepButton');
        let revertBtn = document.getElementById('revertButton');
        let date = document.getElementById('date_text');
        let spec = document.getElementById('special_text');
        if (nextTurnBtn === null) {
            nextTurnBtn = document.createElement("BUTTON");
            nextTurnBtn.id = "nextTurnButton";
            nextTurnBtn.addEventListener('click', function () {
                let message = "";
                if (gameState_1.GameState.currentTurn.realm == undefined) {
                    message = "Do you want to end the pre-turn phase?";
                }
                else if (gameState_1.GameState.currentTurn.status === 'fi') {
                    let unprocessedEvents = gameState_1.GameState.loadedEvents.some(function (event) {
                        return (event.getStatus() === 4 /* Available */ ||
                            event.getStatus() === 3 /* Withheld */ ||
                            event.getStatus() === 2 /* Impossible */);
                    });
                    if (unprocessedEvents) {
                        message = "Some events are unprocessed.";
                    }
                    message += ("Do you want to end processing the turn of " + gameState_1.GameState.currentTurn.realm + "?");
                }
                else if (gameState_1.GameState.login === 'sl') {
                    message = "Do you want to end the turn of " + gameState_1.GameState.currentTurn.realm + "?";
                }
                else {
                    message = "Do you want to end your turn?";
                }
                if (confirm(message)) {
                    if (gameState_1.GameState.login === 'sl' && gameState_1.GameState.currentTurn.status === 'fi') { //SL sends DB change requests
                        gameState_1.GameState.loadedEvents.forEach(function (event) {
                            if (event.getStatus() === 0 /* Checked */) {
                                if (event.getDatabasePrimaryKey() !== undefined) {
                                    savingFunctions_1.Saving.sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                                }
                            }
                            else if (event.getStatus() === 1 /* Deleted */) {
                                if (event.getDatabasePrimaryKey() !== undefined) {
                                    savingFunctions_1.Saving.sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                                }
                            }
                        }, this);
                        savingFunctions_1.Saving.saveBuildings();
                        savingFunctions_1.Saving.saveFactionsTerritories();
                        savingFunctions_1.Saving.saveArmies();
                    }
                    else { //Players and SL during player's turn send events
                        savingFunctions_1.Saving.sendEventlistInOrder(0);
                    }
                    savingFunctions_1.Saving.sendNextTurn();
                }
            });
            date = document.createElement("P");
            date.align = "right";
            date.id = "date_text";
            spec = document.createElement("P");
            spec.align = "left";
            spec.id = "special_text";
        }
        if (stepBtn == undefined) {
            stepBtn = document.createElement("BUTTON");
            stepBtn.id = "stepButton";
            stepBtn.style.backgroundImage = "url(images/step_button.svg)";
            stepBtn.addEventListener('click', function () {
                if (gameState_1.GameState.login === 'sl') {
                    if (confirm("Do you want to save the events handled so far without ending the turn?" +
                        " Once saved the progress can't be reverted anymore.")) {
                        gameState_1.GameState.newEvents.forEach(function (event) {
                            if (event.getStatus() === 0 /* Checked */) {
                                savingFunctions_1.Saving.sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                            }
                            else if (event.getStatus() === 1 /* Deleted */) {
                                savingFunctions_1.Saving.sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                            }
                        }, this);
                        gameState_1.GameState.newEvents = [];
                        gameState_1.GameState.loadedEvents = [];
                        savingFunctions_1.Saving.saveBuildings();
                        savingFunctions_1.Saving.saveFactionsTerritories();
                        savingFunctions_1.Saving.saveArmies();
                    }
                }
                else {
                    if (confirm("Do you want to save the events issued so far without ending the turn?" +
                        " Once saved the progress can only be reverted by the SL.")) {
                        console.log(3);
                        savingFunctions_1.Saving.sendEventlistInOrder(0);
                    }
                }
            });
        }
        if (revertBtn == undefined) {
            revertBtn = document.createElement("BUTTON");
            revertBtn.id = "revertButton";
            revertBtn.style.backgroundImage = "url(images/revert_button.svg)";
            revertBtn.addEventListener('click', function () {
                if (confirm("Do you want to revert the events handled so far?")) {
                    gameState_1.GameState.newEvents = [];
                    gameState_1.GameState.loadedEvents = [];
                    loadingDataFunctions_1.Loading.loadArmies();
                    loadingDataFunctions_1.Loading.loadBuildingData();
                    loadingDataFunctions_1.Loading.loadBorderData();
                    loadingDataFunctions_1.Loading.loadPendingEvents();
                    writeTurnNumber();
                    drawStuff();
                }
            });
        }
        if (gameState_1.GameState.login !== 'sl' && (gameState_1.GameState.currentTurn.realm == undefined || gameState_1.GameState.currentTurn.status === 'fi' ||
            gameState_1.GameState.login !== gameState_1.GameState.currentTurn.realm)) {
            // if not logged in as the current realm or SL
            nextTurnBtn.disabled = true;
            nextTurnBtn.style.cursor = "not-allowed";
            nextTurnBtn.style.backgroundImage = "url(images/nextturn_button_disabled.svg)";
            stepBtn.disabled = true;
            stepBtn.style.cursor = "not-allowed";
            revertBtn.disabled = true;
            revertBtn.style.cursor = "not-allowed";
        }
        else {
            nextTurnBtn.disabled = false;
            nextTurnBtn.style.cursor = "initial";
            nextTurnBtn.style.backgroundImage = "url(images/nextturn_button.svg)";
            stepBtn.disabled = false;
            stepBtn.style.cursor = "initial";
            revertBtn.disabled = false;
            revertBtn.style.cursor = "initial";
        }
        if (gameState_1.GameState.login === 'sl' && gameState_1.GameState.currentTurn.status === 'fi') {
            loadingDataFunctions_1.Loading.loadPendingEvents();
            boxVisibilty_1.BoxVisibility.show(gui_1.GUI.getBigBox().getEventTabsButton());
        }
        else {
            boxVisibilty_1.BoxVisibility.hide(gui_1.GUI.getBigBox().getEventTabsButton());
            stepBtn.disabled = true;
            stepBtn.style.cursor = "not-allowed";
            revertBtn.disabled = true;
            revertBtn.style.cursor = "not-allowed";
        }
        date.innerHTML = "Monat " + Drawing.months[gameState_1.GameState.currentTurn.turn % 8] + " des Jahres " +
            Math.ceil(gameState_1.GameState.currentTurn.turn / 8) + " (Zug " + gameState_1.GameState.currentTurn.turn + ", ";
        if (gameState_1.GameState.currentTurn.realm == undefined || gameState_1.GameState.currentTurn.status === 'fi') {
            // GM's turn
            date.innerHTML += "SL) ";
        }
        else { // a realm's turn
            date.innerHTML += gameState_1.GameState.currentTurn.realm + ") ";
        }
        date.setAttribute("width", "340px");
        date.setAttribute("float", "left");
        date.setAttribute("line-height", "30px");
        if (gameState_1.GameState.currentTurn.turn % 8 === 1 || gameState_1.GameState.currentTurn.turn % 8 === 5) {
            spec.innerHTML = " Rüstmonat";
            date.setAttribute("width", "100px");
            date.setAttribute("float", "left");
            date.setAttribute("line-height", "30px");
        }
        else if (gameState_1.GameState.currentTurn.turn % 8 === 4 || gameState_1.GameState.currentTurn.turn % 8 === 0) {
            spec.innerHTML = " Einkommensmonat";
            date.setAttribute("width", "160px");
            date.setAttribute("float", "left");
            date.setAttribute("line-height", "30px");
        }
        date.setAttribute("width", "0px");
        date.setAttribute("float", "left");
        date.setAttribute("line-height", "30px");
        topBar.innerHTML = '';
        topBar.appendChild(date);
        topBar.appendChild(nextTurnBtn);
        topBar.appendChild(stepBtn);
        topBar.appendChild(revertBtn);
        topBar.appendChild(spec);
    }
    Drawing.writeTurnNumber = writeTurnNumber;
})(Drawing = exports.Drawing || (exports.Drawing = {}));

},{"../armies/fleet":4,"../armies/footArmy":5,"../armies/riderArmy":9,"../constants":16,"../controls/controlVariables":18,"../gameState":28,"../libraries/hexFunctions":49,"../serverInteraction/loadingDataFunctions":57,"../serverInteraction/savingFunctions":58,"./boxVisibilty":31,"./gui":36,"./images":38,"./multifieldFunctions":42}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GodModeBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("godmodeBox");
        }
        return this.self;
    }
    getToggleWorldCreationMode() {
        if (this.toggleWorldCreationMode == undefined) {
            this.toggleWorldCreationMode = document.getElementById("ToggleWorldCreationMode");
        }
        return this.toggleWorldCreationMode;
    }
    getToggleRiverCreationMode() {
        if (this.toggleRiverCreationMode == undefined) {
            this.toggleRiverCreationMode = document.getElementById("ToggleRiverCreationMode");
        }
        return this.toggleRiverCreationMode;
    }
    getToggleBuildingCreationMode() {
        if (this.toggleBuildingCreationMode == undefined) {
            this.toggleBuildingCreationMode = document.getElementById("ToggleBuildingCreationMode");
        }
        return this.toggleBuildingCreationMode;
    }
    getToggleStreetBuildingMode() {
        if (this.toggleStreetBuildingMode == undefined) {
            this.toggleStreetBuildingMode = document.getElementById("ToggleStreetBuildingMode");
        }
        return this.toggleStreetBuildingMode;
    }
    getToggleWallBuildingMode() {
        if (this.toggleWallBuildingMode == undefined) {
            this.toggleWallBuildingMode = document.getElementById("ToggleWallBuildingMode");
        }
        return this.toggleWallBuildingMode;
    }
    getToggleHarborBuildingMode() {
        if (this.toggleHarborBuildingMode == undefined) {
            this.toggleHarborBuildingMode = document.getElementById("ToggleHarborBuildingMode");
        }
        return this.toggleHarborBuildingMode;
    }
    getToggleBridgeBuildingMode() {
        if (this.toggleBridgeBuildingMode == undefined) {
            this.toggleBridgeBuildingMode = document.getElementById("ToggleBridgeBuildingMode");
        }
        return this.toggleBridgeBuildingMode;
    }
    getSaveArmies() {
        if (this.saveArmies == undefined) {
            this.saveArmies = document.getElementById("SaveArmies");
        }
        return this.saveArmies;
    }
    getSaveFactionsTerritories() {
        if (this.saveFactionsTerritories == undefined) {
            this.saveFactionsTerritories = document.getElementById("SaveFactionsTerritories");
        }
        return this.saveFactionsTerritories;
    }
    getToggleArmyCreationMode() {
        if (this.toggleArmyCreationMode == undefined) {
            this.toggleArmyCreationMode = document.getElementById("ToggleArmyCreationMode");
        }
        return this.toggleArmyCreationMode;
    }
    getGodDeleteSelectedArmy() {
        if (this.godDeleteSelectedArmy == undefined) {
            this.godDeleteSelectedArmy = document.getElementById("GodDeleteSelectedArmy");
        }
        return this.godDeleteSelectedArmy;
    }
    getFactionToCreateBuildingsFor() {
        if (this.factionToCreateBuildingsFor == undefined) {
            this.factionToCreateBuildingsFor = document.getElementById("factionToCreateBuildingsFor");
        }
        return this.factionToCreateBuildingsFor;
    }
}
exports.GodModeBox = GodModeBox;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainBox_1 = require("./mainBox");
const battleBox_1 = require("./battleBox");
const shootingBigBox_1 = require("./shootingBigBox");
const infoBox_1 = require("./infoBox");
const godModeBox_1 = require("./godModeBox");
const armyGeneratorBox_1 = require("./armyGeneratorBox");
const worldBenderBox_1 = require("./worldBenderBox");
const riverBenderBox_1 = require("./riverBenderBox");
const buildingCreationBox_1 = require("./buildingCreationBox");
const wallCreationBox_1 = require("./wallCreationBox");
const harborCreationBox_1 = require("./harborCreationBox");
const bridgeCreationBox_1 = require("./bridgeCreationBox");
const streetCreationBox_1 = require("./streetCreationBox");
const infoChangeBox_1 = require("./infoChangeBox");
class GUI {
    static getCanvas() {
        if (GUI.canvas == undefined) {
            GUI.canvas = document.getElementById("hexCanvas");
        }
        return GUI.canvas;
    }
    static getContext() {
        if (GUI.context == undefined) {
            GUI.context = GUI.getCanvas().getContext('2d');
        }
        return GUI.context;
    }
    static getButtonsBox() {
        if (GUI.buttonsBox == undefined) {
            GUI.buttonsBox = document.getElementById("buttonsBox");
        }
        return GUI.buttonsBox;
    }
    static getToggleGMBarButton() {
        if (GUI.toggleGMBarButton == undefined) {
            GUI.toggleGMBarButton = document.getElementById("ToggleGodModeBar");
        }
        return GUI.toggleGMBarButton;
    }
    static getTopBar() {
        if (GUI.topBar == undefined) {
            GUI.topBar = document.getElementById("topBar");
        }
        return GUI.topBar;
    }
    static getBigBox() {
        if (GUI.bigBox == undefined) {
            GUI.bigBox = new mainBox_1.MainBox();
        }
        return GUI.bigBox;
    }
    static getMainButton() {
        if (GUI.mainButton == undefined) {
            GUI.mainButton = document.getElementById("mainButton");
        }
        return GUI.mainButton;
    }
    static getBattleBox() {
        if (GUI.battleBox == undefined) {
            GUI.battleBox = new battleBox_1.BattleBox();
        }
        return GUI.battleBox;
    }
    static getShootingBigBox() {
        if (GUI.shootingBigBox == undefined) {
            GUI.shootingBigBox = new shootingBigBox_1.ShootingBigBox();
        }
        return GUI.shootingBigBox;
    }
    static getInfoBox() {
        if (GUI.infoBox == undefined) {
            GUI.infoBox = new infoBox_1.InfoBox();
        }
        return GUI.infoBox;
    }
    static getTransmuteBox() {
        if (GUI.transmuteBox == undefined) {
            GUI.transmuteBox = document.getElementById("transmuteBox");
        }
        return GUI.transmuteBox;
    }
    static getTransmuteArmyButtonsPartition() {
        if (GUI.transmuteArmyButtonsPartition == undefined) {
            GUI.transmuteArmyButtonsPartition = document.getElementById("transmuteArmyButtonsPartition");
        }
        return GUI.transmuteArmyButtonsPartition;
    }
    static getBackToSplitBox() {
        if (GUI.backToSplitBox == undefined) {
            GUI.backToSplitBox = document.getElementById("backToSplitBox");
        }
        return GUI.backToSplitBox;
    }
    static getRestoreInfoBox() {
        if (GUI.restoreInfoBox == undefined) {
            GUI.restoreInfoBox = document.getElementById("restoreInfoBox");
        }
        return GUI.restoreInfoBox;
    }
    static getMergeBox() {
        if (GUI.mergeBox == undefined) {
            GUI.mergeBox = document.getElementById("mergeBox");
        }
        return GUI.mergeBox;
    }
    static getSplitBox() {
        if (GUI.splitBox == undefined) {
            GUI.splitBox = document.getElementById("splitBox");
        }
        return GUI.splitBox;
    }
    static getSplitInput() {
        if (GUI.splitInput == undefined) {
            GUI.splitInput = document.getElementById("splitInput");
        }
        return GUI.splitInput;
    }
    static getSplitLeadersInput() {
        if (GUI.splitLeadersInput == undefined) {
            GUI.splitLeadersInput = document.getElementById("splitLeadersInput");
        }
        return GUI.splitLeadersInput;
    }
    static getSplitMountsInput() {
        if (GUI.splitMountsInput == undefined) {
            GUI.splitMountsInput = document.getElementById("splitMountsInput");
        }
        return GUI.splitMountsInput;
    }
    static getSplitLkpInput() {
        if (GUI.splitLkpInput == undefined) {
            GUI.splitLkpInput = document.getElementById("splitLkpInput");
        }
        return GUI.splitLkpInput;
    }
    static getSplitSkpInput() {
        if (GUI.splitSkpInput == undefined) {
            GUI.splitSkpInput = document.getElementById("splitSkpInput");
        }
        return GUI.splitSkpInput;
    }
    static getSplitSelectedArmy() {
        if (GUI.splitSelectedArmy == undefined) {
            GUI.splitSelectedArmy = document.getElementById("splitSelectedArmy");
        }
        return GUI.splitSelectedArmy;
    }
    static getActivateTransmuteBox() {
        if (GUI.activateTransmuteBox == undefined) {
            GUI.activateTransmuteBox = document.getElementById("activateTransmuteBox");
        }
        return GUI.activateTransmuteBox;
    }
    static getActivateMergeBox() {
        if (GUI.activateMergeBox == undefined) {
            GUI.activateMergeBox = document.getElementById("activateMergeBox");
        }
        return GUI.activateMergeBox;
    }
    static getSplitMountedBox() {
        if (GUI.splitMountedBox == undefined) {
            GUI.splitMountedBox = document.getElementById("splitMountedBox");
        }
        return GUI.splitMountedBox;
    }
    static getSplitMountedInput() {
        if (GUI.splitMountedInput == undefined) {
            GUI.splitMountedInput = document.getElementById("splitMountedInput");
        }
        return GUI.splitMountedInput;
    }
    static getSplitMountedLeadersInput() {
        if (GUI.splitMountedLeadersInput == undefined) {
            GUI.splitMountedLeadersInput = document.getElementById("splitMountedLeadersInput");
        }
        return GUI.splitMountedLeadersInput;
    }
    static getSplitFleetBox() {
        if (GUI.splitFleetBox == undefined) {
            GUI.splitFleetBox = document.getElementById("splitFleetBox");
        }
        return GUI.splitFleetBox;
    }
    static getSplitFleetInput() {
        if (GUI.splitFleetInput == undefined) {
            GUI.splitFleetInput = document.getElementById("splitFleetInput");
        }
        return GUI.splitFleetInput;
    }
    static getSplitFleetLeadersInput() {
        if (GUI.splitFleetLeadersInput == undefined) {
            GUI.splitFleetLeadersInput = document.getElementById("splitFleetLeadersInput");
        }
        return GUI.splitFleetLeadersInput;
    }
    static getSplitFleetLkpInput() {
        if (GUI.splitFleetLkpInput == undefined) {
            GUI.splitFleetLkpInput = document.getElementById("splitFleetLkpInput");
        }
        return GUI.splitFleetLkpInput;
    }
    static getSplitFleetSkpInput() {
        if (GUI.splitFleetSkpInput == undefined) {
            GUI.splitFleetSkpInput = document.getElementById("splitFleetSkpInput");
        }
        return GUI.splitFleetSkpInput;
    }
    static getMountBox() {
        if (GUI.mountBox == undefined) {
            GUI.mountBox = document.getElementById("mountBox");
        }
        return GUI.mountBox;
    }
    static getMountInput() {
        if (GUI.mountInput == undefined) {
            GUI.mountInput = document.getElementById("mountInput");
        }
        return GUI.mountInput;
    }
    static getMountLeaderInput() {
        if (GUI.mountLeaderInput == undefined) {
            GUI.mountLeaderInput = document.getElementById("mountLeaderInput");
        }
        return GUI.mountLeaderInput;
    }
    static getMountButton() {
        if (GUI.mount == undefined) {
            GUI.mount = document.getElementById("mount");
        }
        return GUI.mount;
    }
    static getAllMountButton() {
        if (GUI.allMount == undefined) {
            GUI.allMount = document.getElementById("allMount");
        }
        return GUI.allMount;
    }
    static getUnMountBox() {
        if (GUI.unMountBox == undefined) {
            GUI.unMountBox = document.getElementById("unMountBox");
        }
        return GUI.unMountBox;
    }
    static getUnMountInput() {
        if (GUI.unMountInput == undefined) {
            GUI.unMountInput = document.getElementById("unMountInput");
        }
        return GUI.unMountInput;
    }
    static getUnMountLeaderInput() {
        if (GUI.unMountLeaderInput == undefined) {
            GUI.unMountLeaderInput = document.getElementById("unMountLeaderInput");
        }
        return GUI.unMountLeaderInput;
    }
    static getUnMountButton() {
        if (GUI.unMount == undefined) {
            GUI.unMount = document.getElementById("unMount");
        }
        return GUI.unMount;
    }
    static getAllUnMountButton() {
        if (GUI.allUnMount == undefined) {
            GUI.allUnMount = document.getElementById("allUnMount");
        }
        return GUI.allUnMount;
    }
    static getShootBox() {
        if (GUI.shootBox == undefined) {
            GUI.shootBox = document.getElementById("shootBox");
        }
        return GUI.shootBox;
    }
    static getShootingLKPInput() {
        if (GUI.shootingLKPInput == undefined) {
            GUI.shootingLKPInput = document.getElementById("shootingLKPInput");
        }
        return GUI.shootingLKPInput;
    }
    static getShootingSKPInput() {
        if (GUI.shootingSKPInput == undefined) {
            GUI.shootingSKPInput = document.getElementById("shootingSKPInput");
        }
        return GUI.shootingSKPInput;
    }
    static getFireButton() {
        if (GUI.fire == undefined) {
            GUI.fire = document.getElementById("fire");
        }
        return GUI.fire;
    }
    static getInfoChangeBox() {
        if (GUI.infoChangeBox == undefined) {
            GUI.infoChangeBox = new infoChangeBox_1.InfoChangeBox();
        }
        return GUI.infoChangeBox;
    }
    static getLoginBox() {
        if (GUI.loginBox == undefined) {
            GUI.loginBox = document.getElementById("loginBox");
        }
        return GUI.loginBox;
    }
    static getLoginNameInput() {
        if (GUI.loginName == undefined) {
            GUI.loginName = document.getElementById("loginName");
        }
        return GUI.loginName;
    }
    static getLoginPasswordInput() {
        if (GUI.loginPassword == undefined) {
            GUI.loginPassword = document.getElementById("loginPassword");
        }
        return GUI.loginPassword;
    }
    static getLoginButton() {
        if (GUI.loginBtn == undefined) {
            GUI.loginBtn = document.getElementById("loginBtn");
        }
        return GUI.loginBtn;
    }
    static getMinimapBox() {
        if (GUI.minimapBox == undefined) {
            GUI.minimapBox = document.getElementById("minimapBox");
        }
        return GUI.minimapBox;
    }
    static getGodModeBox() {
        if (GUI.godmodeBox == undefined) {
            GUI.godmodeBox = new godModeBox_1.GodModeBox();
        }
        return GUI.godmodeBox;
    }
    static getArmyGeneratorBox() {
        if (GUI.armyGeneratorBox == undefined) {
            GUI.armyGeneratorBox = new armyGeneratorBox_1.ArmyGeneratorBox();
        }
        return GUI.armyGeneratorBox;
    }
    static getWorldBenderBox() {
        if (GUI.worldBenderBox == undefined) {
            GUI.worldBenderBox = new worldBenderBox_1.WorldBenderBox();
        }
        return GUI.worldBenderBox;
    }
    static getRiverBenderBox() {
        if (GUI.riverBenderBox == undefined) {
            GUI.riverBenderBox = new riverBenderBox_1.RiverBenderBox();
        }
        return GUI.riverBenderBox;
    }
    static getBuildingCreationBox() {
        if (GUI.buildingCreationBox == undefined) {
            GUI.buildingCreationBox = new buildingCreationBox_1.BuildingCreationBox();
        }
        return GUI.buildingCreationBox;
    }
    static getWallCreationBox() {
        if (GUI.wallCreationBox == undefined) {
            GUI.wallCreationBox = new wallCreationBox_1.WallCreationBox();
        }
        return GUI.wallCreationBox;
    }
    static getHarborCreationBox() {
        if (GUI.harborCreationBox == undefined) {
            GUI.harborCreationBox = new harborCreationBox_1.HarborCreationBox();
        }
        return GUI.harborCreationBox;
    }
    static getBridgeCreationBox() {
        if (GUI.bridgeCreationBox == undefined) {
            GUI.bridgeCreationBox = new bridgeCreationBox_1.BridgeCreationBox();
        }
        return GUI.bridgeCreationBox;
    }
    static getStreetCreationBox() {
        if (GUI.streetCreationBox == undefined) {
            GUI.streetCreationBox = new streetCreationBox_1.StreetCreationBox();
        }
        return GUI.streetCreationBox;
    }
}
exports.GUI = GUI;

},{"./armyGeneratorBox":29,"./battleBox":30,"./bridgeCreationBox":32,"./buildingCreationBox":33,"./godModeBox":35,"./harborCreationBox":37,"./infoBox":39,"./infoChangeBox":40,"./mainBox":41,"./riverBenderBox":43,"./shootingBigBox":44,"./streetCreationBox":45,"./wallCreationBox":46,"./worldBenderBox":47}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HarborCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("harborCreationBox");
        }
        return this.self;
    }
    getBuildHarbor() {
        if (this.buildHarbor == undefined) {
            this.buildHarbor = document.getElementById("buildHarbor");
        }
        return this.buildHarbor;
    }
    getAddHarborNW() {
        if (this.addHarborNW == undefined) {
            this.addHarborNW = document.getElementById("addHarborNW");
        }
        return this.addHarborNW;
    }
    getAddHarborNE() {
        if (this.addHarborNE == undefined) {
            this.addHarborNE = document.getElementById("addHarborNE");
        }
        return this.addHarborNE;
    }
    getAddHarborE() {
        if (this.addHarborE == undefined) {
            this.addHarborE = document.getElementById("addHarborE");
        }
        return this.addHarborE;
    }
    getAddHarborSE() {
        if (this.addHarborSE == undefined) {
            this.addHarborSE = document.getElementById("addHarborSE");
        }
        return this.addHarborSE;
    }
    getAddHarborSW() {
        if (this.addHarborSW == undefined) {
            this.addHarborSW = document.getElementById("addHarborSW");
        }
        return this.addHarborSW;
    }
    getAddHarborW() {
        if (this.addHarborW == undefined) {
            this.addHarborW = document.getElementById("addHarborW");
        }
        return this.addHarborW;
    }
    getRemoveHarbor() {
        if (this.removeHarbor == undefined) {
            this.removeHarbor = document.getElementById("removeHarbor");
        }
        return this.removeHarbor;
    }
    getRemoveHarborNW() {
        if (this.removeHarborNW == undefined) {
            this.removeHarborNW = document.getElementById("removeHarborNW");
        }
        return this.removeHarborNW;
    }
    getRemoveHarborNE() {
        if (this.removeHarborNE == undefined) {
            this.removeHarborNE = document.getElementById("removeHarborNE");
        }
        return this.removeHarborNE;
    }
    getRemoveHarborE() {
        if (this.removeHarborE == undefined) {
            this.removeHarborE = document.getElementById("removeHarborE");
        }
        return this.removeHarborE;
    }
    getRemoveHarborSE() {
        if (this.removeHarborSE == undefined) {
            this.removeHarborSE = document.getElementById("removeHarborSE");
        }
        return this.removeHarborSE;
    }
    getRemoveHarborSW() {
        if (this.removeHarborSW == undefined) {
            this.removeHarborSW = document.getElementById("removeHarborSW");
        }
        return this.removeHarborSW;
    }
    getRemoveHarborW() {
        if (this.removeHarborW == undefined) {
            this.removeHarborW = document.getElementById("removeHarborW");
        }
        return this.removeHarborW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.HarborCreationBox = HarborCreationBox;

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Images {
}
Images.shallows = new Image();
Images.deepsea = new Image();
Images.lowlands = new Image();
Images.woods = new Image();
Images.hills = new Image();
Images.highlands = new Image();
Images.mountains = new Image();
Images.desert = new Image();
Images.swamp = new Image();
Images.default = new Image();
Images.troops = new Image();
Images.mounts = new Image();
Images.boats = new Image();
Images.castle = new Image();
Images.city = new Image();
Images.fortress = new Image();
Images.capital = new Image();
Images.capitalFort = new Image();
Images.wallW = new Image();
Images.wallE = new Image();
Images.wallNW = new Image();
Images.wallSW = new Image();
Images.wallNE = new Image();
Images.wallSE = new Image();
Images.harborW = new Image();
Images.harborE = new Image();
Images.harborSW = new Image();
Images.harborNW = new Image();
Images.harborSE = new Image();
Images.harborNE = new Image();
Images.bridgeW = new Image();
Images.bridgeE = new Image();
Images.bridgeSW = new Image();
Images.bridgeNW = new Image();
Images.bridgeSE = new Image();
Images.bridgeNE = new Image();
exports.Images = Images;

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InfoBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("infoBox");
        }
        return this.self;
    }
    getArmySelectButtons() {
        if (this.armySelectBtns == undefined) {
            this.armySelectBtns = document.getElementById("armySelectBtns");
        }
        return this.armySelectBtns;
    }
    getArmyIdText() {
        if (this.armyId == undefined) {
            this.armyId = document.getElementById("armyId");
        }
        return this.armyId;
    }
    getGuardText() {
        if (this.guard == undefined) {
            this.guard = document.getElementById("guard");
        }
        return this.guard;
    }
    getCountText() {
        if (this.count == undefined) {
            this.count = document.getElementById("count");
        }
        return this.count;
    }
    getLeadersText() {
        if (this.leaders == undefined) {
            this.leaders = document.getElementById("leaders");
        }
        return this.leaders;
    }
    getMountsText() {
        if (this.mounts == undefined) {
            this.mounts = document.getElementById("mounts");
        }
        return this.mounts;
    }
    getLKPText() {
        if (this.lkp == undefined) {
            this.lkp = document.getElementById("lkp");
        }
        return this.lkp;
    }
    getSKPText() {
        if (this.skp == undefined) {
            this.skp = document.getElementById("skp");
        }
        return this.skp;
    }
    getMovePointsText() {
        if (this.movePoints == undefined) {
            this.movePoints = document.getElementById("movePoints");
        }
        return this.movePoints;
    }
    getHeightPointsText() {
        if (this.heightPoints == undefined) {
            this.heightPoints = document.getElementById("heightPoints");
        }
        return this.heightPoints;
    }
    getMountButton() {
        if (this.mount == undefined) {
            this.mount = document.getElementById("mount");
        }
        return this.mount;
    }
    getUnMountButton() {
        if (this.unMount == undefined) {
            this.unMount = document.getElementById("unMount");
        }
        return this.unMount;
    }
    getSplitButton() {
        if (this.splitBtn == undefined) {
            this.splitBtn = document.getElementById("splitBtn");
        }
        return this.splitBtn;
    }
    getShootButton() {
        if (this.shoot == undefined) {
            this.shoot = document.getElementById("shoot");
        }
        return this.shoot;
    }
    getLogoutButton() {
        if (this.logoutBtn == undefined) {
            this.logoutBtn = document.getElementById("logoutBtn");
        }
        return this.logoutBtn;
    }
}
exports.InfoBox = InfoBox;

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InfoChangeBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("infoChangeBox");
        }
        return this.self;
    }
    getOwnerChange() {
        if (this.ownerChange == undefined) {
            this.ownerChange = document.getElementById("ownerChange");
        }
        return this.ownerChange;
    }
    getArmyIdChange() {
        if (this.armyIdChange == undefined) {
            this.armyIdChange = document.getElementById("armyIdChange");
        }
        return this.armyIdChange;
    }
    getCountChange() {
        if (this.countChange == undefined) {
            this.countChange = document.getElementById("countChange");
        }
        return this.countChange;
    }
    getLeadersChange() {
        if (this.leadersChange == undefined) {
            this.leadersChange = document.getElementById("leadersChange");
        }
        return this.leadersChange;
    }
    getMountsChange() {
        if (this.mountsChange == undefined) {
            this.mountsChange = document.getElementById("mountsChange");
        }
        return this.mountsChange;
    }
    getLKPChange() {
        if (this.lkpChange == undefined) {
            this.lkpChange = document.getElementById("lkpChange");
        }
        return this.lkpChange;
    }
    getSKPChange() {
        if (this.skpChange == undefined) {
            this.skpChange = document.getElementById("skpChange");
        }
        return this.skpChange;
    }
    getMovePointsChange() {
        if (this.movePointsChange == undefined) {
            this.movePointsChange = document.getElementById("movePointsChange");
        }
        return this.movePointsChange;
    }
    getHeightPointsChange() {
        if (this.heightPointsChange == undefined) {
            this.heightPointsChange = document.getElementById("heightPointsChange");
        }
        return this.heightPointsChange;
    }
    getGuardChangeInput() {
        if (this.guardChangeInput == undefined) {
            this.guardChangeInput = document.getElementById("guardChangeInput");
        }
        return this.guardChangeInput;
    }
    getOwnerChangeInput() {
        if (this.ownerChangeInput == undefined) {
            this.ownerChangeInput = document.getElementById("ownerChangeInput");
        }
        return this.ownerChangeInput;
    }
    getArmyIdChangeInput() {
        if (this.armyIdChangeInput == undefined) {
            this.armyIdChangeInput = document.getElementById("armyIdChangeInput");
        }
        return this.armyIdChangeInput;
    }
    getCountChangeInput() {
        if (this.countChangeInput == undefined) {
            this.countChangeInput = document.getElementById("countChangeInput");
        }
        return this.countChangeInput;
    }
    getLeadersChangeInput() {
        if (this.leadersChangeInput == undefined) {
            this.leadersChangeInput = document.getElementById("leadersChangeInput");
        }
        return this.leadersChangeInput;
    }
    getMountsChangeInput() {
        if (this.mountsChangeInput == undefined) {
            this.mountsChangeInput = document.getElementById("mountsChangeInput");
        }
        return this.mountsChangeInput;
    }
    getLKPChangeInput() {
        if (this.lkpChangeInput == undefined) {
            this.lkpChangeInput = document.getElementById("lkpChangeInput");
        }
        return this.lkpChangeInput;
    }
    getSKPChangeInput() {
        if (this.skpChangeInput == undefined) {
            this.skpChangeInput = document.getElementById("skpChangeInput");
        }
        return this.skpChangeInput;
    }
    getMovePointsChangeInput() {
        if (this.movePointsChangeInput == undefined) {
            this.movePointsChangeInput = document.getElementById("movePointsChangeInput");
        }
        return this.movePointsChangeInput;
    }
    getHeightPointsChangeInput() {
        if (this.heightPointsChangeInput == undefined) {
            this.heightPointsChangeInput = document.getElementById("heightPointsChangeInput");
        }
        return this.heightPointsChangeInput;
    }
    getChangeArmyInfoButton() {
        if (this.changeArmyInfo == undefined) {
            this.changeArmyInfo = document.getElementById("changeArmyInfo");
        }
        return this.changeArmyInfo;
    }
    getLogoutButton() {
        if (this.logoutBtnChange == undefined) {
            this.logoutBtnChange = document.getElementById("logoutBtnChange");
        }
        return this.logoutBtnChange;
    }
}
exports.InfoChangeBox = InfoChangeBox;

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const boxVisibilty_1 = require("./boxVisibilty");
class MainBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("infoBox");
        }
        return this.self;
    }
    getEventTabsButton() {
        if (this.eventTabsButton == undefined) {
            this.eventTabsButton = document.getElementById("eventTabsButton");
        }
        return this.eventTabsButton;
    }
    getEventsTab() {
        if (this.eventsTab == undefined) {
            this.eventsTab = document.getElementById("eventsTab");
        }
        return this.eventsTab;
    }
    closeAllTabs() {
        // Get all elements with class="tabcontent" and hide them
        let tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            boxVisibilty_1.BoxVisibility.hide(tabcontent[i]);
        }
        // Get all elements with class="tablinks" and remove the class "active"
        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
    openTab(event, tab) {
        this.closeAllTabs();
        // Show the current tab, and add an "active" class to the button that opened the tab
        if (event != undefined && tab != undefined) {
            boxVisibilty_1.BoxVisibility.show(tab);
            event.currentTarget.className += " active";
        }
    }
    fillEventList() {
        let eventList = this.getEventsTab();
        eventList.innerHTML = "";
        for (let i = 0; i < gameState_1.GameState.loadedEvents.length; i++) {
            gameState_1.GameState.loadedEvents[i].determineEventStatus();
            eventList.appendChild(gameState_1.GameState.loadedEvents[i].makeEventListItem());
        }
    }
}
exports.MainBox = MainBox;

},{"../gameState":28,"./boxVisibilty":31}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("./drawingFunctions");
var MultiFieldFunctions;
(function (MultiFieldFunctions) {
    //checks the current field for other armies and adds it accordingly
    function createMultifield(army) {
        for (let j = 0; j < gameState_1.GameState.armies.length; j++) {
            let someArmy = gameState_1.GameState.armies[j];
            if (someArmy.getPosition()[0] === army.getPosition()[0] && someArmy.getPosition()[1] === army.getPosition()[1] && someArmy !== army) {
                if (someArmy.multiArmyField === true || army.multiArmyField === true) {
                    addToMultifield(someArmy, army);
                }
                else {
                    let templist = [someArmy, army]; //creating a list of armies to add to the list of multifieldarmies
                    drawingFunctions_1.Drawing.listOfMultiArmyFields.push(templist);
                    someArmy.multiArmyField = true;
                    army.multiArmyField = true;
                }
            }
        }
    }
    MultiFieldFunctions.createMultifield = createMultifield;
    //Adds an army to an existing multifield
    function addToMultifield(armyOnMultifield, armyToAdd) {
        if (drawingFunctions_1.Drawing.listOfMultiArmyFields !== undefined) {
            let alreadyInList = false;
            let placeToAdd;
            for (let i = 0; i < drawingFunctions_1.Drawing.listOfMultiArmyFields.length; i++) {
                for (let j = 0; j < drawingFunctions_1.Drawing.listOfMultiArmyFields[i].length; j++) {
                    if (drawingFunctions_1.Drawing.listOfMultiArmyFields[i][j] === armyOnMultifield) {
                        placeToAdd = i;
                    }
                    else if (drawingFunctions_1.Drawing.listOfMultiArmyFields[i][j] === armyToAdd) {
                        alreadyInList = true;
                    }
                }
            }
            if (alreadyInList == false && placeToAdd !== undefined) {
                drawingFunctions_1.Drawing.listOfMultiArmyFields[placeToAdd].push(armyToAdd);
            }
            armyToAdd.multiArmyField = true;
        }
    }
    MultiFieldFunctions.addToMultifield = addToMultifield;
})(MultiFieldFunctions = exports.MultiFieldFunctions || (exports.MultiFieldFunctions = {}));

},{"../gameState":28,"./drawingFunctions":34}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RiverBenderBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("riverBenderBox");
        }
        return this.self;
    }
    getBuildRiverSection() {
        if (this.buildRiverSection == undefined) {
            this.buildRiverSection = document.getElementById("buildRiverSection");
        }
        return this.buildRiverSection;
    }
    getAddRiverNW() {
        if (this.addRiverNW == undefined) {
            this.addRiverNW = document.getElementById("addRiverNW");
        }
        return this.addRiverNW;
    }
    getAddRiverNE() {
        if (this.addRiverNE == undefined) {
            this.addRiverNE = document.getElementById("addRiverNE");
        }
        return this.addRiverNE;
    }
    getAddRiverE() {
        if (this.addRiverE == undefined) {
            this.addRiverE = document.getElementById("addRiverE");
        }
        return this.addRiverE;
    }
    getAddRiverSE() {
        if (this.addRiverSE == undefined) {
            this.addRiverSE = document.getElementById("addRiverSE");
        }
        return this.addRiverSE;
    }
    getAddRiverSW() {
        if (this.addRiverSW == undefined) {
            this.addRiverSW = document.getElementById("addRiverSW");
        }
        return this.addRiverSW;
    }
    getAddRiverW() {
        if (this.addRiverW == undefined) {
            this.addRiverW = document.getElementById("addRiverW");
        }
        return this.addRiverW;
    }
    getRemoveRiverSection() {
        if (this.removeRiverSection == undefined) {
            this.removeRiverSection = document.getElementById("removeRiverSection");
        }
        return this.removeRiverSection;
    }
    getRemoveRiverNW() {
        if (this.removeRiverNW == undefined) {
            this.removeRiverNW = document.getElementById("removeRiverNW");
        }
        return this.removeRiverNW;
    }
    getRemoveRiverNE() {
        if (this.removeRiverNE == undefined) {
            this.removeRiverNE = document.getElementById("removeRiverNE");
        }
        return this.removeRiverNE;
    }
    getRemoveRiverE() {
        if (this.removeRiverE == undefined) {
            this.removeRiverE = document.getElementById("removeRiverE");
        }
        return this.removeRiverE;
    }
    getRemoveRiverSE() {
        if (this.removeRiverSE == undefined) {
            this.removeRiverSE = document.getElementById("removeRiverSE");
        }
        return this.removeRiverSE;
    }
    getRemoveRiverSW() {
        if (this.removeRiverSW == undefined) {
            this.removeRiverSW = document.getElementById("removeRiverSW");
        }
        return this.removeRiverSW;
    }
    getRemoveRiverW() {
        if (this.removeRiverW == undefined) {
            this.removeRiverW = document.getElementById("removeRiverW");
        }
        return this.removeRiverW;
    }
    getSaveRivers() {
        if (this.saveRivers == undefined) {
            this.saveRivers = document.getElementById("SaveRivers");
        }
        return this.saveRivers;
    }
}
exports.RiverBenderBox = RiverBenderBox;

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShootingBigBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("shootingBigBox");
        }
        return this.self;
    }
    getCloseRangedBattleButton() {
        if (this.closeRangedBattleButton == undefined) {
            this.closeRangedBattleButton = document.getElementById("closeRangedBattleButton");
        }
        return this.closeRangedBattleButton;
    }
    getShootingInfo() {
        if (this.shootingInfo == undefined) {
            this.shootingInfo = document.getElementById("shootingInfo");
        }
        return this.shootingInfo;
    }
    getShooterTitleText() {
        if (this.shooterTitleText == undefined) {
            this.shooterTitleText = document.getElementById("shooterTitleText");
        }
        return this.shooterTitleText;
    }
    getAttackersLKPText() {
        if (this.attackersLKPText == undefined) {
            this.attackersLKPText = document.getElementById("attackersLKPText");
        }
        return this.attackersLKPText;
    }
    getAttackersSKPText() {
        if (this.attackersSKPText == undefined) {
            this.attackersSKPText = document.getElementById("attackersSKPText");
        }
        return this.attackersSKPText;
    }
    getTargetText() {
        if (this.targetText == undefined) {
            this.targetText = document.getElementById("targetText");
        }
        return this.targetText;
    }
    getXTargetText() {
        if (this.xTargetText == undefined) {
            this.xTargetText = document.getElementById("xTargetText");
        }
        return this.xTargetText;
    }
    getYTargetText() {
        if (this.yTargetText == undefined) {
            this.yTargetText = document.getElementById("yTargetText");
        }
        return this.yTargetText;
    }
    getAttackLKPBox() {
        if (this.attackLKPBox == undefined) {
            this.attackLKPBox = document.getElementById("attackLKPBox");
        }
        return this.attackLKPBox;
    }
    getLKPInputs() {
        if (this.lkpInputs == undefined || this.lkpInputs.length === 0) {
            this.lkpInputs = [document.getElementById("LKP0Input"),
                document.getElementById("LKP1Input"),
                document.getElementById("LKP2Input"),
                document.getElementById("LKP3Input"),
                document.getElementById("LKP4Input"),
                document.getElementById("LKP5Input"),
                document.getElementById("LKP6Input"),
                document.getElementById("LKP7Input"),
                document.getElementById("LKP8Input"),
                document.getElementById("LKP9Input")];
        }
        return this.lkpInputs;
    }
    getAttackSKPBox() {
        if (this.attackSKPBox == undefined) {
            this.attackSKPBox = document.getElementById("attackSKPBox");
        }
        return this.attackSKPBox;
    }
    getSKPInputs() {
        if (this.skpInputs == undefined || this.skpInputs.length === 0) {
            this.skpInputs = [document.getElementById("SKP0Input"),
                document.getElementById("SKP1Input"),
                document.getElementById("SKP2Input"),
                document.getElementById("SKP3Input"),
                document.getElementById("SKP4Input"),
                document.getElementById("SKP5Input"),
                document.getElementById("SKP6Input"),
                document.getElementById("SKP7Input"),
                document.getElementById("SKP8Input"),
                document.getElementById("SKP9Input")];
        }
        return this.skpInputs;
    }
    getRangedBattleButton() {
        if (this.rangedBattleButton == undefined) {
            this.rangedBattleButton = document.getElementById("rangedBattleButton");
        }
        return this.rangedBattleButton;
    }
}
exports.ShootingBigBox = ShootingBigBox;

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StreetCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("streetCreationBox");
        }
        return this.self;
    }
    getBuildStreet() {
        if (this.buildStreet == undefined) {
            this.buildStreet = document.getElementById("buildStreet");
        }
        return this.buildStreet;
    }
    getAddStreetNW() {
        if (this.addStreetNW == undefined) {
            this.addStreetNW = document.getElementById("addStreetNW");
        }
        return this.addStreetNW;
    }
    getAddStreetNE() {
        if (this.addStreetNE == undefined) {
            this.addStreetNE = document.getElementById("addStreetNE");
        }
        return this.addStreetNE;
    }
    getAddStreetE() {
        if (this.addStreetE == undefined) {
            this.addStreetE = document.getElementById("addStreetE");
        }
        return this.addStreetE;
    }
    getAddStreetSE() {
        if (this.addStreetSE == undefined) {
            this.addStreetSE = document.getElementById("addStreetSE");
        }
        return this.addStreetSE;
    }
    getAddStreetSW() {
        if (this.addStreetSW == undefined) {
            this.addStreetSW = document.getElementById("addStreetSW");
        }
        return this.addStreetSW;
    }
    getAddStreetW() {
        if (this.addStreetW == undefined) {
            this.addStreetW = document.getElementById("addStreetW");
        }
        return this.addStreetW;
    }
    getRemoveStreet() {
        if (this.removeStreet == undefined) {
            this.removeStreet = document.getElementById("removeStreet");
        }
        return this.removeStreet;
    }
    getRemoveStreetNW() {
        if (this.removeStreetNW == undefined) {
            this.removeStreetNW = document.getElementById("removeStreetNW");
        }
        return this.removeStreetNW;
    }
    getRemoveStreetNE() {
        if (this.removeStreetNE == undefined) {
            this.removeStreetNE = document.getElementById("removeStreetNE");
        }
        return this.removeStreetNE;
    }
    getRemoveStreetE() {
        if (this.removeStreetE == undefined) {
            this.removeStreetE = document.getElementById("removeStreetE");
        }
        return this.removeStreetE;
    }
    getRemoveStreetSE() {
        if (this.removeStreetSE == undefined) {
            this.removeStreetSE = document.getElementById("removeStreetSE");
        }
        return this.removeStreetSE;
    }
    getRemoveStreetSW() {
        if (this.removeStreetSW == undefined) {
            this.removeStreetSW = document.getElementById("removeStreetSW");
        }
        return this.removeStreetSW;
    }
    getRemoveStreetW() {
        if (this.removeStreetW == undefined) {
            this.removeStreetW = document.getElementById("removeStreetW");
        }
        return this.removeStreetW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.StreetCreationBox = StreetCreationBox;

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WallCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("wallCreationBox");
        }
        return this.self;
    }
    getBuildWall() {
        if (this.buildWall == undefined) {
            this.buildWall = document.getElementById("buildWall");
        }
        return this.buildWall;
    }
    getAddWallNW() {
        if (this.addWallNW == undefined) {
            this.addWallNW = document.getElementById("addWallNW");
        }
        return this.addWallNW;
    }
    getAddWallNE() {
        if (this.addWallNE == undefined) {
            this.addWallNE = document.getElementById("addWallNE");
        }
        return this.addWallNE;
    }
    getAddWallE() {
        if (this.addWallE == undefined) {
            this.addWallE = document.getElementById("addWallE");
        }
        return this.addWallE;
    }
    getAddWallSE() {
        if (this.addWallSE == undefined) {
            this.addWallSE = document.getElementById("addWallSE");
        }
        return this.addWallSE;
    }
    getAddWallSW() {
        if (this.addWallSW == undefined) {
            this.addWallSW = document.getElementById("addWallSW");
        }
        return this.addWallSW;
    }
    getAddWallW() {
        if (this.addWallW == undefined) {
            this.addWallW = document.getElementById("addWallW");
        }
        return this.addWallW;
    }
    getRemoveWall() {
        if (this.removeWall == undefined) {
            this.removeWall = document.getElementById("removeWall");
        }
        return this.removeWall;
    }
    getRemoveWallNW() {
        if (this.removeWallNW == undefined) {
            this.removeWallNW = document.getElementById("removeWallNW");
        }
        return this.removeWallNW;
    }
    getRemoveWallNE() {
        if (this.removeWallNE == undefined) {
            this.removeWallNE = document.getElementById("removeWallNE");
        }
        return this.removeWallNE;
    }
    getRemoveWallE() {
        if (this.removeWallE == undefined) {
            this.removeWallE = document.getElementById("removeWallE");
        }
        return this.removeWallE;
    }
    getRemoveWallSE() {
        if (this.removeWallSE == undefined) {
            this.removeWallSE = document.getElementById("removeWallSE");
        }
        return this.removeWallSE;
    }
    getRemoveWallSW() {
        if (this.removeWallSW == undefined) {
            this.removeWallSW = document.getElementById("removeWallSW");
        }
        return this.removeWallSW;
    }
    getRemoveWallW() {
        if (this.removeWallW == undefined) {
            this.removeWallW = document.getElementById("removeWallW");
        }
        return this.removeWallW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.WallCreationBox = WallCreationBox;

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorldBenderBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("worldBenderBox");
        }
        return this.self;
    }
    getCreationWarning() {
        if (this.creationWarning == undefined) {
            this.creationWarning = document.getElementById("creationWarning");
        }
        return this.creationWarning;
    }
    getToggleOnClickWorldCreationMode() {
        if (this.toggleOnClickWorldCreationMode == undefined) {
            this.toggleOnClickWorldCreationMode = document.getElementById("ToggleOnClickWorldCreationMode");
        }
        return this.toggleOnClickWorldCreationMode;
    }
    getSaveFields() {
        if (this.saveFields == undefined) {
            this.saveFields = document.getElementById("SaveFields");
        }
        return this.saveFields;
    }
    getChangeFieldSection() {
        if (this.changeFieldSection == undefined) {
            this.changeFieldSection = document.getElementById("changeFieldSection");
        }
        return this.changeFieldSection;
    }
    getChangeFieldClickedTo0() {
        if (this.changeFieldClickedTo0 == undefined) {
            this.changeFieldClickedTo0 = document.getElementById("ChangeFieldClickedTo0");
        }
        return this.changeFieldClickedTo0;
    }
    getChangeFieldClickedTo1() {
        if (this.changeFieldClickedTo1 == undefined) {
            this.changeFieldClickedTo1 = document.getElementById("ChangeFieldClickedTo1");
        }
        return this.changeFieldClickedTo1;
    }
    getChangeFieldClickedTo2() {
        if (this.changeFieldClickedTo2 == undefined) {
            this.changeFieldClickedTo2 = document.getElementById("ChangeFieldClickedTo2");
        }
        return this.changeFieldClickedTo2;
    }
    getChangeFieldClickedTo3() {
        if (this.changeFieldClickedTo3 == undefined) {
            this.changeFieldClickedTo3 = document.getElementById("ChangeFieldClickedTo3");
        }
        return this.changeFieldClickedTo3;
    }
    getChangeFieldClickedTo4() {
        if (this.changeFieldClickedTo4 == undefined) {
            this.changeFieldClickedTo4 = document.getElementById("ChangeFieldClickedTo4");
        }
        return this.changeFieldClickedTo4;
    }
    getChangeFieldClickedTo5() {
        if (this.changeFieldClickedTo5 == undefined) {
            this.changeFieldClickedTo5 = document.getElementById("ChangeFieldClickedTo5");
        }
        return this.changeFieldClickedTo5;
    }
    getChangeFieldClickedTo6() {
        if (this.changeFieldClickedTo6 == undefined) {
            this.changeFieldClickedTo6 = document.getElementById("ChangeFieldClickedTo6");
        }
        return this.changeFieldClickedTo6;
    }
    getChangeFieldClickedTo7() {
        if (this.changeFieldClickedTo7 == undefined) {
            this.changeFieldClickedTo7 = document.getElementById("ChangeFieldClickedTo7");
        }
        return this.changeFieldClickedTo7;
    }
    getChangeFieldClickedTo8() {
        if (this.changeFieldClickedTo8 == undefined) {
            this.changeFieldClickedTo8 = document.getElementById("ChangeFieldClickedTo8");
        }
        return this.changeFieldClickedTo8;
    }
    getChangeFieldClickedTo9() {
        if (this.changeFieldClickedTo9 == undefined) {
            this.changeFieldClickedTo9 = document.getElementById("ChangeFieldClickedTo9");
        }
        return this.changeFieldClickedTo9;
    }
}
exports.WorldBenderBox = WorldBenderBox;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlVariables_1 = require("../controls/controlVariables");
const gameState_1 = require("../gameState");
const landArmy_1 = require("../armies/landArmy");
const fleet_1 = require("../armies/fleet");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
var ArmyFunctions;
(function (ArmyFunctions) {
    function deleteArmy(army) {
        gameState_1.GameState.armies.splice(gameState_1.GameState.armies.indexOf(army), 1);
        //if the army is loaded in a fleet, throw it out of it
        if (army instanceof landArmy_1.LandArmy && army.isTransported()) {
            let transportingFleet = army.transportingFleet;
            if (transportingFleet != undefined) {
                transportingFleet.unloadArmy(army);
            }
        }
        if (controlVariables_1.Controls.selectedArmyIndex === gameState_1.GameState.armies.length) {
            controlVariables_1.Controls.selectedArmyIndex = -1;
        }
    }
    ArmyFunctions.deleteArmy = deleteArmy;
    // returns the next armyId not yet assigned for the caller
    function generateArmyId(type, owner) {
        let ownedArmies = gameState_1.GameState.armies.filter(army => army.owner === owner);
        if (type === 1) { //foot armies
            let ownedFootArmies = ownedArmies.filter(army => army instanceof footArmy_1.FootArmy);
            for (let result = 101; result < 200; result++) {
                if (!ownedFootArmies.some(army => army.getErkenfaraID() === result)) {
                    return result;
                }
            }
            throw new Error("Du hast die maximale Anzahl an Fußheeren erreicht.");
        }
        else if (type === 2) { //rider armies
            let ownedRiderArmies = ownedArmies.filter(army => army instanceof riderArmy_1.RiderArmy);
            for (let result = 201; result < 300; result++) {
                if (!ownedRiderArmies.some(army => army.getErkenfaraID() === result)) {
                    return result;
                }
            }
            throw new Error("Du hast die maximale Anzahl an Reiterheeren erreicht.");
        }
        else if (type === 3) { //fleets
            let ownedFleets = ownedArmies.filter(army => army instanceof fleet_1.Fleet);
            for (let result = 301; result < 400; result++) {
                if (!ownedFleets.some(army => army.getErkenfaraID() === result)) {
                    return result;
                }
            }
            throw new Error("Du hast die maximale Anzahl an Flotten erreicht.");
        }
        else {
            throw new Error("Unknown army type.");
        }
    }
    ArmyFunctions.generateArmyId = generateArmyId;
    function checkArmiesForLiveliness() {
        //find all dead armies
        let deadArmies = gameState_1.GameState.armies.filter(army => !army.isAlive());
        //delete them
        deadArmies.forEach(deadArmy => deleteArmy(deadArmy));
    }
    ArmyFunctions.checkArmiesForLiveliness = checkArmiesForLiveliness;
})(ArmyFunctions = exports.ArmyFunctions || (exports.ArmyFunctions = {}));

},{"../armies/fleet":4,"../armies/footArmy":5,"../armies/landArmy":6,"../armies/riderArmy":9,"../controls/controlVariables":18,"../gameState":28}],49:[function(require,module,exports){
"use strict";
// contains helper functions to get information about a field out of the fields array with just its coordinates.
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const wall_1 = require("../buildings/wall");
const constants_1 = require("../constants");
const drawingFunctions_1 = require("../gui/drawingFunctions");
var HexFunction;
(function (HexFunction) {
    var SIN60 = constants_1.Constants.SIN60;
    // this.id = function(){
    //     //TODO: GroßhexKleinhex Zahl bestimmen.
    // }
    // returns the fields neighbors in the usual order
    function neighbors(hex) {
        //usual order: NW,NO,O,SO,SW,W
        if (hex[1] % 2 === 0) {
            return [[hex[0], hex[1] - 1], [hex[0] + 1, hex[1] - 1], [hex[0] + 1, hex[1]],
                [hex[0] + 1, hex[1] + 1], [hex[0], hex[1] + 1], [hex[0] - 1, hex[1]]];
        }
        else {
            return [[hex[0] - 1, hex[1] - 1], [hex[0], hex[1] - 1], [hex[0] + 1, hex[1]],
                [hex[0], hex[1] + 1], [hex[0] - 1, hex[1] + 1], [hex[0] - 1, hex[1]]];
        }
    }
    HexFunction.neighbors = neighbors;
    // order: NW,NO,O,SO,SW,W,
    function fluesse(hex) {
        let result = [false, false, false, false, false, false];
        let surroundings = neighbors(hex);
        gameState_1.GameState.rivers.forEach(river => {
            if ((hex[0] === river.leftBank[0] && hex[1] === river.leftBank[1]) ||
                (hex[0] === river.rightBank[0] && hex[1] === river.rightBank[1])) {
                surroundings.forEach((surrounding, index) => {
                    if ((surrounding[0] === river.leftBank[0] && surrounding[1] === river.leftBank[1]) ||
                        (surrounding[0] === river.rightBank[0] && surrounding[1] === river.rightBank[1])) {
                        result[index] = true;
                    }
                });
            }
        });
        return result;
    }
    HexFunction.fluesse = fluesse;
    // where in the field list is this field
    function positionInList(hex) {
        return gameState_1.GameState.fields.findIndex(field => field.coordinates[0] === hex[0] && field.coordinates[1] === hex[1]);
    }
    HexFunction.positionInList = positionInList;
    // what type is this field
    function fieldType(hex) {
        let foundField = gameState_1.GameState.fields.find(field => field.coordinates[0] === hex[0] &&
            field.coordinates[1] === hex[1]);
        return (foundField != undefined) ? foundField.type : -1;
    }
    HexFunction.fieldType = fieldType;
    // what height is this field
    function height(hex) {
        let field = gameState_1.GameState.fields.find(field => field.coordinates[0] === hex[0] && field.coordinates[1] === hex[1]);
        return (field != undefined) ? field.getHeight() : -1;
    }
    HexFunction.height = height;
    //order: NW,NO,O,SO,SW,W
    //returns the number value corresponting to the direction. if it has a .5 it is 
    function getDirectionToNeighbor(from, to) {
        if (distance(from, to) === 1) {
            let possibleDir = neighbors(from);
            for (let i = 0; i < possibleDir.length; i++) {
                if (possibleDir[i][0] == to[0] && possibleDir[i][1] === to[1])
                    return i;
            }
        }
        else if (distance(from, to) === 2) {
            let targetNeighbors = neighbors(to);
            let originNeighbors = neighbors(from);
            let foundNeigh = false;
            let direction = -1;
            targetNeighbors.forEach(targetNeighbor => {
                originNeighbors.forEach((originNeighbor, index) => {
                    if (targetNeighbor[0] === originNeighbor[0] && targetNeighbor[1] === originNeighbor[1]) {
                        if (foundNeigh === false) {
                            foundNeigh = true;
                            direction = index;
                        }
                        else {
                            direction -= 0.5;
                        }
                    }
                });
            });
            return direction;
        }
        return -1; //in case the to field is not a neighbor
    }
    HexFunction.getDirectionToNeighbor = getDirectionToNeighbor;
    //returns the distance from here to target Hex
    //to properly do this we use a 3D/Cube coordinate system as described at
    //https://www.redblobgames.com/grids/hexagons/
    function distance(origin, to) {
        //this is the cube coordinates for the current Hex
        let thisCubeX = origin[0] - (origin[1] + (origin[1] & 1)) / 2;
        let thisCubeZ = origin[1];
        let thisCubeY = -thisCubeX - thisCubeZ;
        //this is the cube coordinates for the current Hex
        //bitwise & as an alternative to modulo that works without exceptions(negative numbers)
        let targetCubeX = to[0] - (to[1] + (to[1] & 1)) / 2;
        let targetCubeZ = to[1];
        let targetCubeY = -targetCubeX - targetCubeZ;
        return Math.max(Math.abs(thisCubeX - targetCubeX), Math.abs(thisCubeY - targetCubeY), Math.abs(thisCubeZ - targetCubeZ));
    }
    HexFunction.distance = distance;
    function neighborInRange(hex, range) {
        let neighbors = [];
        for (let i = hex[0] - range; i <= hex[0] + range; i++) {
            for (let j = hex[1] - range; j <= hex[1] + range; j++) {
                let dist = distance(hex, [i, j]);
                if (i != hex[0] || j != hex[1]) {
                    if (dist <= range) {
                        neighbors.push([i, j]);
                    }
                }
            }
        }
        return neighbors;
    }
    HexFunction.neighborInRange = neighborInRange;
    function findCommonNeighbor(from, to) {
        let targetNeighbors = neighbors(to);
        let originNeighbors = neighbors(from);
        let foundCommon = [];
        targetNeighbors.forEach(targetNeighbor => {
            originNeighbors.forEach(originNeighbor => {
                if (targetNeighbor[0] === originNeighbor[0] && targetNeighbor[1] === originNeighbor[1]) {
                    foundCommon.push(targetNeighbor);
                }
            });
        });
        return foundCommon;
    }
    HexFunction.findCommonNeighbor = findCommonNeighbor;
    // does the field has a street on it in any direction
    function hasStreet(hex) {
        return gameState_1.GameState.buildings.some((elem) => elem.type === 8 /* STREET */ &&
            ((elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) ||
                (elem.getSecondPosition()[0] === hex[0] &&
                    elem.getSecondPosition()[1] === hex[1])));
    }
    HexFunction.hasStreet = hasStreet;
    // in which directions does this field have walls (order as above, only walls build on this field)
    function walls(hex) {
        let result = [false, false, false, false, false, false];
        let walls = gameState_1.GameState.buildings.filter(elem => (elem instanceof wall_1.Wall &&
            elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]));
        walls.forEach(wall => {
            switch (wall.facing) {
                case 0 /* NW */:
                    result[0] = true;
                    break;
                case 1 /* NE */:
                    result[1] = true;
                    break;
                case 2 /* E */:
                    result[2] = true;
                    break;
                case 3 /* SE */:
                    result[3] = true;
                    break;
                case 4 /* SW */:
                    result[4] = true;
                    break;
                case 5 /* W */:
                    result[5] = true;
                    break;
            }
        });
        return result;
    }
    HexFunction.walls = walls;
    // in which directions does this field have bridges (order as above)
    function bridges(hex) {
        let result = [false, false, false, false, false, false];
        let neighbor = neighbors(hex);
        gameState_1.GameState.buildings.forEach(elem => {
            if (elem.type === 7 /* BRIDGE */) { //bridge type
                if (elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) { //bridge on this field
                    result[neighbor.indexOf(elem.getSecondPosition())] = true;
                }
                else if (elem.getSecondPosition()[0] === hex[0] &&
                    elem.getSecondPosition()[1] === hex[1]) {
                    result[neighbor.indexOf(elem.getPosition())] = true;
                }
            }
        });
        return result;
    }
    HexFunction.bridges = bridges;
    //computes a fields position (upper left corner of inscribing rectangle)
    function computePosition(orig, curr, scale) {
        //get the current field's x position
        let xpos = orig[0] + (curr[0] * scale * SIN60);
        //each odd row is offset half a hex to the left
        return [(((curr[1] % 2) !== 0) ? (xpos - (0.5 * scale * SIN60)) : (xpos)), orig[1] + (curr[1] * drawingFunctions_1.Drawing.gH)];
    }
    HexFunction.computePosition = computePosition;
    //for all directions in the usual order (nw, ne, e, se, sw, w)
    //returns true if candidates contains the neighbor of field in the respective direction
    function getAdjacency(field, candidates) {
        let result = [false, false, false, false, false, false];
        let neighbors = HexFunction.neighbors(field);
        neighbors.forEach((neighbor, neighborIndex) => result[neighborIndex] = candidates.some(candidate => candidate[0] === neighbor[0] && candidate[1] === neighbor[1]));
        return result;
    }
    HexFunction.getAdjacency = getAdjacency;
    function findWallInWay(from, to) {
        let foundWallsIndeces = [];
        let dir = HexFunction.getDirectionToNeighbor(from, to);
        if (HexFunction.distance(from, to) === 1) {
            dir = (dir + 3) % 6;
            let wallIndex = getWallIndexOnFieldInDirection(to, dir);
            if (wallIndex != -1) {
                foundWallsIndeces.push(wallIndex);
                return foundWallsIndeces;
            }
        }
        else if (HexFunction.distance(from, to) === 2) {
            if (dir % 1 === 0) {
                let commonNeig = HexFunction.findCommonNeighbor(from, to);
                if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir) !== -1) { //case back facing wall on common neighbor
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir));
                }
                dir = (dir + 3) % 6;
                if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir) !== -1) { //case front facing wall on common neighbor
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir));
                }
                if (getWallIndexOnFieldInDirection(to, dir) !== -1) { //case front wall on target
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dir));
                }
            }
            else {
                let commonNeig = HexFunction.findCommonNeighbor(from, to);
                dir = Math.floor(dir);
                let dirCommon1 = (dir + 3) % 6;
                if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1) !== -1) { //case front facing wall on common neighbor 1
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1));
                }
                dirCommon1 = (dir + 1) % 6;
                if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1) !== -1) { //case back facing wall on common neighbor 1
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1));
                }
                let dirCommon2 = (dir + 4) % 6;
                if (getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2) !== -1) { //case front facing wall on common neighbor 2
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2));
                }
                dirCommon2 = dir;
                if (getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2) !== -1) { //case back facing wall on common neighbor 2
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2));
                }
                let dirTarget = (dir + 3) % 6;
                if (getWallIndexOnFieldInDirection(to, dirTarget) !== -1) { //case front facing wall on target
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dirTarget));
                }
                dirTarget = (dir + 4) % 6;
                if (getWallIndexOnFieldInDirection(to, dirTarget) !== -1) { //case front facing wall on target
                    foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dirTarget));
                }
            }
        }
        return foundWallsIndeces;
    }
    HexFunction.findWallInWay = findWallInWay;
    //returns all walls on target field
    function getWallIndexOnFieldInDirection(hex, direction) {
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            if (gameState_1.GameState.buildings[i] instanceof wall_1.Wall) {
                let thisIsAWall = gameState_1.GameState.buildings[i];
                if (thisIsAWall.getPosition()[0] === hex[0] &&
                    thisIsAWall.getPosition()[1] === hex[1] && thisIsAWall.facing === direction) {
                    return i;
                }
            }
        }
        return -1;
    }
})(HexFunction = exports.HexFunction || (exports.HexFunction = {}));

},{"../buildings/wall":15,"../constants":16,"../gameState":28,"../gui/drawingFunctions":34}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringToDirection(dir) {
    switch (dir) {
        case "nw": return 0 /* NW */;
        case "ne": return 1 /* NE */;
        case "e": return 2 /* E */;
        case "se": return 3 /* SE */;
        case "sw": return 4 /* SW */;
        case "w": return 5 /* W */;
        default: throw new Error("Invalid direction.");
    }
}
exports.stringToDirection = stringToDirection;
function directionToString(dir) {
    switch (dir) {
        case 0 /* NW */: return "nw";
        case 1 /* NE */: return "ne";
        case 2 /* E */: return "e";
        case 3 /* SE */: return "se";
        case 4 /* SW */: return "sw";
        case 5 /* W */: return "w";
        default: throw new Error("Invalid direction.");
    }
}
exports.directionToString = directionToString;
function reverseDirection(direction) {
    switch (direction) {
        case 0 /* NW */: return 3 /* SE */;
        case 1 /* NE */: return 4 /* SW */;
        case 2 /* E */: return 5 /* W */;
        case 3 /* SE */: return 0 /* NW */;
        case 4 /* SW */: return 1 /* NE */;
        case 5 /* W */: return 2 /* E */;
        default: throw new Error("Invalid direction.");
    }
}
exports.reverseDirection = reverseDirection;

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(coordinates, type) {
        this.coordinates = coordinates;
        this.type = type;
    }
    getHeight() {
        switch (this.type) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */: return 0;
            case 2 /* LOWLANDS */:
            case 3 /* WOODS */:
            case 7 /* DESERT */:
            case 8 /* SWAMP */: return 1;
            case 4 /* HILLS */: return 2;
            case 5 /* HIGHLANDS */: return 3;
            case 6 /* MOUNTAINS */: return 4;
            default: return -1;
        }
    }
}
exports.Field = Field;

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapEntity {
    constructor(position, owner) {
        this.position = [0, 0];
        // copy the position so that this object doesn't share a reference with anything else
        this.position[0] = position[0];
        this.position[1] = position[1];
        this.owner = owner;
    }
    getPosition() {
        return [this.position[0], this.position[1]];
    }
}
exports.MapEntity = MapEntity;

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class River {
    constructor(leftBank, rightBank) {
        this.leftBank = leftBank;
        this.rightBank = rightBank;
    }
}
exports.River = River;

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mouseFunctions_1 = require("./controls/mouseFunctions");
const drawingFunctions_1 = require("./gui/drawingFunctions");
const gui_1 = require("./gui/gui");
const loadingDataFunctions_1 = require("./serverInteraction/loadingDataFunctions");
// attach handlers to mouse events and canvas resizing
window.addEventListener('resize', drawingFunctions_1.Drawing.resizeCanvas, false);
gui_1.GUI.getCanvas().addEventListener('mousedown', mouseFunctions_1.MouseFunctions.mouseDown, true);
document.addEventListener('mouseup', mouseFunctions_1.MouseFunctions.mouseUp, true);
gui_1.GUI.getCanvas().addEventListener('mousemove', mouseFunctions_1.MouseFunctions.mouseMove, true);
gui_1.GUI.getCanvas().addEventListener('wheel', mouseFunctions_1.MouseFunctions.mouseWheel, true);
// initializing the tool
loadingDataFunctions_1.Loading.getNewDataFromServer();
loadingDataFunctions_1.Loading.loadTurnNumber();
loadingDataFunctions_1.Loading.loadImages(drawingFunctions_1.Drawing.tileset);
drawingFunctions_1.Drawing.setHexParts(drawingFunctions_1.Drawing.scale);
// activating periodic reloading of data from server
setInterval(loadingDataFunctions_1.Loading.getNewDataFromServer, 30000);

},{"./controls/mouseFunctions":19,"./gui/drawingFunctions":34,"./gui/gui":36,"./serverInteraction/loadingDataFunctions":57}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Realm {
    constructor(name, tag, color, homeTurf, active) {
        this.name = "";
        this.tag = "";
        this.color = "000,000,000";
        this.homeTurf = 0 /* SHALLOWS */;
        this.territory = [];
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
        this.active = active;
    }
    getTerritoryCoordinates() {
        return this.territory.map(field => field.coordinates);
    }
}
exports.Realm = Realm;

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const loadingDataFunctions_1 = require("./loadingDataFunctions");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
var Authentication;
(function (Authentication) {
    var show = boxVisibilty_1.BoxVisibility.show;
    var hide = boxVisibilty_1.BoxVisibility.hide;
    //put the url/IP for the remote game server here
    // export let url = "http://phoenixserver.h2610265.stratoserver.net"; // online server
    Authentication.url = "http://localhost:8000"; // for local debug
    Authentication.authenticationToken = 0; // the session Token, default = 0.
    // function to get the authenticationToken from the server and save a login time
    function loginToServer() {
        let username = document.getElementById("loginName").value;
        let password = document.getElementById("loginPassword").value;
        // Request to server with username and password in plaintext
        // TODO: make safe
        Authentication.logintime = 0;
        $.post({
            url: Authentication.url + "/databaseLink/login/",
            data: {
                username: username,
                password: password
            },
            success: (data) => {
                // saving the authenticationToken
                Authentication.authenticationToken = data.token;
                gameState_1.GameState.login = data.group;
                // if the user is a GM, godmode possibility is displayed
                if (gameState_1.GameState.login === 'sl') {
                    gui_1.GUI.getToggleGMBarButton().style.display = "";
                    if (gameState_1.GameState.currentTurn.status === 'fi') {
                        let btnToShow = document.getElementById("eventTabsButton");
                        if (btnToShow !== null) {
                            show(btnToShow);
                        }
                        loadingDataFunctions_1.Loading.loadPendingEvents();
                    }
                }
                // overwrite old known data
                loadingDataFunctions_1.Loading.getNewDataFromServer();
                Authentication.logintime = 0;
                hide(gui_1.GUI.getBigBox().getEventTabsButton());
                gui_1.GUI.getBigBox().getEventsTab().innerHTML = "";
                drawingFunctions_1.Drawing.writeTurnNumber();
            },
            error: (data) => {
                // alert for a failed login
                alert("Login failed and logged in as guest. Check username or password.");
                loadingDataFunctions_1.Loading.getNewDataFromServer();
            },
            dataType: "json"
        });
        // change loginBox to infoBox
        show(gui_1.GUI.getInfoBox().getSelf());
        hide(gui_1.GUI.getLoginBox());
    }
    Authentication.loginToServer = loginToServer;
    // logs out from Server, closes everything you need login for, deletes login time
    function logoutFromServer() {
        //loging out from server
        $.post({
            url: Authentication.url + "/databaseLink/logout/"
        });
        // turning off godmode Box, and changing infoBox to Login Box
        gameState_1.GameState.login = 'guest';
        boxVisibilty_1.BoxVisibility.switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        boxVisibilty_1.BoxVisibility.switchModeTo("none");
        // Hide gm functionalities
        hide(gui_1.GUI.getGodModeBox().getSelf());
        hide(gui_1.GUI.getToggleGMBarButton());
        hide(gui_1.GUI.getInfoBox().getSelf());
        show(gui_1.GUI.getLoginBox());
        //change the info change box, back to the normal info Box
        hide(gui_1.GUI.getInfoChangeBox().getSelf());
        // forget old authenticationToken
        Authentication.authenticationToken = 0;
        // overwrite previously known data
        loadingDataFunctions_1.Loading.getNewDataFromServer();
        Authentication.logintime = 0;
        hide(gui_1.GUI.getBigBox().getEventTabsButton());
        let eventList = gui_1.GUI.getBigBox().getEventsTab();
        eventList.innerHTML = "";
        gui_1.GUI.getBigBox().closeAllTabs();
        gameState_1.GameState.newEvents = [];
        gameState_1.GameState.loadedEvents = [];
        drawingFunctions_1.Drawing.writeTurnNumber();
    }
    Authentication.logoutFromServer = logoutFromServer;
})(Authentication = exports.Authentication || (exports.Authentication = {}));

},{"../gameState":28,"../gui/boxVisibilty":31,"../gui/drawingFunctions":34,"../gui/gui":36,"./loadingDataFunctions":57}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawingFunctions_1 = require("../gui/drawingFunctions");
const authenticationFunctions_1 = require("./authenticationFunctions");
const gameState_1 = require("../gameState");
const moveEvent_1 = require("../events/moveEvent");
const battleEvent_1 = require("../events/battleEvent");
const shootEvent_1 = require("../events/shootEvent");
const mergeEvent_1 = require("../events/mergeEvent");
const mountEvent_1 = require("../events/mountEvent");
const transferEvent_1 = require("../events/transferEvent");
const splitEvent_1 = require("../events/splitEvent");
const realm_1 = require("../realm");
const riderArmy_1 = require("../armies/riderArmy");
const river_1 = require("../map/river");
const field_1 = require("../map/field");
const footArmy_1 = require("../armies/footArmy");
const fleet_1 = require("../armies/fleet");
const direction_1 = require("../map/direction");
const wall_1 = require("../buildings/wall");
const productionBuilding_1 = require("../buildings/productionBuilding");
const nonDestructibleBuilding_1 = require("../buildings/nonDestructibleBuilding");
const images_1 = require("../gui/images");
const gui_1 = require("../gui/gui");
var Loading;
(function (Loading) {
    // help function to fetch current data from the server
    var url = authenticationFunctions_1.Authentication.url;
    function getNewDataFromServer() {
        loadMap();
    }
    Loading.getNewDataFromServer = getNewDataFromServer;
    function loadTurnNumber() {
        $.getJSON(url + "/databaseLink/getturn/", (json) => {
            gameState_1.GameState.currentTurn = json;
            drawingFunctions_1.Drawing.writeTurnNumber();
        });
    }
    Loading.loadTurnNumber = loadTurnNumber;
    function loadPendingEvents() {
        $.getJSON(url + "/databaseLink/getevents/", (json) => {
            let pendingEvents = json;
            gameState_1.GameState.loadedEvents = [];
            pendingEvents.forEach((item, index) => {
                let content = item.content;
                let realm;
                switch (item.type) {
                    case "move":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new moveEvent_1.MoveEvent(index, 5 /* Undetermined */, realm, content.armyId, [content.fromX, content.fromY], [content.toX, content.toY], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "battle":
                        gameState_1.GameState.loadedEvents.push(new battleEvent_1.BattleEvent(index, 5 /* Undetermined */, content.participants, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        break;
                    case "shoot":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new shootEvent_1.ShootEvent(index, 5 /* Undetermined */, realm, content.armyId, [content.toX, content.toY], [content.fromX, content.fromY], content.LKPcount, content.SKPcount, content.target, item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "split":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new splitEvent_1.SplitEvent(index, 5 /* Undetermined */, content.fromArmy, content.newArmy, realm, content.troops, content.leaders, content.mounts, content.lkp, content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "merge":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new mergeEvent_1.MergeEvent(index, 5 /* Undetermined */, content.fromArmy, content.toArmy, realm, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "mount":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new mountEvent_1.MountEvent(index, 5 /* Undetermined */, content.fromArmy, content.newArmy, realm, content.troops, content.leaders, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "transfer":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new transferEvent_1.TransferEvent(index, 5 /* Undetermined */, content.fromArmy, content.toArmy, realm, content.troops, content.leaders, content.mounts, content.lkp, content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    default:
                        window.alert("Event of unknown type " + item.type + ".");
                        break;
                }
            });
            gui_1.GUI.getBigBox().fillEventList();
        });
    }
    Loading.loadPendingEvents = loadPendingEvents;
    function loadMap() {
        let timetest;
        $.getJSON(url + "/databaseLink/getlastsavedtimestamp/", (json) => {
            timetest = "";
            for (let i = 0; i < json.length; i++) {
                timetest += json[i];
            }
            if (authenticationFunctions_1.Authentication.logintime == undefined || authenticationFunctions_1.Authentication.logintime < Date.parse(timetest)) {
                authenticationFunctions_1.Authentication.logintime = Date.now();
                loadCSRFToken();
                loadRealmData();
                loadFieldData();
                loadArmies();
                loadRiverData();
                loadBuildingData();
                loadBorderData();
                drawingFunctions_1.Drawing.drawStuff();
            }
        });
    }
    Loading.loadMap = loadMap;
    function loadCSRFToken() {
        $.getJSON(url + "/databaseLink/gettoken/", (json) => {
            authenticationFunctions_1.Authentication.currentCSRFToken = json;
        });
    }
    Loading.loadCSRFToken = loadCSRFToken;
    //loads the armies data from the server.
    //Data the client is not supposed to have based on his login status is set to -1.
    function loadArmies() {
        $.post({
            url: url + "/databaseLink/armydata/",
            data: { authorization: authenticationFunctions_1.Authentication.authenticationToken },
            success: (data) => {
                gameState_1.GameState.armies = data.map(army => {
                    let armyOwner = gameState_1.GameState.realms.find(realm => realm.tag === army.realm);
                    if (armyOwner != undefined) {
                        switch (Math.floor(army.armyId / 100)) {
                            case 1:
                                return new footArmy_1.FootArmy(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, army.mounts, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 2:
                                return new riderArmy_1.RiderArmy(army.armyId, armyOwner, army.count, army.leaders, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 3:
                                return new fleet_1.Fleet(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, [army.x, army.y], army.movementPoints, army.isGuard);
                            default:
                                return undefined;
                        }
                    }
                    else {
                        window.alert("Realm with tag " + army.realm + " not found.");
                        return undefined;
                    }
                }).filter(army => army != undefined);
                // if needed, load Troops into ships
                data.forEach(army => {
                    if (army.isLoadedIn != undefined) {
                        gameState_1.GameState.armies.find(transport => transport.getErkenfaraID() === army.isLoadedIn &&
                            transport.owner.tag === army.realm).loadArmy(gameState_1.GameState.armies.find(transported => transported.getErkenfaraID() === army.armyId &&
                            transported.owner.tag === army.realm));
                    }
                });
                // if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
                gui_1.GUI.getBigBox().fillEventList();
            },
            dataType: "json"
        });
    }
    Loading.loadArmies = loadArmies;
    function loadFieldData() {
        $.getJSON(url + "/databaseLink/fielddata/", (json) => {
            gameState_1.GameState.fields = json.map(field => new field_1.Field([field.x, field.y], field.type));
            drawingFunctions_1.Drawing.resizeCanvas();
            drawingFunctions_1.Drawing.drawStuff();
        });
    }
    Loading.loadFieldData = loadFieldData;
    function loadRealmData() {
        $.getJSON(url + "/databaseLink/getrealms/", (json) => {
            gameState_1.GameState.realms = json.map(realm => new realm_1.Realm(realm.name, realm.tag, realm.color, Number(realm.homeTurf), realm.active));
        });
    }
    Loading.loadRealmData = loadRealmData;
    function loadRiverData() {
        $.getJSON(url + "/databaseLink/getriverdata/", (json) => {
            //load the rivers from the database
            gameState_1.GameState.rivers = json.map(river => new river_1.River([river.firstX, river.firstY], [river.secondX, river.secondY]));
        });
    }
    Loading.loadRiverData = loadRiverData;
    function loadBuildingData() {
        $.getJSON(url + "/databaseLink/buildingdata/", (json) => {
            gameState_1.GameState.buildings = json.map(building => {
                let owner = gameState_1.GameState.realms.find(realm => realm.tag === building.realm);
                if (owner != undefined) {
                    switch (building.type) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            return new productionBuilding_1.ProductionBuilding(building.type, building.name, [building.firstX, building.firstY], owner, building.buildPoints);
                        case 5:
                            return new wall_1.Wall(building.type, [building.firstX, building.firstY], owner, building.buildPoints, direction_1.stringToDirection(building.direction), building.guardCount);
                        case 6:
                        case 7:
                        case 8:
                            return new nonDestructibleBuilding_1.NonDestructibleBuilding(building.type, [building.firstX, building.firstY], [building.secondX, building.secondY], owner);
                        default:
                            return undefined;
                    }
                }
                else {
                    window.alert("Unknown realm with tag " + building.realm + ".");
                    return undefined;
                }
            }).filter(building => building != undefined);
        });
    }
    Loading.loadBuildingData = loadBuildingData;
    function loadBorderData() {
        $.getJSON(url + "/databaseLink/getborderdata/", (json) => {
            //load the borders from the database
            json.forEach(realm => {
                let realmToFill = gameState_1.GameState.realms.find(candidate => candidate.tag === realm.tag);
                if (realmToFill != undefined) {
                    realmToFill.territory = realm.land.map(land => gameState_1.GameState.fields.find(field => field.coordinates === land)).filter(field => field != undefined);
                }
                else {
                    window.alert("Unknown realm with tag " + realm.tag + ".");
                }
            });
        });
    }
    Loading.loadBorderData = loadBorderData;
    function loadImages(tileset) {
        let pathPrefix = './tilesets/' + tileset; //build the path prefix common to all tile images
        images_1.Images.shallows.src = pathPrefix + '/shallows.svg'; //terrain
        images_1.Images.deepsea.src = pathPrefix + '/deepsea.svg';
        images_1.Images.lowlands.src = pathPrefix + '/lowlands.svg';
        images_1.Images.woods.src = pathPrefix + '/woods.svg';
        images_1.Images.hills.src = pathPrefix + '/hills.svg';
        images_1.Images.highlands.src = pathPrefix + '/highlands.svg';
        images_1.Images.mountains.src = pathPrefix + '/mountains.svg';
        images_1.Images.desert.src = pathPrefix + '/desert.svg';
        images_1.Images.swamp.src = pathPrefix + '/swamp.svg';
        images_1.Images.default.src = pathPrefix + '/default.svg';
        images_1.Images.troops.src = pathPrefix + '/troops.svg'; //troops
        images_1.Images.mounts.src = pathPrefix + '/mounts.svg';
        images_1.Images.boats.src = pathPrefix + '/boat.svg';
        images_1.Images.castle.src = pathPrefix + '/castle.svg'; //buildings
        images_1.Images.city.src = pathPrefix + '/city.svg';
        images_1.Images.fortress.src = pathPrefix + '/fortress.svg';
        images_1.Images.capital.src = pathPrefix + '/capital_city.svg';
        images_1.Images.capitalFort.src = pathPrefix + '/capital_fortress.svg';
        images_1.Images.wallW.src = pathPrefix + '/wall_w.svg';
        images_1.Images.wallE.src = pathPrefix + '/wall_e.svg';
        images_1.Images.wallNW.src = pathPrefix + '/wall_nw.svg';
        images_1.Images.wallSW.src = pathPrefix + '/wall_sw.svg';
        images_1.Images.wallNE.src = pathPrefix + '/wall_ne.svg';
        images_1.Images.wallSE.src = pathPrefix + '/wall_se.svg';
        images_1.Images.harborW.src = pathPrefix + '/harbor_w.svg';
        images_1.Images.harborE.src = pathPrefix + '/harbor_e.svg';
        images_1.Images.harborNW.src = pathPrefix + '/harbor_nw.svg';
        images_1.Images.harborSW.src = pathPrefix + '/harbor_sw.svg';
        images_1.Images.harborNE.src = pathPrefix + '/harbor_ne.svg';
        images_1.Images.harborSE.src = pathPrefix + '/harbor_se.svg';
        images_1.Images.bridgeW.src = pathPrefix + '/bridge_w.svg';
        images_1.Images.bridgeE.src = pathPrefix + '/bridge_e.svg';
        images_1.Images.bridgeNW.src = pathPrefix + '/bridge_nw.svg';
        images_1.Images.bridgeSW.src = pathPrefix + '/bridge_sw.svg';
        images_1.Images.bridgeNE.src = pathPrefix + '/bridge_ne.svg';
        images_1.Images.bridgeSE.src = pathPrefix + '/bridge_se.svg';
    }
    Loading.loadImages = loadImages;
})(Loading = exports.Loading || (exports.Loading = {}));

},{"../armies/fleet":4,"../armies/footArmy":5,"../armies/riderArmy":9,"../buildings/nonDestructibleBuilding":13,"../buildings/productionBuilding":14,"../buildings/wall":15,"../events/battleEvent":20,"../events/mergeEvent":22,"../events/mountEvent":23,"../events/moveEvent":24,"../events/shootEvent":25,"../events/splitEvent":26,"../events/transferEvent":27,"../gameState":28,"../gui/drawingFunctions":34,"../gui/gui":36,"../gui/images":38,"../map/direction":50,"../map/field":51,"../map/river":53,"../realm":55,"./authenticationFunctions":56}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const controlVariables_1 = require("../controls/controlVariables");
const authenticationFunctions_1 = require("./authenticationFunctions");
const footArmy_1 = require("../armies/footArmy");
const landArmy_1 = require("../armies/landArmy");
const moveEvent_1 = require("../events/moveEvent");
const battleEvent_1 = require("../events/battleEvent");
const mergeEvent_1 = require("../events/mergeEvent");
const transferEvent_1 = require("../events/transferEvent");
const splitEvent_1 = require("../events/splitEvent");
const mountEvent_1 = require("../events/mountEvent");
const shootEvent_1 = require("../events/shootEvent");
var Saving;
(function (Saving) {
    function sendEvents() {
        sendEventlistInOrder(0);
        gameState_1.GameState.loadedEvents.forEach(event => {
            if (event.getStatus() === 0 /* Checked */) {
                sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
            }
            else if (event.getStatus() === 1 /* Deleted */) {
                sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
            }
        });
        sendNextTurn();
    }
    Saving.sendEvents = sendEvents;
    function sendEventlistInOrder(index) {
        if (index !== gameState_1.GameState.newEvents.length) {
            let cPE = gameState_1.GameState.newEvents[index];
            let cPEContent = cPE.asStringifiedJSON();
            if (cPE instanceof moveEvent_1.MoveEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/moveevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert('Invalid input. Moved troop does not exist.');
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send move events for your troops.');
                        }
                    }
                });
            }
            else if (cPE instanceof battleEvent_1.BattleEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/battleevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Not all troops participating in a battle exist.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send battle events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE instanceof mergeEvent_1.MergeEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/mergeevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the merging of troops.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send merge events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE instanceof transferEvent_1.TransferEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/transferevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the transfer of troops.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send transfer events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE instanceof splitEvent_1.SplitEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/splitevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the splitting of armies.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send split events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE instanceof mountEvent_1.MountEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/mountevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with mounting or unmounting.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send split events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE instanceof shootEvent_1.ShootEvent) {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/shootevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the shooting of armies.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send shooting events involving your troops.');
                        }
                    }
                });
            }
            else {
                gameState_1.GameState.newEvents = [];
            }
        }
    }
    Saving.sendEventlistInOrder = sendEventlistInOrder;
    function saveFields() {
        $(function () {
            $.ajaxSetup({
                headers: { "X-CSRFToken": authenticationFunctions_1.Authentication.currentCSRFToken } // getCookie("csrftoken")
            });
        });
        let dataToServerString = JSON.stringify(controlVariables_1.Controls.changedFields.map(changedField => {
            return { 'type': changedField.type, 'x': changedField.coordinates[0], 'y': changedField.coordinates[1] };
        }));
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/savefielddata/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                map: dataToServerString
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveFields = saveFields;
    // probably deprecated
    function sendAllPreparedEvents() {
        for (let i = 0; i < gameState_1.GameState.newEvents.length; i++) {
            let cPE = gameState_1.GameState.newEvents[i];
            let cPEContent = cPE.asStringifiedJSON();
            sendNewEvent(cPE.typeAsString(), cPEContent);
        }
    }
    Saving.sendAllPreparedEvents = sendAllPreparedEvents;
    function saveRivers() {
        let dataToServerString = JSON.stringify(gameState_1.GameState.rivers.map(river => {
            return { 'firstX:': river.rightBank[0], 'firstY:': river.rightBank[1],
                'secondX:': river.leftBank[0], 'secondY:': river.leftBank[1] };
        }));
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/saveriverdata/",
            data: {
                river: dataToServerString,
                authorization: authenticationFunctions_1.Authentication.authenticationToken
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveRivers = saveRivers;
    function saveBuildings() {
        let dataToServerString = JSON.stringify(controlVariables_1.Controls.changedBuildings.map(changedBuilding => {
            return { 'added/changed': changedBuilding[0], 'building': changedBuilding[1].buildingAsJSON() };
        }));
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/savebuildingdata/",
            data: {
                buildings: dataToServerString,
                authorization: authenticationFunctions_1.Authentication.authenticationToken
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveBuildings = saveBuildings;
    function saveArmies() {
        let sensibleArmyList = gameState_1.GameState.armies.map(elem => {
            return {
                armyId: elem.getErkenfaraID(),
                count: elem.getTroopCount(),
                leaders: elem.getOfficerCount(),
                lkp: elem.getLightCatapultCount(),
                skp: elem.getHeavyCatapultCount(),
                mounts: (elem instanceof footArmy_1.FootArmy) ? elem.getMountCount() : 0,
                x: elem.getPosition()[0],
                y: elem.getPosition()[1],
                owner: elem.owner.tag,
                movementPoints: elem.getMovePoints(),
                heightPoints: elem.getHeightPoints(),
                isLoadedIn: (elem instanceof landArmy_1.LandArmy) ? elem.isTransported() : false
            };
        });
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/savearmydata/",
            data: {
                armies: JSON.stringify(sensibleArmyList),
                authorization: authenticationFunctions_1.Authentication.authenticationToken
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveArmies = saveArmies;
    function saveFactionsTerritories() {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/saveborderdata/",
            data: { borders: JSON.stringify(gameState_1.GameState.realms.map(realm => { return { 'tag': realm.tag, 'land': realm.getTerritoryCoordinates() }; })),
                authorization: authenticationFunctions_1.Authentication.authenticationToken },
            statusCode: {
                200: function () {
                    console.log("Successfully saved borders.");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveFactionsTerritories = saveFactionsTerritories;
    function sendDeleteEvent(eventId, eventType) {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/deleteevent/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                eventId: eventId,
                eventType: eventType
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.sendDeleteEvent = sendDeleteEvent;
    function sendCheckEvent(eventId, eventType) {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/checkevent/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                eventId: eventId,
                eventType: eventType
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.sendCheckEvent = sendCheckEvent;
    function sendNewEvent(type, content) {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/" + type + "event/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                content: content
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                400: function () {
                    if (type === "move") {
                        alert('Invalid input. Moved troop does not exist.');
                    }
                    else if (type === "battle") {
                        alert("Invalid input. Not all troops participating in a battle exist.");
                    }
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    if (type === "move") {
                        alert('Access denied. You can only send move events for your troops.');
                    }
                    else if (type === "battle") {
                        alert('Access denied. You can only send battle events involving your troops.');
                    }
                }
            }
        });
    }
    Saving.sendNewEvent = sendNewEvent;
    function sendNextTurn() {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/nextturn/",
            data: { authorization: authenticationFunctions_1.Authentication.authenticationToken },
            success: (data) => {
                gameState_1.GameState.currentTurn = data;
                drawingFunctions_1.Drawing.writeTurnNumber();
            },
            dataType: "json",
            statusCode: {
                401: () => { alert('Authorisation failure. Please log in.'); },
                403: () => { alert('Access denied. You can only end your own turn.'); },
                520: () => { alert('Turn Order ran out. Tell SL to fill it!'); },
                521: () => { alert('Turn Order ran out. You should fill it!'); } // custom status code
            }
        });
    }
    Saving.sendNextTurn = sendNextTurn;
    // TODO: If we have multiple "clean-up functions" like this, they should have their own file/folder.
    function untagHitArmys() {
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].owner.tag === gameState_1.GameState.login || gameState_1.GameState.login === "sl") {
                gameState_1.GameState.armies[i].wasShotAt = false;
            }
        }
    }
    Saving.untagHitArmys = untagHitArmys;
})(Saving = exports.Saving || (exports.Saving = {}));

},{"../armies/footArmy":5,"../armies/landArmy":6,"../controls/controlVariables":18,"../events/battleEvent":20,"../events/mergeEvent":22,"../events/mountEvent":23,"../events/moveEvent":24,"../events/shootEvent":25,"../events/splitEvent":26,"../events/transferEvent":27,"../gameState":28,"../gui/drawingFunctions":34,"./authenticationFunctions":56}]},{},[54]);
