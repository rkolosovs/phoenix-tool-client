import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";
import {BattleHandler} from "../../armies/battleHandler";
import {BattleResult, Result} from "../../armies/battleResult";

const { test } = QUnit;

export function navalBattleTests() {
    test( "Basic fleet combat.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[10]], [defenderArmies[11]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [20], [8]));
    });
    test( "Light warships on the attack.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[11]], [defenderArmies[11]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [20], [8]));
    });
    test( "Heavy warships on the attack.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[12]], [defenderArmies[11]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [20], [8]));
    });
    test( "Light warships on the defense.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[13]], [defenderArmies[12]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [35], [4.57]));
    });
    test( "Heavy warships on the defense.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[13]], [defenderArmies[13]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [60], [2.33]));
    });
    test( "Heavy and light warships on the defense.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[13]], [defenderArmies[14]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [45], [3.33]));
    });
    test( "Heavy and light warships on the attack.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[14]], [defenderArmies[11]],
            [], [], [2, 2], 5, 5),
            new BattleResult(Result.DEFENDER_VICTORY, [20], [8]));
    });
    test( "Mixed fleet combat.", function(t:any) {
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[15]], [defenderArmies[15]],
            [], [], [2, 2], 10, 1),
            new BattleResult(Result.ATTACKER_VICTORY, [818.18], [14.02]));
    });
}