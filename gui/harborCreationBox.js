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
    class HarborCreationBox {
        getSelf() {
            if (this.self == undefined) {
                this.self = document.getElementById("harborCreationBox");
            }
            return this.self;
        }
        getBuildHarbor() {
            if (this.buildHarbor == undefined) {
                this.buildHarbor = document.getElementById("buildHarbor");
            }
            return this.buildHarbor;
        }
        getAddHarborNW() {
            if (this.addHarborNW == undefined) {
                this.addHarborNW = document.getElementById("addHarborNW");
                this.addHarborNW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 0 /* NW */, true); };
            }
            return this.addHarborNW;
        }
        getAddHarborNE() {
            if (this.addHarborNE == undefined) {
                this.addHarborNE = document.getElementById("addHarborNE");
                this.addHarborNE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 1 /* NE */, true); };
            }
            return this.addHarborNE;
        }
        getAddHarborE() {
            if (this.addHarborE == undefined) {
                this.addHarborE = document.getElementById("addHarborE");
                this.addHarborE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 2 /* E */, true); };
            }
            return this.addHarborE;
        }
        getAddHarborSE() {
            if (this.addHarborSE == undefined) {
                this.addHarborSE = document.getElementById("addHarborSE");
                this.addHarborSE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 3 /* SE */, true); };
            }
            return this.addHarborSE;
        }
        getAddHarborSW() {
            if (this.addHarborSW == undefined) {
                this.addHarborSW = document.getElementById("addHarborSW");
                this.addHarborSW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 4 /* SW */, true); };
            }
            return this.addHarborSW;
        }
        getAddHarborW() {
            if (this.addHarborW == undefined) {
                this.addHarborW = document.getElementById("addHarborW");
                this.addHarborW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 5 /* W */, true); };
            }
            return this.addHarborW;
        }
        getRemoveHarbor() {
            if (this.removeHarbor == undefined) {
                this.removeHarbor = document.getElementById("removeHarbor");
            }
            return this.removeHarbor;
        }
        getRemoveHarborNW() {
            if (this.removeHarborNW == undefined) {
                this.removeHarborNW = document.getElementById("removeHarborNW");
                this.removeHarborNW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 0 /* NW */, false); };
            }
            return this.removeHarborNW;
        }
        getRemoveHarborNE() {
            if (this.removeHarborNE == undefined) {
                this.removeHarborNE = document.getElementById("removeHarborNE");
                this.removeHarborNE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 1 /* NE */, false); };
            }
            return this.removeHarborNE;
        }
        getRemoveHarborE() {
            if (this.removeHarborE == undefined) {
                this.removeHarborE = document.getElementById("removeHarborE");
                this.removeHarborE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 2 /* E */, false); };
            }
            return this.removeHarborE;
        }
        getRemoveHarborSE() {
            if (this.removeHarborSE == undefined) {
                this.removeHarborSE = document.getElementById("removeHarborSE");
                this.removeHarborSE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 3 /* SE */, false); };
            }
            return this.removeHarborSE;
        }
        getRemoveHarborSW() {
            if (this.removeHarborSW == undefined) {
                this.removeHarborSW = document.getElementById("removeHarborSW");
                this.removeHarborSW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 4 /* SW */, false); };
            }
            return this.removeHarborSW;
        }
        getRemoveHarborW() {
            if (this.removeHarborW == undefined) {
                this.removeHarborW = document.getElementById("removeHarborW");
                this.removeHarborW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(6, 5 /* W */, false); };
            }
            return this.removeHarborW;
        }
        getSaveBuildings() {
            if (this.saveBuildings == undefined) {
                this.saveBuildings = document.getElementById("SaveBuildings");
                this.saveBuildings.onclick = function () { savingFunctions_1.Saving.saveBuildings(); };
            }
            return this.saveBuildings;
        }
    }
    exports.HarborCreationBox = HarborCreationBox;
});
//# sourceMappingURL=harborCreationBox.js.map