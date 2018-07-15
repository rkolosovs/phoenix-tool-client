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
define(["require", "exports", "../battleTests", "../qunit", "../../armies/battleHandler"], function (require, exports, battleTests_1, qunit_1, battleHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { test } = qunit_1.QUnit;
    function landOverrunTests() {
        test("Footmen outnumbered 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[0]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Riders outnumbered 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[2]], [battleTests_1.defenderArmies[3]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Mixed army outnumbered 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[0], battleTests_1.attackerArmies[2]], [battleTests_1.defenderArmies[0], battleTests_1.defenderArmies[3]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Guard outnumbering 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[1]], [battleTests_1.defenderArmies[1]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Guard outnumbered 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [0, 0]);
            t.notOk(battleHandler.calculateResult([battleTests_1.attackerArmies[0]], [battleTests_1.defenderArmies[2]], [], [], [0, 0], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
    }
    exports.landOverrunTests = landOverrunTests;
});
//# sourceMappingURL=landOverrunTests.js.map