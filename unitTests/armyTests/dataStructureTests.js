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
define(["require", "exports", "../../realm", "../../armies/footArmy", "../../armies/riderArmy", "../../armies/fleet"], function (require, exports, realm_1, footArmy_1, riderArmy_1, fleet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = QUnit.test;
    const module = QUnit.module;
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
});
//# sourceMappingURL=dataStructureTests.js.map