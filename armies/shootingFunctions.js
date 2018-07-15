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
define(["require", "exports", "../gameState", "../libraries/armyFunctions"], function (require, exports, gameState_1, armyFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
//# sourceMappingURL=shootingFunctions.js.map