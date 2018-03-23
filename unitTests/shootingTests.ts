import {Army} from "../armies/army";
import {QUnit} from "qunit";
import {resultsTests} from "./shootingTests/resultsTests";
import {conditionsTests} from "./shootingTests/conditionsTests";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {ProductionBuilding} from "../buildings/productionBuilding";
import {BuildingType} from "../buildings/building";
import {Constants} from "../constants";
import {FieldType, Field} from "../map/field";

export let defenderArmies: Army[] = [];
export let attackerArmies: Army[] = [];

const { module } = QUnit;

module( "Shooting" , function() {
	module( "Results", {
		before: function() {
            defenderArmies = [];
            attackerArmies = [];
            GameState.reset();
            GameState.realms.push(new Realm("Pink Realm", "r01", "213,038,181", 9, true));
            GameState.realms.push(new Realm("Realm 2", "r02", "000,000,000", 9, true));
			GameState.buildings = [new ProductionBuilding(BuildingType.CASTLE,"",[3, 3],
				GameState.realms[0], Constants.CASTLE_BP)];
            GameState.fields = [
            	new Field([0, 0], FieldType.LOWLANDS),
				new Field([1, 1], FieldType.WOODS),
				new Field([2, 2], FieldType.SHALLOWS),
                new Field([3, 3], FieldType.LOWLANDS)];
        },
		after: function() {
			defenderArmies = [];
			attackerArmies = [];
			GameState.realms = [];
            GameState.buildings = [];
            GameState.fields = [];
		}}, resultsTests);
	module( "Conditions", conditionsTests);
});