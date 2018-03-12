"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fleet_1 = require("../../armies/fleet");
const gameState_1 = require("../../gameState");
function fleetMovementTests() {
    test("Shallows -> lowlands", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 2 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> desert", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 7 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> woods", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 3 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> swamp", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 8 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> hills", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 4 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> highlands", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 5 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> mountains", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 6 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Shallows -> shallows", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 0 }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Shallows -> shallows on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 0 }, { 'x': 1, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[1, -1]] }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 5, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Shallows -> shallows on coast (distance two)", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 0 }, { 'x': 1, 'y': -1, 'type': 0 }, { 'x': 2, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[2, -1]] }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 5, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Shallows -> deepsea", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 1 }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 12, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Shallows -> deepsea on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 0 }, { 'x': 0, 'y': -1, 'type': 1 }, { 'x': 1, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[1, -1]] }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 8, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Deepsea -> lowlands", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 2 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> desert", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 7 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> woods", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 3 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> swamp", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 8 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> hills", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 4 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> highlands", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 5 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> mountains", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 6 }];
        fleet.clickedMoves();
        t.moveImpossible(fleet.possibleMoves, { dir: 0, x: 0, y: -1 });
    });
    test("Deepsea -> shallows", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 0 }, { 'x': 1, 'y': -1, 'type': 2 }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Deepsea -> shallows on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 0 }, { 'x': 1, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[1, -1]] }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 5, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Deepsea -> deepsea", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 1 }, { 'x': 1, 'y': -1, 'type': 2 }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 12, height: 2, landunit: false, x: 0, y: -1 });
    });
    test("Deepsea -> deepsea on coast", function (t) {
        let fleet = new fleet_1.Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        gameState_1.GameState.fields = [{ 'x': 0, 'y': 0, 'type': 1 }, { 'x': 0, 'y': -1, 'type': 1 }, { 'x': 1, 'y': -1, 'type': 2 }];
        borders = [{ 'tag': 'r01', 'land': [[1, -1]] }];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, { changHeight: false, dir: 0, movepoints: 8, height: 2, landunit: false, x: 0, y: -1 });
    });
}
exports.fleetMovementTests = fleetMovementTests;
