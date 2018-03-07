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