const { test } = QUnit;
const { module } = QUnit;

QUnit.assert.resultEquals = function(actual, expected) {
	var actualProps = Object.getOwnPropertyNames(actual);
    var expectedProps = Object.getOwnPropertyNames(expected);

    if (actualProps.length != expectedProps.length) {
    	this.pushResult({result: false, actual: actual, expected: expected,
            message: "Result is malformed."});
        return false;
    }

    for (var i = 0; i < actualProps.length; i++) {
        var propName = actualProps[i];

        if (actual[propName] !== expected[propName]) {
        	this.pushResult({result: false, actual: actual, expected: expected,
                message: ""+propName+" should be "+expected[propName]+" was "+actual[propName]});
            return false;
        }
    }
    
    this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
    return true;
};

//arrays to hold prepared armies for test
var defenderArmies = [];
var attackerArmies = [];
//mockup arrays of borders, bildings and field
var borders = [];
var buildings = [];
var fieldTypes = [];
//mockup showHex method
function showHex(posX, posY) {
    this.fieldType = function(){
    	return fieldTypes[posX];
    }
}

module( "Battle" , function() {
	module( "Results", {
		before: function() {
			defenderArmies = [
				new heer(111, 1000, 1, 0, 0, 0, false),
				new heer(112, 1000, 5, 0, 0, 0, false),
				new heer(115, 15000, 15, 0, 0, 0, false),
				new heer(116, 1000, 36, 0, 0, 0, false),
				new heer(117, 1500, 10, 0, 0, 0, false),
				new heer(118, 10000, 10, 0, 0, 0, false),
				new heer(119, 1200, 12, 0, 0, 0, false),
				new heer(211, 5000, 5, 0, 0, 0, false),
				new heer(214, 10000, 5, 0, 0, 0, false),
				new heer(215, 1500, 10, 0, 0, 0, false),
				new heer(219, 1200, 12, 0, 0, 0, false),
				new heer(311, 20, 5, 0, 0, 0, false),
				new heer(312, 10, 5, 5, 0, 0, false),
				new heer(313, 10, 5, 0, 5, 0, false),
				new heer(314, 10, 5, 3, 2, 0, false),
				new heer(315, 12, 2, 3, 1, 0, false),
				new heer(316, 100, 10, 0, 0, 0, false),
				new heer(317, 1000, 10, 0, 0, 0, false)
			];
			attackerArmies = [
				new heer(121, 1000, 1, 0, 0, 0, false),
				new heer(123, 10000, 5, 0, 0, 0, false),
				new heer(124, 5000, 5, 0, 0, 0, false),
				new heer(126, 1200, 4, 0, 0, 0, false),
				new heer(127, 1000, 10, 0, 0, 0, true),
				new heer(128, 1000, 100, 0, 0, 0, true),
				new heer(129, 1000, 10, 0, 0, 0, false),
				new heer(224, 15000, 15, 0, 0, 0, false),
				new heer(227, 1000, 10, 0, 0, 0, true),
				new heer(228, 1000, 10, 0, 0, 0, false),
				new heer(321, 10, 5, 0, 0, 0, false),
				new heer(322, 10, 5, 5, 0, 0, false),
				new heer(323, 10, 5, 0, 5, 0, false),
				new heer(324, 20, 5, 0, 0, 0, false),
				new heer(325, 10, 5, 3, 2, 0, false),
				new heer(326, 35, 40, 7, 6, 0, false),
				new heer(327, 40, 35, 0, 0, 0, true),
				new heer(328, 100, 100, 0, 0, 0, true)
			];
			borders = [{'tag': 'vvh', 'land': [[0, 0], [1, 1], [3, 3]]}];
			buildings = [{'realm': 1, 'name': "", 'type': 0, 'x': 3, 'y': 3, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null}];
			fieldTypes = [2, 3, 0, 2];//plains, woods, water, plains (with castle)
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
		}}, function() {
		module( "Land Battles", function() {
			test( "Minimal armies, defenders win by dice roll.", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([1, 10]), {victor: 'defender', footLosses: 861.24, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Minimal armies, attackers win by dice roll.", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([9, 2]), {victor: 'attacker', footLosses: 869.57, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Minimal armies, tie (both loose).", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'tie', footLosses: 1000, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Different officer count, different rolls, tie (both loose).", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[1]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([7, 3]), {victor: 'tie', footLosses: 1000, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Riders vs footmen on plains.", function(t) {
				var battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([6, 6]), {victor: 'defender', footLosses: 0, cavLosses: 5294.12, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Riders vs footmen in woods.", function(t) {
				var battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result([4, 4]), {victor: 'attacker', footLosses: 5294.12, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Mixed armies of different compositions on plains.", function(t) {
				var battle = new schlacht([attackerArmies[2], attackerArmies[7]], [defenderArmies[2], defenderArmies[7]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'attacker', footLosses: 5456.25, cavLosses: 8780.49, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Tie with soldier count, officer count and dice roll all different.", function(t) {
				var battle = new schlacht([attackerArmies[3]], [defenderArmies[3]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([1, 10]), {victor: 'tie', footLosses: 1205, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Attacker losses given as expected. Defender losses are 995.85
			});
		});
		module( "Naval Battles", function() {
			test( "Basic fleet combat.", function(t) {
				var battle = new schlacht([attackerArmies[10]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Light warships on the attack.", function(t) {
				var battle = new schlacht([attackerArmies[11]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy warships on the attack.", function(t) {
				var battle = new schlacht([attackerArmies[12]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Light warships on the defense.", function(t) {
				var battle = new schlacht([attackerArmies[13]], [defenderArmies[12]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 4.57, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy warships on the defense.", function(t) {
				var battle = new schlacht([attackerArmies[13]], [defenderArmies[13]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 2.33, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy and light warships on the defense.", function(t) {
				var battle = new schlacht([attackerArmies[13]], [defenderArmies[14]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 3.33, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy and light warships on the attack.", function(t) {
				var battle = new schlacht([attackerArmies[14]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Mixed fleet combat.", function(t) {
				var battle = new schlacht([attackerArmies[15]], [defenderArmies[15]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 26.72, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
		});
		module( "Guard Battles", function() {
			test( "Guard fleet combat.", function(t) {
				var battle = new schlacht([attackerArmies[16]], [defenderArmies[16]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 35.96} );
			});
			test( "Foot vs guard foot.", function(t) {
				var battle = new schlacht([attackerArmies[4]], [defenderArmies[4]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 550.10, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Riders vs guard foot on plains.", function(t) {
				var battle = new schlacht([attackerArmies[4]], [defenderArmies[9]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'defender', footLosses: 0, cavLosses: 1568.25, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Attacker not completely wiped out. Attacker guard foot losses are 813.01
			});
			test( "Foot vs guard riders in forest.", function(t) {
				var battle = new schlacht([attackerArmies[8]], [defenderArmies[4]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'defender', footLosses: 1568.25, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Attacker not completely wiped out. Attacker guard cav losses are 813.01
			});
			test( "Riders vs guard riders.", function(t) {
				var battle = new schlacht([attackerArmies[8]], [defenderArmies[9]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 550.10, gFleetLosses: 0} );
			});
			test( "Foot vs guard foot 10:1 fight.", function(t) {
				var battle = new schlacht([attackerArmies[5]], [defenderArmies[5]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Not sure if the rules work as intended here (victor losses are 0)
			});
			test( "Fleet vs guard fleet 10:1 fight.", function(t) {
				var battle = new schlacht([attackerArmies[17]], [defenderArmies[17]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([10, 1]), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Not sure if the rules work as intended here (victor losses are 0)
			});
			test( "Mixed army vs guard foot and regular horse in forest.", function(t) {
				var battle = new schlacht([attackerArmies[5], attackerArmies[9]], [defenderArmies[6], defenderArmies[10]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'attacker', footLosses: 0, cavLosses: 1496, fleetLosses: 0, gFootLosses: 387.32, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Mixed army vs regular foot and guard horse on plains.", function(t) {
				var battle = new schlacht([attackerArmies[6], attackerArmies[8]], [defenderArmies[6], defenderArmies[10]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result([5, 5]), {victor: 'attacker', footLosses: 1496, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 387.32, gFleetLosses: 0} );
			});
		});
		module( "Complex Battles", function() {
			test( "Large land battle at the defenders castle.", function(t) {
				var attackingArmies = [
					new heer(121, 12000, 40, 0, 0, 0, true),//army of attacker realm
					new heer(122, 32000, 80, 0, 0, 0, false),//army of attacker realm
					new heer(221, 16000, 80, 0, 0, 0, false)//army of attacker realm
				];
				var defendingArmies = [
					new heer(111, 29000, 80, 0, 0, 0, false),//army of realm vvh
					new heer(211, 13500, 70, 0, 0, 0, false),//army of realm vvh
					new heer(112, 8000, 50, 0, 0, 0, true)//army of a third realm
				];
				var battle = new schlacht(attackingArmies, defendingArmies, null, null, 3, 3);
				battle.init();
				t.resultEquals( battle.result([18, 3]), {victor: 'attacker', footLosses: 37638.48, cavLosses: 18819.24, fleetLosses: 0, gFootLosses: 5192.2, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Defender not completely wiped out. Defender guard foot losses 4196.45
			});
			test( "Large naval battle.", function(t) {
				var attackingArmies = [
					new heer(321, 120, 40, 0, 0, 0, true),//army of attacker realm
					new heer(322, 300, 100, 0, 0, 0, false),//army of attacker realm
					new heer(323, 340, 60, 0, 0, 0, false)//army of attacker realm
				];
				var defendingArmies = [
					new heer(311, 225, 25, 10, 0, 0, false),//army of defending realm
					new heer(312, 175, 25, 0, 5, 0, false),//army of defending realm
					new heer(313, 100, 50, 0, 0, 0, true)//army of a defending realm
				];
				var battle = new schlacht(attackingArmies, defendingArmies, null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result([12, 8]), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 436.20, gFootLosses: 35.60, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Defender not completely wiped out. Defender guard fleet losses 59.47
			});
		});
	});
});