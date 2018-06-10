/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

export class ShootingBigBox{
    private self: HTMLDivElement|undefined;
    private closeRangedBattleButton: HTMLButtonElement|undefined;
    private shootingInfo: HTMLDivElement|undefined;
    private shooterTitleText: HTMLDivElement|undefined;
    private attackersLKPText: HTMLDivElement|undefined;
    private attackersSKPText: HTMLDivElement|undefined;
    private targetText: HTMLDivElement|undefined;
    private xTargetText: HTMLDivElement|undefined;
    private yTargetText: HTMLDivElement|undefined;
    private attackLKPBox: HTMLDivElement|undefined;
    private lkpInputs: HTMLInputElement[]|undefined;
    private attackSKPBox: HTMLDivElement|undefined;
    private skpInputs: HTMLInputElement[]|undefined;
    private rangedBattleButton: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("shootingBigBox") as HTMLDivElement;
        }
        return this.self;
    }

    getCloseRangedBattleButton(): HTMLButtonElement{
        if(this.closeRangedBattleButton == undefined){
            this.closeRangedBattleButton = document.getElementById("closeRangedBattleButton") as HTMLButtonElement;
            // onclick gets set in shootEvent.ts
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
            // onclick gets set in shootEvent.ts
        }
        return this.rangedBattleButton;
    }
}