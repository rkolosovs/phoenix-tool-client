
module( "Shooting" , function() {
	module( "Results", {
		before: function() {
            defenderArmies = [];
            attackerArmies = [];
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
		test( "Light catas shooting.", function(t) {
        });
        test( "Heavy catas shooting.", function(t) {
        });
        test( "Mixed catas shooting.", function(t) {
        });
        test( "Light warships shooting.", function(t) {
        });
        test( "Heavy warships shooting.", function(t) {
        });
        test( "Mixed warships shooting.", function(t) {
        });
	});
	module( "Conditions", function() {
		test( "Light catas conditions.", function(t) {
        });
        test( "Heavy catas conditions.", function(t) {
        });
        test( "Mixed catas conditions.", function(t) {
        });
        test( "Light warships conditions.", function(t) {
        });
        test( "Heavy warships conditions.", function(t) {
        });
        test( "Mixed warships conditions.", function(t) {
        });
	});
});