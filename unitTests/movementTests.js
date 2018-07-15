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
define(["require", "exports", "./qunit", "../gameState", "../realm", "./movementTests/footMovementTests", "./movementTests/lightCatapultMovement", "./movementTests/heavyCatapultMovement", "./movementTests/riderMovementTests", "./movementTests/fleetMovementTests", "./movementTests/lightWarshipMovement", "./movementTests/heavyWarshipMovement", "./movementTests/movementWithRivers"], function (require, exports, qunit_1, gameState_1, realm_1, footMovementTests_1, lightCatapultMovement_1, heavyCatapultMovement_1, riderMovementTests_1, fleetMovementTests_1, lightWarshipMovement_1, heavyWarshipMovement_1, movementWithRivers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { module } = qunit_1.QUnit;
    qunit_1.QUnit.assert.movePossible = function (actual, expected) {
        if (actual.some(possibleMove => possibleMove.heightPoints === expected.heightPoints &&
            possibleMove.movePoints === expected.movePoints &&
            possibleMove.direction === expected.direction &&
            possibleMove.loading === expected.loading &&
            possibleMove.unloading === expected.unloading &&
            possibleMove.destination[0] === expected.destination[0] &&
            possibleMove.destination[1] === expected.destination[1])) {
            this.pushResult({ result: true, actual: actual, expected: expected, message: "Success!" });
            return true;
        }
        else {
            this.pushResult({ result: false, actual: actual, expected: expected,
                message: "Expected move was not possible." });
            return false;
        }
    };
    qunit_1.QUnit.assert.moveImpossible = function (actual, expected) {
        if (actual.some(possibleMove => possibleMove.direction === expected.direction &&
            possibleMove.destination[0] === expected.destination[0] &&
            possibleMove.destination[1] === expected.destination[1])) {
            this.pushResult({ result: false, actual: actual, expected: expected,
                message: "Impossible move was marked as possible." });
            return false;
        }
        else {
            this.pushResult({ result: true, actual: actual, expected: expected, message: "Success!" });
            return true;
        }
    };
    module("Movement", {
        before: function () {
            gameState_1.GameState.reset();
            gameState_1.GameState.realms.push(new realm_1.Realm("Pink Realm", "r01", "213,038,181", 9, true));
            gameState_1.GameState.realms.push(new realm_1.Realm("Realm 2", "r02", "000,000,000", 9, true));
            gameState_1.GameState.realms.push(new realm_1.Realm("Realm 3", "r03", "000,000,000", 9, true));
        },
        beforeEach: function () {
            gameState_1.GameState.fields = [];
            gameState_1.GameState.buildings = [];
            gameState_1.GameState.realms.forEach(realm => realm.territory = []);
        },
        after: function () {
            gameState_1.GameState.reset();
        }
    }, function () {
        module("Foot", footMovementTests_1.footMovementTests);
        module("Light Catapults", lightCatapultMovement_1.lightCatapultMovementTests);
        module("Heavy Catapults", heavyCatapultMovement_1.heavyCatapultMovementTests);
        module("Riders", riderMovementTests_1.riderMovementTests);
        module("Fleet", fleetMovementTests_1.fleetMovementTests);
        module("Light Warships", lightWarshipMovement_1.lightWarshipMovementTests);
        module("Heavy Warships", heavyWarshipMovement_1.heavyWarshipMovementTests);
        module("Rivers", movementWithRivers_1.movementWithRiversTests);
    });
});
//# sourceMappingURL=movementTests.js.map