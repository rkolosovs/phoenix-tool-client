"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const footArmy_1 = require("../../armies/footArmy");
const riderArmy_1 = require("../../armies/riderArmy");
const fleet_1 = require("../../armies/fleet");
const gameState_1 = require("../../gameState");
function decimationTests() {
    module("Regular", function () {
        test("Foot army decimation", function (t) {
            let army = new footArmy_1.FootArmy(101, 10000, 100, 0, 0, 0, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new footArmy_1.FootArmy(101, 9000, 90, 0, 0, 0, false, 0, 0, 1));
        });
        test("Foot army with catapults decimation", function (t) {
            let army = new footArmy_1.FootArmy(101, 10000, 100, 10, 10, 0, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new footArmy_1.FootArmy(101, 9000, 90, 9, 9, 0, false, 0, 0, 1));
        });
        test("Foot army with mounts decimation", function (t) {
            let army = new footArmy_1.FootArmy(101, 10000, 100, 0, 0, 10000, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new footArmy_1.FootArmy(101, 9000, 90, 0, 0, 9000, false, 0, 0, 1));
        });
        test("Rider army decimation", function (t) {
            let army = new riderArmy_1.RiderArmy(201, 10000, 100, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new riderArmy_1.RiderArmy(201, 9000, 90, false, 0, 0, 1));
        });
        test("Fleet decimation", function (t) {
            let army = new fleet_1.Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            army.decimate(10);
            t.armyEquals(army, new fleet_1.Fleet(301, 90, 9, 0, 0, false, 0, 0, 1));
        });
        test("Fleet with warships decimation", function (t) {
            let army = new fleet_1.Fleet(301, 100, 10, 10, 10, false, 0, 0, 1);
            army.decimate(10);
            t.armyEquals(army, new fleet_1.Fleet(301, 90, 9, 9, 9, false, 0, 0, 1));
        });
    });
    module("Transported Troops", function () {
        test("Fleet transporting at full capacity halved", function (t) {
            let fleet = new fleet_1.Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new footArmy_1.FootArmy(101, 9000, 10, 0, 0, 0, false, 0, 0, 1);
            gameState_1.GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new footArmy_1.FootArmy(101, 4500, 5, 0, 0, 0, false, 0, 0, 1));
        });
        test("Fleet transporting at 75% capacity halved", function (t) {
            let fleet = new fleet_1.Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new footArmy_1.FootArmy(101, 7000, 5, 0, 0, 0, false, 0, 0, 1);
            gameState_1.GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new footArmy_1.FootArmy(101, 4666, 3, 0, 0, 0, false, 0, 0, 1));
        });
        test("Fleet transporting riders at full capacity halved", function (t) {
            let fleet = new fleet_1.Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new riderArmy_1.RiderArmy(201, 4500, 10, false, 0, 0, 1);
            gameState_1.GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new riderArmy_1.RiderArmy(201, 2250, 5, false, 0, 0, 1));
        });
        test("Fleet transporting army with catapults at full capacity halved", function (t) {
            let fleet = new fleet_1.Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new footArmy_1.FootArmy(101, 1000, 10, 4, 2, 0, false, 0, 0, 1);
            gameState_1.GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new footArmy_1.FootArmy(101, 500, 5, 2, 1, 0, false, 0, 0, 1));
        });
        test("Fleet transporting army with mounts at full capacity halved", function (t) {
            let fleet = new fleet_1.Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new footArmy_1.FootArmy(101, 4500, 10, 0, 0, 4500, false, 0, 0, 1);
            gameState_1.GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new footArmy_1.FootArmy(101, 2250, 5, 0, 0, 2250, false, 0, 0, 1));
        });
    });
}
exports.decimationTests = decimationTests;
