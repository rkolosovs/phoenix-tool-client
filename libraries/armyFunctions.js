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
define(["require", "exports", "../controls/controlVariables", "../gameState", "../armies/landArmy", "../armies/fleet", "../armies/footArmy", "../armies/riderArmy"], function (require, exports, controlVariables_1, gameState_1, landArmy_1, fleet_1, footArmy_1, riderArmy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            let ownedArmies = gameState_1.GameState.armies.filter(army => army.owner === owner);
            if (type === 1) { //foot armies
                let ownedFootArmies = ownedArmies.filter(army => army instanceof footArmy_1.FootArmy);
                for (let result = 101; result < 200; result++) {
                    if (!ownedFootArmies.some(army => army.getErkenfaraID() === result)) {
                        return result;
                    }
                }
                throw new Error("Du hast die maximale Anzahl an Fußheeren erreicht.");
            }
            else if (type === 2) { //rider armies
                let ownedRiderArmies = ownedArmies.filter(army => army instanceof riderArmy_1.RiderArmy);
                for (let result = 201; result < 300; result++) {
                    if (!ownedRiderArmies.some(army => army.getErkenfaraID() === result)) {
                        return result;
                    }
                }
                throw new Error("Du hast die maximale Anzahl an Reiterheeren erreicht.");
            }
            else if (type === 3) { //fleets
                let ownedFleets = ownedArmies.filter(army => army instanceof fleet_1.Fleet);
                for (let result = 301; result < 400; result++) {
                    if (!ownedFleets.some(army => army.getErkenfaraID() === result)) {
                        return result;
                    }
                }
                throw new Error("Du hast die maximale Anzahl an Flotten erreicht.");
            }
            else {
                throw new Error("Unknown army type.");
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
});
//# sourceMappingURL=armyFunctions.js.map