"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../../gameState");
const footArmy_1 = require("../../armies/footArmy");
const field_1 = require("../../map/field");
const move_1 = require("../../armies/move");
const nonDestructibleBuilding_1 = require("../../buildings/nonDestructibleBuilding");
const river_1 = require("../../map/river");
const riderArmy_1 = require("../../armies/riderArmy");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function movementWithRiversTests() {
    test("Foot lowlands -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river with a street", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river with a bridge and a street", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0]),
            new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river with a bridge in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(4, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river with a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> lowlands over a river with a bridge and a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0]),
            new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(3, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> hills over a river with a street", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> hills over a river in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> hills over a river with a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot lowlands -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot desert -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot woods -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot swamp -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> lowlands over a river with a street", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> lowlands over a river in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> lowlands over a river with a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        gameState_1.GameState.realms[0].territory = gameState_1.GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> hills over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot hills -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> highlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot highlands -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(9, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Foot mountains -> mountains over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, 2);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 6 /* MOUNTAINS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse lowlands -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse desert -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 7 /* DESERT */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse woods -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 3 /* WOODS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(10, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse swamp -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 8 /* SWAMP */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> hills over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(7, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse hills -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 4 /* HILLS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 2 /* LOWLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 7 /* DESERT */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 3 /* WOODS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 8 /* SWAMP */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 4 /* HILLS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> highlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 5 /* HIGHLANDS */)];
        gameState_1.GameState.buildings = [new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [0, 0], [0, -1], gameState_1.GameState.realms[0])];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new move_1.Move(21, 0, false, false, [0, -1], 0 /* NW */));
    });
    test("Horse highlands -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 1000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, 2, false);
        gameState_1.GameState.fields = [new field_1.Field([0, 0], 5 /* HIGHLANDS */), new field_1.Field([0, 0], 6 /* MOUNTAINS */)];
        gameState_1.GameState.rivers = [new river_1.River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new move_1.Move(0, 0, false, false, [0, -1], 0 /* NW */));
    });
}
exports.movementWithRiversTests = movementWithRiversTests;
