export class ArmyGeneratorBox{
    private self: HTMLDivElement;
    private ownerField: HTMLInputElement;
    private armyNumberField: HTMLInputElement;
    private countField: HTMLInputElement;
    private leaderField: HTMLInputElement;
    private mountsField: HTMLInputElement;
    private lkpField: HTMLInputElement;
    private skpField: HTMLInputElement;
    private guardField: HTMLInputElement;
    private generateArmyBtn: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("armyGeneratorBox") as HTMLDivElement;
        }
        return this.self;
    }

    getOwnerField(): HTMLInputElement{
        if(this.ownerField == undefined){
            this.ownerField = document.getElementById("ownerField") as HTMLInputElement;
        }
        return this.ownerField;
    }

    getArmyNumberField(): HTMLInputElement{
        if(this.armyNumberField == undefined){
            this.armyNumberField = document.getElementById("armyNumberField") as HTMLInputElement;
        }
        return this.armyNumberField;
    }

    getCountField(): HTMLInputElement{
        if(this.countField == undefined){
            this.countField = document.getElementById("countField") as HTMLInputElement;
        }
        return this.countField;
    }

    getLeaderField(): HTMLInputElement{
        if(this.leaderField == undefined){
            this.leaderField = document.getElementById("leaderField") as HTMLInputElement;
        }
        return this.leaderField;
    }

    getMountsField(): HTMLInputElement{
        if(this.mountsField == undefined){
            this.mountsField = document.getElementById("mountsField") as HTMLInputElement;
        }
        return this.mountsField;
    }

    getLKPField(): HTMLInputElement{
        if(this.lkpField == undefined){
            this.lkpField = document.getElementById("lkpField") as HTMLInputElement;
        }
        return this.lkpField;
    }

    getSKPField(): HTMLInputElement{
        if(this.skpField == undefined){
            this.skpField = document.getElementById("skpField") as HTMLInputElement;
        }
        return this.skpField;
    }

    getGuardField(): HTMLInputElement{
        if(this.guardField == undefined){
            this.guardField = document.getElementById("guardField") as HTMLInputElement;
        }
        return this.guardField;
    }

    getGenerateArmyBtn(): HTMLButtonElement{
        if(this.generateArmyBtn == undefined){
            this.generateArmyBtn = document.getElementById("GenerateArmyBtn") as HTMLButtonElement;
        }
        return this.generateArmyBtn;
    }
}