"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuildingCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("buildingCreationBox");
        }
        return this.self;
    }
    getAddCastle() {
        if (this.addCastle == undefined) {
            this.addCastle = document.getElementById("addCastle");
        }
        return this.addCastle;
    }
    getAddCity() {
        if (this.addCity == undefined) {
            this.addCity = document.getElementById("addCity");
        }
        return this.addCity;
    }
    getAddFortress() {
        if (this.addFortress == undefined) {
            this.addFortress = document.getElementById("addFortress");
        }
        return this.addFortress;
    }
    getAddCapital() {
        if (this.addCapital == undefined) {
            this.addCapital = document.getElementById("addCapital");
        }
        return this.addCapital;
    }
    getAddCapitalFortress() {
        if (this.addCapitalFortress == undefined) {
            this.addCapitalFortress = document.getElementById("addCapitalFortress");
        }
        return this.addCapitalFortress;
    }
    getDeleteBuilding() {
        if (this.deleteBuilding == undefined) {
            this.deleteBuilding = document.getElementById("deleteBuilding");
        }
        return this.deleteBuilding;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.BuildingCreationBox = BuildingCreationBox;
