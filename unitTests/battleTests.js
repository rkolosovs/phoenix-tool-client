"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const gameState_1 = require("../gameState");
const realm_1 = require("../realm");
const { test } = qunit_1.QUnit;
const { module } = qunit_1.QUnit;
qunit_1.QUnit.assert.resultEquals = function (actual, expected) {
    if (actual.result !== expected.result) {
        this.pushResult({ result: false, actual: actual, expected: expected,
            message: "Wrong result: result should be " + expected.result + " was " + actual.result });
        return false;
    }
    else if (actual.attackerLosses.some((loss, index) => loss !== expected.attackerLosses[index])) {
        this.pushResult({ result: false, actual: actual, expected: expected,
            message: "Wrong result: attackerLosses should be " + expected.attackerLosses + " was " + actual.attackerLosses });
        return false;
    }
    else if (actual.defenderLosses.some((loss, index) => loss !== expected.defenderLosses[index])) {
        this.pushResult({ result: false, actual: actual, expected: expected,
            message: "Wrong result: defenderLosses should be " + expected.defenderLosses + " was " + actual.defenderLosses });
        return false;
    }
    else {
        this.pushResult({ result: true, actual: actual, expected: expected, message: "Success!" });
        return true;
    }
};
module("Battle", {
    before: function () {
        //arrays to hold prepared armies for test
        let defenderArmies = [
            new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1),
            new heer(112, 1000, 5, 0, 0, 0, false, 0, 0, 1),
            new heer(115, 15000, 15, 0, 0, 0, false, 0, 0, 1),
            new heer(116, 1000, 36, 0, 0, 0, false, 0, 0, 1),
            new heer(117, 1500, 10, 0, 0, 0, false, 0, 0, 1),
            new heer(118, 10000, 10, 0, 0, 0, false, 0, 0, 1),
            new heer(119, 1200, 12, 0, 0, 0, false, 0, 0, 1),
            new reiterHeer(211, 5000, 5, false, 0, 0, 1),
            new reiterHeer(214, 10000, 5, false, 0, 0, 1),
            new reiterHeer(215, 1500, 10, false, 0, 0, 1),
            new reiterHeer(219, 1200, 12, false, 0, 0, 1),
            new seeHeer(311, 20, 5, 0, 0, false, 0, 0, 1),
            new seeHeer(312, 10, 5, 5, 0, false, 0, 0, 1),
            new seeHeer(313, 10, 5, 0, 5, false, 0, 0, 1),
            new seeHeer(314, 10, 5, 3, 2, false, 0, 0, 1),
            new seeHeer(315, 12, 2, 3, 1, false, 0, 0, 1),
            new seeHeer(316, 100, 10, 0, 0, false, 0, 0, 1),
            new seeHeer(317, 1000, 10, 0, 0, false, 0, 0, 1),
            new heer(199, 1000, 10, 0, 0, 0, false, 0, 0, 1) //18
        ];
        let attackerArmies = [
            new heer(121, 1000, 1, 0, 0, 0, false, 0, 0, 2),
            new heer(123, 10000, 5, 0, 0, 0, false, 0, 0, 2),
            new heer(124, 5000, 5, 0, 0, 0, false, 0, 0, 2),
            new heer(126, 1200, 4, 0, 0, 0, false, 0, 0, 2),
            new heer(127, 1000, 10, 0, 0, 0, true, 0, 0, 2),
            new heer(128, 1000, 100, 0, 0, 0, true, 0, 0, 2),
            new heer(129, 1000, 10, 0, 0, 0, false, 0, 0, 2),
            new reiterHeer(224, 15000, 15, false, 0, 0, 2),
            new reiterHeer(227, 1000, 10, true, 0, 0, 2),
            new reiterHeer(228, 1000, 10, false, 0, 0, 2),
            new seeHeer(321, 10, 5, 0, 0, false, 0, 0, 2),
            new seeHeer(322, 10, 5, 5, 0, false, 0, 0, 2),
            new seeHeer(323, 10, 5, 0, 5, false, 0, 0, 2),
            new seeHeer(324, 20, 5, 0, 0, false, 0, 0, 2),
            new seeHeer(325, 10, 5, 3, 2, false, 0, 0, 2),
            new seeHeer(326, 35, 40, 7, 6, false, 0, 0, 2),
            new seeHeer(327, 40, 35, 0, 0, true, 0, 0, 2),
            new seeHeer(328, 100, 100, 0, 0, true, 0, 0, 2),
            new heer(199, 1000, 10, 0, 0, 0, false, 0, 0, 2) //18
        ];
        gameState_1.GameState.reset();
        gameState_1.GameState.realms.push(new realm_1.Realm("Pink Realm", "r01", "213,038,181", 9, true));
        gameState_1.GameState.realms.push(new realm_1.Realm("Realm 2", "r02", "000,000,000", 9, true));
        gameState_1.GameState.realms.push(new realm_1.Realm("Realm 3", "r03", "000,000,000", 9, true));
    },
    beforeEach: function () {
        gameState_1.GameState.fields = [];
        gameState_1.GameState.buildings = [];
        gameState_1.GameState.rivers = [];
        gameState_1.GameState.realms.forEach(realm => realm.territory = []);
    },
    after: function () {
        gameState_1.GameState.reset();
    }
}, function () {
    module("Results", {
        before: function () {
            borders = [{ 'tag': 'r01', 'land': [[0, 0], [1, 1], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 8],
                        [9, 9], [10, 10], [11, 11]] }];
            rivers = [[[8, 8], [8, 7]], [[8, 8], [9, 7]]];
            buildings = [{ 'realm': 1, 'name': "", 'type': 0, 'x': 3, 'y': 3, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 1, 'x': 4, 'y': 4, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 2, 'x': 5, 'y': 5, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 3, 'x': 6, 'y': 6, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 4, 'x': 7, 'y': 7, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 5, 'x': 8, 'y': 8, 'direction': "w", 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 7, 'x': 8, 'y': 8, 'direction': "nw", 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null },
                { 'realm': 1, 'name': "", 'type': 8, 'x': null, 'y': null, 'direction': null, 'firstX': 9, 'firstY': 8, 'secondX': 10, 'secondY': 8 }];
            fields = [{ 'x': -1, 'y': 0, 'type': 2 }, { 'x': 0, 'y': 0, 'type': 2 }, { 'x': 0, 'y': 1, 'type': 2 }, { 'x': 1, 'y': 1, 'type': 3 },
                { 'x': 1, 'y': 2, 'type': 0 }, { 'x': 2, 'y': 2, 'type': 0 }, { 'x': 2, 'y': 3, 'type': 2 }, { 'x': 3, 'y': 3, 'type': 2 },
                { 'x': 3, 'y': 4, 'type': 2 }, { 'x': 4, 'y': 4, 'type': 2 }, { 'x': 4, 'y': 5, 'type': 2 }, { 'x': 5, 'y': 5, 'type': 2 },
                { 'x': 5, 'y': 6, 'type': 2 }, { 'x': 6, 'y': 6, 'type': 2 }, { 'x': 6, 'y': 7, 'type': 2 }, { 'x': 7, 'y': 7, 'type': 2 },
                { 'x': 8, 'y': 7, 'type': 5 }, { 'x': 9, 'y': 7, 'type': 5 }, { 'x': 7, 'y': 8, 'type': 5 }, { 'x': 8, 'y': 8, 'type': 5 },
                { 'x': 9, 'y': 8, 'type': 5 }, { 'x': 8, 'y': 9, 'type': 4 }, { 'x': 9, 'y': 9, 'type': 3 }, { 'x': 10, 'y': 9, 'type': 3 },
                { 'x': 9, 'y': 10, 'type': 2 }, { 'x': 10, 'y': 10, 'type': 8 }, { 'x': 10, 'y': 11, 'type': 2 }, { 'x': 11, 'y': 11, 'type': 7 }];
        },
        beforeEach: function () {
            realms = [{ active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01' },
                { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02' },
                { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03' }];
        },
        after: function () {
            defenderArmies = [];
            attackerArmies = [];
            borders = [];
            buildings = [];
            fields = [];
            realms = [];
        }
    }, function () {
        module("Land Battles", function () {
            test("Minimal armies, defenders win by dice roll.", function (t) {
                let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
                t.resultEquals(battle.result(1, 10), { victor: 'defender', attackerLosses: [1045], defenderLosses: [861.24] });
            });
            test("Minimal armies, attackers win by dice roll.", function (t) {
                let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
                t.resultEquals(battle.result(9, 2), { victor: 'attacker', attackerLosses: [869.57], defenderLosses: [1035] });
            });
            test("Minimal armies, tie (both loose).", function (t) {
                let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
                t.resultEquals(battle.result(5, 5), { victor: 'tie', attackerLosses: [1000], defenderLosses: [1000] });
            });
            test("Different officer count, different rolls, tie (both loose).", function (t) {
                let battle = new schlacht([attackerArmies[0]], [defenderArmies[1]], [], [], 0, 0);
                t.resultEquals(battle.result(7, 3), { victor: 'tie', attackerLosses: [1000], defenderLosses: [1000] });
            });
            test("Riders vs footmen on plains.", function (t) {
                let battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], [], [], 0, 0);
                t.resultEquals(battle.result(6, 6), { victor: 'defender', attackerLosses: [17000], defenderLosses: [5294.12] });
            });
            test("Riders vs footmen in woods.", function (t) {
                let battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], [], [], 1, 1);
                t.resultEquals(battle.result(4, 4), { victor: 'attacker', attackerLosses: [5294.12], defenderLosses: [17000] });
            });
            test("Mixed armies of different compositions on plains.", function (t) {
                let battle = new schlacht([attackerArmies[2], attackerArmies[7]], [defenderArmies[2], defenderArmies[7]], [], [], 0, 0);
                t.resultEquals(battle.result(5, 5), { victor: 'attacker', attackerLosses: [5456.25, 8780.49], defenderLosses: [22687.5, 4395.6] });
            });
            test("Tie with soldier count, officer count and dice roll all different.", function (t) {
                let battle = new schlacht([attackerArmies[3]], [defenderArmies[3]], [], [], 0, 0);
                t.resultEquals(battle.result(1, 10), { victor: 'tie', attackerLosses: [1205], defenderLosses: [995.85] });
            });
            test("Combat in attackers home terrain.", function (t) {
                realms[1].homeTurf = 2;
                attackerArmies[18].x = 0;
                attackerArmies[18].y = 0;
                attackerArmies[18].oldX = -1;
                attackerArmies[18].oldY = 0;
                defenderArmies[18].x = 0;
                defenderArmies[18].y = 0;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 0, 0);
                t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [720], defenderLosses: [1250] });
            });
            test("Combat in defenders home terrain.", function (t) {
                realms[0].homeTurf = 2;
                attackerArmies[18].x = 0;
                attackerArmies[18].y = 0;
                attackerArmies[18].oldX = -1;
                attackerArmies[18].oldY = 0;
                defenderArmies[18].x = 0;
                defenderArmies[18].y = 0;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 0, 0);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
            });
        });
        module("Naval Battles", function () {
            test("Basic fleet combat.", function (t) {
                let battle = new schlacht([attackerArmies[10]], [defenderArmies[11]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
            });
            test("Light warships on the attack.", function (t) {
                let battle = new schlacht([attackerArmies[11]], [defenderArmies[11]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
            });
            test("Heavy warships on the attack.", function (t) {
                let battle = new schlacht([attackerArmies[12]], [defenderArmies[11]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
            });
            test("Light warships on the defense.", function (t) {
                let battle = new schlacht([attackerArmies[13]], [defenderArmies[12]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [35], defenderLosses: [4.57] });
            });
            test("Heavy warships on the defense.", function (t) {
                let battle = new schlacht([attackerArmies[13]], [defenderArmies[13]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [60], defenderLosses: [2.33] });
            });
            test("Heavy and light warships on the defense.", function (t) {
                let battle = new schlacht([attackerArmies[13]], [defenderArmies[14]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [45], defenderLosses: [3.33] });
            });
            test("Heavy and light warships on the attack.", function (t) {
                let battle = new schlacht([attackerArmies[14]], [defenderArmies[11]], [], [], 2, 2);
                t.resultEquals(battle.result(5, 5), { victor: 'defender', attackerLosses: [20], defenderLosses: [8] });
            });
            test("Mixed fleet combat.", function (t) {
                let battle = new schlacht([attackerArmies[15]], [defenderArmies[15]], [], [], 2, 2);
                t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [32.39], defenderLosses: [14.02] });
            });
        });
        module("Guard Battles", function () {
            test("Guard fleet combat.", function (t) {
                let battle = new schlacht([attackerArmies[16]], [defenderArmies[16]], [], [], 2, 2);
                t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [43.45], defenderLosses: [106.8] });
            });
            test("Foot vs guard foot.", function (t) {
                let battle = new schlacht([attackerArmies[4]], [defenderArmies[4]], [], [], 0, 0);
                t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [667.98], defenderLosses: [2545] });
            });
            test("Riders vs guard foot on plains.", function (t) {
                let battle = new schlacht([attackerArmies[4]], [defenderArmies[9]], [], [], 0, 0);
                t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [813.01], defenderLosses: [1568.25] });
                //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
            });
            test("Foot vs guard riders in forest.", function (t) {
                let battle = new schlacht([attackerArmies[8]], [defenderArmies[4]], [], [], 1, 1);
                t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [813.01], defenderLosses: [1568.25] });
                //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
            });
            test("Riders vs guard riders.", function (t) {
                let battle = new schlacht([attackerArmies[8]], [defenderArmies[9]], [], [], 1, 1);
                t.resultEquals(battle.result(10, 1), { victor: 'attacker', attackerLosses: [667.98], defenderLosses: [2545] });
            });
            test("Foot vs guard foot 10:1 fight.", function (t) {
                let battle = new schlacht([attackerArmies[5]], [defenderArmies[5]], [], [], 0, 0);
                t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [3338.90], defenderLosses: [0] });
                //TODO Not sure if the rules work as intended here (victor losses being 0)
            });
            test("Fleet vs guard fleet 10:1 fight.", function (t) {
                let battle = new schlacht([attackerArmies[17]], [defenderArmies[17]], [], [], 2, 2);
                t.resultEquals(battle.result(10, 1), { victor: 'defender', attackerLosses: [333.89], defenderLosses: [0] });
                //TODO Not sure if the rules work as intended here (victor losses being 0)
            });
            test("Mixed army vs guard foot and regular horse in forest.", function (t) {
                let battle = new schlacht([attackerArmies[4], attackerArmies[9]], [defenderArmies[6], defenderArmies[10]], [], [], 1, 1);
                t.resultEquals(battle.result(5, 5), { victor: 'attacker', attackerLosses: [471.83, 1822.4], defenderLosses: [1390, 2090] });
            });
            test("Mixed army vs regular foot and guard horse on plains.", function (t) {
                let battle = new schlacht([attackerArmies[6], attackerArmies[8]], [defenderArmies[6], defenderArmies[10]], [], [], 0, 0);
                t.resultEquals(battle.result(5, 5), { victor: 'attacker', attackerLosses: [1822.4, 471.83], defenderLosses: [2090, 1390] });
            });
        });
        module("Directional Terrain Bonuses", {
            beforeEach: function () {
                realms = [{ active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01' },
                    { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02' },
                    { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03' }];
                defenderArmies[18].owner = 1;
            }
        }, function () {
            test("Attack onto a street.", function (t) {
                attackerArmies[18].x = 9;
                attackerArmies[18].y = 8;
                attackerArmies[18].oldX = 9;
                attackerArmies[18].oldY = 7;
                defenderArmies[18].x = 9;
                defenderArmies[18].y = 8;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 9, 8);
                t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
            });
            test("Attack out of a forest.", function (t) {
                attackerArmies[18].x = 9;
                attackerArmies[18].y = 9;
                attackerArmies[18].oldX = 10;
                attackerArmies[18].oldY = 9;
                defenderArmies[18].x = 9;
                defenderArmies[18].y = 9;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 9, 9);
                t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
            });
            test("Attack into a swamp.", function (t) {
                attackerArmies[18].x = 10;
                attackerArmies[18].y = 10;
                attackerArmies[18].oldX = 9;
                attackerArmies[18].oldY = 10;
                defenderArmies[18].x = 10;
                defenderArmies[18].y = 10;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 10, 10);
                t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
            });
            test("Attack into a desert.", function (t) {
                attackerArmies[18].x = 11;
                attackerArmies[18].y = 11;
                attackerArmies[18].oldX = 10;
                attackerArmies[18].oldY = 11;
                defenderArmies[18].x = 11;
                defenderArmies[18].y = 11;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 11, 11);
                t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
            });
            test("Attack downhill.", function (t) {
                attackerArmies[18].x = 9;
                attackerArmies[18].y = 9;
                attackerArmies[18].oldX = 8;
                attackerArmies[18].oldY = 9;
                defenderArmies[18].x = 9;
                defenderArmies[18].y = 9;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 9, 9);
                t.resultEquals(battle.result(10, 10), { victor: 'attacker', attackerLosses: [818.18], defenderLosses: [1100] });
            });
            test("Defense downhill (attack uphill).", function (t) {
                attackerArmies[18].x = 8;
                attackerArmies[18].y = 8;
                attackerArmies[18].oldX = 8;
                attackerArmies[18].oldY = 9;
                defenderArmies[18].x = 8;
                defenderArmies[18].y = 8;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 8, 8);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1100], defenderLosses: [818.18] });
            });
            test("Defense behind a river.", function (t) {
                attackerArmies[18].x = 8;
                attackerArmies[18].y = 8;
                attackerArmies[18].oldX = 9;
                attackerArmies[18].oldY = 7;
                defenderArmies[18].x = 8;
                defenderArmies[18].y = 8;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 8, 8);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
            });
            test("Defense behind a bridge.", function (t) {
                attackerArmies[18].x = 8;
                attackerArmies[18].y = 8;
                attackerArmies[18].oldX = 8;
                attackerArmies[18].oldY = 7;
                defenderArmies[18].x = 8;
                defenderArmies[18].y = 8;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 8, 8);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1150], defenderLosses: [782.61] });
            });
            test("Defense behind a wall.", function (t) {
                attackerArmies[18].x = 8;
                attackerArmies[18].y = 8;
                attackerArmies[18].oldX = 7;
                attackerArmies[18].oldY = 8;
                defenderArmies[18].x = 8;
                defenderArmies[18].y = 8;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 8, 8);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
            });
            test("Defense in own caste.", function (t) {
                attackerArmies[18].x = 3;
                attackerArmies[18].y = 3;
                attackerArmies[18].oldX = 2;
                attackerArmies[18].oldY = 3;
                defenderArmies[18].x = 3;
                defenderArmies[18].y = 3;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 3, 3);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1500], defenderLosses: [600] });
            });
            test("Defense in own city.", function (t) {
                attackerArmies[18].x = 4;
                attackerArmies[18].y = 4;
                attackerArmies[18].oldX = 3;
                attackerArmies[18].oldY = 4;
                defenderArmies[18].x = 4;
                defenderArmies[18].y = 4;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 4, 4);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [2000], defenderLosses: [450] });
            });
            test("Defense in own fortress.", function (t) {
                attackerArmies[18].x = 5;
                attackerArmies[18].y = 5;
                attackerArmies[18].oldX = 4;
                attackerArmies[18].oldY = 5;
                defenderArmies[18].x = 5;
                defenderArmies[18].y = 5;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 5, 5);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [2500], defenderLosses: [360] });
            });
            test("Defense in own capital.", function (t) {
                attackerArmies[18].x = 6;
                attackerArmies[18].y = 6;
                attackerArmies[18].oldX = 5;
                attackerArmies[18].oldY = 6;
                defenderArmies[18].x = 6;
                defenderArmies[18].y = 6;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 6, 6);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [3000], defenderLosses: [300] });
            });
            test("Defense in own capital fortress.", function (t) {
                attackerArmies[18].x = 7;
                attackerArmies[18].y = 7;
                attackerArmies[18].oldX = 6;
                attackerArmies[18].oldY = 7;
                defenderArmies[18].x = 7;
                defenderArmies[18].y = 7;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 7, 7);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [3500], defenderLosses: [257.14] });
            });
            test("Defense in foreign production building.", function (t) {
                attackerArmies[18].x = 4;
                attackerArmies[18].y = 4;
                attackerArmies[18].oldX = 3;
                attackerArmies[18].oldY = 4;
                defenderArmies[18].x = 4;
                defenderArmies[18].y = 4;
                defenderArmies[18].owner = 3;
                let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 4, 4);
                t.resultEquals(battle.result(10, 10), { victor: 'defender', attackerLosses: [1250], defenderLosses: [720] });
            });
        });
        module("Complex Battles", function () {
            test("Large land battle at the defenders castle.", function (t) {
                realms = [{ active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01' },
                    { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02' },
                    { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03' }];
                let attackingArmies = [
                    new heer(121, 12000, 40, 0, 0, 0, true, 0, 0, 2),
                    new heer(122, 32000, 80, 0, 0, 0, false, 0, 0, 2),
                    new reiterHeer(221, 16000, 80, false, 0, 0, 2) //army of attacker realm
                ];
                let defendingArmies = [
                    new heer(111, 29000, 80, 0, 0, 0, false, 0, 0, 1),
                    new reiterHeer(211, 13500, 70, false, 0, 0, 1),
                    new heer(112, 8000, 50, 0, 0, 0, true, 0, 0, 3) //army of a third realm
                ];
                let battle = new schlacht(attackingArmies, defendingArmies, [], [], 3, 3);
                t.resultEquals(battle.result(18, 3), { victor: 'attacker', attackerLosses: [5192.2, 37638.48, 18819.24], defenderLosses: [29575.49, 14385.3, 4196.45] });
                //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
            });
            test("Large naval battle.", function (t) {
                let attackingArmies = [
                    new seeHeer(321, 120, 40, 0, 0, true, 0, 0, 1),
                    new seeHeer(322, 300, 100, 0, 0, false, 0, 0, 1),
                    new seeHeer(323, 340, 60, 0, 0, false, 0, 0, 1) //army of attacker realm
                ];
                let defendingArmies = [
                    new seeHeer(311, 225, 25, 10, 0, false, 0, 0, 2),
                    new seeHeer(312, 175, 25, 0, 5, false, 0, 0, 2),
                    new seeHeer(313, 100, 50, 0, 0, true, 0, 0, 2) //army of a defending realm
                ];
                let battle = new schlacht(attackingArmies, defendingArmies, [], [], 2, 2);
                t.resultEquals(battle.result(12, 8), { victor: 'attacker', attackerLosses: [35.60, 184, 252.20], defenderLosses: [426.08, 331.39, 59.47] });
                //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
            });
        });
    });
    module("Overrun", {
        before: function () {
            realms = [{ active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01' },
                { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02' },
                { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03' }];
            defenderArmies = [
                new heer(111, 1500, 10, 0, 0, 0, false, 0, 0, 1),
                new heer(112, 1000, 10, 0, 0, 0, false, 0, 0, 1),
                new heer(113, 1000, 10, 0, 0, 0, true, 0, 0, 1),
                new reiterHeer(211, 1000, 15, false, 0, 0, 1),
                new seeHeer(311, 20, 5, 0, 0, false, 0, 0, 1),
                new seeHeer(314, 10, 5, 3, 2, false, 0, 0, 1),
                new seeHeer(315, 10, 5, 0, 0, true, 0, 0, 1) //6
            ];
            attackerArmies = [
                new heer(123, 15000, 1, 0, 0, 0, false, 0, 0, 2),
                new heer(124, 10000, 1, 0, 0, 0, true, 0, 0, 2),
                new reiterHeer(224, 10000, 1, false, 0, 0, 2),
                new seeHeer(321, 200, 5, 0, 0, false, 0, 0, 2),
                new seeHeer(322, 100, 5, 0, 0, false, 0, 0, 2),
                new seeHeer(325, 99, 5, 3, 2, false, 0, 0, 2),
                new seeHeer(326, 200, 5, 0, 0, true, 0, 0, 2) //6
            ];
            fields = [{ 'x': 0, 'y': 0, 'type': 2 }, { 'x': 1, 'y': 1, 'type': 0 }]; //plains, water
        },
        after: function () {
            defenderArmies = [];
            attackerArmies = [];
        }
    }, function () {
        module("Land Battles", function () {
            test("Footmen outnumbered 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
                t.ok(battle.overrunAttack());
            });
            test("Riders outnumbered 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[2]], [defenderArmies[3]], [], [], 0, 0);
                t.ok(battle.overrunAttack());
            });
            test("Mixed army outnumbered 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[0], attackerArmies[2]], [defenderArmies[0], defenderArmies[3]], [], [], 0, 0);
                t.ok(battle.overrunAttack());
            });
            test("Guard outnumbering 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[1]], [defenderArmies[1]], [], [], 0, 0);
                t.ok(battle.overrunAttack());
            });
            test("Guard outnumbered 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[0]], [defenderArmies[2]], [], [], 0, 0);
                t.notOk(battle.overrunAttack());
            });
        });
        module("Naval Battles", function () {
            test("Fleet outnumbered 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[3]], [defenderArmies[4]], [], [], 1, 1);
                t.ok(battle.overrunAttack());
            });
            test("Defending fleet outnumbered 10:1 despite having warships.", function (t) {
                let battle = new schlacht([attackerArmies[4]], [defenderArmies[5]], [], [], 1, 1);
                t.ok(battle.overrunAttack());
            });
            test("Guard fleet outnumbering 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[6]], [defenderArmies[4]], [], [], 1, 1);
                t.ok(battle.overrunAttack());
            });
            test("Guard fleet outnumbered 10:1.", function (t) {
                let battle = new schlacht([attackerArmies[4]], [defenderArmies[6]], [], [], 1, 1);
                t.notOk(battle.overrunAttack());
            });
            test("Attacking fleet not outnumbering 10:1 despite having warships.", function (t) {
                let battle = new schlacht([attackerArmies[5]], [defenderArmies[5]], [], [], 1, 1);
                t.notOk(battle.overrunAttack());
            });
        });
    });
});
