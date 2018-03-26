import {QUnit} from "qunit";
import {FootArmy} from "../../armies/footArmy";
import {GameState} from "../../gameState";
import {RiderArmy} from "../../armies/riderArmy";
import {BattleHandler} from "../../armies/battleHandler";
import {BattleResult, Result} from "../../armies/battleResult";
import {Fleet} from "../../armies/fleet";

const { test } = QUnit;

export function complexBattleTest() {
    test( "Large land battle at the defenders castle.", function(t) {
        let attackingArmies = [
            new FootArmy(121, GameState.realms[1], 12000, 40, 0,
                0, 0, [3, 3], 0, 0, true), //army of attacker realm
            new FootArmy(122, GameState.realms[1], 32000, 80, 0,
                0, 0, [3, 3], 0, 0), //army of attacker realm
            new RiderArmy(221, GameState.realms[1], 16000, 80, [3, 3], 0, 0) //army of attacker realm
        ];
        let defendingArmies = [
            new FootArmy(111, GameState.realms[0], 29000, 80, 0,
                0, 0, [0, 0], 0, 0), //army of realm r01
            new RiderArmy(211, GameState.realms[0], 13500, 70, [3, 3], 0, 0), //army of realm r01
            new FootArmy(112, GameState.realms[2], 8000, 50, 0,
                0, 0, [3, 3], 0, 0, true) //army of a third realm
        ];
        let battleHandler: BattleHandler = new BattleHandler([], [3, 3]);
        t.resultEquals( battleHandler.calculateResult(attackingArmies, defendingArmies, [],
            [], [3, 3], 18, 3),
            new BattleResult(Result.ATTACKER_VICTORY,
                [5192.2, 37638.48, 18819.24], [29575.49, 14385.3, 4196.45]));
        //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test( "Large naval battle.", function(t) {
        let attackingArmies = [
            new Fleet(321, GameState.realms[0], 120, 40, 0, 0,
                [2, 2], 0, true), //army of attacker realm
            new Fleet(322, GameState.realms[0], 300, 100, 0, 0,
                [2, 2], 0), //army of attacker realm
            new Fleet(323, GameState.realms[0], 340, 60, 0, 0,
                [2, 2], 0) //army of attacker realm
        ];
        let defendingArmies = [
            new Fleet(311, GameState.realms[1], 225, 25, 10, 0,
                [2, 2], 0), //army of defending realm
            new Fleet(312, GameState.realms[1], 175, 25, 0, 5,
                [2, 2], 0), //army of defending realm
            new Fleet(313, GameState.realms[1], 100, 50, 0, 0,
                [2, 2], 0, true) //army of a defending realm
        ];
        let battleHandler: BattleHandler = new BattleHandler([], [2, 2]);
        t.resultEquals( battleHandler.calculateResult(attackingArmies, defendingArmies, [],
            [], [2, 2], 12, 8),
            new BattleResult(Result.ATTACKER_VICTORY,
                [35.60, 184, 252.20], [426.08, 331.39, 59.47]));
        //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
    });
}