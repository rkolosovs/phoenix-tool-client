export class BuildingCreationBox{
    private self: HTMLDivElement;
    private addCastle: HTMLButtonElement;
    private addCity: HTMLButtonElement;
    private addFortress: HTMLButtonElement;
    private addCapital: HTMLButtonElement;
    private addCapitalFortress: HTMLButtonElement;
    private deleteBuilding: HTMLButtonElement;
    private saveBuildings: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("buildingCreationBox") as HTMLDivElement;
        }
        return this.self;
    }

    getAddCastle(): HTMLButtonElement{
        if(this.addCastle == undefined){
            this.addCastle = document.getElementById("addCastle") as HTMLButtonElement;
        }
        return this.addCastle;
    }

    getAddCity(): HTMLButtonElement{
        if(this.addCity == undefined){
            this.addCity = document.getElementById("addCity") as HTMLButtonElement;
        }
        return this.addCity;
    }

    getAddFortress(): HTMLButtonElement{
        if(this.addFortress == undefined){
            this.addFortress = document.getElementById("addFortress") as HTMLButtonElement;
        }
        return this.addFortress;
    }

    getAddCapital(): HTMLButtonElement{
        if(this.addCapital == undefined){
            this.addCapital = document.getElementById("addCapital") as HTMLButtonElement;
        }
        return this.addCapital;
    }

    getAddCapitalFortress(): HTMLButtonElement{
        if(this.addCapitalFortress == undefined){
            this.addCapitalFortress = document.getElementById("addCapitalFortress") as HTMLButtonElement;
        }
        return this.addCapitalFortress;
    }

    getDeleteBuilding(): HTMLButtonElement{
        if(this.deleteBuilding == undefined){
            this.deleteBuilding = document.getElementById("deleteBuilding") as HTMLButtonElement;
        }
        return this.deleteBuilding;
    }

    getSaveBuildings(): HTMLButtonElement{
        if(this.saveBuildings == undefined){
            this.saveBuildings = document.getElementById("SaveBuildings") as HTMLButtonElement;
        }
        return this.saveBuildings;
    }
}