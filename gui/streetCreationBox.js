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
const app_1 = require("../app");
class StreetCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("streetCreationBox");
        }
        return this.self;
    }
    getBuildStreet() {
        if (this.buildStreet == undefined) {
            this.buildStreet = document.getElementById("buildStreet");
        }
        return this.buildStreet;
    }
    getAddStreetNW() {
        if (this.addStreetNW == undefined) {
            this.addStreetNW = document.getElementById("addStreetNW");
            this.addStreetNW.onclick = function () { godModeFunctions_1.GodFunctions.addStreet(0 /* NW */); };
        }
        return this.addStreetNW;
    }
    getAddStreetNE() {
        if (this.addStreetNE == undefined) {
            this.addStreetNE = document.getElementById("addStreetNE");
            this.addStreetNE.onclick = function () { godModeFunctions_1.GodFunctions.addStreet(1 /* NE */); };
        }
        return this.addStreetNE;
    }
    getAddStreetE() {
        if (this.addStreetE == undefined) {
            this.addStreetE = document.getElementById("addStreetE");
            this.addStreetE.onclick = function () { godModeFunctions_1.GodFunctions.addStreet(2 /* E */); };
        }
        return this.addStreetE;
    }
    getAddStreetSE() {
        if (this.addStreetSE == undefined) {
            this.addStreetSE = document.getElementById("addStreetSE");
            this.addStreetSE.onclick = function () { godModeFunctions_1.GodFunctions.addStreet(3 /* SE */); };
        }
        return this.addStreetSE;
    }
    getAddStreetSW() {
        if (this.addStreetSW == undefined) {
            this.addStreetSW = document.getElementById("addStreetSW");
            this.addStreetSW.onclick = function () { godModeFunctions_1.GodFunctions.addStreet(4 /* SW */); };
        }
        return this.addStreetSW;
    }
    getAddStreetW() {
        if (this.addStreetW == undefined) {
            this.addStreetW = document.getElementById("addStreetW");
            this.addStreetW.onclick = function () { godModeFunctions_1.GodFunctions.addStreet(5 /* W */); };
        }
        return this.addStreetW;
    }
    getRemoveStreet() {
        if (this.removeStreet == undefined) {
            this.removeStreet = document.getElementById("removeStreet");
        }
        return this.removeStreet;
    }
    getRemoveStreetNW() {
        if (this.removeStreetNW == undefined) {
            this.removeStreetNW = document.getElementById("removeStreetNW");
            this.removeStreetNW.onclick = function () { godModeFunctions_1.GodFunctions.removeStreet(0 /* NW */); };
        }
        return this.removeStreetNW;
    }
    getRemoveStreetNE() {
        if (this.removeStreetNE == undefined) {
            this.removeStreetNE = document.getElementById("removeStreetNE");
            this.removeStreetNE.onclick = function () { godModeFunctions_1.GodFunctions.removeStreet(1 /* NE */); };
        }
        return this.removeStreetNE;
    }
    getRemoveStreetE() {
        if (this.removeStreetE == undefined) {
            this.removeStreetE = document.getElementById("removeStreetE");
            this.removeStreetE.onclick = function () { godModeFunctions_1.GodFunctions.removeStreet(2 /* E */); };
        }
        return this.removeStreetE;
    }
    getRemoveStreetSE() {
        if (this.removeStreetSE == undefined) {
            this.removeStreetSE = document.getElementById("removeStreetSE");
            this.removeStreetSE.onclick = function () { godModeFunctions_1.GodFunctions.removeStreet(3 /* SE */); };
        }
        return this.removeStreetSE;
    }
    getRemoveStreetSW() {
        if (this.removeStreetSW == undefined) {
            this.removeStreetSW = document.getElementById("removeStreetSW");
            this.removeStreetSW.onclick = function () { godModeFunctions_1.GodFunctions.removeStreet(4 /* SW */); };
        }
        return this.removeStreetSW;
    }
    getRemoveStreetW() {
        if (this.removeStreetW == undefined) {
            this.removeStreetW = document.getElementById("removeStreetW");
            this.removeStreetW.onclick = function () { godModeFunctions_1.GodFunctions.removeStreet(5 /* W */); };
        }
        return this.removeStreetW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
            this.saveBuildings.onclick = function () { app_1.Saving.saveBuildings(); };
        }
        return this.saveBuildings;
    }
}
exports.StreetCreationBox = StreetCreationBox;
//# sourceMappingURL=streetCreationBox.js.map