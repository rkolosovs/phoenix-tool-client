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
const fleet_1 = require("../../armies/fleet");
const gameState_1 = require("../../gameState");
const field_1 = require("../../map/field");
const move_1 = require("../../armies/move");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function heavyWarshipMovementTests() {
    test("Shallows -> lowlands", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> desert", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 7 /* DESERT */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> woods", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 3 /* WOODS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> swamp", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 8 /* SWAMP */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> hills", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 4 /* HILLS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> highlands", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> mountains", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> shallows", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 0 /* SHALLOWS */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> shallows on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 0 /* SHALLOWS */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> deepsea", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 1 /* DEEPSEA */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Shallows -> deepsea on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 0 /* SHALLOWS */), new field_1.Field([0, -1], 1 /* DEEPSEA */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(14, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> lowlands", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 2 /* LOWLANDS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> desert", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 7 /* DESERT */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> woods", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 3 /* WOODS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> swamp", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 8 /* SWAMP */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> hills", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 4 /* HILLS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> highlands", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 5 /* HIGHLANDS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> mountains", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 6 /* MOUNTAINS */)];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> shallows", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 0 /* SHALLOWS */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> shallows on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 0 /* SHALLOWS */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> deepsea", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 1 /* DEEPSEA */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Deepsea -> deepsea on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, gameState_1.GameState.realms[0], 21, 1, 0, 1, [0, 1], fleet_1.Fleet.MAX_MOVE_POINTS, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 1 /* DEEPSEA */), new field_1.Field([0, -1], 1 /* DEEPSEA */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new move_1.Move(14, 0, false, false, [0, -1], 0 /* NW */));
    });
}
exports.heavyWarshipMovementTests = heavyWarshipMovementTests;
//# sourceMappingURL=heavyWarshipMovement.js.map