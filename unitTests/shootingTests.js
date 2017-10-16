
module( "Shooting" , function() {
	module( "Results", {
		before: function() {
            defenderArmies = [];
            attackerArmies = [];
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
		module( "LKP shooting", function() {
			test( "Minimal armies, defenders win by dice roll.", function(t) {
				
            });
        });
        module( "SKP shooting", function() {
			test( "Minimal armies, defenders win by dice roll.", function(t) {
				
            });
        });
    });
});