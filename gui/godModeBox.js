"use strict";
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
        }
        return this.toggleWorldCreationMode;
    }
    getToggleRiverCreationMode() {
        if (this.toggleRiverCreationMode == undefined) {
            this.toggleRiverCreationMode = document.getElementById("ToggleRiverCreationMode");
        }
        return this.toggleRiverCreationMode;
    }
    getToggleBuildingCreationMode() {
        if (this.toggleBuildingCreationMode == undefined) {
            this.toggleBuildingCreationMode = document.getElementById("ToggleBuildingCreationMode");
        }
        return this.toggleBuildingCreationMode;
    }
    getToggleStreetBuildingMode() {
        if (this.toggleStreetBuildingMode == undefined) {
            this.toggleStreetBuildingMode = document.getElementById("ToggleStreetBuildingMode");
        }
        return this.toggleStreetBuildingMode;
    }
    getToggleWallBuildingMode() {
        if (this.toggleWallBuildingMode == undefined) {
            this.toggleWallBuildingMode = document.getElementById("ToggleWallBuildingMode");
        }
        return this.toggleWallBuildingMode;
    }
    getToggleHarborBuildingMode() {
        if (this.toggleHarborBuildingMode == undefined) {
            this.toggleHarborBuildingMode = document.getElementById("ToggleHarborBuildingMode");
        }
        return this.toggleHarborBuildingMode;
    }
    getToggleBridgeBuildingMode() {
        if (this.toggleBridgeBuildingMode == undefined) {
            this.toggleBridgeBuildingMode = document.getElementById("ToggleBridgeBuildingMode");
        }
        return this.toggleBridgeBuildingMode;
    }
    getSaveArmies() {
        if (this.saveArmies == undefined) {
            this.saveArmies = document.getElementById("SaveArmies");
        }
        return this.saveArmies;
    }
    getSaveFactionsTerritories() {
        if (this.saveFactionsTerritories == undefined) {
            this.saveFactionsTerritories = document.getElementById("SaveFactionsTerritories");
        }
        return this.saveFactionsTerritories;
    }
    getToggleArmyCreationMode() {
        if (this.toggleArmyCreationMode == undefined) {
            this.toggleArmyCreationMode = document.getElementById("ToggleArmyCreationMode");
        }
        return this.toggleArmyCreationMode;
    }
    getGodDeleteSelectedArmy() {
        if (this.godDeleteSelectedArmy == undefined) {
            this.godDeleteSelectedArmy = document.getElementById("GodDeleteSelectedArmy");
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
