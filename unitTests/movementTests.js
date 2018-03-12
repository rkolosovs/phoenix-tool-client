"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const gameState_1 = require("../gameState");
const realm_1 = require("../realm");
const footMovementTests_1 = require("./movementTests/footMovementTests");
const lightCatapultMovement_1 = require("./movementTests/lightCatapultMovement");
const heavyCatapultMovement_1 = require("./movementTests/heavyCatapultMovement");
const riderMovementTests_1 = require("./movementTests/riderMovementTests");
const fleetMovementTests_1 = require("./movementTests/fleetMovementTests");
const lightWarshipMovement_1 = require("./movementTests/lightWarshipMovement");
const heavyWarshipMovement_1 = require("./movementTests/heavyWarshipMovement");
const movementWithRivers_1 = require("./movementTests/movementWithRivers");
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
    if (actual.some(possibleMove => possibleMove.heightPoints === expected.heightPoints &&
        possibleMove.movePoints === expected.movePoints &&
        possibleMove.direction === expected.direction &&
        possibleMove.loading === expected.loading &&
        possibleMove.unloading === expected.unloading &&
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
