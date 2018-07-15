/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
define(["require", "exports", "../gameState", "../realm", "./battleTests/navalOverrunTests", "./battleTests/landOverrunTests", "./battleTests/directionalTerrainTests", "./battleTests/guardBattleTests", "./battleTests/navalBattleTests", "./battleTests/landBattleTests", "./battleTests/complexBattleTests", "../map/river", "../buildings/productionBuilding", "../constants", "../buildings/wall", "../buildings/nonDestructibleBuilding", "../map/field", "../armies/footArmy", "../armies/riderArmy", "../armies/fleet"], function (require, exports, gameState_1, realm_1, navalOverrunTests_1, landOverrunTests_1, directionalTerrainTests_1, guardBattleTests_1, navalBattleTests_1, landBattleTests_1, complexBattleTests_1, river_1, productionBuilding_1, constants_1, wall_1, nonDestructibleBuilding_1, field_1, footArmy_1, riderArmy_1, fleet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CASTLE_BP = constants_1.Constants.CASTLE_BP;
    var CITY_BP = constants_1.Constants.CITY_BP;
    var FORTRESS_BP = constants_1.Constants.FORTRESS_BP;
    var CAPITAL_BP = constants_1.Constants.CAPITAL_BP;
    var CAPITAL_FORTRESS_BP = constants_1.Constants.CAPITAL_FORTRESS_BP;
    var WALL_BP = constants_1.Constants.WALL_BP;
    var WALL_MAX_GUARD = constants_1.Constants.WALL_MAX_GUARD;
    const module = QUnit.module;
    QUnit.assert.resultEquals = function (actual, expected) {
        if (actual.result !== expected.result) {
            this.pushResult({ result: false, actual: actual, expected: expected,
                message: "Wrong result: result should be " + expected.result + " was " + actual.result });
            return false;
        }
        else if (actual.attackerLosses.some((loss, index) => loss !== expected.attackerLosses[index])) {
            this.pushResult({ result: false, actual: actual, expected: expected,
                message: "Wrong result: attackerLosses should be " + expected.attackerLosses + " was " + actual.attackerLosses });
            return false;
        }
        else if (actual.defenderLosses.some((loss, index) => loss !== expected.defenderLosses[index])) {
            this.pushResult({ result: false, actual: actual, expected: expected,
                message: "Wrong result: defenderLosses should be " + expected.defenderLosses + " was " + actual.defenderLosses });
            return false;
        }
        else {
            this.pushResult({ result: true, actual: actual, expected: expected, message: "Success!" });
            return true;
        }
    };
    exports.defenderArmies = [];
    exports.attackerArmies = [];
    module("Battle", {
        before: function () {
            gameState_1.GameState.reset();
            gameState_1.GameState.realms.push(new realm_1.Realm("Pink Realm", "r01", "213,038,181", 9, true));
            gameState_1.GameState.realms.push(new realm_1.Realm("Realm 2", "r02", "000,000,000", 9, true));
            gameState_1.GameState.realms.push(new realm_1.Realm("Realm 3", "r03", "000,000,000", 9, true));
            //arrays to hold prepared armies for test
            exports.defenderArmies = [
                new footArmy_1.FootArmy(111, gameState_1.GameState.realms[1], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(112, gameState_1.GameState.realms[1], 1000, 5, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(115, gameState_1.GameState.realms[1], 15000, 15, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(116, gameState_1.GameState.realms[1], 1000, 36, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(117, gameState_1.GameState.realms[1], 1500, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(118, gameState_1.GameState.realms[1], 10000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(119, gameState_1.GameState.realms[1], 1200, 12, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new riderArmy_1.RiderArmy(211, gameState_1.GameState.realms[1], 5000, 5, [0, 0], //7
                riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                new riderArmy_1.RiderArmy(214, gameState_1.GameState.realms[1], 10000, 5, [0, 0], //8
                riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                new riderArmy_1.RiderArmy(215, gameState_1.GameState.realms[1], 1500, 10, [0, 0], //9
                riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                new riderArmy_1.RiderArmy(219, gameState_1.GameState.realms[1], 1200, 12, [0, 0], //10
                riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                new fleet_1.Fleet(311, gameState_1.GameState.realms[1], 20, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(312, gameState_1.GameState.realms[1], 10, 5, 5, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(313, gameState_1.GameState.realms[1], 10, 5, 0, 5, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(314, gameState_1.GameState.realms[1], 10, 5, 3, 2, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(315, gameState_1.GameState.realms[1], 12, 2, 3, 1, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(316, gameState_1.GameState.realms[1], 100, 10, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(317, gameState_1.GameState.realms[1], 1000, 10, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new footArmy_1.FootArmy(199, gameState_1.GameState.realms[1], 1000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS) //18
            ];
            exports.attackerArmies = [
                new footArmy_1.FootArmy(121, gameState_1.GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(123, gameState_1.GameState.realms[0], 10000, 5, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(124, gameState_1.GameState.realms[0], 5000, 5, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(126, gameState_1.GameState.realms[0], 1200, 4, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new footArmy_1.FootArmy(127, gameState_1.GameState.realms[0], 1000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS, true),
                new footArmy_1.FootArmy(128, gameState_1.GameState.realms[0], 1000, 100, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS, true),
                new footArmy_1.FootArmy(129, gameState_1.GameState.realms[0], 1000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                new riderArmy_1.RiderArmy(224, gameState_1.GameState.realms[0], 15000, 15, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                new riderArmy_1.RiderArmy(227, gameState_1.GameState.realms[0], 1000, 10, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS, true),
                new riderArmy_1.RiderArmy(228, gameState_1.GameState.realms[0], 1000, 10, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                new fleet_1.Fleet(321, gameState_1.GameState.realms[0], 10, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 10, 5, 5, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(323, gameState_1.GameState.realms[0], 10, 5, 0, 5, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(324, gameState_1.GameState.realms[0], 20, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(325, gameState_1.GameState.realms[0], 10, 5, 3, 2, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(326, gameState_1.GameState.realms[0], 35, 40, 7, 6, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                new fleet_1.Fleet(327, gameState_1.GameState.realms[0], 40, 35, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, true),
                new fleet_1.Fleet(328, gameState_1.GameState.realms[0], 100, 100, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, true),
                new footArmy_1.FootArmy(199, gameState_1.GameState.realms[0], 1000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS) //18
            ];
        },
        beforeEach: function () {
            gameState_1.GameState.fields = [];
            gameState_1.GameState.buildings = [];
            gameState_1.GameState.rivers = [];
            gameState_1.GameState.realms.forEach(realm => realm.territory = []);
        },
        after: function () {
            gameState_1.GameState.reset();
        }
    }, function () {
        module("Results", {
            before: function () {
                gameState_1.GameState.rivers = [new river_1.River([8, 8], [8, 7]), new river_1.River([8, 8], [9, 7])];
                gameState_1.GameState.buildings = [
                    new productionBuilding_1.ProductionBuilding(0 /* CASTLE */, "", [3, 3], gameState_1.GameState.realms[1], CASTLE_BP),
                    new productionBuilding_1.ProductionBuilding(1 /* CITY */, "", [4, 4], gameState_1.GameState.realms[1], CITY_BP),
                    new productionBuilding_1.ProductionBuilding(2 /* FORTRESS */, "", [5, 5], gameState_1.GameState.realms[1], FORTRESS_BP),
                    new productionBuilding_1.ProductionBuilding(3 /* CAPITAL */, "", [6, 6], gameState_1.GameState.realms[1], CAPITAL_BP),
                    new productionBuilding_1.ProductionBuilding(4 /* CAPITAL_FORT */, "", [7, 7], gameState_1.GameState.realms[1], CAPITAL_FORTRESS_BP),
                    new wall_1.Wall(5 /* WALL */, [8, 8], gameState_1.GameState.realms[1], WALL_BP, 5 /* W */, WALL_MAX_GUARD),
                    new nonDestructibleBuilding_1.NonDestructibleBuilding(7 /* BRIDGE */, [8, 8], [8, 7], gameState_1.GameState.realms[1]),
                    new nonDestructibleBuilding_1.NonDestructibleBuilding(8 /* STREET */, [9, 8], [10, 8], gameState_1.GameState.realms[1])
                ];
                gameState_1.GameState.fields = [new field_1.Field([-1, 0], 2 /* LOWLANDS */),
                    new field_1.Field([0, 0], 2 /* LOWLANDS */), new field_1.Field([0, 1], 2 /* LOWLANDS */),
                    new field_1.Field([1, 1], 3 /* WOODS */), new field_1.Field([1, 2], 0 /* SHALLOWS */),
                    new field_1.Field([2, 2], 0 /* SHALLOWS */), new field_1.Field([2, 3], 2 /* LOWLANDS */),
                    new field_1.Field([3, 3], 2 /* LOWLANDS */), new field_1.Field([3, 4], 2 /* LOWLANDS */),
                    new field_1.Field([4, 4], 2 /* LOWLANDS */), new field_1.Field([4, 5], 2 /* LOWLANDS */),
                    new field_1.Field([5, 5], 2 /* LOWLANDS */), new field_1.Field([5, 6], 2 /* LOWLANDS */),
                    new field_1.Field([6, 6], 2 /* LOWLANDS */), new field_1.Field([6, 7], 2 /* LOWLANDS */),
                    new field_1.Field([7, 7], 2 /* LOWLANDS */), new field_1.Field([8, 7], 5 /* HIGHLANDS */),
                    new field_1.Field([9, 7], 5 /* HIGHLANDS */), new field_1.Field([7, 8], 5 /* HIGHLANDS */),
                    new field_1.Field([8, 8], 5 /* HIGHLANDS */), new field_1.Field([9, 8], 5 /* HIGHLANDS */),
                    new field_1.Field([8, 9], 4 /* HILLS */), new field_1.Field([9, 9], 3 /* WOODS */),
                    new field_1.Field([10, 9], 3 /* WOODS */), new field_1.Field([9, 10], 2 /* LOWLANDS */),
                    new field_1.Field([10, 10], 8 /* SWAMP */), new field_1.Field([10, 11], 2 /* LOWLANDS */),
                    new field_1.Field([11, 11], 7 /* DESERT */)];
            },
            beforeEach: function () {
                gameState_1.GameState.realms[1].territory = gameState_1.GameState.fields.filter(field => (field.coordinates[0] === 0 && field.coordinates[1] === 0) ||
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
            after: function () {
                exports.defenderArmies = [];
                exports.attackerArmies = [];
                gameState_1.GameState.buildings = [];
                gameState_1.GameState.fields = [];
                gameState_1.GameState.realms = [];
            }
        }, function () {
            module("Land Battles", landBattleTests_1.landBattleTests);
            module("Naval Battles", navalBattleTests_1.navalBattleTests);
            module("Guard Battles", guardBattleTests_1.guardBattleTests);
            module("Directional Terrain Bonuses", directionalTerrainTests_1.directionalTerrainBattleTests);
            module("Complex Battles", complexBattleTests_1.complexBattleTest);
        });
        module("Overrun", {
            before: function () {
                exports.defenderArmies = [
                    new footArmy_1.FootArmy(111, gameState_1.GameState.realms[1], 1500, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                    new footArmy_1.FootArmy(112, gameState_1.GameState.realms[1], 1000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                    new footArmy_1.FootArmy(113, gameState_1.GameState.realms[1], 1000, 10, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS, true),
                    new riderArmy_1.RiderArmy(221, gameState_1.GameState.realms[1], 1000, 15, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                    new fleet_1.Fleet(311, gameState_1.GameState.realms[1], 20, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                    new fleet_1.Fleet(314, gameState_1.GameState.realms[1], 10, 5, 3, 2, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                    new fleet_1.Fleet(315, gameState_1.GameState.realms[1], 10, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, true) //6
                ];
                exports.attackerArmies = [
                    new footArmy_1.FootArmy(123, gameState_1.GameState.realms[0], 15000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS),
                    new footArmy_1.FootArmy(124, gameState_1.GameState.realms[0], 10000, 1, 0, 0, 0, [0, 0], footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS, true),
                    new riderArmy_1.RiderArmy(224, gameState_1.GameState.realms[0], 10000, 1, [0, 0], riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS),
                    new fleet_1.Fleet(321, gameState_1.GameState.realms[0], 200, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                    new fleet_1.Fleet(322, gameState_1.GameState.realms[0], 100, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                    new fleet_1.Fleet(325, gameState_1.GameState.realms[0], 99, 5, 3, 2, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS),
                    new fleet_1.Fleet(326, gameState_1.GameState.realms[0], 200, 5, 0, 0, [0, 0], fleet_1.Fleet.MAX_MOVE_POINTS, true) //6
                ];
                gameState_1.GameState.fields = [new field_1.Field([0, 0], 2 /* LOWLANDS */),
                    new field_1.Field([1, 1], 0 /* SHALLOWS */)];
            },
            after: function () {
                exports.defenderArmies = [];
                exports.attackerArmies = [];
            }
        }, function () {
            module("Land Battles", landOverrunTests_1.landOverrunTests);
            module("Naval Battles", navalOverrunTests_1.navalOverrunTests);
        });
    });
});
//# sourceMappingURL=battleTests.js.map