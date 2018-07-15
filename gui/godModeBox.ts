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

import {BoxVisibility} from "./boxVisibilty";
import {Saving} from "../serverInteraction/savingFunctions";
import { GodFunctions } from "../godmode/godModeFunctions";

export class GodModeBox{
    private self: HTMLDivElement|undefined;
    private toggleWorldCreationMode: HTMLButtonElement|undefined;
    private toggleRiverCreationMode: HTMLButtonElement|undefined;
    private toggleBuildingCreationMode: HTMLButtonElement|undefined;
    private toggleStreetBuildingMode: HTMLButtonElement|undefined;
    private toggleWallBuildingMode: HTMLButtonElement|undefined;
    private toggleHarborBuildingMode: HTMLButtonElement|undefined;
    private toggleBridgeBuildingMode: HTMLButtonElement|undefined;
    private saveArmies: HTMLButtonElement|undefined;
    private saveFactionsTerritories: HTMLButtonElement|undefined;
    private toggleArmyCreationMode: HTMLButtonElement|undefined;
    private godDeleteSelectedArmy: HTMLButtonElement|undefined;
    private factionToCreateBuildingsFor: HTMLSelectElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("godmodeBox") as HTMLDivElement;
        }
        return this.self;
    }

    getToggleWorldCreationMode(): HTMLButtonElement{
        if(this.toggleWorldCreationMode == undefined){
            this.toggleWorldCreationMode = document.getElementById("ToggleWorldCreationMode") as HTMLButtonElement;
            this.toggleWorldCreationMode.onclick = function(){BoxVisibility.toggleWorldCreationMode();};
        }
        return this.toggleWorldCreationMode;
    }

    getToggleRiverCreationMode(): HTMLButtonElement{
        if(this.toggleRiverCreationMode == undefined){
            this.toggleRiverCreationMode = document.getElementById("ToggleRiverCreationMode") as HTMLButtonElement;
            this.toggleRiverCreationMode.onclick = function(){BoxVisibility.toggleRiverCreationMode();};
        }
        return this.toggleRiverCreationMode;
    }

    getToggleBuildingCreationMode(): HTMLButtonElement{
        if(this.toggleBuildingCreationMode == undefined){
            this.toggleBuildingCreationMode = document.getElementById("ToggleBuildingCreationMode") as HTMLButtonElement;
            this.toggleBuildingCreationMode.onclick = function(){BoxVisibility.toggleBuildingCreationMode();};
        }
        return this.toggleBuildingCreationMode;
    }

    getToggleStreetBuildingMode(): HTMLButtonElement{
        if(this.toggleStreetBuildingMode == undefined){
            this.toggleStreetBuildingMode = document.getElementById("ToggleStreetBuildingMode") as HTMLButtonElement;
            this.toggleStreetBuildingMode.onclick = function(){BoxVisibility.toggleStreetBuildingMode();};
        }
        return this.toggleStreetBuildingMode;
    }

    getToggleWallBuildingMode(): HTMLButtonElement{
        if(this.toggleWallBuildingMode == undefined){
            this.toggleWallBuildingMode = document.getElementById("ToggleWallBuildingMode") as HTMLButtonElement;
            this.toggleWallBuildingMode.onclick = function(){BoxVisibility.toggleWallBuildingMode();};
        }
        return this.toggleWallBuildingMode;
    }

    getToggleHarborBuildingMode(): HTMLButtonElement{
        if(this.toggleHarborBuildingMode == undefined){
            this.toggleHarborBuildingMode = document.getElementById("ToggleHarborBuildingMode") as HTMLButtonElement;
            this.toggleHarborBuildingMode.onclick = function(){BoxVisibility.toggleHarborBuildingMode();};
        }
        return this.toggleHarborBuildingMode;
    }

    getToggleBridgeBuildingMode(): HTMLButtonElement{
        if(this.toggleBridgeBuildingMode == undefined){
            this.toggleBridgeBuildingMode = document.getElementById("ToggleBridgeBuildingMode") as HTMLButtonElement;
            this.toggleBridgeBuildingMode.onclick = function(){BoxVisibility.toggleBridgeBuildingMode();};
        }
        return this.toggleBridgeBuildingMode;
    }

    getSaveArmies(): HTMLButtonElement{
        if(this.saveArmies == undefined){
            this.saveArmies = document.getElementById("SaveArmies") as HTMLButtonElement;
            this.saveArmies.onclick = function(){Saving.saveArmies();};
        }
        return this.saveArmies;
    }

    getSaveFactionsTerritories(): HTMLButtonElement{
        if(this.saveFactionsTerritories == undefined){
            this.saveFactionsTerritories = document.getElementById("SaveFactionsTerritories") as HTMLButtonElement;
            this.saveFactionsTerritories.onclick = function(){Saving.saveFactionsTerritories();};
        }
        return this.saveFactionsTerritories;
    }

    getToggleArmyCreationMode(): HTMLButtonElement{
        if(this.toggleArmyCreationMode == undefined){
            this.toggleArmyCreationMode = document.getElementById("ToggleArmyCreationMode") as HTMLButtonElement;
            this.toggleArmyCreationMode.onclick = function(){BoxVisibility.toggleArmyCreationMode();};
        }
        return this.toggleArmyCreationMode;
    }

    getGodDeleteSelectedArmy(): HTMLButtonElement{
        if(this.godDeleteSelectedArmy == undefined){
            this.godDeleteSelectedArmy = document.getElementById("GodDeleteSelectedArmy") as HTMLButtonElement;
            this.godDeleteSelectedArmy.onclick = function(){GodFunctions.godDeleteSelectedArmy();};
        }
        return this.godDeleteSelectedArmy;
    }

    getFactionToCreateBuildingsFor(): HTMLSelectElement{
        if(this.factionToCreateBuildingsFor == undefined){
            this.factionToCreateBuildingsFor = document.getElementById("factionToCreateBuildingsFor") as HTMLSelectElement;
        }
        return this.factionToCreateBuildingsFor;
    }
}