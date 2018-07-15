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
define(["require", "exports", "../gameState", "./army", "./move", "./fleet", "../libraries/hexFunctions"], function (require, exports, gameState_1, army_1, move_1, fleet_1, hexFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LandArmy extends army_1.Army {
        constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
            if (isGuard != undefined) {
                super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
            }
            else {
                super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
            }
        }
        getMaxMovePoints() {
            return LandArmy.MAX_MOVE_POINTS;
        }
        getMaxHeightPoints() {
            return LandArmy.MAX_HEIGHT_POINTS;
        }
        isTransported() {
            return this.transportingFleet != undefined;
        }
        move(direction) {
            let move = this.possibleMoves.find(possMove => possMove.direction === direction);
            if (move != undefined) {
                if (move.unloading && this.isTransported()) {
                    this.transportingFleet.unloadArmy(this);
                }
                else if (move.loading && !this.isTransported()) {
                    let fleetsOnDestination = gameState_1.GameState.armies.filter(army => army instanceof fleet_1.Fleet && army.getPosition()[0] === move.destination[0] &&
                        army.getPosition()[1] === move.destination[1]).map(army => army);
                    if (fleetsOnDestination.length === 0) {
                        throw new Error("You can't walk on Water.");
                    }
                    else if (fleetsOnDestination.length === 1) {
                        fleetsOnDestination[0].loadArmy(this);
                    }
                    else {
                        let fleetString = fleetsOnDestination.reduce((accumulator, fleet) => accumulator += " " + fleet.getErkenfaraID(), "");
                        let chosenFleet = prompt("Mögliche Flotten sind: " + fleetString);
                        if (chosenFleet == undefined) {
                            throw new Error("Embarkation canceled.");
                        }
                        else if (chosenFleet != undefined && chosenFleet !== '') {
                            let foundFleet = fleetsOnDestination.find(fleet => fleet.getErkenfaraID() === parseInt(chosenFleet));
                            if (foundFleet != undefined) {
                                foundFleet.loadArmy(this);
                            }
                            else {
                                window.alert("Bitte wähle eine der angegebenen Flotten aus.");
                            }
                        }
                    }
                }
                this.oldPosition[0] = this.position[0];
                this.oldPosition[1] = this.position[1];
                this.position[0] = move.destination[0];
                this.position[1] = move.destination[1];
                this.setMovePoints(this.getMovePoints() - move.movePoints);
                this.setHeightPoints(this.getHeightPoints() - move.heightPoints);
            }
            else {
                throw new Error("Move not possible.");
            }
        }
        checkForPossibleMove(direction) {
            let neighborCoords = hexFunctions_1.HexFunction.neighbors(this.position);
            let target = neighborCoords[direction];
            let heightCost = 0;
            let thereIsAStreet = false;
            let thereIsABridge = false;
            let thereIsAHarbor = false;
            // TODO: effects of diplomacy go here
            let rightOfPassage = gameState_1.GameState.realms.some((realm) => (realm === this.owner && realm.territory.some((field) => (target[0] === field.coordinates[0] && target[1] === field.coordinates[1]))));
            let thereIsARiver = gameState_1.GameState.rivers.some((river) => (river.leftBank[0] === this.position[0] && river.leftBank[1] === this.position[1] && river.rightBank[0] === target[0] && river.rightBank[1] === target[1]) ||
                (river.leftBank[0] === target[0] && river.leftBank[1] === target[1] && river.rightBank[0] === this.position[0] && river.rightBank[1] === this.position[1]));
            // check if there is a steet, a harbor or a bridge on the route
            gameState_1.GameState.buildings.forEach(building => {
                if (building.type === 8 /* STREET */ &&
                    ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                        (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                    thereIsAStreet = true;
                }
                if (building.type === 6 /* HARBOR */ &&
                    ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                        (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                    thereIsAHarbor = true;
                }
                if (building.type === 7 /* BRIDGE */ &&
                    ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                        (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                    thereIsABridge = true;
                }
                //TODO: Walls!
            });
            // check if there is a change in height on the route
            if (hexFunctions_1.HexFunction.height(this.position) != hexFunctions_1.HexFunction.height(target)) {
                if (Math.abs(hexFunctions_1.HexFunction.height(this.position) - hexFunctions_1.HexFunction.height(target)) >= 2) {
                    throw new Error("The height difference is too big.");
                }
                else if ((this.heightPoints < 2 && (!thereIsAStreet || !thereIsAHarbor)) || this.heightPoints < 1) {
                    throw new Error("Not enough height points left.");
                }
                else {
                    heightCost = (thereIsAStreet || thereIsABridge) ? 1 : 2;
                    if (thereIsARiver) {
                        throw new Error("Can't traverse height difference with a river.");
                    }
                }
            }
            let moveCost = this.computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target);
            return new move_1.Move(moveCost, heightCost, (hexFunctions_1.HexFunction.fieldType(target) === 0 /* SHALLOWS */ ||
                hexFunctions_1.HexFunction.fieldType(target) === 1 /* DEEPSEA */), (hexFunctions_1.HexFunction.fieldType(this.position) === 0 /* SHALLOWS */ ||
                hexFunctions_1.HexFunction.fieldType(this.position) === 1 /* DEEPSEA */), target, direction);
        }
        canConquer() {
            return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
            //TODO: Consider characters once those are a thing.
        }
    }
    exports.LandArmy = LandArmy;
});
//# sourceMappingURL=landArmy.js.map