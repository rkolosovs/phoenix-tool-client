import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";
import {Direction} from "../../map/direction";
import {BattleHandler} from "../../armies/battleHandler";
import {BattleResult, Result} from "../../armies/battleResult";
import {GameState} from "../../gameState";

const { test } = QUnit;

export function directionalTerrainBattleTests() {
    test( "Attack onto a street.", function(t) {
        attackerArmies[18].changePosition([9, 7]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.SE);
        attackerArmies[18].move(Direction.SE);
        defenderArmies[18].changePosition([9, 8]);
        let battleHandler: BattleHandler = new BattleHandler([], [9, 8]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [9, 8], 10, 10),
            new BattleResult(Result.ATTACKER_VICTORY, [818.18], [1100]));
    });
    test( "Attack out of a forest.", function(t) {
        attackerArmies[18].changePosition([10, 9]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.W);
        attackerArmies[18].move(Direction.W);
        defenderArmies[18].changePosition([9, 9]);
        let battleHandler: BattleHandler = new BattleHandler([], [9, 9]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [9, 9], 10, 10),
            new BattleResult(Result.ATTACKER_VICTORY, [818.18], [1100]));
    });
    test( "Attack into a swamp.", function(t) {
        attackerArmies[18].changePosition([9, 10]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([10, 10]);
        let battleHandler: BattleHandler = new BattleHandler([], [10, 10]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [10, 10], 10, 10),
            new BattleResult(Result.ATTACKER_VICTORY, [818.18], [1100]));
    });
    test( "Attack into a desert.", function(t) {
        attackerArmies[18].changePosition([10, 11]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([11, 11]);
        let battleHandler: BattleHandler = new BattleHandler([], [11, 11]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [11, 11], 10, 10),
            new BattleResult(Result.ATTACKER_VICTORY, [818.18], [1100]));
    });
    test( "Attack downhill.", function(t) {
        attackerArmies[18].changePosition([8, 9]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.W);
        attackerArmies[18].move(Direction.W);
        defenderArmies[18].changePosition([9, 9]);
        let battleHandler: BattleHandler = new BattleHandler([], [9, 9]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [9, 9], 10, 10),
            new BattleResult(Result.ATTACKER_VICTORY, [818.18], [1100]));
    });
    test( "Defense downhill (attack uphill).", function(t) {
        attackerArmies[18].changePosition([8, 9]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.SW);
        attackerArmies[18].move(Direction.SW);
        defenderArmies[18].changePosition([8, 8]);
        let battleHandler: BattleHandler = new BattleHandler([], [8, 8]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [8, 8], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1100], [818.18]));
    });
    test( "Defense behind a river.", function(t) {
        attackerArmies[18].changePosition([9, 7]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.SW);
        attackerArmies[18].move(Direction.SW);
        defenderArmies[18].changePosition([8, 8]);
        let battleHandler: BattleHandler = new BattleHandler([], [8, 8]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [8, 8], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1250], [720]));
    });
    test( "Defense behind a bridge.", function(t) {
        attackerArmies[18].changePosition([8, 7]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.SE);
        attackerArmies[18].move(Direction.SE);
        defenderArmies[18].changePosition([8, 8]);
        let battleHandler: BattleHandler = new BattleHandler([], [8, 8]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [8, 8], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1150], [782.61]));
    });
    test( "Defense behind a wall.", function(t) {
        attackerArmies[18].changePosition([7, 8]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([8, 8]);
        let battleHandler: BattleHandler = new BattleHandler([], [8, 8]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [8, 8], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1250], [720]));
    });
    test( "Defense in own caste.", function(t) {
        attackerArmies[18].changePosition([2, 3]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([3, 3]);
        let battleHandler: BattleHandler = new BattleHandler([], [3, 3]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [3, 3], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1500], [600]));
    });
    test( "Defense in own city.", function(t) {
        attackerArmies[18].changePosition([3, 4]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([4, 4]);
        let battleHandler: BattleHandler = new BattleHandler([], [4, 4]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [4, 4], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [2000], [450]));
    });
    test( "Defense in own fortress.", function(t) {
        attackerArmies[18].changePosition([4, 5]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([5, 5]);
        let battleHandler: BattleHandler = new BattleHandler([], [5, 5]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [5, 5], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [2500], [360]));
    });
    test( "Defense in own capital.", function(t) {
        attackerArmies[18].changePosition([5, 6]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([6, 6]);
        let battleHandler: BattleHandler = new BattleHandler([], [6, 6]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [6, 6], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [3000], [300]));
    });
    test( "Defense in own capital fortress.", function(t) {
        attackerArmies[18].changePosition([6, 7]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([7, 7]);
        let battleHandler: BattleHandler = new BattleHandler([], [7, 7]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [7, 7], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [3500], [257.14]));
    });
    test( "Defense in foreign production building.", function(t) {
        attackerArmies[18].changePosition([3, 4]);
        attackerArmies[18].setMovePoints(attackerArmies[18].getMaxMovePoints());
        attackerArmies[18].checkForPossibleMove(Direction.E);
        attackerArmies[18].move(Direction.E);
        defenderArmies[18].changePosition([4, 4]);
        defenderArmies[18].owner = GameState.realms[2];
        let battleHandler: BattleHandler = new BattleHandler([], [4, 4]);
        t.resultEquals( battleHandler.calculateResult([attackerArmies[18]], [defenderArmies[18]],
            [], [], [4, 4], 10, 10),
            new BattleResult(Result.DEFENDER_VICTORY, [1250], [720]));
    });
}