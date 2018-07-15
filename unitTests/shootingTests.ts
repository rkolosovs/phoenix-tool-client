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
import {QUnit} from "./qunit";
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