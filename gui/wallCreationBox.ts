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

export class WallCreationBox{
    private self: HTMLDivElement|undefined;
    private buildWall: HTMLTableSectionElement|undefined;
    private addWallNW: HTMLButtonElement|undefined;
    private addWallNE: HTMLButtonElement|undefined;
    private addWallE: HTMLButtonElement|undefined;
    private addWallSE: HTMLButtonElement|undefined;
    private addWallSW: HTMLButtonElement|undefined;
    private addWallW: HTMLButtonElement|undefined;
    private removeWall: HTMLTableSectionElement|undefined;
    private removeWallNW: HTMLButtonElement|undefined;
    private removeWallNE: HTMLButtonElement|undefined;
    private removeWallE: HTMLButtonElement|undefined;
    private removeWallSE: HTMLButtonElement|undefined;
    private removeWallSW: HTMLButtonElement|undefined;
    private removeWallW: HTMLButtonElement|undefined;
    private saveBuildings: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("wallCreationBox") as HTMLDivElement;
        }
        return this.self;
    }

    getBuildWall(): HTMLTableSectionElement{
        if(this.buildWall == undefined){
            this.buildWall = document.getElementById("buildWall") as HTMLTableSectionElement;
        }
        return this.buildWall;
    }

    getAddWallNW(): HTMLButtonElement{
        if(this.addWallNW == undefined){
            this.addWallNW = document.getElementById("addWallNW") as HTMLButtonElement;
            this.addWallNW.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.NW, true);};
        }
        return this.addWallNW;
    }

    getAddWallNE(): HTMLButtonElement{
        if(this.addWallNE == undefined){
            this.addWallNE = document.getElementById("addWallNE") as HTMLButtonElement;
            this.addWallNE.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.NE, true);};
        }
        return this.addWallNE;
    }

    getAddWallE(): HTMLButtonElement{
        if(this.addWallE == undefined){
            this.addWallE = document.getElementById("addWallE") as HTMLButtonElement;
            this.addWallE.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.E, true);};
        }
        return this.addWallE;
    }

    getAddWallSE(): HTMLButtonElement{
        if(this.addWallSE == undefined){
            this.addWallSE = document.getElementById("addWallSE") as HTMLButtonElement;
            this.addWallSE.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.SE, true);};
        }
        return this.addWallSE;
    }

    getAddWallSW(): HTMLButtonElement{
        if(this.addWallSW == undefined){
            this.addWallSW = document.getElementById("addWallSW") as HTMLButtonElement;
            this.addWallSW.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.SW, true);};
        }
        return this.addWallSW;
    }

    getAddWallW(): HTMLButtonElement{
        if(this.addWallW == undefined){
            this.addWallW = document.getElementById("addWallW") as HTMLButtonElement;
            this.addWallW.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.W, true);};
        }
        return this.addWallW;
    }

    getRemoveWall(): HTMLTableSectionElement{
        if(this.removeWall == undefined){
            this.removeWall = document.getElementById("removeWall") as HTMLTableSectionElement;
        }
        return this.removeWall;
    }

    getRemoveWallNW(): HTMLButtonElement{
        if(this.removeWallNW == undefined){
            this.removeWallNW = document.getElementById("removeWallNW") as HTMLButtonElement;
            this.removeWallNW.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.NW, false);};
        }
        return this.removeWallNW;
    }

    getRemoveWallNE(): HTMLButtonElement{
        if(this.removeWallNE == undefined){
            this.removeWallNE = document.getElementById("removeWallNE") as HTMLButtonElement;
            this.removeWallNE.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.NE, false);};
        }
        return this.removeWallNE;
    }

    getRemoveWallE(): HTMLButtonElement{
        if(this.removeWallE == undefined){
            this.removeWallE = document.getElementById("removeWallE") as HTMLButtonElement;
            this.removeWallE.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.E, false);};
        }
        return this.removeWallE;
    }

    getRemoveWallSE(): HTMLButtonElement{
        if(this.removeWallSE == undefined){
            this.removeWallSE = document.getElementById("removeWallSE") as HTMLButtonElement;
            this.removeWallSE.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.SE, false);};
        }
        return this.removeWallSE;
    }

    getRemoveWallSW(): HTMLButtonElement{
        if(this.removeWallSW == undefined){
            this.removeWallSW = document.getElementById("removeWallSW") as HTMLButtonElement;
            this.removeWallSW.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.SW, false);};
        }
        return this.removeWallSW;
    }

    getRemoveWallW(): HTMLButtonElement{
        if(this.removeWallW == undefined){
            this.removeWallW = document.getElementById("removeWallW") as HTMLButtonElement;
            this.removeWallW.onclick = function(){GodFunctions.manipulateBorderBuilding(5, Direction.W, false);};
        }
        return this.removeWallW;
    }

    getSaveBuildings(): HTMLButtonElement{
        if(this.saveBuildings == undefined){
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
            this.saveBuildings.onclick = function(){Saving.saveBuildings();};
        }
        return this.saveBuildings;
    }
}