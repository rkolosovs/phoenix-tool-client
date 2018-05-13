import { GodFunctions } from "../godmode/godModeFunctions";
import { Direction } from "../map/direction";
import { Saving } from "../app";
export class HarborCreationBox{
    private self: HTMLDivElement;
    private buildHarbor: HTMLTableSectionElement;
    private addHarborNW: HTMLButtonElement;
    private addHarborNE: HTMLButtonElement;
    private addHarborE: HTMLButtonElement;
    private addHarborSE: HTMLButtonElement;
    private addHarborSW: HTMLButtonElement;
    private addHarborW: HTMLButtonElement;
    private removeHarbor: HTMLTableSectionElement;
    private removeHarborNW: HTMLButtonElement;
    private removeHarborNE: HTMLButtonElement;
    private removeHarborE: HTMLButtonElement;
    private removeHarborSE: HTMLButtonElement;
    private removeHarborSW: HTMLButtonElement;
    private removeHarborW: HTMLButtonElement;
    private saveBuildings: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("harborCreationBox") as HTMLDivElement;
        }
        return this.self;
    }

    getBuildHarbor(): HTMLTableSectionElement{
        if(this.buildHarbor == undefined){
            this.buildHarbor = document.getElementById("buildHarbor") as HTMLTableSectionElement;
        }
        return this.buildHarbor;
    }

    getAddHarborNW(): HTMLButtonElement{
        if(this.addHarborNW == undefined){
            this.addHarborNW = document.getElementById("addHarborNW") as HTMLButtonElement;
            this.addHarborNW.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.NW, true)}
        }
        return this.addHarborNW;
    }

    getAddHarborNE(): HTMLButtonElement{
        if(this.addHarborNE == undefined){
            this.addHarborNE = document.getElementById("addHarborNE") as HTMLButtonElement;
            this.addHarborNE.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.NE, true)}
        }
        return this.addHarborNE;
    }

    getAddHarborE(): HTMLButtonElement{
        if(this.addHarborE == undefined){
            this.addHarborE = document.getElementById("addHarborE") as HTMLButtonElement;
            this.addHarborE.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.E, true)}
        }
        return this.addHarborE;
    }

    getAddHarborSE(): HTMLButtonElement{
        if(this.addHarborSE == undefined){
            this.addHarborSE = document.getElementById("addHarborSE") as HTMLButtonElement;
            this.addHarborSE.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.SE, true)}
        }
        return this.addHarborSE;
    }

    getAddHarborSW(): HTMLButtonElement{
        if(this.addHarborSW == undefined){
            this.addHarborSW = document.getElementById("addHarborSW") as HTMLButtonElement;
            this.addHarborSW.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.SW, true)}
        }
        return this.addHarborSW;
    }

    getAddHarborW(): HTMLButtonElement{
        if(this.addHarborW == undefined){
            this.addHarborW = document.getElementById("addHarborW") as HTMLButtonElement;
            this.addHarborW.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.W, true)}
        }
        return this.addHarborW;
    }

    getRemoveHarbor(): HTMLTableSectionElement{
        if(this.removeHarbor == undefined){
            this.removeHarbor = document.getElementById("removeHarbor") as HTMLTableSectionElement;
        }
        return this.removeHarbor;
    }

    getRemoveHarborNW(): HTMLButtonElement{
        if(this.removeHarborNW == undefined){
            this.removeHarborNW = document.getElementById("removeHarborNW") as HTMLButtonElement;
            this.removeHarborNW.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.NW, false)}
        }
        return this.removeHarborNW;
    }

    getRemoveHarborNE(): HTMLButtonElement{
        if(this.removeHarborNE == undefined){
            this.removeHarborNE = document.getElementById("removeHarborNE") as HTMLButtonElement;
            this.removeHarborNE.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.NE, false)}
        }
        return this.removeHarborNE;
    }

    getRemoveHarborE(): HTMLButtonElement{
        if(this.removeHarborE == undefined){
            this.removeHarborE = document.getElementById("removeHarborE") as HTMLButtonElement;
            this.removeHarborE.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.E, false)}
        }
        return this.removeHarborE;
    }

    getRemoveHarborSE(): HTMLButtonElement{
        if(this.removeHarborSE == undefined){
            this.removeHarborSE = document.getElementById("removeHarborSE") as HTMLButtonElement;
            this.removeHarborSE.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.SE, false)}
        }
        return this.removeHarborSE;
    }

    getRemoveHarborSW(): HTMLButtonElement{
        if(this.removeHarborSW == undefined){
            this.removeHarborSW = document.getElementById("removeHarborSW") as HTMLButtonElement;
            this.removeHarborSW.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.SW, false)}
        }
        return this.removeHarborSW;
    }

    getRemoveHarborW(): HTMLButtonElement{
        if(this.removeHarborW == undefined){
            this.removeHarborW = document.getElementById("removeHarborW") as HTMLButtonElement;
            this.removeHarborW.onclick = function(){GodFunctions.manipulateBorderBuilding(6, Direction.W, false)}
        }
        return this.removeHarborW;
    }

    getSaveBuildings(): HTMLButtonElement{
        if(this.saveBuildings == undefined){
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
            this.saveBuildings.onclick = function(){Saving.saveBuildings()}
        }
        return this.saveBuildings;
    }
}