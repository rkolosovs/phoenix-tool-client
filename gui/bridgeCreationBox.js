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
class BridgeCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("bridgeCreationBox");
        }
        return this.self;
    }
    getBuildBridge() {
        if (this.buildBridge == undefined) {
            this.buildBridge = document.getElementById("buildBridge");
        }
        return this.buildBridge;
    }
    getAddBridgeNW() {
        if (this.addBridgeNW == undefined) {
            this.addBridgeNW = document.getElementById("addBridgeNW");
            this.addBridgeNW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 0 /* NW */, true); };
        }
        return this.addBridgeNW;
    }
    getAddBridgeNE() {
        if (this.addBridgeNE == undefined) {
            this.addBridgeNE = document.getElementById("addBridgeNE");
            this.addBridgeNE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 1 /* NE */, true); };
        }
        return this.addBridgeNE;
    }
    getAddBridgeE() {
        if (this.addBridgeE == undefined) {
            this.addBridgeE = document.getElementById("addBridgeE");
            this.addBridgeE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 2 /* E */, true); };
        }
        return this.addBridgeE;
    }
    getAddBridgeSE() {
        if (this.addBridgeSE == undefined) {
            this.addBridgeSE = document.getElementById("addBridgeSE");
            this.addBridgeSE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 3 /* SE */, true); };
        }
        return this.addBridgeSE;
    }
    getAddBridgeSW() {
        if (this.addBridgeSW == undefined) {
            this.addBridgeSW = document.getElementById("addBridgeSW");
            this.addBridgeSW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 4 /* SW */, true); };
        }
        return this.addBridgeSW;
    }
    getAddBridgeW() {
        if (this.addBridgeW == undefined) {
            this.addBridgeW = document.getElementById("addBridgeW");
            this.addBridgeW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 5 /* W */, true); };
        }
        return this.addBridgeW;
    }
    getRemoveBridge() {
        if (this.removeBridge == undefined) {
            this.removeBridge = document.getElementById("removeBridge");
        }
        return this.removeBridge;
    }
    getRemoveBridgeNW() {
        if (this.removeBridgeNW == undefined) {
            this.removeBridgeNW = document.getElementById("removeBridgeNW");
            this.removeBridgeNW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 0 /* NW */, false); };
        }
        return this.removeBridgeNW;
    }
    getRemoveBridgeNE() {
        if (this.removeBridgeNE == undefined) {
            this.removeBridgeNE = document.getElementById("removeBridgeNE");
            this.removeBridgeNE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 1 /* NE */, false); };
        }
        return this.removeBridgeNE;
    }
    getRemoveBridgeE() {
        if (this.removeBridgeE == undefined) {
            this.removeBridgeE = document.getElementById("removeBridgeE");
            this.removeBridgeE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 2 /* E */, false); };
        }
        return this.removeBridgeE;
    }
    getRemoveBridgeSE() {
        if (this.removeBridgeSE == undefined) {
            this.removeBridgeSE = document.getElementById("removeBridgeSE");
            this.removeBridgeSE.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 3 /* SE */, false); };
        }
        return this.removeBridgeSE;
    }
    getRemoveBridgeSW() {
        if (this.removeBridgeSW == undefined) {
            this.removeBridgeSW = document.getElementById("removeBridgeSW");
            this.removeBridgeSW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 4 /* SW */, false); };
        }
        return this.removeBridgeSW;
    }
    getRemoveBridgeW() {
        if (this.removeBridgeW == undefined) {
            this.removeBridgeW = document.getElementById("removeBridgeW");
            this.removeBridgeW.onclick = function () { godModeFunctions_1.GodFunctions.manipulateBorderBuilding(7, 5 /* W */, false); };
        }
        return this.removeBridgeW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
            this.saveBuildings.onclick = function () { savingFunctions_1.Saving.saveBuildings(); };
        }
        return this.saveBuildings;
    }
}
exports.BridgeCreationBox = BridgeCreationBox;
//# sourceMappingURL=bridgeCreationBox.js.map