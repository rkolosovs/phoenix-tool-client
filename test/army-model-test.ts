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

import {test, module} from "../node_modules/qunit";
import {FieldType } from "../src/model/map/field";
import {Realm} from "../src/model/realm";
import {FootArmy} from "../src/model/armies/footArmy";
import {RiderArmy} from "../src/model/armies/riderArmy";
import {Fleet} from "../src/model/armies/fleet";

module("Army model", function () {
    const usa = new Realm(
        "Unabhängige Stämme Assimilans",
        "usa", "000,000,000",
        FieldType.DESERT,
        true);
    module("FootArmy model", function () {
        test("footArmyConstructor", function (t: any) {
            const footArmy = new FootArmy(111, usa, 1000, 1, 0, 0, 0, [0, 0], 0, 0, false);
            t.strictEqual(footArmy.canHaveCatapults(), true, "non guard armies can have catapults.");
        });
        test("footArmyGuard", function (t: any) {
            const footGuard = new FootArmy(112, usa, 1000, 1, 0, 0, 0, [0, 0], 0, 0, true);
            t.strictEqual(footGuard.canHaveCatapults(), false, "guard armies can not have catapults.");
        });
        test("footArmyMovementPoints", function (t: any) {
            const footArmy = new FootArmy(113, usa, 1000, 1, 0, 0, 0, [0, 0], 0, 0, false);
            t.strictEqual(footArmy.getMaxMovePoints(), 9, "A foot army has a maximum of 9 movement points.");
            t.strictEqual(footArmy.getMaxHeightPoints(), 2, "A foot army has a maximum of 2 height points.");
        });
    });

    module("RiderArmy model", function () {
        test("riderArmyConstructor", function (t: any) {
            const riderArmy = new RiderArmy(211, usa, 1000, 1, [0, 0], 0, 0, false);
            t.strictEqual(riderArmy.canHaveCatapults(), false, "non guard riders can not have catapults.");
        });
        test("riderArmyGuard", function (t: any) {
            const riderGuard = new RiderArmy(212, usa, 1000, 1, [0, 0], 0, 0, true);
            t.strictEqual(riderGuard.canHaveCatapults(), false, "guard riders can not have catapults.");
        });
        test("riderArmyMovementPoints", function (t: any) {
            const riderArmy = new RiderArmy(213, usa, 1000, 1, [0, 0], 0, 0, false);
            t.strictEqual(riderArmy.getMaxMovePoints(), 21, "A rider army has a maximum of 21 movement points.");
            t.strictEqual(riderArmy.getMaxHeightPoints(), 2, "A rider army has a maximum of 2 height points.");
        });
    });

    module("Fleet model", function () {
        test("fleetConstructor", function (t: any) {
            const fleet = new Fleet(311, usa, 1000, 1, 0, 0 , [0, 0], 0, 0, false);
            t.strictEqual(fleet.canHaveCatapults(), true, "non guard fleets can have catapults.");
        });
        test("fleetGuard", function (t: any) {
            const fleet = new Fleet(312, usa, 1000, 1, 0, 0 , [0, 0], 0, 0, true);
            t.strictEqual(fleet.canHaveCatapults(), false, "guard fleets can not have catapults.");
        });
        test("fleetMovementPoints", function (t: any) {
            const fleet = new Fleet(313, usa, 1000, 1, 0, 0 , [0, 0], 0, 0, false);
            t.strictEqual(fleet.getMaxMovePoints(), 42, "A fleet has a maximum of 42 movement points.");
        });
    });
});