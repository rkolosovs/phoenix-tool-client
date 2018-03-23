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
import {River} from "../map/river";
import {ProductionBuilding} from "../buildings/productionBuilding";
import {BuildingType} from "../buildings/building";
import {Constants} from "../constants";
import CASTLE_BP = Constants.CASTLE_BP;
import CITY_BP = Constants.CITY_BP;
import FORTRESS_BP = Constants.FORTRESS_BP;
import CAPITAL_BP = Constants.CAPITAL_BP;
import CAPITAL_FORTRESS_BP = Constants.CAPITAL_FORTRESS_BP;
import {Wall} from "../buildings/wall";
import WALL_BP = Constants.WALL_BP;
import {Direction} from "../map/direction";
import WALL_MAX_GUARD = Constants.WALL_MAX_GUARD;
import {NonDestructibleBuilding} from "../buildings/nonDestructibleBuilding";
import {FieldType, Field} from "../map/field";
import {FootArmy} from "../armies/footArmy";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";

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
        GameState.reset();
        GameState.realms.push(new Realm("Pink Realm", "r01", "213,038,181", 9, true));
        GameState.realms.push(new Realm("Realm 2", "r02", "000,000,000", 9, true));
        GameState.realms.push(new Realm("Realm 3", "r03", "000,000,000", 9, true));
        //arrays to hold prepared armies for test
        defenderArmies= [
            new FootArmy(111, GameState.realms[1], 1000, 1, 0,
            0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //0
            new FootArmy(112, GameState.realms[1], 1000, 5, 0,
            0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //1
            new FootArmy(115, GameState.realms[1], 15000, 15, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //2
            new FootArmy(116, GameState.realms[1], 1000, 36, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //3
            new FootArmy(117, GameState.realms[1], 1500, 10, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //4
            new FootArmy(118, GameState.realms[1], 10000, 10, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //5
            new FootArmy(119, GameState.realms[1], 1200, 12, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //6
            new RiderArmy(211, GameState.realms[1], 5000, 5, [0, 0], //7
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS),
            new RiderArmy(214, GameState.realms[1], 10000, 5, [0, 0], //8
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS),
            new RiderArmy(215, GameState.realms[1], 1500, 10, [0, 0], //9
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS),
            new RiderArmy(219, GameState.realms[1], 1200, 12, [0, 0], //10
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS),
            new Fleet(311, GameState.realms[1], 20, 5, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //11
            new Fleet(312, GameState.realms[1], 10, 5, 5, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //12
            new Fleet(313, GameState.realms[1], 10, 5, 0, 5,
                [0, 0], Fleet.MAX_MOVE_POINTS), //13
            new Fleet(314, GameState.realms[1], 10, 5, 3, 2,
                [0, 0], Fleet.MAX_MOVE_POINTS), //14
            new Fleet(315, GameState.realms[1], 12, 2, 3, 1,
                [0, 0], Fleet.MAX_MOVE_POINTS), //15
            new Fleet(316, GameState.realms[1], 100, 10, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //16
            new Fleet(317, GameState.realms[1], 1000, 10, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //17
            new FootArmy(199, GameState.realms[1], 1000, 10, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS) //18
        ];
        attackerArmies = [
            new FootArmy(121, GameState.realms[0], 1000, 1, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //0
            new FootArmy(123, GameState.realms[0], 10000, 5, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //1
            new FootArmy(124, GameState.realms[0], 5000, 5, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //2
            new FootArmy(126, GameState.realms[0], 1200, 4, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //3
            new FootArmy(127, GameState.realms[0], 1000, 10, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, true), //4
            new FootArmy(128, GameState.realms[0], 1000, 100, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, true), //5
            new FootArmy(129, GameState.realms[0], 1000, 10, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //6
            new RiderArmy(224, GameState.realms[0], 15000, 15, [0, 0],
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS), //7
            new RiderArmy(227, GameState.realms[0], 1000, 10, [0, 0],
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS, true), //8
            new RiderArmy(228, GameState.realms[0], 1000, 10, [0, 0],
                RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS), //9
            new Fleet(321, GameState.realms[0], 10, 5, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //10
            new Fleet(322, GameState.realms[0], 10, 5, 5, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //11
            new Fleet(323, GameState.realms[0], 10, 5, 0, 5,
                [0, 0], Fleet.MAX_MOVE_POINTS), //12
            new Fleet(324, GameState.realms[0], 20, 5, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS), //13
            new Fleet(325, GameState.realms[0], 10, 5, 3, 2,
                [0, 0], Fleet.MAX_MOVE_POINTS), //14
            new Fleet(326, GameState.realms[0], 35, 40, 7, 6,
                [0, 0], Fleet.MAX_MOVE_POINTS), //15
            new Fleet(327, GameState.realms[0], 40, 35, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS, true), //16
            new Fleet(328, GameState.realms[0], 100, 100, 0, 0,
                [0, 0], Fleet.MAX_MOVE_POINTS, true), //17
            new FootArmy(199, GameState.realms[0], 1000, 10, 0,
                0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS) //18
        ];
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
			GameState.rivers = [ new River([8,8],[8,7]), new River([8,8],[9,7]) ];
			GameState.buildings = [
			    new ProductionBuilding(BuildingType.CASTLE, "", [3, 3], GameState.realms[1], CASTLE_BP),
                new ProductionBuilding(BuildingType.CITY, "", [4, 4], GameState.realms[1], CITY_BP),
                new ProductionBuilding(BuildingType.FORTRESS, "", [5, 5], GameState.realms[1], FORTRESS_BP),
                new ProductionBuilding(BuildingType.CAPITAL, "", [6, 6], GameState.realms[1], CAPITAL_BP),
                new ProductionBuilding(BuildingType.CAPITAL_FORT, "", [7, 7], GameState.realms[1], CAPITAL_FORTRESS_BP),
                new Wall(BuildingType.WALL, [8, 8], GameState.realms[1], WALL_BP, Direction.W, WALL_MAX_GUARD),
                new NonDestructibleBuilding(BuildingType.BRIDGE, [8, 8], [8, 7], GameState.realms[1]),
                new NonDestructibleBuilding(BuildingType.STREET, [9, 8], [10, 8], GameState.realms[1])
            ];
			GameState.fields = [new Field([-1, 0], FieldType.LOWLANDS),
                new Field([0, 0], FieldType.LOWLANDS), new Field([0, 1], FieldType.LOWLANDS),
                new Field([1, 1], FieldType.WOODS), new Field([1, 2], FieldType.SHALLOWS),
                new Field([2, 2], FieldType.SHALLOWS), new Field([2, 3], FieldType.LOWLANDS),
                new Field([3, 3], FieldType.LOWLANDS), new Field([3, 4], FieldType.LOWLANDS),
                new Field([4, 4], FieldType.LOWLANDS), new Field([4, 5], FieldType.LOWLANDS),
                new Field([5, 5], FieldType.LOWLANDS), new Field([5, 6], FieldType.LOWLANDS),
                new Field([6, 6], FieldType.LOWLANDS), new Field([6, 7], FieldType.LOWLANDS),
                new Field([7, 7], FieldType.LOWLANDS), new Field([8, 7], FieldType.HIGHLANDS),
                new Field([9, 7], FieldType.HIGHLANDS), new Field([7, 8], FieldType.HIGHLANDS),
                new Field([8, 8], FieldType.HIGHLANDS), new Field([9, 8], FieldType.HIGHLANDS),
                new Field([8, 9], FieldType.HILLS), new Field([9, 9], FieldType.WOODS),
                new Field([10, 9], FieldType.WOODS), new Field([9, 10], FieldType.LOWLANDS),
                new Field([10, 10], FieldType.SWAMP), new Field([10, 11], FieldType.LOWLANDS),
                new Field([11, 11], FieldType.DESERT)];
		},
		beforeEach: function() {
		    GameState.realms[1].territory = GameState.fields.filter(field =>
                (field.coordinates[0] === 0 && field.coordinates[1] === 0) ||
                (field.coordinates[0] === 1 && field.coordinates[1] === 1) ||
                (field.coordinates[0] === 3 && field.coordinates[1] === 3) ||
                (field.coordinates[0] === 4 && field.coordinates[1] === 4) ||
                (field.coordinates[0] === 5 && field.coordinates[1] === 5) ||
                (field.coordinates[0] === 6 && field.coordinates[1] === 6) ||
                (field.coordinates[0] === 7 && field.coordinates[1] === 7) ||
                (field.coordinates[0] === 8 && field.coordinates[1] === 8) ||
                (field.coordinates[0] === 9 && field.coordinates[1] === 8) ||
                (field.coordinates[0] === 9 && field.coordinates[1] === 9) ||
                (field.coordinates[0] === 10 && field.coordinates[1] === 10) ||
                (field.coordinates[0] === 11 && field.coordinates[1] === 11));
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
			GameState.buildings = [];
			GameState.fields = [];
			GameState.realms = [];
		}}, function() {
		module( "Land Battles", landBattleTests);
		module( "Naval Battles", navalBattleTests);
		module( "Guard Battles", guardBattleTests);
		module( "Directional Terrain Bonuses", directionalTerrainBattleTests);
		module( "Complex Battles", );
	});
	module( "Overrun", {
		before: function() {
			defenderArmies = [
                new FootArmy(111, GameState.realms[1], 1500, 10, 0,
                    0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //0
                new FootArmy(112, GameState.realms[1], 1000, 10, 0,
                    0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //1
                new FootArmy(113, GameState.realms[1], 1000, 10, 0,
                    0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, true), //2
                new RiderArmy(221, GameState.realms[1], 1000, 15, [0, 0],
                    RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS), //3
                new Fleet(311, GameState.realms[1], 20, 5, 0, 0,
                    [0, 0], Fleet.MAX_MOVE_POINTS), //4
                new Fleet(314, GameState.realms[1], 10, 5, 3, 2,
                    [0, 0], Fleet.MAX_MOVE_POINTS), //5
                new Fleet(315, GameState.realms[1], 10, 5, 0, 0,
                    [0, 0], Fleet.MAX_MOVE_POINTS, true) //6
            ];
			attackerArmies = [
                new FootArmy(123, GameState.realms[0], 15000, 1, 0,
                    0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS), //0
                new FootArmy(124, GameState.realms[0], 10000, 1, 0,
                    0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, true), //1
                new RiderArmy(224, GameState.realms[0], 10000, 1, [0, 0],
                    RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS), //2
                new Fleet(321, GameState.realms[0], 200, 5, 0, 0,
                    [0, 0], Fleet.MAX_MOVE_POINTS), //3
                new Fleet(322, GameState.realms[0], 100, 5, 0, 0,
                    [0, 0], Fleet.MAX_MOVE_POINTS), //4
                new Fleet(325, GameState.realms[0], 99, 5, 3, 2,
                    [0, 0], Fleet.MAX_MOVE_POINTS), //5
                new Fleet(326, GameState.realms[0], 200, 5, 0, 0,
                    [0, 0], Fleet.MAX_MOVE_POINTS, true) //6
            ];
			GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
                new Field([1, 1], FieldType.SHALLOWS)];
		},
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
		}}, function() {
		module( "Land Battles", landOverrunTests);
		module( "Naval Battles", navalOverrunTests);
	});
});