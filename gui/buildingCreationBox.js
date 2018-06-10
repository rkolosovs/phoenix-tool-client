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
const godModeFunctions_1 = require("../godmode/godModeFunctions");
const savingFunctions_1 = require("../serverInteraction/savingFunctions");
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
            this.addCastle.onclick = function () { godModeFunctions_1.GodFunctions.addCastle(); };
        }
        return this.addCastle;
    }
    getAddCity() {
        if (this.addCity == undefined) {
            this.addCity = document.getElementById("addCity");
            this.addCity.onclick = function () { godModeFunctions_1.GodFunctions.addCity(); };
        }
        return this.addCity;
    }
    getAddFortress() {
        if (this.addFortress == undefined) {
            this.addFortress = document.getElementById("addFortress");
            this.addFortress.onclick = function () { godModeFunctions_1.GodFunctions.addFortress(); };
        }
        return this.addFortress;
    }
    getAddCapital() {
        if (this.addCapital == undefined) {
            this.addCapital = document.getElementById("addCapital");
            this.addCapital.onclick = function () { godModeFunctions_1.GodFunctions.addCapital(); };
        }
        return this.addCapital;
    }
    getAddCapitalFortress() {
        if (this.addCapitalFortress == undefined) {
            this.addCapitalFortress = document.getElementById("addCapitalFortress");
            this.addCapitalFortress.onclick = function () { godModeFunctions_1.GodFunctions.addCapitalFortress(); };
        }
        return this.addCapitalFortress;
    }
    getDeleteBuilding() {
        if (this.deleteBuilding == undefined) {
            this.deleteBuilding = document.getElementById("deleteBuilding");
            this.deleteBuilding.onclick = function () { godModeFunctions_1.GodFunctions.deleteSelectedProductionBuilding(); };
        }
        return this.deleteBuilding;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
            this.saveBuildings.onclick = function () { savingFunctions_1.Saving.saveBuildings(); };
        }
        return this.saveBuildings;
    }
}
exports.BuildingCreationBox = BuildingCreationBox;
//# sourceMappingURL=buildingCreationBox.js.map