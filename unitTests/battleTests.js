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

var defenderArmies = [];
var attackerArmies = [];
function showHex(posX, posY) {
    this.fieldType = function(){
		if(posX === 0 && posY === 0){ return 2; }
    }
}

module( "Battle" , function() {
	module( "Ergebnis", {
		before: function() {
		    //prepare something once for all tests
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
				new heer(316, 100, 10, 0, 0, 0, false)
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
				new heer(327, 40, 35, 0, 0, 0, true)
			];
		},
		beforeEach: function() {
		    //prepare something before each test
		},
		afterEach: function() {
		    //clean up after each test
		},
		after: function() {
		    //clean up once after all tests are done
		}}, function() {
		test( "Minimal armies, defenders win by dice roll", function(t) {
			var battle = new schlacht([attackerArmies[0]], [defenderArmies[0]], null, null, 0, 0);
			battle.init();
			t.resultEquals( battle.result([1, 10]), {victor: 'defender', footLosses: 861.24, cavLosses: 0, fleetLosses: 0, gFootLosses: 0, gCavLosses: 0, gFleetLosses: 0} );
		});
	});
});