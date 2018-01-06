class ShootingBigBox extends HTMLDivElement{
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
    private lkp0Input: HTMLInputElement;
    private lkp1Input: HTMLInputElement;
    private lkp2Input: HTMLInputElement;
    private lkp3Input: HTMLInputElement;
    private lkp4Input: HTMLInputElement;
    private lkp5Input: HTMLInputElement;
    private lkp6Input: HTMLInputElement;
    private lkp7Input: HTMLInputElement;
    private lkp8Input: HTMLInputElement;
    private lkp9Input: HTMLInputElement;
    private attackSKPBox: HTMLDivElement;
    private skp0Input: HTMLInputElement;
    private skp1Input: HTMLInputElement;
    private skp2Input: HTMLInputElement;
    private skp3Input: HTMLInputElement;
    private skp4Input: HTMLInputElement;
    private skp5Input: HTMLInputElement;
    private skp6Input: HTMLInputElement;
    private skp7Input: HTMLInputElement;
    private skp8Input: HTMLInputElement;
    private skp9Input: HTMLInputElement;
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

    getLKP0Input(): HTMLInputElement{
        if(this.lkp0Input == undefined){
            this.lkp0Input = document.getElementById("LKP0Input") as HTMLInputElement;
        }
        return this.lkp0Input;
    }

    getLKP1Input(): HTMLInputElement{
        if(this.lkp1Input == undefined){
            this.lkp1Input = document.getElementById("LKP1Input") as HTMLInputElement;
        }
        return this.lkp1Input;
    }

    getLKP2Input(): HTMLInputElement{
        if(this.lkp2Input == undefined){
            this.lkp2Input = document.getElementById("LKP2Input") as HTMLInputElement;
        }
        return this.lkp2Input;
    }

    getLKP3Input(): HTMLInputElement{
        if(this.lkp3Input == undefined){
            this.lkp3Input = document.getElementById("LKP3Input") as HTMLInputElement;
        }
        return this.lkp3Input;
    }

    getLKP4Input(): HTMLInputElement{
        if(this.lkp4Input == undefined){
            this.lkp4Input = document.getElementById("LKP4Input") as HTMLInputElement;
        }
        return this.lkp4Input;
    }

    getLKP5Input(): HTMLInputElement{
        if(this.lkp5Input == undefined){
            this.lkp5Input = document.getElementById("LKP5Input") as HTMLInputElement;
        }
        return this.lkp5Input;
    }

    getLKP6Input(): HTMLInputElement{
        if(this.lkp6Input == undefined){
            this.lkp6Input = document.getElementById("LKP6Input") as HTMLInputElement;
        }
        return this.lkp6Input;
    }

    getLKP7Input(): HTMLInputElement{
        if(this.lkp7Input == undefined){
            this.lkp7Input = document.getElementById("LKP7Input") as HTMLInputElement;
        }
        return this.lkp7Input;
    }

    getLKP8Input(): HTMLInputElement{
        if(this.lkp8Input == undefined){
            this.lkp8Input = document.getElementById("LKP8Input") as HTMLInputElement;
        }
        return this.lkp8Input;
    }

    getLKP9Input(): HTMLInputElement{
        if(this.lkp9Input == undefined){
            this.lkp9Input = document.getElementById("LKP9Input") as HTMLInputElement;
        }
        return this.lkp9Input;
    }

    getAttackSKPBox(): HTMLDivElement{
        if(this.attackSKPBox == undefined){
            this.attackSKPBox = document.getElementById("attackSKPBox") as HTMLDivElement;
        }
        return this.attackSKPBox;
    }

    getSKP0Input(): HTMLInputElement{
        if(this.skp0Input == undefined){
            this.skp0Input = document.getElementById("SKP0Input") as HTMLInputElement;
        }
        return this.skp0Input;
    }

    getSKP1Input(): HTMLInputElement{
        if(this.skp1Input == undefined){
            this.skp1Input = document.getElementById("SKP1Input") as HTMLInputElement;
        }
        return this.skp1Input;
    }

    getSKP2Input(): HTMLInputElement{
        if(this.skp2Input == undefined){
            this.skp2Input = document.getElementById("SKP2Input") as HTMLInputElement;
        }
        return this.skp2Input;
    }

    getSKP3Input(): HTMLInputElement{
        if(this.skp0Input == undefined){
            this.skp3Input = document.getElementById("SKP3Input") as HTMLInputElement;
        }
        return this.skp3Input;
    }

    getSKP4Input(): HTMLInputElement{
        if(this.skp4Input == undefined){
            this.skp4Input = document.getElementById("SKP4Input") as HTMLInputElement;
        }
        return this.skp4Input;
    }

    getSKP5Input(): HTMLInputElement{
        if(this.skp5Input == undefined){
            this.skp5Input = document.getElementById("SKP5Input") as HTMLInputElement;
        }
        return this.skp5Input;
    }

    getSKP6Input(): HTMLInputElement{
        if(this.skp6Input == undefined){
            this.skp6Input = document.getElementById("SKP6Input") as HTMLInputElement;
        }
        return this.skp6Input;
    }

    getSKP7Input(): HTMLInputElement{
        if(this.skp7Input == undefined){
            this.skp7Input = document.getElementById("SKP7Input") as HTMLInputElement;
        }
        return this.skp7Input;
    }

    getSKP8Input(): HTMLInputElement{
        if(this.skp8Input == undefined){
            this.skp8Input = document.getElementById("SKP8Input") as HTMLInputElement;
        }
        return this.skp8Input;
    }

    getSKP9Input(): HTMLInputElement{
        if(this.skp9Input == undefined){
            this.skp9Input = document.getElementById("SKP9Input") as HTMLInputElement;
        }
        return this.skp9Input;
    }

    getRangedBattleButton(): HTMLButtonElement{
        if(this.rangedBattleButton == undefined){
            this.rangedBattleButton = document.getElementById("rangedBattleButton") as HTMLButtonElement;
        }
        return this.rangedBattleButton;
    }
}