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
define(["require", "exports", "../../armies/footArmy", "../../gameState", "../../armies/riderArmy", "../../armies/battleHandler", "../../armies/battleResult", "../../armies/fleet"], function (require, exports, footArmy_1, gameState_1, riderArmy_1, battleHandler_1, battleResult_1, fleet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = QUnit.test;
    function complexBattleTest() {
        test("Large land battle at the defenders castle.", function (t) {
            let attackingArmies = [
                new footArmy_1.FootArmy(121, gameState_1.GameState.realms[1], 12000, 40, 0, 0, 0, [3, 3], 0, 0, true),
                new footArmy_1.FootArmy(122, gameState_1.GameState.realms[1], 32000, 80, 0, 0, 0, [3, 3], 0, 0),
                new riderArmy_1.RiderArmy(221, gameState_1.GameState.realms[1], 16000, 80, [3, 3], 0, 0) //army of attacker realm
            ];
            let defendingArmies = [
                new footArmy_1.FootArmy(111, gameState_1.GameState.realms[0], 29000, 80, 0, 0, 0, [0, 0], 0, 0),
                new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[0], 13500, 70, [3, 3], 0, 0),
                new footArmy_1.FootArmy(112, gameState_1.GameState.realms[2], 8000, 50, 0, 0, 0, [3, 3], 0, 0, true) //army of a third realm
            ];
            let battleHandler = new battleHandler_1.BattleHandler([], [3, 3]);
            t.resultEquals(battleHandler.calculateResult(attackingArmies, defendingArmies, [], [], [3, 3], 18, 3), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [5192.2, 37638.48, 18819.24], [29575.49, 14385.3, 4196.45]));
            //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
        });
        test("Large naval battle.", function (t) {
            let attackingArmies = [
                new fleet_1.Fleet(321, gameState_1.GameState.realms[0], 120, 40, 0, 0, [2, 2], 0, true),
                new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 300, 100, 0, 0, [2, 2], 0),
                new fleet_1.Fleet(323, gameState_1.GameState.realms[0], 340, 60, 0, 0, [2, 2], 0) //army of attacker realm
            ];
            let defendingArmies = [
                new fleet_1.Fleet(311, gameState_1.GameState.realms[1], 225, 25, 10, 0, [2, 2], 0),
                new fleet_1.Fleet(312, gameState_1.GameState.realms[1], 175, 25, 0, 5, [2, 2], 0),
                new fleet_1.Fleet(313, gameState_1.GameState.realms[1], 100, 50, 0, 0, [2, 2], 0, true) //army of a defending realm
            ];
            let battleHandler = new battleHandler_1.BattleHandler([], [2, 2]);
            t.resultEquals(battleHandler.calculateResult(attackingArmies, defendingArmies, [], [], [2, 2], 12, 8), new battleResult_1.BattleResult(0 /* ATTACKER_VICTORY */, [35.60, 184, 252.20], [426.08, 331.39, 59.47]));
            //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
        });
    }
    exports.complexBattleTest = complexBattleTest;
});
//# sourceMappingURL=complexBattleTests.js.map