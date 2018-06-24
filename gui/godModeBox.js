"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
class GodModeBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("godmodeBox");
        }
        return this.self;
    }
    getToggleWorldCreationMode() {
        if (this.toggleWorldCreationMode == undefined) {
            this.toggleWorldCreationMode = document.getElementById("ToggleWorldCreationMode");
            this.toggleWorldCreationMode.onclick = function () { types_1.BoxVisibility.toggleWorldCreationMode(); };
        }
        return this.toggleWorldCreationMode;
    }
    getToggleRiverCreationMode() {
        if (this.toggleRiverCreationMode == undefined) {
            this.toggleRiverCreationMode = document.getElementById("ToggleRiverCreationMode");
            this.toggleRiverCreationMode.onclick = function () { types_1.BoxVisibility.toggleRiverCreationMode(); };
        }
        return this.toggleRiverCreationMode;
    }
    getToggleBuildingCreationMode() {
        if (this.toggleBuildingCreationMode == undefined) {
            this.toggleBuildingCreationMode = document.getElementById("ToggleBuildingCreationMode");
            this.toggleBuildingCreationMode.onclick = function () { types_1.BoxVisibility.toggleBuildingCreationMode(); };
        }
        return this.toggleBuildingCreationMode;
    }
    getToggleStreetBuildingMode() {
        if (this.toggleStreetBuildingMode == undefined) {
            this.toggleStreetBuildingMode = document.getElementById("ToggleStreetBuildingMode");
            this.toggleStreetBuildingMode.onclick = function () { types_1.BoxVisibility.toggleStreetBuildingMode(); };
        }
        return this.toggleStreetBuildingMode;
    }
    getToggleWallBuildingMode() {
        if (this.toggleWallBuildingMode == undefined) {
            this.toggleWallBuildingMode = document.getElementById("ToggleWallBuildingMode");
            this.toggleWallBuildingMode.onclick = function () { types_1.BoxVisibility.toggleWallBuildingMode(); };
        }
        return this.toggleWallBuildingMode;
    }
    getToggleHarborBuildingMode() {
        if (this.toggleHarborBuildingMode == undefined) {
            this.toggleHarborBuildingMode = document.getElementById("ToggleHarborBuildingMode");
            this.toggleHarborBuildingMode.onclick = function () { types_1.BoxVisibility.toggleHarborBuildingMode(); };
        }
        return this.toggleHarborBuildingMode;
    }
    getToggleBridgeBuildingMode() {
        if (this.toggleBridgeBuildingMode == undefined) {
            this.toggleBridgeBuildingMode = document.getElementById("ToggleBridgeBuildingMode");
            this.toggleBridgeBuildingMode.onclick = function () { types_1.BoxVisibility.toggleBridgeBuildingMode(); };
        }
        return this.toggleBridgeBuildingMode;
    }
    getSaveArmies() {
        if (this.saveArmies == undefined) {
            this.saveArmies = document.getElementById("SaveArmies");
            this.saveArmies.onclick = function () { types_1.Saving.saveArmies(); };
        }
        return this.saveArmies;
    }
    getSaveFactionsTerritories() {
        if (this.saveFactionsTerritories == undefined) {
            this.saveFactionsTerritories = document.getElementById("SaveFactionsTerritories");
            this.saveFactionsTerritories.onclick = function () { types_1.Saving.saveFactionsTerritories(); };
        }
        return this.saveFactionsTerritories;
    }
    getToggleArmyCreationMode() {
        if (this.toggleArmyCreationMode == undefined) {
            this.toggleArmyCreationMode = document.getElementById("ToggleArmyCreationMode");
            this.toggleArmyCreationMode.onclick = function () { types_1.BoxVisibility.toggleArmyCreationMode(); };
        }
        return this.toggleArmyCreationMode;
    }
    getGodDeleteSelectedArmy() {
        if (this.godDeleteSelectedArmy == undefined) {
            this.godDeleteSelectedArmy = document.getElementById("GodDeleteSelectedArmy");
            this.godDeleteSelectedArmy.onclick = function () { types_1.GodFunctions.godDeleteSelectedArmy(); };
        }
        return this.godDeleteSelectedArmy;
    }
    getFactionToCreateBuildingsFor() {
        if (this.factionToCreateBuildingsFor == undefined) {
            this.factionToCreateBuildingsFor = document.getElementById("factionToCreateBuildingsFor");
        }
        return this.factionToCreateBuildingsFor;
    }
}
exports.GodModeBox = GodModeBox;
//# sourceMappingURL=godModeBox.js.map