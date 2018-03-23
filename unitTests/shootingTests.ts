import {Army} from "../armies/army";
import {QUnit} from "qunit";
import {resultsTests} from "./shootingTests/resultsTests";
import {conditionsTests} from "./shootingTests/conditionsTests";

export let defenderArmies: Army[] = [];
export let attackerArmies: Army[] = [];

const { module } = QUnit;

module( "Shooting" , function() {
	module( "Results", {
		before: function() {
            defenderArmies = [];
            attackerArmies = [];
			buildings = [{'realm': 1, 'name': "", 'type': 0, 'x': 3, 'y': 3, 'direction': null, 'firstX': null, 'firstY': null, 'secondX': null, 'secondY': null}];
			fieldTypes = [2, 3, 0, 2];//plains, woods, water, plains (with castle)
        },
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
			borders = [];
			buildings = [];
			fieldTypes = [];
		}}, resultsTests);
	module( "Conditions", conditionsTests);
});