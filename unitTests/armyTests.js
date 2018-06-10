"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const footArmy_1 = require("../armies/footArmy");
const dataStructureTests_1 = require("./armyTests/dataStructureTests");
const decimationTests_1 = require("./armyTests/decimationTests");
const takingFireTests_1 = require("./armyTests/takingFireTests");
const gameState_1 = require("../gameState");
const realm_1 = require("../realm");
const { module } = qunit_1.QUnit;
qunit_1.QUnit.assert.armyEquals = function (actual, expected) {
    if (actual.constructor !== expected.constructor) {
        this.pushResult({ result: false, actual: actual, expected: expected,
            message: "Wrong result: Type mismatch." });
        return false;
    }
    else if (actual.getPosition()[0] !== expected.getPosition()[0] ||
        actual.getPosition()[1] !== expected.getPosition()[1] ||
        actual.getOldPosition()[0] !== expected.getOldPosition()[0] ||
        actual.getOldPosition()[1] !== expected.getOldPosition()[1] ||
        actual.getTroopCount() !== expected.getTroopCount() ||
        actual.getOfficerCount() !== expected.getOfficerCount() ||
        actual.getLightCatapultCount() !== expected.getLightCatapultCount() ||
        actual.getHeavyCatapultCount() !== expected.getHeavyCatapultCount() ||
        actual.getLightCatapultsShot() !== expected.getLightCatapultsShot() ||
        actual.getHeavyCatapultsShot() !== expected.getHeavyCatapultsShot() ||
        actual.getMovePoints() !== expected.getMovePoints() ||
        actual.getHeightPoints() !== expected.getHeightPoints() ||
        actual.getMaxMovePoints() !== expected.getMaxMovePoints() ||
        actual.getMaxHeightPoints() !== expected.getMaxHeightPoints() ||
        (actual instanceof footArmy_1.FootArmy &&
            actual.getMountCount() !== expected.getMountCount())) {
        this.pushResult({ result: false, actual: actual, expected: expected,
            message: "Wrong result: Value mismatch." });
        return false;
    }
    else {
        this.pushResult({ result: true, actual: actual, expected: expected, message: "Success!" });
        return true;
    }
};
module("Army", {
    before: function () {
        gameState_1.GameState.reset();
        gameState_1.GameState.realms.push(new realm_1.Realm("Pink Realm", "r01", "213,038,181", 9, true));
        gameState_1.GameState.realms.push(new realm_1.Realm("Realm 2", "r02", "000,000,000", 9, true));
        gameState_1.GameState.realms.push(new realm_1.Realm("Realm 3", "r03", "000,000,000", 9, true));
    },
    beforeEach: function () {
        gameState_1.GameState.fields = [];
        gameState_1.GameState.buildings = [];
        gameState_1.GameState.armies = [];
        gameState_1.GameState.realms.forEach(realm => realm.territory = []);
    },
    after: function () {
        gameState_1.GameState.reset();
    }
}, function () {
    module("Data Structure", dataStructureTests_1.dataStructureTests);
    module("Decimation", decimationTests_1.decimationTests);
    module("Taking Fire", takingFireTests_1.takingFireTests);
});
//# sourceMappingURL=armyTests.js.map