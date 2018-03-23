"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const resultsTests_1 = require("./shootingTests/resultsTests");
const conditionsTests_1 = require("./shootingTests/conditionsTests");
exports.defenderArmies = [];
exports.attackerArmies = [];
const { module } = qunit_1.QUnit;
module("Shooting", function () {
    module("Results", {
        before: function () {
            exports.defenderArmies = [];
            exports.attackerArmies = [];
            buildings = [{ 'realm': 1, 'name': "", 'type': 0, 'x': 3, 'y': 3, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null }];
            fieldTypes = [2, 3, 0, 2]; //plains, woods, water, plains (with castle)
        },
        after: function () {
            exports.defenderArmies = [];
            exports.attackerArmies = [];
            borders = [];
            buildings = [];
            fieldTypes = [];
        }
    }, resultsTests_1.resultsTests);
    module("Conditions", conditionsTests_1.conditionsTests);
});
