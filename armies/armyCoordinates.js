"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("../gui/drawingFunctions");
//when unit is clicked generates a list of neighbors that can be moved to
function clickedMoves(army) {
    if (army.owner.tag === login || login === "sl") {
        army.possibleMoves = [];
        //goes through all neighbors to see if the army can move there
        army.checkForPossibleMove(0 /* NW */);
        army.checkForPossibleMove(1 /* NE */);
        army.checkForPossibleMove(2 /* E */);
        army.checkForPossibleMove(3 /* SE */);
        army.checkForPossibleMove(4 /* SW */);
        army.checkForPossibleMove(5 /* W */);
    }
}
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
            console.log("added to multi");
        }
        armyToAdd.multiArmyField = true;
    }
}
