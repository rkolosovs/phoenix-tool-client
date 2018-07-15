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

import {Army} from "../armies/army";
import {GameState} from "../gameState";
import {Drawing} from "./drawingFunctions";

export namespace MultiFieldFunctions{

    //checks the current field for other armies and adds it accordingly
    export function createMultifield(army: Army): void {
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
    export function addToMultifield(armyOnMultifield: Army, armyToAdd: Army): void {
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
            }
            armyToAdd.multiArmyField = true;
        }
    }
}