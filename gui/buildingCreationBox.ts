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

import {GodFunctions, Saving} from "../types";

export class BuildingCreationBox{
    private self: HTMLDivElement|undefined;
    private addCastle: HTMLButtonElement|undefined;
    private addCity: HTMLButtonElement|undefined;
    private addFortress: HTMLButtonElement|undefined;
    private addCapital: HTMLButtonElement|undefined;
    private addCapitalFortress: HTMLButtonElement|undefined;
    private deleteBuilding: HTMLButtonElement|undefined;
    private saveBuildings: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("buildingCreationBox") as HTMLDivElement;
        }
        return this.self;
    }

    getAddCastle(): HTMLButtonElement{
        if(this.addCastle == undefined){
            this.addCastle = document.getElementById("addCastle") as HTMLButtonElement;
            this.addCastle.onclick = function(){GodFunctions.addCastle();};
        }
        return this.addCastle;
    }

    getAddCity(): HTMLButtonElement{
        if(this.addCity == undefined){
            this.addCity = document.getElementById("addCity") as HTMLButtonElement;
            this.addCity.onclick = function(){GodFunctions.addCity();};
        }
        return this.addCity;
    }

    getAddFortress(): HTMLButtonElement{
        if(this.addFortress == undefined){
            this.addFortress = document.getElementById("addFortress") as HTMLButtonElement;
            this.addFortress.onclick = function(){GodFunctions.addFortress();};
        }
        return this.addFortress;
    }

    getAddCapital(): HTMLButtonElement{
        if(this.addCapital == undefined){
            this.addCapital = document.getElementById("addCapital") as HTMLButtonElement;
            this.addCapital.onclick = function(){GodFunctions.addCapital();};
        }
        return this.addCapital;
    }

    getAddCapitalFortress(): HTMLButtonElement{
        if(this.addCapitalFortress == undefined){
            this.addCapitalFortress = document.getElementById("addCapitalFortress") as HTMLButtonElement;
            this.addCapitalFortress.onclick = function(){GodFunctions.addCapitalFortress();};
        }
        return this.addCapitalFortress;
    }

    getDeleteBuilding(): HTMLButtonElement{
        if(this.deleteBuilding == undefined){
            this.deleteBuilding = document.getElementById("deleteBuilding") as HTMLButtonElement;
            this.deleteBuilding.onclick = function(){GodFunctions.deleteSelectedProductionBuilding();};
        }
        return this.deleteBuilding;
    }

    getSaveBuildings(): HTMLButtonElement{
        if(this.saveBuildings == undefined){
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
            this.saveBuildings.onclick = function(){Saving.saveBuildings();};
        }
        return this.saveBuildings;
    }
}