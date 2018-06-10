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

import { GodFunctions } from "../godmode/godModeFunctions";
import { Direction } from "../map/direction";
import { Saving } from "../serverInteraction/savingFunctions";

export class BridgeCreationBox {
    private self: HTMLDivElement|undefined;
    private buildBridge: HTMLTableSectionElement|undefined;
    private addBridgeNW: HTMLButtonElement|undefined;
    private addBridgeNE: HTMLButtonElement|undefined;
    private addBridgeE: HTMLButtonElement|undefined;
    private addBridgeSE: HTMLButtonElement|undefined;
    private addBridgeSW: HTMLButtonElement|undefined;
    private addBridgeW: HTMLButtonElement|undefined;
    private removeBridge: HTMLTableSectionElement|undefined;
    private removeBridgeNW: HTMLButtonElement|undefined;
    private removeBridgeNE: HTMLButtonElement|undefined;
    private removeBridgeE: HTMLButtonElement|undefined;
    private removeBridgeSE: HTMLButtonElement|undefined;
    private removeBridgeSW: HTMLButtonElement|undefined;
    private removeBridgeW: HTMLButtonElement|undefined;
    private saveBuildings: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement {
        if (this.self == undefined) {
            this.self = document.getElementById("bridgeCreationBox") as HTMLDivElement;
        }
        return this.self;
    }

    getBuildBridge(): HTMLTableSectionElement {
        if (this.buildBridge == undefined) {
            this.buildBridge = document.getElementById("buildBridge") as HTMLTableSectionElement;
        }
        return this.buildBridge;
    }

    getAddBridgeNW(): HTMLButtonElement {
        if (this.addBridgeNW == undefined) {
            this.addBridgeNW = document.getElementById("addBridgeNW") as HTMLButtonElement;
            this.addBridgeNW.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.NW, true);};
        }
        return this.addBridgeNW;
    }

    getAddBridgeNE(): HTMLButtonElement {
        if (this.addBridgeNE == undefined) {
            this.addBridgeNE = document.getElementById("addBridgeNE") as HTMLButtonElement;
            this.addBridgeNE.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.NE, true);};
        }
        return this.addBridgeNE;
    }

    getAddBridgeE(): HTMLButtonElement {
        if (this.addBridgeE == undefined) {
            this.addBridgeE = document.getElementById("addBridgeE") as HTMLButtonElement;
            this.addBridgeE.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.E, true);};
        }
        return this.addBridgeE;
    }

    getAddBridgeSE(): HTMLButtonElement {
        if (this.addBridgeSE == undefined) {
            this.addBridgeSE = document.getElementById("addBridgeSE") as HTMLButtonElement;
            this.addBridgeSE.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.SE, true);};
        }
        return this.addBridgeSE;
    }

    getAddBridgeSW(): HTMLButtonElement {
        if (this.addBridgeSW == undefined) {
            this.addBridgeSW = document.getElementById("addBridgeSW") as HTMLButtonElement;
            this.addBridgeSW.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.SW, true);};
        }
        return this.addBridgeSW;
    }

    getAddBridgeW(): HTMLButtonElement {
        if (this.addBridgeW == undefined) {
            this.addBridgeW = document.getElementById("addBridgeW") as HTMLButtonElement;
            this.addBridgeW.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.W, true);};
        }
        return this.addBridgeW;
    }

    getRemoveBridge(): HTMLTableSectionElement {
        if (this.removeBridge == undefined) {
            this.removeBridge = document.getElementById("removeBridge") as HTMLTableSectionElement;
        }
        return this.removeBridge;
    }

    getRemoveBridgeNW(): HTMLButtonElement {
        if (this.removeBridgeNW == undefined) {
            this.removeBridgeNW = document.getElementById("removeBridgeNW") as HTMLButtonElement;
            this.removeBridgeNW.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.NW, false);};
        }
        return this.removeBridgeNW;
    }

    getRemoveBridgeNE(): HTMLButtonElement {
        if (this.removeBridgeNE == undefined) {
            this.removeBridgeNE = document.getElementById("removeBridgeNE") as HTMLButtonElement;
            this.removeBridgeNE.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.NE, false);};
        }
        return this.removeBridgeNE;
    }

    getRemoveBridgeE(): HTMLButtonElement {
        if (this.removeBridgeE == undefined) {
            this.removeBridgeE = document.getElementById("removeBridgeE") as HTMLButtonElement;
            this.removeBridgeE.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.E, false);};
        }
        return this.removeBridgeE;
    }

    getRemoveBridgeSE(): HTMLButtonElement {
        if (this.removeBridgeSE == undefined) {
            this.removeBridgeSE = document.getElementById("removeBridgeSE") as HTMLButtonElement;
            this.removeBridgeSE.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.SE, false);};
        }
        return this.removeBridgeSE;
    }

    getRemoveBridgeSW(): HTMLButtonElement {
        if (this.removeBridgeSW == undefined) {
            this.removeBridgeSW = document.getElementById("removeBridgeSW") as HTMLButtonElement;
            this.removeBridgeSW.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.SW, false);};
        }
        return this.removeBridgeSW;
    }

    getRemoveBridgeW(): HTMLButtonElement {
        if (this.removeBridgeW == undefined) {
            this.removeBridgeW = document.getElementById("removeBridgeW") as HTMLButtonElement;
            this.removeBridgeW.onclick = function(){GodFunctions.manipulateBorderBuilding(7, Direction.W, false);};
        }
        return this.removeBridgeW;
    }

    getSaveBuildings(): HTMLButtonElement {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
            this.saveBuildings.onclick = function(){Saving.saveBuildings();};
        }
        return this.saveBuildings;
    }
}