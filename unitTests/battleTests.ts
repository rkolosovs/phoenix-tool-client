import {QUnit} from "qunit";
import {BattleResult} from "../armies/battleResult";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {Army} from "../armies/army";
import {navalOverrunTests} from "./battleTests/navalOverrunTests";
import {landOverrunTests} from "./battleTests/landOverrunTests";
import {directionalTerrainBattleTests} from "./battleTests/directionalTerrainTests";
import {guardBattleTests} from "./battleTests/guardBattleTests";
import {navalBattleTests} from "./battleTests/navalBattleTests";
import {landBattleTests} from "./battleTests/landBattleTests";

const { module } = QUnit;

QUnit.assert.resultEquals = function(actual: BattleResult, expected: BattleResult) {
	if(actual.result !== expected.result){
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Wrong result: result should be "+expected.result+" was "+actual.result});
        return false;
    } else if (actual.attackerLosses.some((loss: number, index: number) =>
            loss !== expected.attackerLosses[index])) {
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Wrong result: attackerLosses should be "+expected.attackerLosses+" was "+actual.attackerLosses});
        return false;
    } else if (actual.defenderLosses.some((loss: number, index: number) =>
            loss !== expected.defenderLosses[index])) {
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Wrong result: defenderLosses should be "+expected.defenderLosses+" was "+actual.defenderLosses});
        return false;
    } else {
        this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
        return true;
    }
};

export let defenderArmies: Army[] = [];
export let attackerArmies: Army[] = [];

module( "Battle" , {
    before: function () {
        //arrays to hold prepared armies for test
        defenderArmies= [
            new heer(111, 1000, 1, 0, 0, 0, false, 0, 0, 1),//0
            new heer(112, 1000, 5, 0, 0, 0, false, 0, 0, 1),//1
            new heer(115, 15000, 15, 0, 0, 0, false, 0, 0, 1),//2
            new heer(116, 1000, 36, 0, 0, 0, false, 0, 0, 1),//3
            new heer(117, 1500, 10, 0, 0, 0, false, 0, 0, 1),//4
            new heer(118, 10000, 10, 0, 0, 0, false, 0, 0, 1),//5
            new heer(119, 1200, 12, 0, 0, 0, false, 0, 0, 1),//6
            new reiterHeer(211, 5000, 5, false, 0, 0, 1),//7
            new reiterHeer(214, 10000, 5, false, 0, 0, 1),//8
            new reiterHeer(215, 1500, 10, false, 0, 0, 1),//9
            new reiterHeer(219, 1200, 12, false, 0, 0, 1),//10
            new seeHeer(311, 20, 5, 0, 0, false, 0, 0, 1),//11
            new seeHeer(312, 10, 5, 5, 0, false, 0, 0, 1),//12
            new seeHeer(313, 10, 5, 0, 5, false, 0, 0, 1),//13
            new seeHeer(314, 10, 5, 3, 2, false, 0, 0, 1),//14
            new seeHeer(315, 12, 2, 3, 1, false, 0, 0, 1),//15
            new seeHeer(316, 100, 10, 0, 0, false, 0, 0, 1),//16
            new seeHeer(317, 1000, 10, 0, 0, false, 0, 0, 1),//17
            new heer(199, 1000, 10, 0, 0, 0, false, 0, 0, 1)//18
        ];
        attackerArmies = [
            new heer(121, 1000, 1, 0, 0, 0, false, 0, 0, 2),//0
            new heer(123, 10000, 5, 0, 0, 0, false, 0, 0, 2),//1
            new heer(124, 5000, 5, 0, 0, 0, false, 0, 0, 2),//2
            new heer(126, 1200, 4, 0, 0, 0, false, 0, 0, 2),//3
            new heer(127, 1000, 10, 0, 0, 0, true, 0, 0, 2),//4
            new heer(128, 1000, 100, 0, 0, 0, true, 0, 0, 2),//5
            new heer(129, 1000, 10, 0, 0, 0, false, 0, 0, 2),//6
            new reiterHeer(224, 15000, 15, false, 0, 0, 2),//7
            new reiterHeer(227, 1000, 10, true, 0, 0, 2),//8
            new reiterHeer(228, 1000, 10, false, 0, 0, 2),//9
            new seeHeer(321, 10, 5, 0, 0, false, 0, 0, 2),//10
            new seeHeer(322, 10, 5, 5, 0, false, 0, 0, 2),//11
            new seeHeer(323, 10, 5, 0, 5, false, 0, 0, 2),//12
            new seeHeer(324, 20, 5, 0, 0, false, 0, 0, 2),//13
            new seeHeer(325, 10, 5, 3, 2, false, 0, 0, 2),//14
            new seeHeer(326, 35, 40, 7, 6, false, 0, 0, 2),//15
            new seeHeer(327, 40, 35, 0, 0, true, 0, 0, 2),//16
            new seeHeer(328, 100, 100, 0, 0, true, 0, 0, 2),//17
            new heer(199, 1000, 10, 0, 0, 0, false, 0, 0, 2)//18
        ];
        GameState.reset();
        GameState.realms.push(new Realm("Pink Realm", "r01", "213,038,181", 9, true));
        GameState.realms.push(new Realm("Realm 2", "r02", "000,000,000", 9, true));
        GameState.realms.push(new Realm("Realm 3", "r03", "000,000,000", 9, true));
    },
    beforeEach: function () {
        GameState.fields = [];
        GameState.buildings = [];
        GameState.rivers = [];
        GameState.realms.forEach(realm => realm.territory = []);
    },
    after: function () {
        GameState.reset();
    }}, function() {
	module( "Results", {
		before: function() {
			borders = [{'tag': 'r01', 'land': [[0, 0], [1, 1], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 8],
			    [9, 9], [10, 10], [11, 11]]}];
			rivers = [ [[8,8],[8,7]], [[8,8],[9,7]] ];
			buildings = [{'realm': 1, 'name': "", 'type': 0, 'x': 3, 'y': 3, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 1, 'x': 4, 'y': 4, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 2, 'x': 5, 'y': 5, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 3, 'x': 6, 'y': 6, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 4, 'x': 7, 'y': 7, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 5, 'x': 8, 'y': 8, 'direction': "w", 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 7, 'x': 8, 'y': 8, 'direction': "nw", 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null},
			    {'realm': 1, 'name': "", 'type': 8, 'x': null, 'y': null, 'direction': null, 'firstX': 9, 'firstY': 8, 'secondX': 10, 'secondY': 8}];
			fields = [{'x':-1, 'y':0, 'type':2}, {'x':0, 'y':0, 'type':2}, {'x':0, 'y':1, 'type':2}, {'x':1, 'y':1, 'type':3},
			    {'x':1, 'y':2, 'type':0}, {'x':2, 'y':2, 'type':0}, {'x':2, 'y':3, 'type':2}, {'x':3, 'y':3, 'type':2},
			    {'x':3, 'y':4, 'type':2}, {'x':4, 'y':4, 'type':2}, {'x':4, 'y':5, 'type':2}, {'x':5, 'y':5, 'type':2},
			    {'x':5, 'y':6, 'type':2}, {'x':6, 'y':6, 'type':2}, {'x':6, 'y':7, 'type':2}, {'x':7, 'y':7, 'type':2},
			    {'x':8, 'y':7, 'type':5}, {'x':9, 'y':7, 'type':5}, {'x':7, 'y':8, 'type':5}, {'x':8, 'y':8, 'type':5},
			    {'x':9, 'y':8, 'type':5}, {'x':8, 'y':9, 'type':4}, {'x':9, 'y':9, 'type':3}, {'x':10, 'y':9, 'type':3},
			    {'x':9, 'y':10, 'type':2}, {'x':10, 'y':10, 'type':8}, {'x':10, 'y':11, 'type':2}, {'x':11, 'y':11, 'type':7}];
		},
		beforeEach: function() {
		    realms = [{active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01'},
                {active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02'},
                {active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03'}];
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
			borders = [];
			buildings = [];
			fields = [];
			realms = [];
		}}, function() {
		module( "Land Battles", landBattleTests);
		module( "Naval Battles", navalBattleTests);
		module( "Guard Battles", guardBattleTests);
		module( "Directional Terrain Bonuses", {
		    beforeEach: function() {
		        realms = [{active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01'},
                    {active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02'},
                    {active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03'}];
                defenderArmies[18].owner = 1;
		    }}, directionalTerrainBattleTests);
		module( "Complex Battles", );
	});
	module( "Overrun", {
		before: function() {
		    realms = [{active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01'},
                {active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02'},
                {active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03'}];
			defenderArmies = [
				new heer(111, 1500, 10, 0, 0, 0, false, 0, 0, 1),//0
				new heer(112, 1000, 10, 0, 0, 0, false, 0, 0, 1),//1
				new heer(113, 1000, 10, 0, 0, 0, true, 0, 0, 1),//2
				new reiterHeer(211, 1000, 15, false, 0, 0, 1),//3
				new seeHeer(311, 20, 5, 0, 0, false, 0, 0, 1),//4
				new seeHeer(314, 10, 5, 3, 2, false, 0, 0, 1),//5
				new seeHeer(315, 10, 5, 0, 0, true, 0, 0, 1)//6
			];
			attackerArmies = [
				new heer(123, 15000, 1, 0, 0, 0, false, 0, 0, 2),//0
				new heer(124, 10000, 1, 0, 0, 0, true, 0, 0, 2),//1
				new reiterHeer(224, 10000, 1, false, 0, 0, 2),//2
				new seeHeer(321, 200, 5, 0, 0, false, 0, 0, 2),//3
				new seeHeer(322, 100, 5, 0, 0, false, 0, 0, 2),//4
				new seeHeer(325, 99, 5, 3, 2, false, 0, 0, 2),//5
				new seeHeer(326, 200, 5, 0, 0, true, 0, 0, 2)//6
			];
			fields = [{'x':0, 'y':0, 'type':2}, {'x':1, 'y':1, 'type':0}];//plains, water
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
		}}, function() {
		module( "Land Battles", landOverrunTests);
		module( "Naval Battles", navalOverrunTests);
	});
});