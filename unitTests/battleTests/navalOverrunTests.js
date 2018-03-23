"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function navalOverrunTests() {
    test("Fleet outnumbered 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[3]], [battleTests_1.defenderArmies[4]], [], [], 1, 1);
        t.ok(battle.overrunAttack());
    });
    test("Defending fleet outnumbered 10:1 despite having warships.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[5]], [], [], 1, 1);
        t.ok(battle.overrunAttack());
    });
    test("Guard fleet outnumbering 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[6]], [battleTests_1.defenderArmies[4]], [], [], 1, 1);
        t.ok(battle.overrunAttack());
    });
    test("Guard fleet outnumbered 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[6]], [], [], 1, 1);
        t.notOk(battle.overrunAttack());
    });
    test("Attacking fleet not outnumbering 10:1 despite having warships.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[5]], [battleTests_1.defenderArmies[5]], [], [], 1, 1);
        t.notOk(battle.overrunAttack());
    });
}
exports.navalOverrunTests = navalOverrunTests;
