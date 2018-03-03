import {Army} from "./army";
import {Controls} from "../controls/controlVariables";
import {GUI} from "../gui/gui";
import {GameState} from "../gameState";
import {BoxVisibility} from "../gui/boxVisibilty";
import {ArmyFunctions} from "../libraries/armyFunctions";

export namespace ShootingFunctions{
    // array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null),
    // schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld

    export function fernkampf(dicerollsL: number[], dicerollsS: number[], shooter: Army, target: String,
                              targetField: [number, number], chars: any) {
        let charGpSum = 0;
        if (chars != undefined) {
            let cLen = chars.length;
            for (let i = 0; i < cLen; i++) {
                charGpSum += chars[i].gp;
            }
        }

        let damage = shooter.fireLightCatapults(dicerollsL, shooter.checkShootingCondition(targetField, false)) +
            shooter.fireHeavyCatapults(dicerollsS, shooter.checkShootingCondition(targetField, true));
        let allTargets = [];
        let sumAllBP = 0;
        if (target === "On Field") {
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

        shooter.addLightCatapultsShot(dicerollsL.length);
        shooter.addHeavyCatapultsShot(dicerollsS.length);

        //check to see if shooting after moving and stop the army if it moved this turn.
        if (shooter.getMovePoints() < shooter.getMaxMovePoints()) {
            shooter.setMovePoints(0);
            shooter.possibleMoves = [];
        }
    }

    //to fill the targetList(fields)
    export function findPossibleTargetFields() {
        GameState.armies[Controls.selectedArmyIndex].findShootingTargets();
    }

    //to actually shoot stuff, with events
    export function shoot(): boolean {
        if (GameState.login === 'guest') {
            window.alert("Zuschauer haben keine Rechte.");
            return false;
        }
        let LKPshooting = parseInt(GUI.getShootingLKPInput().value);
        let SKPshooting = parseInt(GUI.getShootingSKPInput().value);
        let shootingarmy = GameState.armies[Controls.selectedArmyIndex];

        if (isNaN(LKPshooting) || LKPshooting === undefined) {
            LKPshooting = 0;
        }
        if (isNaN(SKPshooting) || SKPshooting === undefined) {
            SKPshooting = 0;
        }
        if (shootingarmy.getLightCatapultCount() - shootingarmy.getLightCatapultsShot() < LKPshooting) {
            //check if remaining Lkp that have not shot yet
            window.alert("Die Armee hat nur noch " + (shootingarmy.getLightCatapultCount() -
                shootingarmy.getLightCatapultsShot()) + " leichte Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
            return false;
        }
        if (shootingarmy.getHeavyCatapultCount() - shootingarmy.getHeavyCatapultsShot() < SKPshooting) {
            //check if remaining Skp that have not shot yet
            window.alert("Die Armee hat nur noch " + (shootingarmy.getHeavyCatapultCount() -
                shootingarmy.getHeavyCatapultCount()) + " schwere Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
            return false;
        }
        if (LKPshooting > shootingarmy.getLightCatapultCount()) {
            window.alert("Die Armee hat nicht genug leichte Katapulte/Kriegsschiffe");
            return false;
        }
        if (SKPshooting > shootingarmy.getHeavyCatapultCount()) {
            window.alert("Die Armee hat nicht genug schwere Katapulte/Kriegsschiffe");
            return false;
        }
        if (LKPshooting === 0 && SKPshooting === 0) {
            window.alert("Sie müssen eine Anzahl Katapulte eintragen");
            return false;
        }
        if (Controls.selectedFields[1] === undefined) {
            window.alert("Wählen Sie ein Feld auf das Sie schießen wollen");
            return false;
        }
        if (shootingarmy.targetList === undefined) {
            window.alert("bitte Zielen Sie erst");
            return false;
        } else {
            let aimedTargetFound = false;
            for (let i = 0; i < shootingarmy.targetList.length; i++) {
                if (shootingarmy.targetList[i][0] === Controls.selectedFields[1][0] &&
                    shootingarmy.targetList[i][1] === Controls.selectedFields[1][1]) {
                    aimedTargetFound = true;
                }
            }
            if (aimedTargetFound === false) {
                window.alert("Schießen Sie auf ein markiertes Feld");
                return false;
            }
        }//TODO get target to shoot at
        let target = "On Field";

        //check for mixed shooting(reachable by both lkp and skp)
        if (LKPshooting < 0) {
            let cond = shootingarmy.checkShootingCondition(Controls.selectedFields[1], false);
            if (cond === 'impossible shot') {
                window.alert("Sie müssen auf ein gemeinsam erreichbares Feld schießen");
                return false;
            }
        }

        GameState.events.push({
            type: "shoot", content: {
                shooterID: GameState.armies[Controls.selectedArmyIndex].armyId,
                realm: GameState.armies[Controls.selectedArmyIndex].ownerTag(),
                LKPcount: LKPshooting,
                SKPcount: SKPshooting,
                toX: Controls.selectedFields[1][0],
                toY: Controls.selectedFields[1][1],
                target: target,
                fromX: GameState.armies[Controls.selectedArmyIndex].x,
                fromY: GameState.armies[Controls.selectedArmyIndex].y
            }
        });

        shootingarmy.addLightCatapultsShot(LKPshooting);
        shootingarmy.addHeavyCatapultsShot(SKPshooting);

        //check to see if shooting after moving and stop the army if it moved this turn.
        if (shootingarmy.getMovePoints() < shootingarmy.getMaxMovePoints()) {
            shootingarmy.setMovePoints(0);
            shootingarmy.possibleMoves = [];
        }
        BoxVisibility.updateInfoBox();
        window.alert("Die Geschosse sind unterwegs.");
        return true;
    }
}