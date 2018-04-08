"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const battleHandler_1 = require("../../armies/battleHandler");
const { test } = qunit_1.QUnit;
function landOverrunTests() {
    test("Footmen outnumbered 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Riders outnumbered 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[2]], [battleTests_1.defenderArmies[3]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Mixed army outnumbered 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[0], battleTests_1.attackerArmies[2]], [battleTests_1.defenderArmies[0], battleTests_1.defenderArmies[3]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Guard outnumbering 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[1]], [battleTests_1.defenderArmies[1]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Guard outnumbered 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.notOk(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[2]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
}
exports.landOverrunTests = landOverrunTests;
