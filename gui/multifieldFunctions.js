"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
var MultiFieldFunctions;
(function (MultiFieldFunctions) {
    //checks the current field for other armies and adds it accordingly
    function createMultifield(army) {
        for (let j = 0; j < types_1.GameState.armies.length; j++) {
            let someArmy = types_1.GameState.armies[j];
            if (someArmy.getPosition()[0] === army.getPosition()[0] && someArmy.getPosition()[1] === army.getPosition()[1] && someArmy !== army) {
                if (someArmy.multiArmyField === true || army.multiArmyField === true) {
                    addToMultifield(someArmy, army);
                }
                else {
                    let templist = [someArmy, army]; //creating a list of armies to add to the list of multifieldarmies
                    types_1.Drawing.listOfMultiArmyFields.push(templist);
                    someArmy.multiArmyField = true;
                    army.multiArmyField = true;
                }
            }
        }
    }
    MultiFieldFunctions.createMultifield = createMultifield;
    //Adds an army to an existing multifield
    function addToMultifield(armyOnMultifield, armyToAdd) {
        if (types_1.Drawing.listOfMultiArmyFields !== undefined) {
            let alreadyInList = false;
            let placeToAdd;
            for (let i = 0; i < types_1.Drawing.listOfMultiArmyFields.length; i++) {
                for (let j = 0; j < types_1.Drawing.listOfMultiArmyFields[i].length; j++) {
                    if (types_1.Drawing.listOfMultiArmyFields[i][j] === armyOnMultifield) {
                        placeToAdd = i;
                    }
                    else if (types_1.Drawing.listOfMultiArmyFields[i][j] === armyToAdd) {
                        alreadyInList = true;
                    }
                }
            }
            if (alreadyInList == false && placeToAdd !== undefined) {
                types_1.Drawing.listOfMultiArmyFields[placeToAdd].push(armyToAdd);
            }
            armyToAdd.multiArmyField = true;
        }
    }
    MultiFieldFunctions.addToMultifield = addToMultifield;
})(MultiFieldFunctions = exports.MultiFieldFunctions || (exports.MultiFieldFunctions = {}));
//# sourceMappingURL=multifieldFunctions.js.map