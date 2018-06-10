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

import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";
import {BattleHandler} from "../../armies/battleHandler";
import {Result} from "../../armies/battleResult";

const { test } = QUnit;

export function landOverrunTests() {
    test( "Footmen outnumbered 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.ok( battleHandler.calculateResult([attackerArmies[0]], [defenderArmies[0]],
            [], [], [0, 0], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Riders outnumbered 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.ok( battleHandler.calculateResult([attackerArmies[2]], [defenderArmies[3]],
            [], [], [0, 0], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Mixed army outnumbered 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.ok( battleHandler.calculateResult([attackerArmies[0], attackerArmies[2]],
            [defenderArmies[0], defenderArmies[3]], [], [], [0, 0],
            10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Guard outnumbering 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.ok( battleHandler.calculateResult([attackerArmies[1]], [defenderArmies[1]],
            [], [], [0, 0], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Guard outnumbered 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.notOk( battleHandler.calculateResult([attackerArmies[0]], [defenderArmies[2]],
            [], [], [0, 0], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
}