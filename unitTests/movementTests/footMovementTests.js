"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../../gameState");
const footArmy_1 = require("../../armies/footArmy");
const field_1 = require("../../map/field");
const move_1 = require("../../armies/move");
const nonDestructibleBuilding_1 = require("../../buildings/nonDestructibleBuilding");
const fleet_1 = require("../../armies/fleet");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function footMovementTests() {
    test("Lowlands -> lowlands (nw direction)", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */),
            new field_1.Field([1, 0], 1 /* DEEPSEA */), new field_1.Field([1, 1], 0 /* SHALLOWS */),
            new field_1.Field([0, 1], 1 /* DEEPSEA */), new field_1.Field([-1, 0], 1 /* DEEPSEA */),
            new field_1.Field([0, -1], 2 /* LOWLANDS */), new field_1.Field([1, -1], 1 /* DEEPSEA */)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    // test( "Lowlands -> lowlands on street (ne direction)", function(t) {
    //     army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
    //     fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':2}, {'x':1, 'y':0, 'type':1},
    //         {'x':1, 'y':1, 'type':1}, {'x':0, 'y':1, 'type':1}, {'x':-1, 'y':0, 'type':1}];
    //     buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 1, 'secondY': -1}];
    //     clickedMoves(army);
    //     t.movePossible( army.possibleMoves, {changHeight: false, dir: 1, movepoints: 4, height: 1, landunit: true,x: 1, y: -1} );
    // });
    test("Lowlands -> lowlands on street (ne direction)", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */),
            new field_1.Field([1, 0], 1 /* DEEPSEA */), new field_1.Field([1, 1], 1 /* DEEPSEA */),
            new field_1.Field([0, 1], 1 /* DEEPSEA */), new field_1.Field([-1, 0], 1 /* DEEPSEA */),
            new field_1.Field([0, -1], 1 /* DEEPSEA */), new field_1.Field([1, -1], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [
            new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [1, -1], gameState_1.GameState.realms[0])
        ];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [1, -1], 1 /* NE */));
    });
    // test( "Lowlands -> lowlands in homeland (e direction)", function(t) {
    //     army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
    //     fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':1}, {'x':1, 'y':0, 'type':2},
    //         {'x':1, 'y':1, 'type':1}, {'x':0, 'y':1, 'type':1}, {'x':-1, 'y':0, 'type':1}];
    //     borders = [{'tag': 'r01', 'land': [[1, 0]]}];
    //     clickedMoves(army);
    //     t.movePossible( army.possibleMoves, {changHeight: false, dir: 2, movepoints: 4, height: 2, landunit: true, x: 1, y: 0} );
    // });
    test("Lowlands -> lowlands in homeland (e direction)", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */),
            new field_1.Field([1, 0], 2 /* LOWLANDS */), new field_1.Field([1, 1], 1 /* DEEPSEA */),
            new field_1.Field([0, 1], 1 /* DEEPSEA */), new field_1.Field([-1, 0], 1 /* DEEPSEA */),
            new field_1.Field([0, -1], 1 /* DEEPSEA */), new field_1.Field([1, -1], 1 /* DEEPSEA */)];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 1 && field.coordinates[1] === 0);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [1, 0], 2 /* E */));
    });
    test("Lowlands -> lowlands on street in homeland (se direction)", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 1 }, { 'x': 1, 'y': -1, 'type': 1 }, { 'x': 1, 'y': 0, 'type': 1 },
            { 'x': 1, 'y': 1, 'type': 2 }, { 'x': 0, 'y': 1, 'type': 1 }, { 'x': -1, 'y': 0, 'type': 1 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 1, 'firstY': 1, 'secondX': 0, 'secondY': 0 }];
        borders = [{ 'tag': 'r01', 'land': [[1, 1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 3, movepoints: 3, height: 1, landunit: true, x: 1, y: 1 });
    });
    test("Lowlands -> desert (sw direction)", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 1 }, { 'x': 1, 'y': -1, 'type': 1 }, { 'x': 1, 'y': 0, 'type': 1 },
            { 'x': 1, 'y': 1, 'type': 1 }, { 'x': 0, 'y': 1, 'type': 7 }, { 'x': -1, 'y': 0, 'type': 1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 4, movepoints: 7, height: 2, landunit: true, x: 0, y: 1, unload: false });
    });
    test("Lowlands -> desert on street (w direction)", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 1 }, { 'x': 1, 'y': -1, 'type': 1 }, { 'x': 1, 'y': 0, 'type': 1 },
            { 'x': 1, 'y': 1, 'type': 1 }, { 'x': 0, 'y': 1, 'type': 1 }, { 'x': -1, 'y': 0, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': -1, 'firstY': 0, 'secondX': 0, 'secondY': 0 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 5, movepoints: 4, height: 1, landunit: true, x: -1, y: 0 });
    });
    test("Lowlands -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> desert on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> woods on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> woods on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> swamp on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> swamp on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> hills on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> hills in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> hills on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Lowlands -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Lowlands -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Lowlands -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Lowlands -> shallows with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 0 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Lowlands -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Lowlands -> deepsea with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 1 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Desert -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> lowlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> lowlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> lowlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> desert on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> desert on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> woods on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> woods on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> swamp on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> swamp on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> hills on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> hills in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 4 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> hills on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Desert -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Desert -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Desert -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Desert -> shallows with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 0 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Desert -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Desert -> deepsea with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 1 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Woods -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> lowlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> lowlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> lowlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> desert on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> desert on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> woods on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> woods on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> swamp on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> swamp on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> hills on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> hills in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 4 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> hills on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Woods -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Woods -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Woods -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Woods -> shallows with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 0 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Woods -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Woods -> deepsea with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 1 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Swamp -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> lowlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> lowlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> lowlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> desert on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> desert on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> woods on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> woods on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> swamp on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> swamp on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> hills on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> hills in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 4 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> hills on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Swamp -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Swamp -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Swamp -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Swamp -> shallows with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 0 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Swamp -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, x: 0, y: -1, load: true });
    });
    test("Swamp -> deepsea with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 1 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, x: 0, y: -1, load: true });
    });
    test("Hills -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> lowlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> lowlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> lowlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> desert on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> desert on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> woods on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> woods on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> swamp on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> swamp on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> hills on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> hills in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> hills on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> highlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> highlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 5 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> highlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Hills -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Hills -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Hills -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Highlands -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Highlands -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Highlands -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Highlands -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Highlands -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> hills on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> hills in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 4 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> hills on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> highlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> highlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> highlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> mountains on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> mountains in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 6 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> mountains on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Highlands -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Highlands -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> highlands on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> highlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 5 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> highlands on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> mountains on street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> mountains in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 6 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> mountains on street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Mountains -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Mountains -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet];
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> lowlands with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> lowlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> lowlands with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> desert with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> desert with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> woods with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> woods with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> swamp with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> swamp with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Shallows -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new fleet_1.Fleet(322, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new fleet_1.Fleet(322, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> lowlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 2 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> lowlands with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> lowlands in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> lowlands with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> desert", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 7 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> desert with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> desert in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 7 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> desert with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> woods", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 3 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> woods with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> woods in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 3 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> woods with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> swamp", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 8 }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> swamp with harbor", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> swamp in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 8 }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> swamp with harbor in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.buildings = [{ 'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se" }];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1, unload: true });
    });
    test("Deepsea -> hills", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 4 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> highlands", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 5 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> mountains", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 6 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> shallows", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new fleet_1.Fleet(322, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 0 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> deepsea", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        let fleet = new fleet_1.Fleet(311, 20, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new fleet_1.Fleet(322, 20, 1, 0, 0, false, 0, -1, 1);
        gameState_1.GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 1 }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
}
exports.footMovementTests = footMovementTests;
;
