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
import { Saving } from "../app";

export class RiverBenderBox{
    private self: HTMLDivElement;
    private buildRiverSection: HTMLTableSectionElement;
    private addRiverNW: HTMLButtonElement;
    private addRiverNE: HTMLButtonElement;
    private addRiverE: HTMLButtonElement;
    private addRiverSE: HTMLButtonElement;
    private addRiverSW: HTMLButtonElement;
    private addRiverW: HTMLButtonElement;
    private removeRiverSection: HTMLTableSectionElement;
    private removeRiverNW: HTMLButtonElement;
    private removeRiverNE: HTMLButtonElement;
    private removeRiverE: HTMLButtonElement;
    private removeRiverSE: HTMLButtonElement;
    private removeRiverSW: HTMLButtonElement;
    private removeRiverW: HTMLButtonElement;
    private saveRivers: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("riverBenderBox") as HTMLDivElement;
        }
        return this.self;
    }

    getBuildRiverSection(): HTMLTableSectionElement{
        if(this.buildRiverSection == undefined){
            this.buildRiverSection = document.getElementById("buildRiverSection") as HTMLTableSectionElement;
        }
        return this.buildRiverSection;
    }

    getAddRiverNW(): HTMLButtonElement{
        if(this.addRiverNW == undefined){
            this.addRiverNW = document.getElementById("addRiverNW") as HTMLButtonElement;
            this.addRiverNW.onclick = function(){GodFunctions.addRiver(Direction.NW);};
        }
        return this.addRiverNW;
    }

    getAddRiverNE(): HTMLButtonElement{
        if(this.addRiverNE == undefined){
            this.addRiverNE = document.getElementById("addRiverNE") as HTMLButtonElement;
            this.addRiverNE.onclick = function(){GodFunctions.addRiver(Direction.NE);};
        }
        return this.addRiverNE;
    }

    getAddRiverE(): HTMLButtonElement{
        if(this.addRiverE == undefined){
            this.addRiverE = document.getElementById("addRiverE") as HTMLButtonElement;
            this.addRiverE.onclick = function(){GodFunctions.addRiver(Direction.E);};
        }
        return this.addRiverE;
    }

    getAddRiverSE(): HTMLButtonElement{
        if(this.addRiverSE == undefined){
            this.addRiverSE = document.getElementById("addRiverSE") as HTMLButtonElement;
            this.addRiverSE.onclick = function(){GodFunctions.addRiver(Direction.SE);};
        }
        return this.addRiverSE;
    }

    getAddRiverSW(): HTMLButtonElement{
        if(this.addRiverSW == undefined){
            this.addRiverSW = document.getElementById("addRiverSW") as HTMLButtonElement;
            this.addRiverSW.onclick = function(){GodFunctions.addRiver(Direction.SW);};
        }
        return this.addRiverSW;
    }

    getAddRiverW(): HTMLButtonElement{
        if(this.addRiverW == undefined){
            this.addRiverW = document.getElementById("addRiverW") as HTMLButtonElement;
            this.addRiverW.onclick = function(){GodFunctions.addRiver(Direction.W);};
        }
        return this.addRiverW;
    }

    getRemoveRiverSection(): HTMLTableSectionElement{
        if(this.removeRiverSection == undefined){
            this.removeRiverSection = document.getElementById("removeRiverSection") as HTMLTableSectionElement;
        }
        return this.removeRiverSection;
    }

    getRemoveRiverNW(): HTMLButtonElement{
        if(this.removeRiverNW == undefined){
            this.removeRiverNW = document.getElementById("removeRiverNW") as HTMLButtonElement;
            this.removeRiverNW.onclick = function(){GodFunctions.removeRiver(Direction.NW);};
        }
        return this.removeRiverNW;
    }

    getRemoveRiverNE(): HTMLButtonElement{
        if(this.removeRiverNE == undefined){
            this.removeRiverNE = document.getElementById("removeRiverNE") as HTMLButtonElement;
            this.removeRiverNE.onclick = function(){GodFunctions.removeRiver(Direction.NE);};
        }
        return this.removeRiverNE;
    }

    getRemoveRiverE(): HTMLButtonElement{
        if(this.removeRiverE == undefined){
            this.removeRiverE = document.getElementById("removeRiverE") as HTMLButtonElement;
            this.removeRiverE.onclick = function(){GodFunctions.removeRiver(Direction.E);};
        }
        return this.removeRiverE;
    }

    getRemoveRiverSE(): HTMLButtonElement{
        if(this.removeRiverSE == undefined){
            this.removeRiverSE = document.getElementById("removeRiverSE") as HTMLButtonElement;
            this.removeRiverSE.onclick = function(){GodFunctions.removeRiver(Direction.SE);};
        }
        return this.removeRiverSE;
    }

    getRemoveRiverSW(): HTMLButtonElement{
        if(this.removeRiverSW == undefined){
            this.removeRiverSW = document.getElementById("removeRiverSW") as HTMLButtonElement;
            this.removeRiverSW.onclick = function(){GodFunctions.removeRiver(Direction.SW);};
        }
        return this.removeRiverSW;
    }

    getRemoveRiverW(): HTMLButtonElement{
        if(this.removeRiverW == undefined){
            this.removeRiverW = document.getElementById("removeRiverW") as HTMLButtonElement;
            this.removeRiverW.onclick = function(){GodFunctions.removeRiver(Direction.W);};
        }
        return this.removeRiverW;
    }

    getSaveRivers(): HTMLButtonElement{
        if(this.saveRivers == undefined){
            this.saveRivers = document.getElementById("SaveRivers") as HTMLButtonElement;
            this.saveRivers.onclick = function(){Saving.saveRivers();};
        }
        return this.saveRivers;
    }
}