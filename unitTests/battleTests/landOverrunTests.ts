import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";

const { test } = QUnit;

export function landOverrunTests() {
    test( "Footmen outnumbered 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test( "Riders outnumbered 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[2]], [defenderArmies[3]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test( "Mixed army outnumbered 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[0], attackerArmies[2]], [defenderArmies[0], defenderArmies[3]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test( "Guard outnumbering 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[1]], [defenderArmies[1]], [], [], 0, 0);
        t.ok(battle.overrunAttack());
    });
    test( "Guard outnumbered 10:1.", function(t) {
        let battle = new schlacht([attackerArmies[0]], [defenderArmies[2]], [], [], 0, 0);
        t.notOk(battle.overrunAttack());
    });
}