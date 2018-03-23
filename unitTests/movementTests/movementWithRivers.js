"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const footArmy_1 = require("../../armies/footArmy");
const riderArmy_1 = require("../../armies/riderArmy");
const gameState_1 = require("../../gameState");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function movementWithRiversTests() {
    test("Foot lowlands -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river with a street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river with a bridge and a street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 },
            { 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river with a bridge in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river with a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> lowlands over a river with a bridge and a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 },
            { 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot lowlands -> hills over a river with a street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot lowlands -> hills over a river in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot lowlands -> hills over a river with a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot lowlands -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot lowlands -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot lowlands -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot desert -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot desert -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot desert -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot desert -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot woods -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot woods -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot woods -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot woods -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot swamp -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> lowlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> desert over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> woods over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> swamp over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot swamp -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot swamp -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot swamp -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> lowlands over a river with a street", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> lowlands over a river in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> lowlands over a river with a street in homeland", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{ 'tag': 'r01', 'land': [[0, -1]] }];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot hills -> hills over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot hills -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot hills -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot highlands -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot highlands -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot highlands -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot highlands -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot highlands -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot highlands -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot highlands -> highlands over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot highlands -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> lowlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> desert over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> woods over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> swamp over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> hills over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> highlands over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Foot mountains -> mountains over a river", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Foot mountains -> mountains over a river with a bridge", function (t) {
        let army = new footArmy_1.FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 6 }, { 'x': 0, 'y': -1, 'type': 6 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse lowlands -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse lowlands -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse lowlands -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse desert -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse desert -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse desert -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse desert -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 7 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse woods -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse woods -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse woods -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse woods -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 3 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse swamp -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> lowlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 2 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> desert over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 7 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> woods over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 3 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> swamp over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 8 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse swamp -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse swamp -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse swamp -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 8 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse hills -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse hills -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse hills -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse hills -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse hills -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse hills -> hills over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 4 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse hills -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse hills -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 4 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse highlands -> lowlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 2 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse highlands -> desert over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 7 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse highlands -> woods over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 3 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse highlands -> swamp over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 8 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse highlands -> hills over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 4 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Horse highlands -> highlands over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse highlands -> highlands over a river with a bridge", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 5 }];
        buildings = [{ 'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw" }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, { changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true, x: 0, y: -1 });
    });
    test("Horse highlands -> mountains over a river", function (t) {
        let army = new riderArmy_1.RiderArmy(211, 1000, 1, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 5 }, { 'x': 0, 'y': -1, 'type': 6 }];
        gameState_1.GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
}
exports.movementWithRiversTests = movementWithRiversTests;
