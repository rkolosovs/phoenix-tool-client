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
        }
        return this.addWallNW;
    }

    getAddWallNE(): HTMLButtonElement{
        if(this.addWallNE == undefined){
            this.addWallNE = document.getElementById("addWallNE") as HTMLButtonElement;
        }
        return this.addWallNE;
    }

    getAddWallE(): HTMLButtonElement{
        if(this.addWallE == undefined){
            this.addWallE = document.getElementById("addWallE") as HTMLButtonElement;
        }
        return this.addWallE;
    }

    getAddWallSE(): HTMLButtonElement{
        if(this.addWallSE == undefined){
            this.addWallSE = document.getElementById("addWallSE") as HTMLButtonElement;
        }
        return this.addWallSE;
    }

    getAddWallSW(): HTMLButtonElement{
        if(this.addWallSW == undefined){
            this.addWallSW = document.getElementById("addWallSW") as HTMLButtonElement;
        }
        return this.addWallSW;
    }

    getAddWallW(): HTMLButtonElement{
        if(this.addWallW == undefined){
            this.addWallW = document.getElementById("addWallW") as HTMLButtonElement;
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
        }
        return this.removeWallNW;
    }

    getRemoveWallNE(): HTMLButtonElement{
        if(this.removeWallNE == undefined){
            this.removeWallNE = document.getElementById("removeWallNE") as HTMLButtonElement;
        }
        return this.removeWallNE;
    }

    getRemoveWallE(): HTMLButtonElement{
        if(this.removeWallE == undefined){
            this.removeWallE = document.getElementById("removeWallE") as HTMLButtonElement;
        }
        return this.removeWallE;
    }

    getRemoveWallSE(): HTMLButtonElement{
        if(this.removeWallSE == undefined){
            this.removeWallSE = document.getElementById("removeWallSE") as HTMLButtonElement;
        }
        return this.removeWallSE;
    }

    getRemoveWallSW(): HTMLButtonElement{
        if(this.removeWallSW == undefined){
            this.removeWallSW = document.getElementById("removeWallSW") as HTMLButtonElement;
        }
        return this.removeWallSW;
    }

    getRemoveWallW(): HTMLButtonElement{
        if(this.removeWallW == undefined){
            this.removeWallW = document.getElementById("removeWallW") as HTMLButtonElement;
        }
        return this.removeWallW;
    }

    getSaveBuildings(): HTMLButtonElement{
        if(this.saveBuildings == undefined){
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
        }
        return this.saveBuildings;
    }
}