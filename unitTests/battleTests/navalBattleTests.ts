import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";

const { test } = QUnit;

export function navalBattleTests() {
    test( "Basic fleet combat.", function(t) {
        let battle = new schlacht([attackerArmies[10]], [defenderArmies[11]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [20], defenderLosses: [8]} );
    });
    test( "Light warships on the attack.", function(t) {
        let battle = new schlacht([attackerArmies[11]], [defenderArmies[11]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [20], defenderLosses: [8]} );
    });
    test( "Heavy warships on the attack.", function(t) {
        let battle = new schlacht([attackerArmies[12]], [defenderArmies[11]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [20], defenderLosses: [8]} );
    });
    test( "Light warships on the defense.", function(t) {
        let battle = new schlacht([attackerArmies[13]], [defenderArmies[12]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [35], defenderLosses: [4.57]} );
    });
    test( "Heavy warships on the defense.", function(t) {
        let battle = new schlacht([attackerArmies[13]], [defenderArmies[13]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [60], defenderLosses: [2.33]} );
    });
    test( "Heavy and light warships on the defense.", function(t) {
        let battle = new schlacht([attackerArmies[13]], [defenderArmies[14]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [45], defenderLosses: [3.33]} );
    });
    test( "Heavy and light warships on the attack.", function(t) {
        let battle = new schlacht([attackerArmies[14]], [defenderArmies[11]], [], [], 2, 2);
        t.resultEquals( battle.result(5, 5), {victor: 'defender', attackerLosses: [20], defenderLosses: [8]} );
    });
    test( "Mixed fleet combat.", function(t) {
        let battle = new schlacht([attackerArmies[15]], [defenderArmies[15]], [], [], 2, 2);
        t.resultEquals( battle.result(10, 1), {victor: 'attacker', attackerLosses: [32.39], defenderLosses: [14.02]} );
    });
}