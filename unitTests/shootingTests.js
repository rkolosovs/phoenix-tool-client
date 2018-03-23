"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const resultsTests_1 = require("./shootingTests/resultsTests");
const conditionsTests_1 = require("./shootingTests/conditionsTests");
const gameState_1 = require("../gameState");
const realm_1 = require("../realm");
const productionBuilding_1 = require("../buildings/productionBuilding");
const constants_1 = require("../constants");
const field_1 = require("../map/field");
exports.defenderArmies = [];
exports.attackerArmies = [];
const { module } = qunit_1.QUnit;
module("Shooting", function () {
    module("Results", {
        before: function () {
            exports.defenderArmies = [];
            exports.attackerArmies = [];
            gameState_1.GameState.reset();
            gameState_1.GameState.realms.push(new realm_1.Realm("Pink Realm", "r01", "213,038,181", 9, true));
            gameState_1.GameState.realms.push(new realm_1.Realm("Realm 2", "r02", "000,000,000", 9, true));
            gameState_1.GameState.buildings = [new productionBuilding_1.ProductionBuilding(0 /* CASTLE */, "", [3, 3], gameState_1.GameState.realms[0], constants_1.Constants.CASTLE_BP)];
            gameState_1.GameState.fields = [
                new field_1.Field([0, 0], 2 /* LOWLANDS */),
                new field_1.Field([1, 1], 3 /* WOODS */),
                new field_1.Field([2, 2], 0 /* SHALLOWS */),
                new field_1.Field([3, 3], 2 /* LOWLANDS */)
            ];
        },
        after: function () {
            exports.defenderArmies = [];
            exports.attackerArmies = [];
            gameState_1.GameState.realms = [];
            gameState_1.GameState.buildings = [];
            gameState_1.GameState.fields = [];
        }
    }, resultsTests_1.resultsTests);
    module("Conditions", conditionsTests_1.conditionsTests);
});
