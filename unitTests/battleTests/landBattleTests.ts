import {attackerArmies, defenderArmies} from "../battleTests";
import {QUnit} from "qunit";

const { test } = QUnit;

export function landBattleTests() {
    test( "Minimal armies, defenders win by dice roll.", function(t) {
        let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
        t.resultEquals( battle.result(1, 10), {victor: 'defender', attackerLosses: [1045], defenderLosses: [861.24]} );
    });
    test( "Minimal armies, attackers win by dice roll.", function(t) {
        let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
        t.resultEquals( battle.result(9, 2), {victor: 'attacker', attackerLosses: [869.57], defenderLosses: [1035]} );
    });
    test( "Minimal armies, tie (both loose).", function(t) {
        let battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], [], [], 0, 0);
        t.resultEquals( battle.result(5, 5), {victor: 'tie', attackerLosses: [1000], defenderLosses: [1000]} );
    });
    test( "Different officer count, different rolls, tie (both loose).", function(t) {
        let battle = new schlacht([attackerArmies[0]], [defenderArmies[1]], [], [], 0, 0);
        t.resultEquals( battle.result(7, 3), {victor: 'tie', attackerLosses: [1000], defenderLosses: [1000]} );
    });
    test( "Riders vs footmen on plains.", function(t) {
        let battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], [], [], 0, 0);
        t.resultEquals( battle.result(6, 6), {victor: 'defender', attackerLosses: [17000], defenderLosses: [5294.12]} );
    });
    test( "Riders vs footmen in woods.", function(t) {
        let battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], [], [], 1, 1);
        t.resultEquals( battle.result(4, 4), {victor: 'attacker', attackerLosses: [5294.12], defenderLosses: [17000]} );
    });
    test( "Mixed armies of different compositions on plains.", function(t) {
        let battle = new schlacht([attackerArmies[2], attackerArmies[7]], [defenderArmies[2], defenderArmies[7]], [], [], 0, 0);
        t.resultEquals( battle.result(5, 5), {victor: 'attacker', attackerLosses: [5456.25, 8780.49], defenderLosses: [22687.5, 4395.6]} );
    });
    test( "Tie with soldier count, officer count and dice roll all different.", function(t) {
        let battle = new schlacht([attackerArmies[3]], [defenderArmies[3]], [], [], 0, 0);
        t.resultEquals( battle.result(1, 10), {victor: 'tie', attackerLosses: [1205], defenderLosses: [995.85]} );
    });
    test( "Combat in attackers home terrain.", function(t) {
        realms[1].homeTurf = 2;
        attackerArmies[18].x = 0;
        attackerArmies[18].y = 0;
        attackerArmies[18].oldX = -1;
        attackerArmies[18].oldY = 0;
        defenderArmies[18].x = 0;
        defenderArmies[18].y = 0;
        let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 0, 0);
        t.resultEquals( battle.result(10, 10), {victor: 'attacker', attackerLosses: [720], defenderLosses: [1250]} );
    });
    test( "Combat in defenders home terrain.", function(t) {
        realms[0].homeTurf = 2;
        attackerArmies[18].x = 0;
        attackerArmies[18].y = 0;
        attackerArmies[18].oldX = -1;
        attackerArmies[18].oldY = 0;
        defenderArmies[18].x = 0;
        defenderArmies[18].y = 0;
        let battle = new schlacht([attackerArmies[18]], [defenderArmies[18]], [], [], 0, 0);
        t.resultEquals( battle.result(10, 10), {victor: 'defender', attackerLosses: [1250], defenderLosses: [720]} );
    });
}