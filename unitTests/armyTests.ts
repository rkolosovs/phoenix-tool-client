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

var listOfArmies = [];
var selectedArmyIndex = 0;

module( "Army" , function() {
	module( "Decimation" , function() {
		module( "Regular" , function() {
			test( "Foot army decimation", function(t){
				var army = new heer(101, 10000, 100, 0, 0, 0, false, 0, 0, 1);
				army.decimate(1000);
				t.armyEquals(army, new heer(101, 9000, 90, 0, 0, 0, false, 0, 0, 1));
			});
			test( "Foot army with catapults decimation", function(t){
				var army = new heer(101, 10000, 100, 10, 10, 0, false, 0, 0, 1);
				army.decimate(1000);
				t.armyEquals(army, new heer(101, 9000, 90, 9, 9, 0, false, 0, 0, 1));
			});
			test( "Foot army with mounts decimation", function(t){
				var army = new heer(101, 10000, 100, 0, 0, 10000, false, 0, 0, 1);
				army.decimate(1000);
				t.armyEquals(army, new heer(101, 9000, 90, 0, 0, 9000, false, 0, 0, 1));
			});
			test( "Rider army decimation", function(t){
				var army = new reiterHeer(201, 10000, 100, false, 0, 0, 1);
				army.decimate(1000);
				t.armyEquals(army, new reiterHeer(201, 9000, 90, false, 0, 0, 1));
			});
			test( "Fleet decimation", function(t){
				var army = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				army.decimate(10);
				t.armyEquals(army, new seeHeer(301, 90, 9, 0, 0, false, 0, 0, 1));
			});
			test( "Fleet with warships decimation", function(t){
				var army = new seeHeer(301, 100, 10, 10, 10, false, 0, 0, 1);
				army.decimate(10);
				t.armyEquals(army, new seeHeer(301, 90, 9, 9, 9, false, 0, 0, 1));
			});
		});
		module( "Transported Troops" , function() {
			test( "Fleet transporting at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				var transportedArmy = new heer(101, 9000, 10, 0, 0, 0, false, 0, 0, 1);
				listOfArmies = [transportedArmy];
				fleet.loadArmy(0);
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 4500, 5, 0, 0, 0, false, 0, 0, 1));
			});
			test( "Fleet transporting at 75% capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				var transportedArmy = new heer(101, 7000, 5, 0, 0, 0, false, 0, 0, 1);
				listOfArmies = [transportedArmy];
				fleet.loadArmy(0);
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 4666, 3, 0, 0, 0, false, 0, 0, 1));
			});
			test( "Fleet transporting riders at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				var transportedArmy = new reiterHeer(201, 4500, 10, false, 0, 0, 1);
				listOfArmies = [transportedArmy];
				fleet.loadArmy(0);
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new reiterHeer(201, 2250, 5, false, 0, 0, 1));
			});
			test( "Fleet transporting army with catapults at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				var transportedArmy = new heer(101, 1000, 10, 4, 2, 0, false, 0, 0, 1);
				listOfArmies = [transportedArmy];
				fleet.loadArmy(0);
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 500, 5, 2, 1, 0, false, 0, 0, 1));
			});
			test( "Fleet transporting army with mounts at full capacity halved", function(t){
				var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				var transportedArmy = new heer(101, 4500, 10, 0, 0, 4500, false, 0, 0, 1);
				listOfArmies = [transportedArmy];
				fleet.loadArmy(0);
				fleet.decimate(50);
				t.armyEquals(transportedArmy, new heer(101, 2250, 5, 0, 0, 2250, false, 0, 0, 1));
			});
		});
	});
	module( "Taking Fire" , function() {
		module( "Regular" , function() {
			test( "Foot army decimation", function(t){
				// var army = new heer(101, 10000, 100, 0, 0, 0, false, 0, 0, 1);
				// army.decimate(1000);
				// t.armyEquals(army, new heer(101, 9000, 90, 0, 0, 0, false, 0, 0, 1));
			});
			test( "Foot army with catapults decimation", function(t){
				// var army = new heer(101, 10000, 100, 10, 10, 0, false, 0, 0, 1);
				// army.decimate(1000);
				// t.armyEquals(army, new heer(101, 9000, 90, 9, 9, 0, false, 0, 0, 1));
			});
			test( "Foot army with mounts decimation", function(t){
				// var army = new heer(101, 10000, 100, 0, 0, 10000, false, 0, 0, 1);
				// army.decimate(1000);
				// t.armyEquals(army, new heer(101, 9000, 90, 0, 0, 9000, false, 0, 0, 1));
			});
			test( "Rider army decimation", function(t){
				// var army = new reiterHeer(201, 10000, 100, false, 0, 0, 1);
				// army.decimate(1000);
				// t.armyEquals(army, new reiterHeer(201, 9000, 90, false, 0, 0, 1));
			});
			test( "Fleet decimation", function(t){
				// var army = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				// army.decimate(10);
				// t.armyEquals(army, new seeHeer(301, 90, 9, 0, 0, false, 0, 0, 1));
			});
			test( "Fleet with warships decimation", function(t){
				// var army = new seeHeer(301, 100, 10, 10, 10, false, 0, 0, 1);
				// army.decimate(10);
				// t.armyEquals(army, new seeHeer(301, 90, 9, 9, 9, false, 0, 0, 1));
			});
		});
		module( "Transported Troops" , function() {
			test( "Fleet transporting at full capacity halved", function(t){
				// var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				// var transportedArmy = new heer(101, 9000, 10, 0, 0, 0, false, 0, 0, 1);
				// listOfArmies = [transportedArmy];
				// fleet.loadArmy(0);
				// fleet.decimate(50);
				// t.armyEquals(transportedArmy, new heer(101, 4500, 5, 0, 0, 0, false, 0, 0, 1));
			});
			test( "Fleet transporting at 75% capacity halved", function(t){
				// var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				// var transportedArmy = new heer(101, 7000, 5, 0, 0, 0, false, 0, 0, 1);
				// listOfArmies = [transportedArmy];
				// fleet.loadArmy(0);
				// fleet.decimate(50);
				// t.armyEquals(transportedArmy, new heer(101, 4666, 3, 0, 0, 0, false, 0, 0, 1));
			});
			test( "Fleet transporting riders at full capacity halved", function(t){
				// var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				// var transportedArmy = new reiterHeer(201, 4500, 10, false, 0, 0, 1);
				// listOfArmies = [transportedArmy];
				// fleet.loadArmy(0);
				// fleet.decimate(50);
				// t.armyEquals(transportedArmy, new reiterHeer(201, 2250, 5, false, 0, 0, 1));
			});
			test( "Fleet transporting army with catapults at full capacity halved", function(t){
				// var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				// var transportedArmy = new heer(101, 1000, 10, 4, 2, 0, false, 0, 0, 1);
				// listOfArmies = [transportedArmy];
				// fleet.loadArmy(0);
				// fleet.decimate(50);
				// t.armyEquals(transportedArmy, new heer(101, 500, 5, 2, 1, 0, false, 0, 0, 1));
			});
			test( "Fleet transporting army with mounts at full capacity halved", function(t){
				// var fleet = new seeHeer(301, 100, 10, 0, 0, false, 0, 0, 1);
				// var transportedArmy = new heer(101, 4500, 10, 0, 0, 4500, false, 0, 0, 1);
				// listOfArmies = [transportedArmy];
				// fleet.loadArmy(0);
				// fleet.decimate(50);
				// t.armyEquals(transportedArmy, new heer(101, 2250, 5, 0, 0, 2250, false, 0, 0, 1));
			});
		});
	});
});