"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlVariables_1 = require("../controls/controlVariables");
const gui_1 = require("../gui/gui");
const gameState_1 = require("../gameState");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const armyFunctions_1 = require("../libraries/armyFunctions");
const shootEvent_1 = require("../events/shootEvent");
var ShootingFunctions;
(function (ShootingFunctions) {
    // array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null),
    // schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
    function fernkampf(dicerollsL, dicerollsS, shooter, target, targetField, chars) {
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
        shooter.addLightCatapultsShot(dicerollsL.length);
        shooter.addHeavyCatapultsShot(dicerollsS.length);
        //check to see if shooting after moving and stop the army if it moved this turn.
        if (shooter.getMovePoints() < shooter.getMaxMovePoints()) {
            shooter.setMovePoints(0);
            shooter.possibleMoves = [];
        }
    }
    ShootingFunctions.fernkampf = fernkampf;
    //to fill the targetList(fields)
    function findPossibleTargetFields() {
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].findShootingTargets();
    }
    ShootingFunctions.findPossibleTargetFields = findPossibleTargetFields;
    //to actually shoot stuff, with events
    function shoot() {
        if (gameState_1.GameState.login === 'guest') {
            window.alert("Zuschauer haben keine Rechte.");
            return false;
        }
        let LKPshooting = parseInt(gui_1.GUI.getShootingLKPInput().value);
        let SKPshooting = parseInt(gui_1.GUI.getShootingSKPInput().value);
        let shootingarmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
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
        if (controlVariables_1.Controls.selectedFields[1] === undefined) {
            window.alert("Wählen Sie ein Feld auf das Sie schießen wollen");
            return false;
        }
        if (shootingarmy.targetList === undefined) {
            window.alert("bitte Zielen Sie erst");
            return false;
        }
        else {
            let aimedTargetFound = false;
            for (let i = 0; i < shootingarmy.targetList.length; i++) {
                if (shootingarmy.targetList[i][0] === controlVariables_1.Controls.selectedFields[1][0] &&
                    shootingarmy.targetList[i][1] === controlVariables_1.Controls.selectedFields[1][1]) {
                    aimedTargetFound = true;
                }
            }
            if (aimedTargetFound === false) {
                window.alert("Schießen Sie auf ein markiertes Feld");
                return false;
            }
        } //TODO get target to shoot at
        let target = "On Field";
        //check for mixed shooting(reachable by both lkp and skp)
        if (LKPshooting < 0) {
            let cond = shootingarmy.checkShootingCondition(controlVariables_1.Controls.selectedFields[1], false);
            if (cond === 'impossible shot') {
                window.alert("Sie müssen auf ein gemeinsam erreichbares Feld schießen");
                return false;
            }
        }
        //in GameState.events pushen
        let eventToPush = new shootEvent_1.ShootEvent(gameState_1.GameState.newEvents.length, 5 /* Undetermined */, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getID(), [controlVariables_1.Controls.selectedFields[1][0], controlVariables_1.Controls.selectedFields[1][1]], gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition(), LKPshooting, SKPshooting, target);
        gameState_1.GameState.newEvents.push(eventToPush);
        shootingarmy.addLightCatapultsShot(LKPshooting);
        shootingarmy.addHeavyCatapultsShot(SKPshooting);
        //check to see if shooting after moving and stop the army if it moved this turn.
        if (shootingarmy.getMovePoints() < shootingarmy.getMaxMovePoints()) {
            shootingarmy.setMovePoints(0);
            shootingarmy.possibleMoves = [];
        }
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        window.alert("Die Geschosse sind unterwegs.");
        return true;
    }
    ShootingFunctions.shoot = shoot;
})(ShootingFunctions = exports.ShootingFunctions || (exports.ShootingFunctions = {}));
