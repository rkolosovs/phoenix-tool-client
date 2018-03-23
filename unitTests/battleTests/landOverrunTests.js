"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function landOverrunTests() {
    test("Footmen outnumbered 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test("Riders outnumbered 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[2]], [battleTests_1.defenderArmies[3]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test("Mixed army outnumbered 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[0], battleTests_1.attackerArmies[2]], [battleTests_1.defenderArmies[0], battleTests_1.defenderArmies[3]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test("Guard outnumbering 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[1]], [battleTests_1.defenderArmies[1]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test("Guard outnumbered 10:1.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[2]], [], [], 0, 0);
        t.notOk(battle.overrunAttack());
    });
}
exports.landOverrunTests = landOverrunTests;
