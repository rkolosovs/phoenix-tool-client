export class ShootingBigBox{
    private self: HTMLDivElement;
    private closeRangedBattleButton: HTMLButtonElement;
    private shootingInfo: HTMLDivElement;
    private shooterTitleText: HTMLDivElement;
    private attackersLKPText: HTMLDivElement;
    private attackersSKPText: HTMLDivElement;
    private targetText: HTMLDivElement;
    private xTargetText: HTMLDivElement;
    private yTargetText: HTMLDivElement;
    private attackLKPBox: HTMLDivElement;
    private lkpInputs: HTMLInputElement[];
    private attackSKPBox: HTMLDivElement;
    private skpInputs: HTMLInputElement[];
    private rangedBattleButton: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("shootingBigBox") as HTMLDivElement;
        }
        return this.self;
    }

    getCloseRangedBattleButton(): HTMLButtonElement{
        if(this.closeRangedBattleButton == undefined){
            this.closeRangedBattleButton = document.getElementById("closeRangedBattleButton") as HTMLButtonElement;
        }
        return this.closeRangedBattleButton;
    }

    getShootingInfo(): HTMLDivElement{
        if(this.shootingInfo == undefined){
            this.shootingInfo = document.getElementById("shootingInfo") as HTMLDivElement;
        }
        return this.shootingInfo;
    }

    getShooterTitleText(): HTMLDivElement{
        if(this.shooterTitleText == undefined){
            this.shooterTitleText = document.getElementById("shooterTitleText") as HTMLDivElement;
        }
        return this.shooterTitleText;
    }

    getAttackersLKPText(): HTMLDivElement{
        if(this.attackersLKPText == undefined){
            this.attackersLKPText = document.getElementById("attackersLKPText") as HTMLDivElement;
        }
        return this.attackersLKPText;
    }

    getAttackersSKPText(): HTMLDivElement{
        if(this.attackersSKPText == undefined){
            this.attackersSKPText = document.getElementById("attackersSKPText") as HTMLDivElement;
        }
        return this.attackersSKPText;
    }

    getTargetText(): HTMLDivElement{
        if(this.targetText == undefined){
            this.targetText = document.getElementById("targetText") as HTMLDivElement;
        }
        return this.targetText;
    }

    getXTargetText(): HTMLDivElement{
        if(this.xTargetText == undefined){
            this.xTargetText = document.getElementById("xTargetText") as HTMLDivElement;
        }
        return this.xTargetText;
    }

    getYTargetText(): HTMLDivElement{
        if(this.yTargetText == undefined){
            this.yTargetText = document.getElementById("yTargetText") as HTMLDivElement;
        }
        return this.yTargetText;
    }

    getAttackLKPBox(): HTMLDivElement{
        if(this.attackLKPBox == undefined){
            this.attackLKPBox = document.getElementById("attackLKPBox") as HTMLDivElement;
        }
        return this.attackLKPBox;
    }

    getLKPInputs(): HTMLInputElement[]{
        if(this.lkpInputs == undefined || this.lkpInputs.length === 0){
            this.lkpInputs = [document.getElementById("LKP0Input") as HTMLInputElement,
                document.getElementById("LKP1Input") as HTMLInputElement,
                document.getElementById("LKP2Input") as HTMLInputElement,
                document.getElementById("LKP3Input") as HTMLInputElement,
                document.getElementById("LKP4Input") as HTMLInputElement,
                document.getElementById("LKP5Input") as HTMLInputElement,
                document.getElementById("LKP6Input") as HTMLInputElement,
                document.getElementById("LKP7Input") as HTMLInputElement,
                document.getElementById("LKP8Input") as HTMLInputElement,
                document.getElementById("LKP9Input") as HTMLInputElement];
        }
        return this.lkpInputs;
    }

    getAttackSKPBox(): HTMLDivElement{
        if(this.attackSKPBox == undefined){
            this.attackSKPBox = document.getElementById("attackSKPBox") as HTMLDivElement;
        }
        return this.attackSKPBox;
    }

    getSKPInputs(): HTMLInputElement[]{
        if(this.skpInputs == undefined || this.skpInputs.length === 0){
            this.skpInputs = [document.getElementById("SKP0Input") as HTMLInputElement,
                document.getElementById("SKP1Input") as HTMLInputElement,
                document.getElementById("SKP2Input") as HTMLInputElement,
                document.getElementById("SKP3Input") as HTMLInputElement,
                document.getElementById("SKP4Input") as HTMLInputElement,
                document.getElementById("SKP5Input") as HTMLInputElement,
                document.getElementById("SKP6Input") as HTMLInputElement,
                document.getElementById("SKP7Input") as HTMLInputElement,
                document.getElementById("SKP8Input") as HTMLInputElement,
                document.getElementById("SKP9Input") as HTMLInputElement];
        }
        return this.skpInputs;
    }

    getRangedBattleButton(): HTMLButtonElement{
        if(this.rangedBattleButton == undefined){
            this.rangedBattleButton = document.getElementById("rangedBattleButton") as HTMLButtonElement;
        }
        return this.rangedBattleButton;
    }
}