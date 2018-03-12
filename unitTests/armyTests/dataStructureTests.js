"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const realm_1 = require("../../realm");
const footArmy_1 = require("../../armies/footArmy");
const riderArmy_1 = require("../../armies/riderArmy");
const fleet_1 = require("../../armies/fleet");
function dataStructureTests() {
    module("Maximum MP and HP", function () {
        test("Foot army respects MP maximum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new footArmy_1.FootArmy(1, realm, 1000, 1, 0, 0, 0, [0, 0], 0, 0);
            army.setMovePoints(100);
            t.strictEqual(army.getMovePoints(), 9, "Success!");
        });
        test("Foot army respects MP minimum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new footArmy_1.FootArmy(1, realm, 1000, 1, 0, 0, 0, [0, 0], 0, 0);
            army.setMovePoints(-100);
            t.strictEqual(army.getMovePoints(), 0, "Success!");
        });
        test("Foot army respects HP maximum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new footArmy_1.FootArmy(1, realm, 1000, 1, 0, 0, 0, [0, 0], 0, 0);
            army.setHeightPoints(10);
            t.strictEqual(army.getHeightPoints(), 2, "Success!");
        });
        test("Foot army respects HP minimum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new footArmy_1.FootArmy(1, realm, 1000, 1, 0, 0, 0, [0, 0], 0, 0);
            army.setHeightPoints(-10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
        test("Rider army respects MP maximum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new riderArmy_1.RiderArmy(1, realm, 1000, 1, [0, 0], 0, 0);
            army.setMovePoints(100);
            t.strictEqual(army.getMovePoints(), 21, "Success!");
        });
        test("Rider army respects MP minimum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new riderArmy_1.RiderArmy(1, realm, 1000, 1, [0, 0], 0, 0);
            army.setMovePoints(-100);
            t.strictEqual(army.getMovePoints(), 0, "Success!");
        });
        test("Rider army respects HP maximum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new riderArmy_1.RiderArmy(1, realm, 1000, 1, [0, 0], 0, 0);
            army.setHeightPoints(10);
            t.strictEqual(army.getHeightPoints(), 2, "Success!");
        });
        test("Rider army respects HP minimum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new riderArmy_1.RiderArmy(1, realm, 1000, 1, [0, 0], 0, 0);
            army.setHeightPoints(-10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
        test("Fleet army respects MP maximum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new fleet_1.Fleet(1, realm, 1000, 1, 0, 0, [0, 0], 0);
            army.setMovePoints(100);
            t.strictEqual(army.getMovePoints(), 42, "Success!");
        });
        test("Fleet army respects MP minimum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new fleet_1.Fleet(1, realm, 1000, 1, 0, 0, [0, 0], 0);
            army.setMovePoints(-100);
            t.strictEqual(army.getMovePoints(), 0, "Success!");
        });
        test("Fleet army respects HP maximum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new fleet_1.Fleet(1, realm, 1000, 1, 0, 0, [0, 0], 0);
            army.setHeightPoints(10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
        test("Fleet army respects HP minimum", function (t) {
            let realm = new realm_1.Realm("Realm 1", "r01", "000,000,000", 0 /* SHALLOWS */, true);
            let army = new fleet_1.Fleet(1, realm, 1000, 1, 0, 0, [0, 0], 0);
            army.setHeightPoints(-10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
    });
}
exports.dataStructureTests = dataStructureTests;
