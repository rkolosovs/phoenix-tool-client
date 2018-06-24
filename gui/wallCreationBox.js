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
class WallCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("wallCreationBox");
        }
        return this.self;
    }
    getBuildWall() {
        if (this.buildWall == undefined) {
            this.buildWall = document.getElementById("buildWall");
        }
        return this.buildWall;
    }
    getAddWallNW() {
        if (this.addWallNW == undefined) {
            this.addWallNW = document.getElementById("addWallNW");
            this.addWallNW.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 0 /* NW */, true); };
        }
        return this.addWallNW;
    }
    getAddWallNE() {
        if (this.addWallNE == undefined) {
            this.addWallNE = document.getElementById("addWallNE");
            this.addWallNE.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 1 /* NE */, true); };
        }
        return this.addWallNE;
    }
    getAddWallE() {
        if (this.addWallE == undefined) {
            this.addWallE = document.getElementById("addWallE");
            this.addWallE.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 2 /* E */, true); };
        }
        return this.addWallE;
    }
    getAddWallSE() {
        if (this.addWallSE == undefined) {
            this.addWallSE = document.getElementById("addWallSE");
            this.addWallSE.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 3 /* SE */, true); };
        }
        return this.addWallSE;
    }
    getAddWallSW() {
        if (this.addWallSW == undefined) {
            this.addWallSW = document.getElementById("addWallSW");
            this.addWallSW.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 4 /* SW */, true); };
        }
        return this.addWallSW;
    }
    getAddWallW() {
        if (this.addWallW == undefined) {
            this.addWallW = document.getElementById("addWallW");
            this.addWallW.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 5 /* W */, true); };
        }
        return this.addWallW;
    }
    getRemoveWall() {
        if (this.removeWall == undefined) {
            this.removeWall = document.getElementById("removeWall");
        }
        return this.removeWall;
    }
    getRemoveWallNW() {
        if (this.removeWallNW == undefined) {
            this.removeWallNW = document.getElementById("removeWallNW");
            this.removeWallNW.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 0 /* NW */, false); };
        }
        return this.removeWallNW;
    }
    getRemoveWallNE() {
        if (this.removeWallNE == undefined) {
            this.removeWallNE = document.getElementById("removeWallNE");
            this.removeWallNE.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 1 /* NE */, false); };
        }
        return this.removeWallNE;
    }
    getRemoveWallE() {
        if (this.removeWallE == undefined) {
            this.removeWallE = document.getElementById("removeWallE");
            this.removeWallE.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 2 /* E */, false); };
        }
        return this.removeWallE;
    }
    getRemoveWallSE() {
        if (this.removeWallSE == undefined) {
            this.removeWallSE = document.getElementById("removeWallSE");
            this.removeWallSE.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 3 /* SE */, false); };
        }
        return this.removeWallSE;
    }
    getRemoveWallSW() {
        if (this.removeWallSW == undefined) {
            this.removeWallSW = document.getElementById("removeWallSW");
            this.removeWallSW.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 4 /* SW */, false); };
        }
        return this.removeWallSW;
    }
    getRemoveWallW() {
        if (this.removeWallW == undefined) {
            this.removeWallW = document.getElementById("removeWallW");
            this.removeWallW.onclick = function () { types_1.GodFunctions.manipulateBorderBuilding(5, 5 /* W */, false); };
        }
        return this.removeWallW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
            this.saveBuildings.onclick = function () { types_1.Saving.saveBuildings(); };
        }
        return this.saveBuildings;
    }
}
exports.WallCreationBox = WallCreationBox;
//# sourceMappingURL=wallCreationBox.js.map