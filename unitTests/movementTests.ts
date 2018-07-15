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

import {QUnit} from "./qunit";
import {Move} from "../armies/move";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {footMovementTests} from "./movementTests/footMovementTests";
import {lightCatapultMovementTests} from "./movementTests/lightCatapultMovement";
import {heavyCatapultMovementTests} from "./movementTests/heavyCatapultMovement";
import {riderMovementTests} from "./movementTests/riderMovementTests";
import {fleetMovementTests} from "./movementTests/fleetMovementTests";
import {lightWarshipMovementTests} from "./movementTests/lightWarshipMovement";
import {heavyWarshipMovementTests} from "./movementTests/heavyWarshipMovement";
import {movementWithRiversTests} from "./movementTests/movementWithRivers";

const { module } = QUnit;

QUnit.assert.movePossible = function(actual: Move[], expected: Move): boolean {
    if(actual.some(possibleMove =>
			possibleMove.heightPoints === expected.heightPoints &&
            possibleMove.movePoints === expected.movePoints &&
            possibleMove.direction === expected.direction &&
            possibleMove.loading === expected.loading &&
            possibleMove.unloading === expected.unloading &&
            possibleMove.destination[0] === expected.destination[0] &&
            possibleMove.destination[1] === expected.destination[1])){
        this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
        return true;
    } else {
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Expected move was not possible."});
        return false;
    }
};

QUnit.assert.moveImpossible = function(actual: Move[], expected: Move): boolean {
    if(actual.some(possibleMove =>
            possibleMove.direction === expected.direction &&
            possibleMove.destination[0] === expected.destination[0] &&
            possibleMove.destination[1] === expected.destination[1])){
        this.pushResult({result: false, actual: actual, expected: expected,
            message: "Impossible move was marked as possible."});
        return false;
    } else {
        this.pushResult({result: true, actual: actual, expected: expected, message: "Success!"});
        return true;
    }
};


module( "Movement" , {
    before: function () {
        GameState.reset();
        GameState.realms.push(new Realm("Pink Realm", "r01", "213,038,181", 9, true));
        GameState.realms.push(new Realm("Realm 2", "r02", "000,000,000", 9, true));
        GameState.realms.push(new Realm("Realm 3", "r03", "000,000,000", 9, true));
    },
    beforeEach: function () {
        GameState.fields = [];
        GameState.buildings = [];
        GameState.realms.forEach(realm => realm.territory = []);
    },
    after: function () {
        GameState.reset();
    }}, function() {
	module( "Foot" , footMovementTests);
	module( "Light Catapults" , lightCatapultMovementTests);
	module( "Heavy Catapults" , heavyCatapultMovementTests);
	module( "Riders" , riderMovementTests);
	module( "Fleet" , fleetMovementTests);
	module( "Light Warships" , lightWarshipMovementTests);
	module( "Heavy Warships" , heavyWarshipMovementTests);
	module( "Rivers" , movementWithRiversTests);
});