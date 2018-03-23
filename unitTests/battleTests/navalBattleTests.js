"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function navalBattleTests() {
    test("Basic fleet combat.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[10]], [battleTests_1.defenderArmies[11]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
    });
    test("Light warships on the attack.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[11]], [battleTests_1.defenderArmies[11]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
    });
    test("Heavy warships on the attack.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[12]], [battleTests_1.defenderArmies[11]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
    });
    test("Light warships on the defense.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[13]], [battleTests_1.defenderArmies[12]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [35], defenderLosses: [4.57] });
    });
    test("Heavy warships on the defense.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[13]], [battleTests_1.defenderArmies[13]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [60], defenderLosses: [2.33] });
    });
    test("Heavy and light warships on the defense.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[13]], [battleTests_1.defenderArmies[14]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [45], defenderLosses: [3.33] });
    });
    test("Heavy and light warships on the attack.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[14]], [battleTests_1.defenderArmies[11]], [], [], 2, 2);
        t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
    });
    test("Mixed fleet combat.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[15]], [battleTests_1.defenderArmies[15]], [], [], 2, 2);
        t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [32.39], defenderLosses: [14.02] });
    });
}
exports.navalBattleTests = navalBattleTests;
