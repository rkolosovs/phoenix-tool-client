import { GameState } from "../gameState";
import { Drawing } from "../gui/drawingFunctions";
import { Army } from "./army";
import { Direction } from "../map/direction";
import {MobileEntity} from "./mobileEntity";

//when unit is clicked generates a list of neighbors that can be moved to
    function clickedMoves(army: MobileEntity): void {
        if (army.owner.tag === login || login === "sl") {
            army.possibleMoves = [];
            //goes through all neighbors to see if the army can move there
            army.checkForPossibleMove(Direction.NW);
            army.checkForPossibleMove(Direction.NE);
            army.checkForPossibleMove(Direction.E);
            army.checkForPossibleMove(Direction.SE);
            army.checkForPossibleMove(Direction.SW);
            army.checkForPossibleMove(Direction.W);
        }
    }

    //checks the current field for other armies and adds it accordingly
    function createMultifield(army: Army) {
        for (let j = 0; j < GameState.armies.length; j++) {
            let someArmy = GameState.armies[j];
            if (someArmy.getPosition()[0] === army.getPosition()[0] && someArmy.getPosition()[1] === army.getPosition()[1] && someArmy !== army) {
                if (someArmy.multiArmyField === true || army.multiArmyField === true) {
                    addToMultifield(someArmy, army);
                }
                else {
                    let templist = [someArmy, army];//creating a list of armies to add to the list of multifieldarmies
                    Drawing.listOfMultiArmyFields.push(templist);
                    someArmy.multiArmyField = true;
                    army.multiArmyField = true;
                }
            }
        }
    }

    //Adds an army to an existing multifield
    function addToMultifield(armyOnMultifield: Army, armyToAdd: Army) {
        if (Drawing.listOfMultiArmyFields !== undefined) {
            let alreadyInList = false;
            let placeToAdd;
            for (let i = 0; i < Drawing.listOfMultiArmyFields.length; i++) {
                for (let j = 0; j < Drawing.listOfMultiArmyFields[i].length; j++) {
                    if (Drawing.listOfMultiArmyFields[i][j] === armyOnMultifield) {
                        placeToAdd = i;
                    }
                    else if (Drawing.listOfMultiArmyFields[i][j] === armyToAdd) {
                        alreadyInList = true;
                    }
                }
            }
            if (alreadyInList == false && placeToAdd !== undefined) {
                Drawing.listOfMultiArmyFields[placeToAdd].push(armyToAdd);
                console.log("added to multi");
            }
            armyToAdd.multiArmyField = true;
        }
    }

