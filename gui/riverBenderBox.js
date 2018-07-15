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
define(["require", "exports", "../godmode/godModeFunctions", "../serverInteraction/savingFunctions"], function (require, exports, godModeFunctions_1, savingFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RiverBenderBox {
        getSelf() {
            if (this.self == undefined) {
                this.self = document.getElementById("riverBenderBox");
            }
            return this.self;
        }
        getBuildRiverSection() {
            if (this.buildRiverSection == undefined) {
                this.buildRiverSection = document.getElementById("buildRiverSection");
            }
            return this.buildRiverSection;
        }
        getAddRiverNW() {
            if (this.addRiverNW == undefined) {
                this.addRiverNW = document.getElementById("addRiverNW");
                this.addRiverNW.onclick = function () { godModeFunctions_1.GodFunctions.addRiver(0 /* NW */); };
            }
            return this.addRiverNW;
        }
        getAddRiverNE() {
            if (this.addRiverNE == undefined) {
                this.addRiverNE = document.getElementById("addRiverNE");
                this.addRiverNE.onclick = function () { godModeFunctions_1.GodFunctions.addRiver(1 /* NE */); };
            }
            return this.addRiverNE;
        }
        getAddRiverE() {
            if (this.addRiverE == undefined) {
                this.addRiverE = document.getElementById("addRiverE");
                this.addRiverE.onclick = function () { godModeFunctions_1.GodFunctions.addRiver(2 /* E */); };
            }
            return this.addRiverE;
        }
        getAddRiverSE() {
            if (this.addRiverSE == undefined) {
                this.addRiverSE = document.getElementById("addRiverSE");
                this.addRiverSE.onclick = function () { godModeFunctions_1.GodFunctions.addRiver(3 /* SE */); };
            }
            return this.addRiverSE;
        }
        getAddRiverSW() {
            if (this.addRiverSW == undefined) {
                this.addRiverSW = document.getElementById("addRiverSW");
                this.addRiverSW.onclick = function () { godModeFunctions_1.GodFunctions.addRiver(4 /* SW */); };
            }
            return this.addRiverSW;
        }
        getAddRiverW() {
            if (this.addRiverW == undefined) {
                this.addRiverW = document.getElementById("addRiverW");
                this.addRiverW.onclick = function () { godModeFunctions_1.GodFunctions.addRiver(5 /* W */); };
            }
            return this.addRiverW;
        }
        getRemoveRiverSection() {
            if (this.removeRiverSection == undefined) {
                this.removeRiverSection = document.getElementById("removeRiverSection");
            }
            return this.removeRiverSection;
        }
        getRemoveRiverNW() {
            if (this.removeRiverNW == undefined) {
                this.removeRiverNW = document.getElementById("removeRiverNW");
                this.removeRiverNW.onclick = function () { godModeFunctions_1.GodFunctions.removeRiver(0 /* NW */); };
            }
            return this.removeRiverNW;
        }
        getRemoveRiverNE() {
            if (this.removeRiverNE == undefined) {
                this.removeRiverNE = document.getElementById("removeRiverNE");
                this.removeRiverNE.onclick = function () { godModeFunctions_1.GodFunctions.removeRiver(1 /* NE */); };
            }
            return this.removeRiverNE;
        }
        getRemoveRiverE() {
            if (this.removeRiverE == undefined) {
                this.removeRiverE = document.getElementById("removeRiverE");
                this.removeRiverE.onclick = function () { godModeFunctions_1.GodFunctions.removeRiver(2 /* E */); };
            }
            return this.removeRiverE;
        }
        getRemoveRiverSE() {
            if (this.removeRiverSE == undefined) {
                this.removeRiverSE = document.getElementById("removeRiverSE");
                this.removeRiverSE.onclick = function () { godModeFunctions_1.GodFunctions.removeRiver(3 /* SE */); };
            }
            return this.removeRiverSE;
        }
        getRemoveRiverSW() {
            if (this.removeRiverSW == undefined) {
                this.removeRiverSW = document.getElementById("removeRiverSW");
                this.removeRiverSW.onclick = function () { godModeFunctions_1.GodFunctions.removeRiver(4 /* SW */); };
            }
            return this.removeRiverSW;
        }
        getRemoveRiverW() {
            if (this.removeRiverW == undefined) {
                this.removeRiverW = document.getElementById("removeRiverW");
                this.removeRiverW.onclick = function () { godModeFunctions_1.GodFunctions.removeRiver(5 /* W */); };
            }
            return this.removeRiverW;
        }
        getSaveRivers() {
            if (this.saveRivers == undefined) {
                this.saveRivers = document.getElementById("SaveRivers");
                this.saveRivers.onclick = function () { savingFunctions_1.Saving.saveRivers(); };
            }
            return this.saveRivers;
        }
    }
    exports.RiverBenderBox = RiverBenderBox;
});
//# sourceMappingURL=riverBenderBox.js.map