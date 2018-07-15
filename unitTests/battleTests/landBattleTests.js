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
define(["require", "exports", "../battleTests", "../qunit", "../../armies/battleHandler", "../../armies/battleResult", "../../gameState"], function (require, exports, battleTests_1, qunit_1, battleHandler_1, battleResult_1, gameState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { test } = qunit_1.QUnit;
    function landBattleTests() {
        test("Minimal armies, defenders win by dice roll.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], [0, 0], 1, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1045], [861.24]));
        });
        test("Minimal armies, attackers win by dice roll.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], [0, 0], 9, 2), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [869.57], [1035]));
        });
        test("Minimal armies, tie (both loose).", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], [0, 0], 5, 5), new battleResult_1.BattleResult(4 /* TIE */, [1000], [1000]));
        });
        test("Different officer count, different rolls, tie (both loose).", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], [0, 0], 7, 3), new battleResult_1.BattleResult(4 /* TIE */, [1000], [1000]));
        });
        test("Riders vs footmen on plains.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[1]], [battleTests_1.defenderArmies[8]], [], [], [0, 0], 6, 6), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [17000], [5294.12]));
        });
        test("Riders vs footmen in woods.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[1]], [battleTests_1.defenderArmies[8]], [], [], [1, 1], 4, 4), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [5294.12], [17000]));
        });
        test("Mixed armies of different compositions on plains.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[2], battleTests_1.attackerArmies[7]], [battleTests_1.defenderArmies[2], battleTests_1.defenderArmies[7]], [], [], [0, 0], 5, 5), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [5456.25, 8780.49], [22687.5, 4395.6]));
        });
        test("Tie with soldier count, officer count and dice roll all different.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[3]], [battleTests_1.defenderArmies[3]], [], [], [0, 0], 1, 10), new battleResult_1.BattleResult(4 /* TIE */, [1205], [995.85]));
        });
        test("Combat in attackers home terrain.", function (t) {
            gameState_1.GameState.realms[0].homeTurf = 2;
            battleTests_1.attackerArmies[18].changePosition([-1, 0]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([0, 0]);
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [0, 0], 10, 10), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [720], [1250]));
        });
        test("Combat in defenders home terrain.", function (t) {
            gameState_1.GameState.realms[1].homeTurf = 2;
            battleTests_1.attackerArmies[18].changePosition([-1, 0]);
            battleTests_1.attackerArmies[18].setMovePoints(battleTests_1.attackerArmies[18].getMaxMovePoints());
            battleTests_1.attackerArmies[18].checkForPossibleMove(2 /* E */);
            battleTests_1.attackerArmies[18].move(2 /* E */);
            battleTests_1.defenderArmies[18].changePosition([0, 0]);
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.resultEquals(battleHandler.calculateResult([battleTests_1.attackerArmies[18]], [battleTests_1.defenderArmies[18]], [], [], [0, 0], 10, 10), new battleResult_1.BattleResult(2 /* DEFENDER_VICTORY */, [1250], [720]));
        });
    }
    exports.landBattleTests = landBattleTests;
});
//# sourceMappingURL=landBattleTests.js.map