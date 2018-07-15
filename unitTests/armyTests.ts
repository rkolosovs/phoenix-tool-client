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

import {Army} from "../armies/army";
import {FootArmy} from "../armies/footArmy";
import {dataStructureTests} from "./armyTests/dataStructureTests";
import {decimationTests} from "./armyTests/decimationTests";
import {takingFireTests} from "./armyTests/takingFireTests";
import {GameState} from "../gameState";
import {Realm} from "../realm";

const { module } = QUnit;

QUnit.assert.armyEquals = function(actual: Army, expected: Army): boolean {
	if(actual.constructor !== expected.constructor){this.pushResult({result: false, actual: actual, expected: expected,
        message: "Wrong result: Type mismatch."});
        return false;
	} else if (actual.getPosition()[0] !== expected.getPosition()[0] ||
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
        (actual instanceof FootArmy &&
            (actual as FootArmy).getMountCount() !== (expected as FootArmy).getMountCount())) {
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Wrong result: Value mismatch."});
        return false;
    } else {
        this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
        return true;
    }
};

module( "Army" , {
    before: function () {
        GameState.reset();
        GameState.realms.push(new Realm("Pink Realm", "r01", "213,038,181", 9, true));
        GameState.realms.push(new Realm("Realm 2", "r02", "000,000,000", 9, true));
        GameState.realms.push(new Realm("Realm 3", "r03", "000,000,000", 9, true));
    },
    beforeEach: function () {
        GameState.fields = [];
        GameState.buildings = [];
        GameState.armies = [];
        GameState.realms.forEach(realm => realm.territory = []);
    },
    after: function () {
        GameState.reset();
    }}, function() {
	module( "Data Structure" , dataStructureTests);
	module( "Decimation" , decimationTests);
	module( "Taking Fire" , takingFireTests);
});