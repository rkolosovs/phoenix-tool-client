"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
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
//# sourceMappingURL=battleHandler.js.map