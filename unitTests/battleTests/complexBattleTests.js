"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const footArmy_1 = require("../../armies/footArmy");
const gameState_1 = require("../../gameState");
const riderArmy_1 = require("../../armies/riderArmy");
const battleHandler_1 = require("../../armies/battleHandler");
const battleResult_1 = require("../../armies/battleResult");
const fleet_1 = require("../../armies/fleet");
const { test } = qunit_1.QUnit;
function complexBattleTest() {
    test("Large land battle at the defenders castle.", function (t) {
        let attackingArmies = [
            new footArmy_1.FootArmy(121, gameState_1.GameState.realms[1], 12000, 40, 0, 0, 0, [3, 3], 0, 0, true),
            new footArmy_1.FootArmy(122, gameState_1.GameState.realms[1], 32000, 80, 0, 0, 0, [3, 3], 0, 0),
            new riderArmy_1.RiderArmy(221, gameState_1.GameState.realms[1], 16000, 80, [3, 3], 0, 0) //army of attacker realm
        ];
        let defendingArmies = [
            new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 29000, 80, 0, 0, 0, [0, 0], 0, 0),
            new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 13500, 70, [3, 3], 0, 0),
            new footArmy_1.FootArmy(112, gameState_1.GameState.realms[2], 8000, 50, 0, 0, 0, [3, 3], 0, 0, true) //army of a third realm
        ];
        let battleHandler = new battleHandler_1.BattleHandler([], [3, 3]);
        t.resultEquals(battleHandler.calculateResult(attackingArmies, defendingArmies, [], [], [3, 3], 18, 3), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [5192.2, 37638.48, 18819.24], [29575.49, 14385.3, 4196.45]));
        //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test("Large naval battle.", function (t) {
        let attackingArmies = [
            new fleet_1.Fleet(321, gameState_1.GameState.realms[0], 120, 40, 0, 0, [2, 2], 0, true),
            new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 300, 100, 0, 0, [2, 2], 0),
            new fleet_1.Fleet(323, gameState_1.GameState.realms[0], 340, 60, 0, 0, [2, 2], 0) //army of attacker realm
        ];
        let defendingArmies = [
            new fleet_1.Fleet(311, gameState_1.GameState.realms[1], 225, 25, 10, 0, [2, 2], 0),
            new fleet_1.Fleet(312, gameState_1.GameState.realms[1], 175, 25, 0, 5, [2, 2], 0),
            new fleet_1.Fleet(313, gameState_1.GameState.realms[1], 100, 50, 0, 0, [2, 2], 0, true) //army of a defending realm
        ];
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult(attackingArmies, defendingArmies, [], [], [2, 2], 12, 8), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [35.60, 184, 252.20], [426.08, 331.39, 59.47]));
        //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
    });
}
exports.complexBattleTest = complexBattleTest;