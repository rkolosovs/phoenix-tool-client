"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlVariables_1 = require("../controls/controlVariables");
const gameState_1 = require("../gameState");
const landArmy_1 = require("../armies/landArmy");
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
        if (type === 1) {
            let j = 101;
            while (j < 200) {
                let found = false;
                for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                    if (gameState_1.GameState.armies[i].getErkenfaraID() === j && gameState_1.GameState.armies[i].owner === owner) {
                        j++;
                        found = true;
                    }
                }
                if (!found) {
                    return j;
                }
            }
            window.alert("Du hast die maximale Anzahl an Fußheeren erreicht.");
            return -1;
        }
        else if (type === 2) {
            let j = 201;
            while (j < 300) {
                let found = false;
                for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                    if (gameState_1.GameState.armies[i].getErkenfaraID() === j && gameState_1.GameState.armies[i].owner === owner) {
                        j++;
                        found = true;
                    }
                }
                if (!found) {
                    return j;
                }
            }
            window.alert("Du hast die maximale Anzahl an Reiterheeren erreicht.");
            return -1;
        }
        else if (type === 3) {
            let j = 301;
            while (j < 400) {
                let found = false;
                for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                    if (gameState_1.GameState.armies[i].getErkenfaraID() === j && gameState_1.GameState.armies[i].owner === owner) {
                        j++;
                        found = true;
                    }
                }
                if (!found) {
                    return j;
                }
            }
            window.alert("Du hast die maximale Anzahl an Flotten erreicht.");
            return -1;
        }
        else {
            return -1;
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
