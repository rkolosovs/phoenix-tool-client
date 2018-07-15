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
define(["require", "exports", "../battleTests", "../../armies/battleHandler"], function (require, exports, battleTests_1, battleHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = QUnit.test;
    function navalOverrunTests() {
        test("Fleet outnumbered 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[3]], [battleTests_1.defenderArmies[4]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Defending fleet outnumbered 10:1 despite having warships.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[5]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Guard fleet outnumbering 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
            t.ok(battleHandler.calculateResult([battleTests_1.attackerArmies[6]], [battleTests_1.defenderArmies[4]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Guard fleet outnumbered 10:1.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
            t.notOk(battleHandler.calculateResult([battleTests_1.attackerArmies[4]], [battleTests_1.defenderArmies[6]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
        test("Attacking fleet not outnumbering 10:1 despite having warships.", function (t) {
            let battleHandler = new battleHandler_1.BattleHandler([], [1, 1]);
            t.notOk(battleHandler.calculateResult([battleTests_1.attackerArmies[5]], [battleTests_1.defenderArmies[5]], [], [], [1, 1], 10, 10).result === 1 /* ATTACKER_OVERRUN */);
        });
    }
    exports.navalOverrunTests = navalOverrunTests;
});
//# sourceMappingURL=navalOverrunTests.js.map