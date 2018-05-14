import { GodFunctions } from "../godmode/godModeFunctions";
import { Direction } from "../map/direction";
import { Saving } from "../app";

export class WallCreationBox{
    private self: HTMLDivElement;
    private buildWall: HTMLTableSectionElement;
    private addWallNW: HTMLButtonElement;
    private addWallNE: HTMLButtonElement;
    private addWallE: HTMLButtonElement;
    private addWallSE: HTMLButtonElement;
    private addWallSW: HTMLButtonElement;
    private addWallW: HTMLButtonElement;
    private removeWall: HTMLTableSectionElement;
    private removeWallNW: HTMLButtonElement;
    private removeWallNE: HTMLButtonElement;
    private removeWallE: HTMLButtonElement;
    private removeWallSE: HTMLButtonElement;
    private removeWallSW: HTMLButtonElement;
    private removeWallW: HTMLButtonElement;
    private saveBuildings: HTMLButtonElement;

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