"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const battleHandler_1 = require("../../armies/battleHandler");
const { test } = qunit_1.QUnit;
function navalOverrunTests() {
    test("Fleet outnumbered 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[3]], [battleTests_1.defenderArmies[4]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Defending fleet outnumbered 10:1 despite having warships.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[5]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Guard fleet outnumbering 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[6]], [battleTests_1.defenderArmies[4]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Guard fleet outnumbered 10:1.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.notOk(battleHandler.calculateResult([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[6]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
    test("Attacking fleet not outnumbering 10:1 despite having warships.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.notOk(battleHandler.calculateResult([battleTests_1.attackerArmies[5]], [battleTests_1.defenderArmies[5]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
    });
}
exports.navalOverrunTests = navalOverrunTests;
