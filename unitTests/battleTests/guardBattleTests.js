"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function guardBattleTests() {
    test("Guard fleet combat.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[16]], [battleTests_1.defenderArmies[16]], [], [], 2, 2);
        t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [43.45], defenderLosses: [106.8] });
    });
    test("Foot vs guard foot.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[4]], [], [], 0, 0);
        t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [667.98], defenderLosses: [2545] });
    });
    test("Riders vs guard foot on plains.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[9]], [], [], 0, 0);
        t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [813.01], defenderLosses: [1568.25] });
        //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test("Foot vs guard riders in forest.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[8]], [battleTests_1.defenderArmies[4]], [], [], 1, 1);
        t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [813.01], defenderLosses: [1568.25] });
        //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test("Riders vs guard riders.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[8]], [battleTests_1.defenderArmies[9]], [], [], 1, 1);
        t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [667.98], defenderLosses: [2545] });
    });
    test("Foot vs guard foot 10:1 fight.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[5]], [battleTests_1.defenderArmies[5]], [], [], 0, 0);
        t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [3338.90], defenderLosses: [0] });
        //TODO Not sure if the rules work as intended here (victor losses being 0)
    });
    test("Fleet vs guard fleet 10:1 fight.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[17]], [battleTests_1.defenderArmies[17]], [], [], 2, 2);
        t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [333.89], defenderLosses: [0] });
        //TODO Not sure if the rules work as intended here (victor losses being 0)
    });
    test("Mixed army vs guard foot and regular horse in forest.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[4], battleTests_1.attackerArmies[9]], [battleTests_1.defenderArmies[6], battleTests_1.defenderArmies[10]], [], [], 1, 1);
        t.resultEquals(battle.result(5, 5), { victor: 'attacker', attackerLosses: [471.83, 1822.4], defenderLosses: [1390, 2090] });
    });
    test("Mixed army vs regular foot and guard horse on plains.", function (t) {
        let battle = new schlacht([battleTests_1.attackerArmies[6], battleTests_1.attackerArmies[8]], [battleTests_1.defenderArmies[6], battleTests_1.defenderArmies[10]], [], [], 0, 0);
        t.resultEquals(battle.result(5, 5), { victor: 'attacker', attackerLosses: [1822.4, 471.83], defenderLosses: [2090, 1390] });
    });
}
exports.guardBattleTests = guardBattleTests;
