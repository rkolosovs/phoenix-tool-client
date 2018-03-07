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
