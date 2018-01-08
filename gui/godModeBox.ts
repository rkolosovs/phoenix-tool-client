class GodModeBox{
    private self: HTMLDivElement;
    private toggleWorldCreationMode: HTMLButtonElement;
    private toggleRiverCreationMode: HTMLButtonElement;
    private toggleBuildingCreationMode: HTMLButtonElement;
    private toggleStreetBuildingMode: HTMLButtonElement;
    private toggleWallBuildingMode: HTMLButtonElement;
    private toggleHarborBuildingMode: HTMLButtonElement;
    private toggleBridgeBuildingMode: HTMLButtonElement;
    private saveArmies: HTMLButtonElement;
    private saveFactionsTerritories: HTMLButtonElement;
    private toggleArmyCreationMode: HTMLButtonElement;
    private godDeleteSelectedArmy: HTMLButtonElement;
    private factionToCreateBuildingsFor: HTMLSelectElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("godmodeBox") as HTMLDivElement;
        }
        return this.self;
    }

    getToggleWorldCreationMode(): HTMLButtonElement{
        if(this.toggleWorldCreationMode == undefined){
            this.toggleWorldCreationMode = document.getElementById("ToggleWorldCreationMode") as HTMLButtonElement;
        }
        return this.toggleWorldCreationMode;
    }

    getToggleRiverCreationMode(): HTMLButtonElement{
        if(this.toggleRiverCreationMode == undefined){
            this.toggleRiverCreationMode = document.getElementById("ToggleRiverCreationMode") as HTMLButtonElement;
        }
        return this.toggleRiverCreationMode;
    }

    getToggleBuildingCreationMode(): HTMLButtonElement{
        if(this.toggleBuildingCreationMode == undefined){
            this.toggleBuildingCreationMode = document.getElementById("ToggleBuildingCreationMode") as HTMLButtonElement;
        }
        return this.toggleBuildingCreationMode;
    }

    getToggleStreetBuildingMode(): HTMLButtonElement{
        if(this.toggleStreetBuildingMode == undefined){
            this.toggleStreetBuildingMode = document.getElementById("ToggleStreetBuildingMode") as HTMLButtonElement;
        }
        return this.toggleStreetBuildingMode;
    }

    getToggleWallBuildingMode(): HTMLButtonElement{
        if(this.toggleWallBuildingMode == undefined){
            this.toggleWallBuildingMode = document.getElementById("ToggleWallBuildingMode") as HTMLButtonElement;
        }
        return this.toggleWallBuildingMode;
    }

    getToggleHarborBuildingMode(): HTMLButtonElement{
        if(this.toggleHarborBuildingMode == undefined){
            this.toggleHarborBuildingMode = document.getElementById("ToggleHarborBuildingMode") as HTMLButtonElement;
        }
        return this.toggleHarborBuildingMode;
    }

    getToggleBridgeBuildingMode(): HTMLButtonElement{
        if(this.toggleBridgeBuildingMode == undefined){
            this.toggleBridgeBuildingMode = document.getElementById("ToggleBridgeBuildingMode") as HTMLButtonElement;
        }
        return this.toggleBridgeBuildingMode;
    }

    getSaveArmies(): HTMLButtonElement{
        if(this.saveArmies == undefined){
            this.saveArmies = document.getElementById("SaveArmies") as HTMLButtonElement;
        }
        return this.saveArmies;
    }

    getSaveFactionsTerritories(): HTMLButtonElement{
        if(this.saveFactionsTerritories == undefined){
            this.saveFactionsTerritories = document.getElementById("SaveFactionsTerritories") as HTMLButtonElement;
        }
        return this.saveFactionsTerritories;
    }

    getToggleArmyCreationMode(): HTMLButtonElement{
        if(this.toggleArmyCreationMode == undefined){
            this.toggleArmyCreationMode = document.getElementById("ToggleArmyCreationMode") as HTMLButtonElement;
        }
        return this.toggleArmyCreationMode;
    }

    getGodDeleteSelectedArmy(): HTMLButtonElement{
        if(this.godDeleteSelectedArmy == undefined){
            this.godDeleteSelectedArmy = document.getElementById("GodDeleteSelectedArmy") as HTMLButtonElement;
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