"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
Object.defineProperty(exports, "__esModule", { value: true });
const battleTests_1 = require("../battleTests");
const qunit_1 = require("qunit");
const battleHandler_1 = require("../../armies/battleHandler");
const battleResult_1 = require("../../armies/battleResult");
const { test } = qunit_1.QUnit;
function guardBattleTests() {
    test("Guard fleet combat.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[16]], [battleTests_1.defenderArmies[16]], [], [], [2, 2], 10, 1), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [43.45], [106.8]));
    });
    test("Foot vs guard foot.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[4]], [], [], [0, 0], 10, 1), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [667.98], [2545]));
    });
    test("Riders vs guard foot on plains.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[9]], [], [], [0, 0], 10, 1), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [813.01], [1568.25]));
        //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test("Foot vs guard riders in forest.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[8]], [battleTests_1.defenderArmies[4]], [], [], [1, 1], 10, 1), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [813.01], [1568.25]));
        //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test("Riders vs guard riders.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[8]], [battleTests_1.defenderArmies[9]], [], [], [1, 1], 10, 1), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [667.98], [2545]));
    });
    test("Foot vs guard foot 10:1 fight.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[5]], [battleTests_1.defenderArmies[5]], [], [], [0, 0], 10, 1), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [3338.90], [0]));
        //TODO Not sure if the rules work as intended here (victor losses being 0)
    });
    test("Fleet vs guard fleet 10:1 fight.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[17]], [battleTests_1.defenderArmies[17]], [], [], [2, 2], 10, 1), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [333.89], [0]));
        //TODO Not sure if the rules work as intended here (victor losses being 0)
    });
    test("Mixed army vs guard foot and regular horse in forest.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[4], battleTests_1.attackerArmies[9]], [battleTests_1.defenderArmies[6], battleTests_1.defenderArmies[10]], [], [], [1, 1], 5, 5), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [471.83, 1822.4], [1390, 2090]));
    });
    test("Mixed army vs regular foot and guard horse on plains.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[6], battleTests_1.attackerArmies[8]], [battleTests_1.defenderArmies[6], battleTests_1.defenderArmies[10]], [], [], [0, 0], 5, 5), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [1822.4, 471.83], [2090, 1390]));
    });
}
exports.guardBattleTests = guardBattleTests;
//# sourceMappingURL=guardBattleTests.js.map