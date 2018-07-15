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
define(["require", "exports", "../battleTests", "../../armies/battleHandler", "../../armies/battleResult", "../../gameState"], function (require, exports, battleTests_1, battleHandler_1, battleResult_1, gameState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = QUnit.test;
    function directionalTerrainBattleTests() {
        test("Attack onto a street.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([9, 7]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(3 /* SE */);
            battleTests_1.attackerArmies[18].move(3 /* SE */);
            battleTests_1.defenderArmies[18].changePosition([9, 8]);
            let battleHandler = new battleHandler_1.BattleHandler([], [9, 8]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [9, 8], 10, 10), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [818.18], [1100]));
        });
        test("Attack out of a forest.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([10, 9]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(5 /* W */);
            battleTests_1.attackerArmies[18].move(5 /* W */);
            battleTests_1.defenderArmies[18].changePosition([9, 9]);
            let battleHandler = new battleHandler_1.BattleHandler([], [9, 9]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [9, 9], 10, 10), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [818.18], [1100]));
        });
        test("Attack into a swamp.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([9, 10]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([10, 10]);
            let battleHandler = new battleHandler_1.BattleHandler([], [10, 10]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [10, 10], 10, 10), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [818.18], [1100]));
        });
        test("Attack into a desert.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([10, 11]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([11, 11]);
            let battleHandler = new battleHandler_1.BattleHandler([], [11, 11]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [11, 11], 10, 10), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [818.18], [1100]));
        });
        test("Attack downhill.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([8, 9]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(5 /* W */);
            battleTests_1.attackerArmies[18].move(5 /* W */);
            battleTests_1.defenderArmies[18].changePosition([9, 9]);
            let battleHandler = new battleHandler_1.BattleHandler([], [9, 9]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [9, 9], 10, 10), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [818.18], [1100]));
        });
        test("Defense downhill (attack uphill).", function (t) {
            battleTests_1.attackerArmies[18].changePosition([8, 9]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(4 /* SW */);
            battleTests_1.attackerArmies[18].move(4 /* SW */);
            battleTests_1.defenderArmies[18].changePosition([8, 8]);
            let battleHandler = new battleHandler_1.BattleHandler([], [8, 8]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [8, 8], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1100], [818.18]));
        });
        test("Defense behind a river.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([9, 7]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(4 /* SW */);
            battleTests_1.attackerArmies[18].move(4 /* SW */);
            battleTests_1.defenderArmies[18].changePosition([8, 8]);
            let battleHandler = new battleHandler_1.BattleHandler([], [8, 8]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [8, 8], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1250], [720]));
        });
        test("Defense behind a bridge.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([8, 7]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(3 /* SE */);
            battleTests_1.attackerArmies[18].move(3 /* SE */);
            battleTests_1.defenderArmies[18].changePosition([8, 8]);
            let battleHandler = new battleHandler_1.BattleHandler([], [8, 8]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [8, 8], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1150], [782.61]));
        });
        test("Defense behind a wall.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([7, 8]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([8, 8]);
            let battleHandler = new battleHandler_1.BattleHandler([], [8, 8]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [8, 8], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1250], [720]));
        });
        test("Defense in own caste.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([2, 3]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([3, 3]);
            let battleHandler = new battleHandler_1.BattleHandler([], [3, 3]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [3, 3], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1500], [600]));
        });
        test("Defense in own city.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([3, 4]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([4, 4]);
            let battleHandler = new battleHandler_1.BattleHandler([], [4, 4]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [4, 4], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [2000], [450]));
        });
        test("Defense in own fortress.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([4, 5]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([5, 5]);
            let battleHandler = new battleHandler_1.BattleHandler([], [5, 5]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [5, 5], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [2500], [360]));
        });
        test("Defense in own capital.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([5, 6]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([6, 6]);
            let battleHandler = new battleHandler_1.BattleHandler([], [6, 6]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [6, 6], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [3000], [300]));
        });
        test("Defense in own capital fortress.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([6, 7]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([7, 7]);
            let battleHandler = new battleHandler_1.BattleHandler([], [7, 7]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [7, 7], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [3500], [257.14]));
        });
        test("Defense in foreign production building.", function (t) {
            battleTests_1.attackerArmies[18].changePosition([3, 4]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([4, 4]);
            battleTests_1.defenderArmies[18].owner = gameState_1.GameState.realms[2];
            let battleHandler = new battleHandler_1.BattleHandler([], [4, 4]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [4, 4], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1250], [720]));
        });
    }
    exports.directionalTerrainBattleTests = directionalTerrainBattleTests;
});
//# sourceMappingURL=directionalTerrainTests.js.map