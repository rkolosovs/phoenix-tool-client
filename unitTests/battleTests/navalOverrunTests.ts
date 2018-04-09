import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";
import {BattleHandler} from "../../armies/battleHandler";
import {Result} from "../../armies/battleResult";

const { test } = QUnit;

export function navalOverrunTests() {
    test( "Fleet outnumbered 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.ok( battleHandler.calculateResult([attackerArmies[3]], [defenderArmies[4]],
            [], [], [1, 1], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Defending fleet outnumbered 10:1 despite having warships.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.ok( battleHandler.calculateResult([attackerArmies[4]], [defenderArmies[5]],
            [], [], [1, 1], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Guard fleet outnumbering 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.ok( battleHandler.calculateResult([attackerArmies[6]], [defenderArmies[4]],
            [], [], [1, 1], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Guard fleet outnumbered 10:1.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.notOk( battleHandler.calculateResult([attackerArmies[4]], [defenderArmies[6]],
            [], [], [1, 1], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
    test( "Attacking fleet not outnumbering 10:1 despite having warships.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.notOk( battleHandler.calculateResult([attackerArmies[5]], [defenderArmies[5]],
            [], [], [1, 1], 10, 10).result === Result.ATTACKER_OVERRUN );
    });
}