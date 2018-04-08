import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";
import {BattleHandler} from "../../armies/battleHandler";
import {BattleResult, Result} from "../../armies/battleResult";
import {GameState} from "../../gameState";
import {Direction} from "../../map/direction";

const { test } = QUnit;

export function landBattleTests() {
    test( "Minimal armies, defenders win by dice roll.", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[0]], [defenderArmies[0]],
            [], [], [0, 0], 1, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1045], [861.24]));
    });
    test( "Minimal armies, attackers win by dice roll.", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[0]], [defenderArmies[0]],
            [], [], [0, 0], 9, 2),
            new BattleResult(Result.ATTACKER_VICTORY, [869.57], [1035]));
    });
    test( "Minimal armies, tie (both loose).", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[0]], [defenderArmies[0]],
            [], [], [0, 0], 5, 5),
            new BattleResult(Result.TIE, [1000], [1000]));
    });
    test( "Different officer count, different rolls, tie (both loose).", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[0]], [defenderArmies[0]],
            [], [], [0, 0], 7, 3),
            new BattleResult(Result.TIE, [1000], [1000]));
    });
    test( "Riders vs footmen on plains.", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[1]], [defenderArmies[8]],
            [], [], [0, 0], 6, 6),
            new BattleResult(Result.DEFENDER_VICTORY, [17000], [5294.12]));
    });
    test( "Riders vs footmen in woods.", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [1, 1]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[1]], [defenderArmies[8]],
            [], [], [1, 1], 4, 4),
            new BattleResult(Result.ATTACKER_VICTORY, [5294.12], [17000]));
    });
    test( "Mixed armies of different compositions on plains.", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[2], attackerArmies[7]],
            [defenderArmies[2], defenderArmies[7]], [], [], [0, 0],
            5, 5),
            new BattleResult(Result.ATTACKER_VICTORY, [5456.25, 8780.49], [22687.5, 4395.6]));
    });
    test( "Tie with soldier count, officer count and dice roll all different.", function(t) {
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[3]], [defenderArmies[3]],
            [], [], [0, 0], 1, 10),
            new BattleResult(Result.TIE, [1205], [995.85]));
    });
    test( "Combat in attackers home terrain.", function(t) {
        GameState.realms[0].homeTurf = 2;
        attackerArmies[18].changePosition([-1, 0]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([0, 0]);
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [0, 0], 10, 10),
            new BattleResult(Result.ATTACKER_VICTORY, [720], [1250]));
    });
    test( "Combat in defenders home terrain.", function(t) {
        GameState.realms[1].homeTurf = 2;
        attackerArmies[18].changePosition([-1, 0]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([0, 0]);
        let battleHandler: BattleHandler = new BattleHandler([], [0, 0]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [0, 0], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1250], [720]));
    });
}