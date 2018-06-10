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
function navalBattleTests() {
    test("Basic fleet combat.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[10]], [battleTests_1.defenderArmies[11]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [20], [8]));
    });
    test("Light warships on the attack.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[11]], [battleTests_1.defenderArmies[11]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [20], [8]));
    });
    test("Heavy warships on the attack.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[12]], [battleTests_1.defenderArmies[11]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [20], [8]));
    });
    test("Light warships on the defense.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[13]], [battleTests_1.defenderArmies[12]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [35], [4.57]));
    });
    test("Heavy warships on the defense.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[13]], [battleTests_1.defenderArmies[13]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [60], [2.33]));
    });
    test("Heavy and light warships on the defense.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[13]], [battleTests_1.defenderArmies[14]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [45], [3.33]));
    });
    test("Heavy and light warships on the attack.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[14]], [battleTests_1.defenderArmies[11]], [], [], [2, 2], 5, 5), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [20], [8]));
    });
    test("Mixed fleet combat.", function (t) {
        let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
        t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[15]], [battleTests_1.defenderArmies[15]], [], [], [2, 2], 10, 1), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [818.18], [14.02]));
    });
}
exports.navalBattleTests = navalBattleTests;
//# sourceMappingURL=navalBattleTests.js.map