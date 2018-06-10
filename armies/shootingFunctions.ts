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

import {Army} from "./army";
import {GameState} from "../gameState";
import {ArmyFunctions} from "../libraries/armyFunctions";

export const enum ShootingCondition{
    Far,
    Near,
    FarAndHigh,
    High,
    Normal,
    Impossible,
    LightCatapults
}

export const enum ShootingTarget{
    OnField,
    Wall
}

export namespace ShootingFunctions{
    export function inflictRangedDamage(diceRollsLight: number[], diceRollsHeavy: number[], shooter: Army,
                                        target: ShootingTarget, targetField: [number, number], chars: any) {
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
        if (target === ShootingTarget.OnField) {
            for (let i = 0; i < GameState.buildings.length; i++) {
                if (GameState.buildings[i].getPosition()[0] === targetField[0] &&
                    GameState.buildings[i].getPosition()[1] === targetField[1] &&
                    GameState.buildings[i].type < 5) {
                    //TODO building takes 2/3 damage
                    //building[i].takeFire(damage * (2/3));
                    damage = damage * (1 / 3);
                }
            }

            for (let i = 0; i < GameState.armies.length; i++) {
                if (GameState.armies[i].getPosition()[0] === targetField[0] &&
                    GameState.armies[i].getPosition()[1] === targetField[1]) {
                    allTargets.push(GameState.armies[i]);
                    sumAllBP += GameState.armies[i].totalBP();
                }
            }
            for (let i = 0; i < allTargets.length; i++) {
                //target may be a building. GameState.buildings need to have this funktion
                allTargets[i].takeBPDamage(damage / (1 + (allTargets[i].leaderGp() + charGpSum) / 100) *
                    (allTargets[i].totalBP() / sumAllBP));
            }
        }
        //TODO Wall Damage
        ArmyFunctions.checkArmiesForLiveliness();
    }
}