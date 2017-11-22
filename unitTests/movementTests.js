QUnit.assert.movePossible = function(actual, expected) {
    var expectedProps = Object.getOwnPropertyNames(expected);
    if(actual.some((possibleMove) => (expectedProps.every((propName) => (propName === "tar" &&
        possibleMove[propName].x === expected[propName].x && possibleMove[propName].y === expected[propName].y) ||
        possibleMove[propName] === expected[propName])))){
        this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
        return true;
    } else {
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Expected move was not possible."});
        return false;
    }
};

QUnit.assert.moveImpossible = function(actual, expected) {
    var expectedProps = Object.getOwnPropertyNames(expected);
    actual.forEach((possibleMove) => {
        if(expectedProps.every((propName) => (expectedProps.every((propName) => (propName === "tar" &&
            possibleMove[propName].x === expected[propName].x && possibleMove[propName].y === expected[propName].y) ||
            possibleMove[propName] === expected[propName])))){
            this.pushResult({result: false, actual: actual, expected: expected,
                message: "Impossible move was marked as possible."});
            return false;
        }
    });
    this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
    return true;
};

var army = null;
var fleet = null;
var anotherFleet = null;
var listOfArmies = [];
var borders = [];
var buildings = [];
var fields = [];
var rivers = [];
var login = "sl";
module( "Movement" , {
		beforeEach: function() {
			army = null;
			fleet = null;
            anotherFleet = null;
            listOfArmies = [];
            borders = [];
            buildings = [];
            fields = [];
            rivers = [];
		}},  function() {
	module( "Foot" , function() {
	    test( "Lowlands -> lowlands (nw direction)", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':1, 'y':0, 'type':1}, {'x':1, 'y':1, 'type':0}, {'x':0, 'y':1, 'type':1},
	            {'x':-1, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}, {'x':1, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: false} );
		});
	    test( "Lowlands -> lowlands on street (ne direction)", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':2}, {'x':1, 'y':0, 'type':1},
	            {'x':1, 'y':1, 'type':1}, {'x':0, 'y':1, 'type':1}, {'x':-1, 'y':0, 'type':1}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 1, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 1, movepoints: 4, height: 1, landunit: true, tar: (new showHex(1, -1))} );
		});
	    test( "Lowlands -> lowlands in homeland (e direction)", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':1}, {'x':1, 'y':0, 'type':2},
	            {'x':1, 'y':1, 'type':1}, {'x':0, 'y':1, 'type':1}, {'x':-1, 'y':0, 'type':1}];
	        borders = [{'tag': 'usa', 'land': [[1, 0]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 2, movepoints: 4, height: 2, landunit: true, tar: (new showHex(1, 0))} );
		});
	    test( "Lowlands -> lowlands on street in homeland (se direction)", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':1}, {'x':1, 'y':0, 'type':1},
	            {'x':1, 'y':1, 'type':2}, {'x':0, 'y':1, 'type':1}, {'x':-1, 'y':0, 'type':1}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 1, 'firstY': 1, 'secondX': 0, 'secondY': 0}];
	        borders = [{'tag': 'usa', 'land': [[1, 1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 3, movepoints: 3, height: 1, landunit: true, tar: (new showHex(1, 1))} );
		});
	    test( "Lowlands -> desert (sw direction)", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':1}, {'x':1, 'y':0, 'type':1},
	            {'x':1, 'y':1, 'type':1}, {'x':0, 'y':1, 'type':7}, {'x':-1, 'y':0, 'type':1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 4, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, 1)), unload: false} );
		});
	    test( "Lowlands -> desert on street (w direction)", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}, {'x':1, 'y':-1, 'type':1}, {'x':1, 'y':0, 'type':1},
	            {'x':1, 'y':1, 'type':1}, {'x':0, 'y':1, 'type':1}, {'x':-1, 'y':0, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': -1, 'firstY': 0, 'secondX': 0, 'secondY': 0}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 5, movepoints: 4, height: 1, landunit: true, tar: (new showHex(-1, 0))} );
		});
	    test( "Lowlands -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> woods on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> swamp on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> hills on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> hills in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Lowlands -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':0}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Lowlands -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':1}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Desert -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> lowlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> lowlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];

	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> desert on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> desert on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];

	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> woods on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> woods on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> swamp on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> hills on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> hills in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> hills on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Desert -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Desert -> shallows with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':0}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Desert -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Desert -> deepsea with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':1}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Woods -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> lowlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> lowlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> desert on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> desert on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> woods on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> woods on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> swamp on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> hills on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> hills in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> hills on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Woods -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Woods -> shallows with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':0}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Woods -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Woods -> deepsea with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':1}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Swamp -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> lowlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> desert on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> woods on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> swamp on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> hills on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> hills in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Swamp -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Swamp -> shallows with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':0}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Swamp -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':1}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true, tar: (new showHex(0, -1)), load: true} );
		});
	    test( "Hills -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> lowlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> lowlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> desert on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> desert on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> woods on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> woods on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> swamp on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> hills on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> hills in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> hills on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> highlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> highlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Hills -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> hills on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> hills in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> highlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> highlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> mountains on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> mountains in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> mountains on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Highlands -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> highlands on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> highlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> highlands on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> mountains on street", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> mountains in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> mountains on street in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
	        buildings = [{'realm': 1, 'name': '', 'type': 8, 'x': null, 'y': null, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Mountains -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet];
	        fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Shallows -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> desert with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> woods with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> swamp with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Shallows -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Shallows -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Shallows -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Shallows -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        anotherFleet = new seeHeer(322, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet, anotherFleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Shallows -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        anotherFleet = new seeHeer(322, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet, anotherFleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Deepsea -> lowlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> desert", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> desert with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> desert in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> woods", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> woods with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> woods in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> swamp", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> swamp in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 2, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
	        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
	        borders = [{'tag': 'usa', 'land': [[0, -1]]}];
	        clickedMoves(army);
	        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 3, height: 1, landunit: true, tar: (new showHex(0, -1)), unload: true} );
		});
	    test( "Deepsea -> hills", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':4}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Deepsea -> highlands", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':5}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Deepsea -> mountains", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        listOfArmies = [army, fleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':6}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Deepsea -> shallows", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        anotherFleet = new seeHeer(322, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet, anotherFleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':0}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	    test( "Deepsea -> deepsea", function(t) {
	        army = new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
	        fleet = new seeHeer(311, 20, 1, 0, 0, false, 0, 0, 1);
	        anotherFleet = new seeHeer(322, 20, 1, 0, 0, false, 0, -1, 1);
	        listOfArmies = [army, fleet, anotherFleet];
	        fleet.loadArmy(0);
	        fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':1}];
	        clickedMoves(army);
	        t.moveImpossible( army.possibleMoves, {dir: 0, tar: (new showHex(0, -1))} );
		});
	});
	module( "Light Catapults" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods in homeland", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp in homeland", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods in homeland", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp in homeland", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods in homeland", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp in homeland", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods in homeland", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp in homeland", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods in homeland", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp in homeland", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands in homeland", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands in homeland", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> mountains on street", function(t) {
		});
	    test( "Highlands -> mountains on street in homeland", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Mountains -> lowlands", function(t) {
		});
	    test( "Mountains -> desert", function(t) {
		});
	    test( "Mountains -> woods", function(t) {
		});
	    test( "Mountains -> swamp", function(t) {
		});
	    test( "Mountains -> hills", function(t) {
		});
	    test( "Mountains -> highlands", function(t) {
		});
	    test( "Mountains -> highlands on street", function(t) {
		});
	    test( "Mountains -> highlands in homeland", function(t) {
		});
	    test( "Mountains -> highlands on street in homeland", function(t) {
		});
	    test( "Mountains -> mountains", function(t) {
		});
	    test( "Mountains -> mountains on street", function(t) {
		});
	    test( "Mountains -> mountains on street in homeland", function(t) {
		});
	    test( "Mountains -> shallows", function(t) {
		});
	    test( "Mountains -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods in homeland", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp in homeland", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods in homeland", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp in homeland", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Heavy Catapults" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Riders" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods in homeland", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp in homeland", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods in homeland", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp in homeland", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods in homeland", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp in homeland", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods in homeland", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp in homeland", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods in homeland", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp in homeland", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands in homeland", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands in homeland", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods in homeland", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp in homeland", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods in homeland", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp in homeland", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Fleet" , function() {
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> shallows on coast", function(t) {
		});
	    test( "Shallows -> shallows on coast (distance two)", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Shallows -> deepsea on coast", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> shallows on coast", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	    test( "Deepsea -> deepsea on coast", function(t) {
		});
	});
	module( "Light Warships" , function() {
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> shallows on coast", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Shallows -> deepsea on coast", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> shallows on coast", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	    test( "Deepsea -> deepsea on coast", function(t) {
		});
	});
	module( "Heavy Warships" , function() {
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> shallows on coast", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Shallows -> deepsea on coast", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> shallows on coast", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	    test( "Deepsea -> deepsea on coast", function(t) {
		});
	});
});