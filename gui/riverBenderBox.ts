class RiverBenderBox{
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
        }
        return this.addRiverNW;
    }

    getAddRiverNE(): HTMLButtonElement{
        if(this.addRiverNE == undefined){
            this.addRiverNE = document.getElementById("addRiverNE") as HTMLButtonElement;
        }
        return this.addRiverNE;
    }

    getAddRiverE(): HTMLButtonElement{
        if(this.addRiverE == undefined){
            this.addRiverE = document.getElementById("addRiverE") as HTMLButtonElement;
        }
        return this.addRiverE;
    }

    getAddRiverSE(): HTMLButtonElement{
        if(this.addRiverSE == undefined){
            this.addRiverSE = document.getElementById("addRiverSE") as HTMLButtonElement;
        }
        return this.addRiverSE;
    }

    getAddRiverSW(): HTMLButtonElement{
        if(this.addRiverSW == undefined){
            this.addRiverSW = document.getElementById("addRiverSW") as HTMLButtonElement;
        }
        return this.addRiverSW;
    }

    getAddRiverW(): HTMLButtonElement{
        if(this.addRiverW == undefined){
            this.addRiverW = document.getElementById("addRiverW") as HTMLButtonElement;
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
        }
        return this.removeRiverNW;
    }

    getRemoveRiverNE(): HTMLButtonElement{
        if(this.removeRiverNE == undefined){
            this.removeRiverNE = document.getElementById("removeRiverNE") as HTMLButtonElement;
        }
        return this.removeRiverNE;
    }

    getRemoveRiverE(): HTMLButtonElement{
        if(this.removeRiverE == undefined){
            this.removeRiverE = document.getElementById("removeRiverE") as HTMLButtonElement;
        }
        return this.removeRiverE;
    }

    getRemoveRiverSE(): HTMLButtonElement{
        if(this.removeRiverSE == undefined){
            this.removeRiverSE = document.getElementById("removeRiverSE") as HTMLButtonElement;
        }
        return this.removeRiverSE;
    }

    getRemoveRiverSW(): HTMLButtonElement{
        if(this.removeRiverSW == undefined){
            this.removeRiverSW = document.getElementById("removeRiverSW") as HTMLButtonElement;
        }
        return this.removeRiverSW;
    }

    getRemoveRiverW(): HTMLButtonElement{
        if(this.removeRiverW == undefined){
            this.removeRiverW = document.getElementById("removeRiverW") as HTMLButtonElement;
        }
        return this.removeRiverW;
    }

    getSaveRivers(): HTMLButtonElement{
        if(this.saveRivers == undefined){
            this.saveRivers = document.getElementById("SaveRivers") as HTMLButtonElement;
        }
        return this.saveRivers;
    }
}