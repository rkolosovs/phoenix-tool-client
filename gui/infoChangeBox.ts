class InfoChangeBox{
    private self: HTMLDivElement;
    private guardChangeInput: HTMLInputElement;
    private ownerChangeInput: HTMLInputElement;
    private armyIdChangeInput: HTMLInputElement;
    private countChangeInput: HTMLInputElement;
    private leadersChangeInput: HTMLInputElement;
    private mountsChangeInput: HTMLInputElement;
    private lkpChangeInput: HTMLInputElement;
    private skpChangeInput: HTMLInputElement;
    private movePointsChangeInput: HTMLInputElement;
    private heightPointsChangeInput: HTMLInputElement;
    private changeArmyInfo: HTMLButtonElement;
    private logoutBtnChange: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("infoChangeBox") as HTMLDivElement;
        }
        return this.self;
    }

    getGuardChangeInput(): HTMLInputElement{
        if(this.guardChangeInput == undefined){
            this.guardChangeInput = document.getElementById("guardChangeInput") as HTMLInputElement;
        }
        return this.guardChangeInput;
    }

    getOwnerChangeInput(): HTMLInputElement{
        if(this.ownerChangeInput == undefined){
            this.ownerChangeInput = document.getElementById("ownerChangeInput") as HTMLInputElement;
        }
        return this.ownerChangeInput;
    }

    getArmyIdChangeInput(): HTMLInputElement{
        if(this.armyIdChangeInput == undefined){
            this.armyIdChangeInput = document.getElementById("armyIdChangeInput") as HTMLInputElement;
        }
        return this.armyIdChangeInput;
    }

    getCountChangeInput(): HTMLInputElement{
        if(this.countChangeInput == undefined){
            this.countChangeInput = document.getElementById("countChangeInput") as HTMLInputElement;
        }
        return this.countChangeInput;
    }

    getLeadersChangeInput(): HTMLInputElement{
        if(this.leadersChangeInput == undefined){
            this.leadersChangeInput = document.getElementById("leadersChangeInput") as HTMLInputElement;
        }
        return this.leadersChangeInput;
    }

    getMountsChangeInput(): HTMLInputElement{
        if(this.mountsChangeInput == undefined){
            this.mountsChangeInput = document.getElementById("mountsChangeInput") as HTMLInputElement;
        }
        return this.mountsChangeInput;
    }

    getLKPChangeInput(): HTMLInputElement{
        if(this.lkpChangeInput == undefined){
            this.lkpChangeInput = document.getElementById("lkpChangeInput") as HTMLInputElement;
        }
        return this.lkpChangeInput;
    }

    getSKPChangeInput(): HTMLInputElement{
        if(this.skpChangeInput == undefined){
            this.skpChangeInput = document.getElementById("skpChangeInput") as HTMLInputElement;
        }
        return this.skpChangeInput;
    }

    getMovePointsChangeInput(): HTMLInputElement{
        if(this.movePointsChangeInput == undefined){
            this.movePointsChangeInput = document.getElementById("movePointsChangeInput") as HTMLInputElement;
        }
        return this.movePointsChangeInput;
    }

    getHeightPointsChangeInput(): HTMLInputElement{
        if(this.heightPointsChangeInput == undefined){
            this.heightPointsChangeInput = document.getElementById("heightPointsChangeInput") as HTMLInputElement;
        }
        return this.heightPointsChangeInput;
    }

    getChangeArmyInfoButton(): HTMLButtonElement{
        if(this.changeArmyInfo == undefined){
            this.changeArmyInfo = document.getElementById("changeArmyInfo") as HTMLButtonElement;
        }
        return this.changeArmyInfo;
    }

    getLogoutButton(): HTMLButtonElement{
        if(this.logoutBtnChange == undefined){
            this.logoutBtnChange = document.getElementById("logoutBtnChange") as HTMLButtonElement;
        }
        return this.logoutBtnChange;
    }
}