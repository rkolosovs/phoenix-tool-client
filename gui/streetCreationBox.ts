import { GodFunctions } from "../godmode/godModeFunctions";
import { Direction } from "../map/direction";
import { Saving } from "../app";

export class StreetCreationBox{
    private self: HTMLDivElement;
    private buildStreet: HTMLTableSectionElement;
    private addStreetNW: HTMLButtonElement;
    private addStreetNE: HTMLButtonElement;
    private addStreetE: HTMLButtonElement;
    private addStreetSE: HTMLButtonElement;
    private addStreetSW: HTMLButtonElement;
    private addStreetW: HTMLButtonElement;
    private removeStreet: HTMLTableSectionElement;
    private removeStreetNW: HTMLButtonElement;
    private removeStreetNE: HTMLButtonElement;
    private removeStreetE: HTMLButtonElement;
    private removeStreetSE: HTMLButtonElement;
    private removeStreetSW: HTMLButtonElement;
    private removeStreetW: HTMLButtonElement;
    private saveBuildings: HTMLButtonElement;

    getSelf(): HTMLDivElement {
        if (this.self == undefined) {
            this.self = document.getElementById("streetCreationBox") as HTMLDivElement;
        }
        return this.self;
    }

    getBuildStreet(): HTMLTableSectionElement {
        if (this.buildStreet == undefined) {
            this.buildStreet = document.getElementById("buildStreet") as HTMLTableSectionElement;
        }
        return this.buildStreet;
    }

    getAddStreetNW(): HTMLButtonElement {
        if (this.addStreetNW == undefined) {
            this.addStreetNW = document.getElementById("addStreetNW") as HTMLButtonElement;
            this.addStreetNW.onclick = function(){GodFunctions.addStreet(Direction.NW);};
        }
        return this.addStreetNW;
    }

    getAddStreetNE(): HTMLButtonElement {
        if (this.addStreetNE == undefined) {
            this.addStreetNE = document.getElementById("addStreetNE") as HTMLButtonElement;
            this.addStreetNE.onclick = function(){GodFunctions.addStreet(Direction.NE);};
        }
        return this.addStreetNE;
    }

    getAddStreetE(): HTMLButtonElement {
        if (this.addStreetE == undefined) {
            this.addStreetE = document.getElementById("addStreetE") as HTMLButtonElement;
            this.addStreetE.onclick = function(){GodFunctions.addStreet(Direction.E);};
        }
        return this.addStreetE;
    }

    getAddStreetSE(): HTMLButtonElement {
        if (this.addStreetSE == undefined) {
            this.addStreetSE = document.getElementById("addStreetSE") as HTMLButtonElement;
            this.addStreetSE.onclick = function(){GodFunctions.addStreet(Direction.SE);};
        }
        return this.addStreetSE;
    }

    getAddStreetSW(): HTMLButtonElement {
        if (this.addStreetSW == undefined) {
            this.addStreetSW = document.getElementById("addStreetSW") as HTMLButtonElement;
            this.addStreetSW.onclick = function(){GodFunctions.addStreet(Direction.SW);};
        }
        return this.addStreetSW;
    }

    getAddStreetW(): HTMLButtonElement {
        if (this.addStreetW == undefined) {
            this.addStreetW = document.getElementById("addStreetW") as HTMLButtonElement;
            this.addStreetW.onclick = function(){GodFunctions.addStreet(Direction.W);};
        }
        return this.addStreetW;
    }

    getRemoveStreet(): HTMLTableSectionElement {
        if (this.removeStreet == undefined) {
            this.removeStreet = document.getElementById("removeStreet") as HTMLTableSectionElement;
        }
        return this.removeStreet;
    }

    getRemoveStreetNW(): HTMLButtonElement {
        if (this.removeStreetNW == undefined) {
            this.removeStreetNW = document.getElementById("removeStreetNW") as HTMLButtonElement;
            this.removeStreetNW.onclick = function(){GodFunctions.removeStreet(Direction.NW);};
        }
        return this.removeStreetNW;
    }

    getRemoveStreetNE(): HTMLButtonElement {
        if (this.removeStreetNE == undefined) {
            this.removeStreetNE = document.getElementById("removeStreetNE") as HTMLButtonElement;
            this.removeStreetNE.onclick = function(){GodFunctions.removeStreet(Direction.NE);};
        }
        return this.removeStreetNE;
    }

    getRemoveStreetE(): HTMLButtonElement {
        if (this.removeStreetE == undefined) {
            this.removeStreetE = document.getElementById("removeStreetE") as HTMLButtonElement;
            this.removeStreetE.onclick = function(){GodFunctions.removeStreet(Direction.E);};
        }
        return this.removeStreetE;
    }

    getRemoveStreetSE(): HTMLButtonElement {
        if (this.removeStreetSE == undefined) {
            this.removeStreetSE = document.getElementById("removeStreetSE") as HTMLButtonElement;
            this.removeStreetSE.onclick = function(){GodFunctions.removeStreet(Direction.SE);};
        }
        return this.removeStreetSE;
    }

    getRemoveStreetSW(): HTMLButtonElement {
        if (this.removeStreetSW == undefined) {
            this.removeStreetSW = document.getElementById("removeStreetSW") as HTMLButtonElement;
            this.removeStreetSW.onclick = function(){GodFunctions.removeStreet(Direction.SW);};
        }
        return this.removeStreetSW;
    }

    getRemoveStreetW(): HTMLButtonElement {
        if (this.removeStreetW == undefined) {
            this.removeStreetW = document.getElementById("removeStreetW") as HTMLButtonElement;
            this.removeStreetW.onclick = function(){GodFunctions.removeStreet(Direction.W);};
        }
        return this.removeStreetW;
    }

    getSaveBuildings(): HTMLButtonElement {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
            this.saveBuildings.onclick = function(){Saving.saveBuildings();};
        }
        return this.saveBuildings;
    }
}