import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";

const { test } = QUnit;

export function navalOverrunTests() {
    test( "Fleet outnumbered 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[3]], [defenderArmies[4]], [], [], 1, 1);
        t.ok(battle.overrunAttack());
    });
    test( "Defending fleet outnumbered 10:1 despite having warships.", function(t) {
        let battle = new schlacht([attackerArmies[4]], [defenderArmies[5]], [], [], 1, 1);
        t.ok(battle.overrunAttack());
    });
    test( "Guard fleet outnumbering 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[6]], [defenderArmies[4]], [], [], 1, 1);
        t.ok(battle.overrunAttack());
    });
    test( "Guard fleet outnumbered 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[4]], [defenderArmies[6]], [], [], 1, 1);
        t.notOk(battle.overrunAttack());
    });
    test( "Attacking fleet not outnumbering 10:1 despite having warships.", function(t) {
        let battle = new schlacht([attackerArmies[5]], [defenderArmies[5]], [], [], 1, 1);
        t.notOk(battle.overrunAttack());
    });
}