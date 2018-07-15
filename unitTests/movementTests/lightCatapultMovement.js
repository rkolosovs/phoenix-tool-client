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
define(["require", "exports", "../../armies/footArmy", "../../armies/fleet", "../../gameState", "../../map/field", "../../armies/move", "../../buildings/nonDestructibleBuilding", "../qunit"], function (require, exports, footArmy_1, fleet_1, gameState_1, field_1, move_1, nonDestructibleBuilding_1, qunit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { test } = qunit_1.QUnit;
    function lightCatapultMovementTests() {
        test("Lowlands -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> lowlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> lowlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> desert on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> desert on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> woods on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> woods on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> swamp on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> swamp on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> hills on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> hills in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> hills on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> shallows with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Lowlands -> deepsea with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> lowlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> lowlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> desert on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> desert on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> woods on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> woods on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> swamp on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> swamp on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> hills on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> hills in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> hills on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> shallows with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Desert -> deepsea with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> lowlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> lowlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> desert on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> desert on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> woods on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> woods on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> swamp on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> swamp on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> hills on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> hills in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> hills on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> shallows with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Woods -> deepsea with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> lowlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> lowlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> desert on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> desert on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> woods on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> woods on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> swamp on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> swamp on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> hills on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> hills in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> hills on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> shallows with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Swamp -> deepsea with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(0, 2, true, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> lowlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> lowlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> desert on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> desert on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> woods on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> woods on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> swamp on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> swamp on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> hills on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> hills in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> hills on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> highlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> highlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> highlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Hills -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> hills on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> hills in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> hills on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> highlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> highlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> highlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> mountains on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> mountains on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Highlands -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> highlands on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> highlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> highlands on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> mountains on street", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> mountains on street in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Mountains -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Shallows -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> lowlands with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> lowlands with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> desert with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> desert with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> woods with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> woods with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> swamp with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> swamp with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Shallows -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Shallows -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Shallows -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Shallows -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            let anotherFleet = new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet, anotherFleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Shallows -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            let anotherFleet = new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet, anotherFleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> lowlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> lowlands with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> lowlands in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> lowlands with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> desert", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 7 /* DESERT */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> desert with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> desert in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> desert with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 7 /* DESERT */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> woods", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 3 /* WOODS */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> woods with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> woods in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> woods with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 3 /* WOODS */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> swamp", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> swamp with harbor", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> swamp in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 2, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> swamp with harbor in homeland", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 8 /* SWAMP */)];
            gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(6 /* HARBOR */, [0, -1], [0, 0], gameState_1.GameState.realms[0])];
            gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
            army.clickedMoves();
            t.movePossible(army.possibleMoves, new move_1.Move(7, 1, false, true, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> hills", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 4 /* HILLS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> highlands", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> mountains", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> shallows", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            let anotherFleet = new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet, anotherFleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 0 /* SHALLOWS */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
        test("Deepsea -> deepsea", function (t) {
            let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 1, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
            let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            let anotherFleet = new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 21, 1, 0, 0, [0, -1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
            gameState_1.GameState.armies = [army, fleet, anotherFleet];
            fleet.loadArmy(army);
            gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 1 /* DEEPSEA */)];
            army.clickedMoves();
            t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
        });
    }
    exports.lightCatapultMovementTests = lightCatapultMovementTests;
});
//# sourceMappingURL=lightCatapultMovement.js.map