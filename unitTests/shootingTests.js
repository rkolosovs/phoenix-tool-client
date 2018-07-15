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
define(["require", "exports", "./shootingTests/resultsTests", "./shootingTests/conditionsTests", "../gameState", "../realm", "../buildings/productionBuilding", "../constants", "../map/field"], function (require, exports, resultsTests_1, conditionsTests_1, gameState_1, realm_1, productionBuilding_1, constants_1, field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defenderArmies = [];
    exports.attackerArmies = [];
    const module = QUnit.module;
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
});
//# sourceMappingURL=shootingTests.js.map