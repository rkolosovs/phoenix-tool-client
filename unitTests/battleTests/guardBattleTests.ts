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
import {QUnit} from "../qunit";
import {BattleHandler} from "../../armies/battleHandler";
import {BattleResult, Result} from "../../armies/battleResult";

const { test } = QUnit;

export function guardBattleTests() {
    test( "Guard fleet combat.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[16]], [defenderArmies[16]],
            [], [], [2, 2], 10, 1),
            new BattleResult(Result.ATTACKER_VICTORY, [43.45], [106.8]) );
    });
    test( "Foot vs guard foot.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[4]], [defenderArmies[4]],
            [], [], [0, 0], 10, 1),
            new BattleResult(Result.ATTACKER_VICTORY, [667.98], [2545]) );
    });
    test( "Riders vs guard foot on plains.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[4]], [defenderArmies[9]],
            [], [], [0, 0], 10, 1),
            new BattleResult(Result.DEFENDER_VICTORY, [813.01], [1568.25]) );
        //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test( "Foot vs guard riders in forest.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[8]], [defenderArmies[4]],
            [], [], [1, 1], 10, 1),
            new BattleResult(Result.DEFENDER_VICTORY, [813.01], [1568.25]) );
        //TODO Attacker not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test( "Riders vs guard riders.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[8]], [defenderArmies[9]],
            [], [], [1, 1], 10, 1),
            new BattleResult(Result.ATTACKER_VICTORY, [667.98], [2545]) );
    });
    test( "Foot vs guard foot 10:1 fight.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[5]], [defenderArmies[5]],
            [], [], [0, 0], 10, 1),
            new BattleResult(Result.DEFENDER_VICTORY, [3338.90], [0]) );
        //TODO Not sure if the rules work as intended here (victor losses being 0)
    });
    test( "Fleet vs guard fleet 10:1 fight.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[17]], [defenderArmies[17]],
            [], [], [2, 2], 10, 1),
            new BattleResult(Result.DEFENDER_VICTORY, [333.89], [0]) );
        //TODO Not sure if the rules work as intended here (victor losses being 0)
    });
    test( "Mixed army vs guard foot and regular horse in forest.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[4], attackerArmies[9]],
            [defenderArmies[6], defenderArmies[10]], [], [], [1, 1],
            5, 5),
            new BattleResult(Result.ATTACKER_VICTORY, [471.83, 1822.4], [1390, 2090]) );
    });
    test( "Mixed army vs regular foot and guard horse on plains.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[6], attackerArmies[8]],
            [defenderArmies[6], defenderArmies[10]], [], [], [0, 0],
            5, 5),
            new BattleResult(Result.ATTACKER_VICTORY, [1822.4, 471.83], [2090, 1390]) );
    });
}