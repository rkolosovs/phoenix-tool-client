"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function directionalTerrainBattleTests() {
    test("Attack onto a street.", function (t) {
        battleTests_1.attackerArmies[18].x = 9;
        battleTests_1.attackerArmies[18].y = 8;
        battleTests_1.attackerArmies[18].oldX = 9;
        battleTests_1.attackerArmies[18].oldY = 7;
        battleTests_1.defenderArmies[18].x = 9;
        battleTests_1.defenderArmies[18].y = 8;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 9, 8);
        t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
    });
    test("Attack out of a forest.", function (t) {
        battleTests_1.attackerArmies[18].x = 9;
        battleTests_1.attackerArmies[18].y = 9;
        battleTests_1.attackerArmies[18].oldX = 10;
        battleTests_1.attackerArmies[18].oldY = 9;
        battleTests_1.defenderArmies[18].x = 9;
        battleTests_1.defenderArmies[18].y = 9;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 9, 9);
        t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
    });
    test("Attack into a swamp.", function (t) {
        battleTests_1.attackerArmies[18].x = 10;
        battleTests_1.attackerArmies[18].y = 10;
        battleTests_1.attackerArmies[18].oldX = 9;
        battleTests_1.attackerArmies[18].oldY = 10;
        battleTests_1.defenderArmies[18].x = 10;
        battleTests_1.defenderArmies[18].y = 10;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 10, 10);
        t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
    });
    test("Attack into a desert.", function (t) {
        battleTests_1.attackerArmies[18].x = 11;
        battleTests_1.attackerArmies[18].y = 11;
        battleTests_1.attackerArmies[18].oldX = 10;
        battleTests_1.attackerArmies[18].oldY = 11;
        battleTests_1.defenderArmies[18].x = 11;
        battleTests_1.defenderArmies[18].y = 11;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 11, 11);
        t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
    });
    test("Attack downhill.", function (t) {
        battleTests_1.attackerArmies[18].x = 9;
        battleTests_1.attackerArmies[18].y = 9;
        battleTests_1.attackerArmies[18].oldX = 8;
        battleTests_1.attackerArmies[18].oldY = 9;
        battleTests_1.defenderArmies[18].x = 9;
        battleTests_1.defenderArmies[18].y = 9;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 9, 9);
        t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
    });
    test("Defense downhill (attack uphill).", function (t) {
        battleTests_1.attackerArmies[18].x = 8;
        battleTests_1.attackerArmies[18].y = 8;
        battleTests_1.attackerArmies[18].oldX = 8;
        battleTests_1.attackerArmies[18].oldY = 9;
        battleTests_1.defenderArmies[18].x = 8;
        battleTests_1.defenderArmies[18].y = 8;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 8, 8);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1100], defenderLosses: [818.18] });
    });
    test("Defense behind a river.", function (t) {
        battleTests_1.attackerArmies[18].x = 8;
        battleTests_1.attackerArmies[18].y = 8;
        battleTests_1.attackerArmies[18].oldX = 9;
        battleTests_1.attackerArmies[18].oldY = 7;
        battleTests_1.defenderArmies[18].x = 8;
        battleTests_1.defenderArmies[18].y = 8;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 8, 8);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
    });
    test("Defense behind a bridge.", function (t) {
        battleTests_1.attackerArmies[18].x = 8;
        battleTests_1.attackerArmies[18].y = 8;
        battleTests_1.attackerArmies[18].oldX = 8;
        battleTests_1.attackerArmies[18].oldY = 7;
        battleTests_1.defenderArmies[18].x = 8;
        battleTests_1.defenderArmies[18].y = 8;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 8, 8);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1150], defenderLosses: [782.61] });
    });
    test("Defense behind a wall.", function (t) {
        battleTests_1.attackerArmies[18].x = 8;
        battleTests_1.attackerArmies[18].y = 8;
        battleTests_1.attackerArmies[18].oldX = 7;
        battleTests_1.attackerArmies[18].oldY = 8;
        battleTests_1.defenderArmies[18].x = 8;
        battleTests_1.defenderArmies[18].y = 8;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 8, 8);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
    });
    test("Defense in own caste.", function (t) {
        battleTests_1.attackerArmies[18].x = 3;
        battleTests_1.attackerArmies[18].y = 3;
        battleTests_1.attackerArmies[18].oldX = 2;
        battleTests_1.attackerArmies[18].oldY = 3;
        battleTests_1.defenderArmies[18].x = 3;
        battleTests_1.defenderArmies[18].y = 3;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 3, 3);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1500], defenderLosses: [600] });
    });
    test("Defense in own city.", function (t) {
        battleTests_1.attackerArmies[18].x = 4;
        battleTests_1.attackerArmies[18].y = 4;
        battleTests_1.attackerArmies[18].oldX = 3;
        battleTests_1.attackerArmies[18].oldY = 4;
        battleTests_1.defenderArmies[18].x = 4;
        battleTests_1.defenderArmies[18].y = 4;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 4, 4);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [2000], defenderLosses: [450] });
    });
    test("Defense in own fortress.", function (t) {
        battleTests_1.attackerArmies[18].x = 5;
        battleTests_1.attackerArmies[18].y = 5;
        battleTests_1.attackerArmies[18].oldX = 4;
        battleTests_1.attackerArmies[18].oldY = 5;
        battleTests_1.defenderArmies[18].x = 5;
        battleTests_1.defenderArmies[18].y = 5;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 5, 5);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [2500], defenderLosses: [360] });
    });
    test("Defense in own capital.", function (t) {
        battleTests_1.attackerArmies[18].x = 6;
        battleTests_1.attackerArmies[18].y = 6;
        battleTests_1.attackerArmies[18].oldX = 5;
        battleTests_1.attackerArmies[18].oldY = 6;
        battleTests_1.defenderArmies[18].x = 6;
        battleTests_1.defenderArmies[18].y = 6;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 6, 6);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [3000], defenderLosses: [300] });
    });
    test("Defense in own capital fortress.", function (t) {
        battleTests_1.attackerArmies[18].x = 7;
        battleTests_1.attackerArmies[18].y = 7;
        battleTests_1.attackerArmies[18].oldX = 6;
        battleTests_1.attackerArmies[18].oldY = 7;
        battleTests_1.defenderArmies[18].x = 7;
        battleTests_1.defenderArmies[18].y = 7;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 7, 7);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [3500], defenderLosses: [257.14] });
    });
    test("Defense in foreign production building.", function (t) {
        battleTests_1.attackerArmies[18].x = 4;
        battleTests_1.attackerArmies[18].y = 4;
        battleTests_1.attackerArmies[18].oldX = 3;
        battleTests_1.attackerArmies[18].oldY = 4;
        battleTests_1.defenderArmies[18].x = 4;
        battleTests_1.defenderArmies[18].y = 4;
        battleTests_1.defenderArmies[18].owner = 3;
        let battle = new schlacht([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], 4, 4);
        t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
    });
}
exports.directionalTerrainBattleTests = directionalTerrainBattleTests;
