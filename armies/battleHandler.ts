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

import {GameState} from "../gameState";
import {HexFunction} from "../libraries/hexFunctions";
import {Army} from "./army";
import {Result, BattleResult} from "./battleResult";
import {FieldType} from "../map/field";
import {LandArmy} from "./landArmy";
import {Fleet} from "./fleet";
import {RiderArmy} from "./riderArmy";
import {FootArmy} from "./footArmy";
import {MobileEntity} from "./mobileEntity";
import {ArmyFunctions} from "../libraries/armyFunctions";

export class BattleHandler {
    unsortedArmies: Army[];
    attackerArmies: Army[] = [];
    defenderArmies: Army[] = [];
    location: [number, number];

    constructor(participants: Army[], location: [number, number]){
        this.unsortedArmies = participants;
        this.location = location;
    }

    resolve(attackDie: number, defenceDie: number): void{
        let battleResult: BattleResult = this.calculateResult(this.attackerArmies.map((val) => (val)),
            this.defenderArmies.map((val) => (val)), [], [], this.location, attackDie, defenceDie);
        if (battleResult.result === Result.ATTACKER_OVERRUN) {
            this.attackerArmies.forEach(function (item) {
                item.setMovePoints(item.getMovePoints() -7);
                item.conquer();//try to conquer the land
            });
            this.defenderArmies.forEach(function (item) {
                item.takeDamage(item.getTroopCount());
            });
        } else if (battleResult.result === Result.DEFENDER_OVERRUN) {
            this.attackerArmies.forEach(function (item) {
                item.takeDamage(item.getTroopCount());
            });
        } else {
            if (battleResult.result === Result.ATTACKER_VICTORY) {
                //wipe the looser out
                this.defenderArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                //null move points of the victor and inflict losses
                this.attackerArmies.forEach(function (item, index) {
                    item.setMovePoints(0);
                    item.takeDamage(battleResult.attackerLosses[index]);
                    item.conquer();//try to conquer the land
                }, this);
            } else if (battleResult.result === Result.DEFENDER_VICTORY) {
                //wipe the looser out
                this.attackerArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                //null move points of the victor and inflict losses
                this.defenderArmies.forEach(function (item, index) {
                    item.takeDamage(battleResult.defenderLosses[index]);
                }, this);
            } else if (battleResult.result === Result.TIE) {
                //wipe all combatants out
                this.attackerArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                this.defenderArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
            } else {
                console.log("Battle resolution error.");
            }
        }
        ArmyFunctions.checkArmiesForLiveliness();
    }

    private static armyArrayCount(armyArray: Army[], fieldType: FieldType) {
        return armyArray.filter((val) => (
            (val instanceof Fleet && fieldType <= 1) || (fieldType >= 2 && val instanceof LandArmy)), this).
        reduce((total, elem) => (elem.getTroopCount() + total), 0);
    }

    private static terrainGP(army: Army, attacker: boolean, fieldType: FieldType, location: [number, number]): number {
        let buildingsOnTheField = GameState.buildings.filter(current =>
            (current.getPosition()[0] === location[0] && current.getPosition()[1] === location[1] && current.type <= 4));
        if (buildingsOnTheField.length > 0) { //production buildings on field negate usual terrain bonus
            if (attacker) { return 0; }
            if (buildingsOnTheField[0].owner !== army.owner) { return 50; }
            switch (buildingsOnTheField[0].type) {
                case 0: return 100;
                case 1: return 200;
                case 2: return 300;
                case 3: return 400;
                case 4: return 500;
                default: return 0;
            }
        } else { //usual terrain bonus applies
            let terrainGPBonus = 0;
            let findRealm = GameState.realms.find(realm => (realm === army.owner));
            let homeTurf= FieldType.SHALLOWS;
            if(findRealm != undefined){
                homeTurf = findRealm.homeTurf;
            }
            if(homeTurf === fieldType || (homeTurf === FieldType.HIGHLANDS && fieldType === FieldType.MOUNTAINS) ||
                (homeTurf === FieldType.MOUNTAINS && fieldType === FieldType.HIGHLANDS)) { //home terrain bonus applies
                terrainGPBonus += 50;
            }
            if ((army instanceof FootArmy && (fieldType === FieldType.WOODS || fieldType === FieldType.SWAMP)) ||
                (army instanceof RiderArmy && (fieldType === FieldType.LOWLANDS || fieldType === FieldType.HILLS ||
                    fieldType === FieldType.DESERT))) { //footmen/rider terrain bonus
                terrainGPBonus += 140;
            }
            return terrainGPBonus;
        }
    }

    private static characterGP(army: Army, characters: any[]): number {
        //TODO: compute GP from own character fighting in battle.
        //BLOCKER: requires characters to be a thing.
        return 0;
    }

    private static directionalTerrainGP(army: Army, attacker: boolean, attackingArmies: Army[]): number {
        let result = 0;
        let armyPosition: [number, number] = army.getPosition();
        let oldArmyPosition: [number, number] = army.getOldPosition();
        if (attacker) {
            if (HexFunction.height(oldArmyPosition) >
                HexFunction.height(armyPosition)) { result += 20; }//fighting downhill
            if (HexFunction.fieldType(armyPosition) === FieldType.DESERT ||
                HexFunction.fieldType(armyPosition) === FieldType.SWAMP) { result += 20; }//attacking into swamp or desert
            if (HexFunction.fieldType(oldArmyPosition) === FieldType.WOODS) { result += 20; }//attacking out of a forest
            if (HexFunction.hasStreet(armyPosition)) { result += 20; }//attacking onto a street
        } else {
            let adjacentWalls = HexFunction.walls(armyPosition);
            let adjacentRivers = HexFunction.fluesse(armyPosition);
            let adjacentBridges = HexFunction.bridges(armyPosition);
            let neighbor = HexFunction.neighbors(armyPosition);
            let downhillBonus = false;
            let wallBonus = false;
            let bridgeBonus = false;
            let riverBonus = false;
            attackingArmies.forEach((attackingArmy) => {
                if (HexFunction.height(oldArmyPosition) < HexFunction.height(armyPosition)) {
                    downhillBonus = true;
                }
                neighbor.forEach((neighbor, index) => {
                    if (neighbor[0] === oldArmyPosition[0] && neighbor[1] === oldArmyPosition[1]) {
                        if (adjacentWalls[index] === true) { wallBonus = true; }
                        if (adjacentRivers[index] === true) {
                            if (adjacentBridges[index] === true) {
                                bridgeBonus = true;
                            } else {
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

    private static computeCombatRating(strengthArmy: number[], totalArmyGP: number[]): number[] {
        return strengthArmy.map((elem, index) => (elem * (1 + (totalArmyGP[index] / 200))));
    }

    private static computeLossFactor(ownForces: number, enemyForces: number, victorious: boolean): number {
        let baseFactor = (ownForces / enemyForces) / 10;
        if (victorious && ownForces >= enemyForces) {
            return - baseFactor;
        } else if (victorious && ownForces < enemyForces) {
            return 0.2 - baseFactor;
        } else {
            return 0;
        }
    }

    private static computeFinalLosses(baseArmyLosses: number, armyGPDiff: number, armyStrength: number,
                                      totalStrength: number): number {
        let lossesWithGP = 0;
        if (armyGPDiff >= 0) {
            lossesWithGP = baseArmyLosses / (1 + armyGPDiff);
        } else {
            lossesWithGP = baseArmyLosses * (1 - armyGPDiff);
        }
        return (lossesWithGP / totalStrength) * armyStrength;
    }

    calculateResult(armiesAttack: Army[], armiesDefense: Army[], charsAttack: MobileEntity[], charsDefense: MobileEntity[],
                    location: [number, number], attackDieRoll: number, defenseDieRoll: number): BattleResult {
        let fieldType: FieldType = HexFunction.fieldType(location);

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
            if (elem instanceof Fleet) {
                return elem.getTroopCount() + elem.getLightCatapultCount() * 5 + elem.getHeavyCatapultCount() * 10;
            } else {
                return elem.getTroopCount();
            }
        });

        let totalAttackerArmyGP = armiesAttack.map((elem) => (
            attackDieRoll + elem.leaderGp() + BattleHandler.terrainGP(elem, true, fieldType, location) +
            BattleHandler.characterGP(elem, charsAttack) + BattleHandler.directionalTerrainGP(elem, true, [])
        ));
        let totalDefenderArmyGP = armiesDefense.map((elem) => (
            defenseDieRoll + elem.leaderGp() + BattleHandler.terrainGP(elem, false, fieldType, location) +
            BattleHandler.characterGP(elem, charsDefense) + BattleHandler.directionalTerrainGP(elem, false, armiesAttack)
        ));

        let combatRatingAttackerArmy = BattleHandler.computeCombatRating(totalStrengthAttackerArmy, totalAttackerArmyGP);
        let combatRatingDefenderArmy = BattleHandler.computeCombatRating(totalStrengthDefenderArmy, totalDefenderArmyGP);

        let totalAttackerStrength = totalStrengthAttackerArmy.reduce((total, elem) => (total + elem), 0);
        let totalDefenderStrength = totalStrengthDefenderArmy.reduce((total, elem) => (total + elem), 0);

        let attackerTotalCombatRating = combatRatingAttackerArmy.reduce((total, elem) => (total + elem), 0);
        let defenderTotalCombatRating = combatRatingDefenderArmy.reduce((total, elem) => (total + elem), 0);

        let result: Result;
        if (overrunAttack) {
            result = Result.ATTACKER_OVERRUN;
        } else if (attackerTotalCombatRating > defenderTotalCombatRating) {
            result = Result.ATTACKER_VICTORY;
        } else if (overrunDefense) {
            result = Result.DEFENDER_OVERRUN;
        } else if (attackerTotalCombatRating < defenderTotalCombatRating) {
            result = Result.DEFENDER_VICTORY;
        } else {
            result = Result.TIE;
        }

        let attackerBaseLosses = totalDefenderStrength;
        let defenderBaseLosses = totalAttackerStrength;

        let attackerLossFactor = BattleHandler.computeLossFactor(totalAttackerStrength, totalDefenderStrength,
            (result === Result.ATTACKER_VICTORY || result === Result.ATTACKER_OVERRUN));
        let defenderLossFactor = BattleHandler.computeLossFactor(totalDefenderStrength, totalAttackerStrength,
            (result === Result.DEFENDER_VICTORY || result === Result.DEFENDER_OVERRUN));

        //multiplication and subsequent division by 100 done for reasons of numerical stability
        let attackerNewBaseLosses = Math.floor((attackerBaseLosses * (100 + (attackerLossFactor * 100))) / 100);
        let defenderNewBaseLosses = Math.floor((defenderBaseLosses * (100 + (defenderLossFactor * 100))) / 100);

        let baseLossesAttackerArmy = totalStrengthAttackerArmy.map((elem) => ((elem / totalAttackerStrength) * attackerNewBaseLosses));
        let baseLossesDefenderArmy = totalStrengthDefenderArmy.map((elem) => ((elem / totalDefenderStrength) * defenderNewBaseLosses));

        let attackerMeanGP = ((attackerTotalCombatRating / totalAttackerStrength) - 1) * 100;
        let defenderMeanGP = ((defenderTotalCombatRating / totalDefenderStrength) - 1) * 100;

        let attackerGPDiffArmy = totalAttackerArmyGP.map((elem) => ((elem / 200) - (defenderMeanGP / 100)));
        let defenderGPDiffArmy = totalDefenderArmyGP.map((elem) => ((elem / 200) - (attackerMeanGP / 100)));

        let finalLossesAttackerArmy = baseLossesAttackerArmy.map((elem, index) => (
            BattleHandler.computeFinalLosses(elem, attackerGPDiffArmy[index], totalStrengthAttackerArmy[index], totalStrengthAttackerArmy[index])
        ));
        let finalLossesDefenderArmy = baseLossesDefenderArmy.map((elem, index) => (
            BattleHandler.computeFinalLosses(elem, defenderGPDiffArmy[index], armiesDefense[index].getTroopCount(), totalStrengthDefenderArmy[index])
        ));

        return new BattleResult(result, finalLossesAttackerArmy, finalLossesDefenderArmy);
    }
}