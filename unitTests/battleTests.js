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

        if ((propName === "victor" && actual[propName] !== expected[propName]) || Math.abs(actual[propName] - expected[propName]) > 0.01) {
        	this.pushResult({result: false, actual: actual, expected: expected,
                message: "Wrong result: "+propName+" should be "+expected[propName]+" was "+actual[propName]});
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
				new heer(111, 1000, 1, 0, 0, 0, false),//0
				new heer(112, 1000, 5, 0, 0, 0, false),//1
				new heer(115, 15000, 15, 0, 0, 0, false),//2
				new heer(116, 1000, 36, 0, 0, 0, false),//3
				new heer(117, 1500, 10, 0, 0, 0, false),//4
				new heer(118, 10000, 10, 0, 0, 0, false),//5
				new heer(119, 1200, 12, 0, 0, 0, false),//6
				new reiterHeer(211, 5000, 5, false),//7
				new reiterHeer(214, 10000, 5, false),//8
				new reiterHeer(215, 1500, 10, false),//9
				new reiterHeer(219, 1200, 12, false),//10
				new seeHeer(311, 20, 5, 0, 0, false),//11
				new seeHeer(312, 10, 5, 5, 0, false),//12
				new seeHeer(313, 10, 5, 0, 5, false),//13
				new seeHeer(314, 10, 5, 3, 2, false),//14
				new seeHeer(315, 12, 2, 3, 1, false),//15
				new seeHeer(316, 100, 10, 0, 0, false),//16
				new seeHeer(317, 1000, 10, 0, 0, false)//17
			];
			attackerArmies = [
				new heer(121, 1000, 1, 0, 0, 0, false),//0
				new heer(123, 10000, 5, 0, 0, 0, false),//1
				new heer(124, 5000, 5, 0, 0, 0, false),//2
				new heer(126, 1200, 4, 0, 0, 0, false),//3
				new heer(127, 1000, 10, 0, 0, 0, true),//4
				new heer(128, 1000, 100, 0, 0, 0, true),//5
				new heer(129, 1000, 10, 0, 0, 0, false),//6
				new reiterHeer(224, 15000, 15, false),//7
				new reiterHeer(227, 1000, 10, true),//8
				new reiterHeer(228, 1000, 10, false),//9
				new seeHeer(321, 10, 5, 0, 0, false),//10
				new seeHeer(322, 10, 5, 5, 0, false),//11
				new seeHeer(323, 10, 5, 0, 5, false),//12
				new seeHeer(324, 20, 5, 0, 0, false),//13
				new seeHeer(325, 10, 5, 3, 2, false),//14
				new seeHeer(326, 35, 40, 7, 6, false),//15
				new seeHeer(327, 40, 35, 0, 0, true),//16
				new seeHeer(328, 100, 100, 0, 0, true)//17
			];
			borders = [{'tag': 'vvh', 'land': [[0, 0], [1, 1], [3, 3]]}];
			buildings = [{'realm': 1, 'name': "", 'type': 0, 'x': 3, 'y': 3, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null}];
			fieldTypes = [2, 3, 0, 2];//plains, woods, water, plains (with castle)
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
			borders = [];
			buildings = [];
			fieldTypes = [];
		}}, function() {
		module( "Land Battles", function() {
			test( "Minimal armies, defenders win by dice roll.", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(1, 10), {victor: 'defender', footLosses: 861.24, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Minimal armies, attackers win by dice roll.", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(9, 2), {victor: 'attacker', footLosses: 869.57, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Minimal armies, tie (both loose).", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'tie', footLosses: -1, cavLosses: -1, fleetLosses: -1, gFootLosses: -1, gCavLosses: -1, gFleetLosses: -1} );
			});
			test( "Different officer count, different rolls, tie (both loose).", function(t) {
				var battle = new schlacht([attackerArmies[0]], [defenderArmies[1]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(7, 3), {victor: 'tie', footLosses: -1, cavLosses: -1, fleetLosses: -1, gFootLosses: -1, gCavLosses: -1, gFleetLosses: -1} );
			});
			test( "Riders vs footmen on plains.", function(t) {
				var battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(6, 6), {victor: 'defender', footLosses: 0, cavLosses: 5294.12, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Riders vs footmen in woods.", function(t) {
				var battle = new schlacht([attackerArmies[1]], [defenderArmies[8]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result(4, 4), {victor: 'attacker', footLosses: 5294.12, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Mixed armies of different compositions on plains.", function(t) {
				var battle = new schlacht([attackerArmies[2], attackerArmies[7]], [defenderArmies[2], defenderArmies[7]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'attacker', footLosses: 5456.25, cavLosses: 8780.49, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Tie with soldier count, officer count and dice roll all different.", function(t) {
				var battle = new schlacht([attackerArmies[3]], [defenderArmies[3]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(1, 10), {victor: 'tie', footLosses: -1, cavLosses: -1, fleetLosses: -1, gFootLosses: -1, gCavLosses: -1, gFleetLosses: -1} );
				//TODO Attacker losses given as expected. Defender losses are 995.85
			});
		});
		module( "Naval Battles", function() {
			test( "Basic fleet combat.", function(t) {
				var battle = new schlacht([attackerArmies[10]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Light warships on the attack.", function(t) {
				var battle = new schlacht([attackerArmies[11]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy warships on the attack.", function(t) {
				var battle = new schlacht([attackerArmies[12]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Light warships on the defense.", function(t) {
				var battle = new schlacht([attackerArmies[13]], [defenderArmies[12]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 4.57, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy warships on the defense.", function(t) {
				var battle = new schlacht([attackerArmies[13]], [defenderArmies[13]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 2.33, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy and light warships on the defense.", function(t) {
				var battle = new schlacht([attackerArmies[13]], [defenderArmies[14]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 3.33, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Heavy and light warships on the attack.", function(t) {
				var battle = new schlacht([attackerArmies[14]], [defenderArmies[11]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 8, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Mixed fleet combat.", function(t) {
				var battle = new schlacht([attackerArmies[15]], [defenderArmies[15]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 26.72, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
			});
		});
		module( "Guard Battles", function() {
			test( "Guard fleet combat.", function(t) {
				var battle = new schlacht([attackerArmies[16]], [defenderArmies[16]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 35.96} );
			});
			test( "Foot vs guard foot.", function(t) {
				var battle = new schlacht([attackerArmies[4]], [defenderArmies[4]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 550.10, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Riders vs guard foot on plains.", function(t) {
				var battle = new schlacht([attackerArmies[4]], [defenderArmies[9]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'defender', footLosses: 0, cavLosses: 1568.25, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Attacker not completely wiped out. Attacker guard foot losses are 813.01
			});
			test( "Foot vs guard riders in forest.", function(t) {
				var battle = new schlacht([attackerArmies[8]], [defenderArmies[4]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'defender', footLosses: 1568.25, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Attacker not completely wiped out. Attacker guard cav losses are 813.01
			});
			test( "Riders vs guard riders.", function(t) {
				var battle = new schlacht([attackerArmies[8]], [defenderArmies[9]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 550.10, gFleetLosses: 0} );
			});
			test( "Foot vs guard foot 10:1 fight.", function(t) {
				var battle = new schlacht([attackerArmies[5]], [defenderArmies[5]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Not sure if the rules work as intended here (victor losses are 0)
			});
			test( "Fleet vs guard fleet 10:1 fight.", function(t) {
				var battle = new schlacht([attackerArmies[17]], [defenderArmies[17]], null, null, 2, 2);
				battle.init();
				t.resultEquals( battle.result(10, 1), {victor: 'defender', footLosses: 0, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Not sure if the rules work as intended here (victor losses are 0)
			});
			test( "Mixed army vs guard foot and regular horse in forest.", function(t) {
				var battle = new schlacht([attackerArmies[5], attackerArmies[9]], [defenderArmies[6], defenderArmies[10]], null, null, 1, 1);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'attacker', footLosses: 0, cavLosses: 1496, fleetLosses: 0, gFootLosses: 387.32, gCavLosses: 0, gFleetLosses: 0} );
			});
			test( "Mixed army vs regular foot and guard horse on plains.", function(t) {
				var battle = new schlacht([attackerArmies[6], attackerArmies[8]], [defenderArmies[6], defenderArmies[10]], null, null, 0, 0);
				battle.init();
				t.resultEquals( battle.result(5, 5), {victor: 'attacker', footLosses: 1496, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 387.32, gFleetLosses: 0} );
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
				t.resultEquals( battle.result(18, 3), {victor: 'attacker', footLosses: 37638.48, cavLosses: 18819.24, fleetLosses: 0, gFootLosses: 5192.2, gCavLosses: 0, gFleetLosses: 0} );
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
				t.resultEquals( battle.result(12, 8), {victor: 'attacker', footLosses: 0, cavLosses: 0, fleetLosses: 436.20, gFootLosses: 35.60, gCavLosses: 0, gFleetLosses: 0} );
				//TODO Defender not completely wiped out. Defender guard fleet losses 59.47
			});
		});
	});
	module( "Overrun", {
		before: function() {
			defenderArmies = [
				new heer(111, 1500, 10, 0, 0, 0, false),
				new heer(112, 1000, 10, 0, 0, 0, false),
				new heer(113, 1000, 10, 0, 0, 0, true),
				new reiterHeer(211, 1000, 15, false),
				new seeHeer(311, 20, 5, 0, 0, false),
				new seeHeer(314, 10, 5, 3, 2, false),
				new seeHeer(315, 10, 5, 0, 0, true)
			];
			attackerArmies = [
				new heer(123, 15000, 1, 0, 0, 0, false),
				new heer(124, 10000, 1, 0, 0, 0, true),
				new reiterHeer(224, 10000, 1, false),
				new seeHeer(321, 200, 5, 0, 0, false),
				new seeHeer(322, 100, 5, 0, 0, false),
				new seeHeer(325, 99, 5, 3, 2, false),
				new seeHeer(326, 200, 5, 0, 0, true)
			];
			fieldTypes = [2, 0];//plains, water
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
		}}, function() {
			module( "Land Battles", function() {
				test( "Footmen outnumbered 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Riders outnumbered 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[2]], [defenderArmies[3]], null, null, 0, 0);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Mixed army outnumbered 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[0], attackerArmies[2]], [defenderArmies[0], defenderArmies[3]], null, null, 0, 0);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Guard outnumbering 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[1]], [defenderArmies[1]], null, null, 0, 0);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Guard outnumbered 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[0]], [defenderArmies[2]], null, null, 0, 0);
					battle.init();
					t.notOk(battle.overrunAttack());
				});
			});
			module( "Naval Battles", function() {
				test( "Fleet outnumbered 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[3]], [defenderArmies[4]], null, null, 1, 1);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Defending fleet outnumbered 10:1 despite having warships.", function(t) {
					var battle = new schlacht([attackerArmies[4]], [defenderArmies[5]], null, null, 1, 1);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Guard fleet outnumbering 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[6]], [defenderArmies[4]], null, null, 1, 1);
					battle.init();
					t.ok(battle.overrunAttack());
				});
				test( "Guard fleet outnumbered 10:1.", function(t) {
					var battle = new schlacht([attackerArmies[4]], [defenderArmies[6]], null, null, 1, 1);
					battle.init();
					t.notOk(battle.overrunAttack());
				});
				test( "Attacking fleet not outnumbering 10:1 despite having warships.", function(t) {
					var battle = new schlacht([attackerArmies[5]], [defenderArmies[5]], null, null, 1, 1);
					battle.init();
					t.notOk(battle.overrunAttack());
				});
			});
		});
});

QUnit.assert.armyEquals = function(actual, expected) {
	var actualProps = Object.getOwnPropertyNames(actual);
    var expectedProps = Object.getOwnPropertyNames(expected);

    if (actualProps.length != expectedProps.length) {
    	this.pushResult({result: false, actual: actual, expected: expected,
            message: "Result is not an army."});
        return false;
    }

    for (var i = 0; i < actualProps.length; i++) {
        var propName = actualProps[i];

        if ((propName === "count" || propName === "leaders" || propName === "mounts" || 
        		propName === "lkp" || propName === "skp") && actual[propName] !== expected[propName]) {
        	this.pushResult({result: false, actual: actual, expected: expected,
                message: "Wrong result: "+propName+" should be "+expected[propName]+" was "+actual[propName]});
            return false;
        }
    }
    
    this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
    return true;
};

module( "Army" , function() {
	module( "Decimation" , function() {
		module( "Regular" , function() {
			test( "Foot army decimation", function(t){
				var army = new heer(101, 10000, 100, 0, 0, 0, false);
				army.decimate(1000);
				t.armyEquals(army, new heer(101, 9000, 90, 0, 0, 0, false));
			});
			test( "Foot army with catapults decimation", function(t){
				var army = new heer(101, 10000, 100, 10, 10, 0, false);
				army.decimate(1000);
				t.armyEquals(army, new heer(101, 9000, 90, 9, 9, 0, false));
			});
			test( "Foot army with mounts decimation", function(t){
				var army = new heer(101, 10000, 100, 0, 0, 10000, false);
				army.decimate(1000);
				t.armyEquals(army, new heer(101, 9000, 90, 0, 0, 9000, false));
			});
			test( "Rider army decimation", function(t){
				var army = new reiterHeer(201, 10000, 100, false);
				army.decimate(1000);
				t.armyEquals(army, new reiterHeer(201, 9000, 90, false));
			});
			test( "Fleet decimation", function(t){
				var army = new seeHeer(301, 100, 10, 0, 0, false);
				army.decimate(10);
				t.armyEquals(army, new seeHeer(301, 90, 9, 0, 0, false));
			});
			test( "Fleet with warships decimation", function(t){
				var army = new seeHeer(301, 100, 10, 10, 10, false);
				army.decimate(10);
				t.armyEquals(army, new seeHeer(301, 90, 9, 9, 9, false));
			});
		});
		module( "Transported Troops" , function() {
			test( "Fleet transporting at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false);
				var transportedArmy = new heer(101, 9000, 10, 0, 0, 0, false);
				var listOfArmyCoordinates = [transportedArmy];
				var selectedArmy = 0;
				fleet.loadArmy;
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 4500, 5, 0, 0, 0, false));
			});
			test( "Fleet transporting at 75% capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false);
				var transportedArmy = new heer(101, 7000, 5, 0, 0, 0, false);
				var listOfArmyCoordinates = [transportedArmy];
				var selectedArmy = 0;
				fleet.loadArmy;
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 4666, 3, 0, 0, 0, false));
			});
			test( "Fleet transporting riders at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false);
				var transportedArmy = new reiterHeer(201, 4500, 10, false);
				var listOfArmyCoordinates = [transportedArmy];
				var selectedArmy = 0;
				fleet.loadArmy;
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new reiterHeer(201, 2250, 5, false));
			});
			test( "Fleet transporting army with catapults at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false);
				var transportedArmy = new heer(101, 1000, 10, 4, 2, 0, false);
				var listOfArmyCoordinates = [transportedArmy];
				var selectedArmy = 0;
				fleet.loadArmy;
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 500, 5, 2, 1, 0, false));
			});
			test( "Fleet transporting army with mounts at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false);
				var transportedArmy = new heer(101, 4500, 10, 0, 0, 4500, false);
				var listOfArmyCoordinates = [transportedArmy];
				var selectedArmy = 0;
				fleet.loadArmy;
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 2250, 5, 0, 0, 2250, false));
			});
		});
	});
});