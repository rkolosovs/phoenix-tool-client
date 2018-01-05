class BattleBox extends HTMLDivElement{
    private closeBattleButton: HTMLButtonElement;
    private attackersTitleText: HTMLDivElement;
    private defendersTitleText: HTMLDivElement;
    private attackArmiesBox: HTMLDivElement;
    private unsortedArmiesBox: HTMLDivElement;
    private defenseArmiesBox: HTMLDivElement;
    private attackBattleSide: HTMLDivElement;
    private attackDiceRoll: HTMLSelectElement;
    private defenseDiceRoll: HTMLSelectElement;
    private defenseBattleSide: HTMLDivElement;
    private battleButton: HTMLButtonElement;

    getCloseBattleButton(): HTMLButtonElement{
        if(this.closeBattleButton == undefined){
            this.closeBattleButton = document.getElementById("closeBattleButton") as HTMLButtonElement;
        }
        return this.closeBattleButton;
    }

    getAttackersTitleText(): HTMLDivElement{
        if(this.attackersTitleText == undefined){
            this.attackersTitleText = document.getElementById("attackersTitleText") as HTMLDivElement;
        }
        return this.attackersTitleText;
    }

    getDefendersTitleText(): HTMLDivElement{
        if(this.defendersTitleText == undefined){
            this.defendersTitleText = document.getElementById("defendersTitleText") as HTMLDivElement;
        }
        return this.defendersTitleText;
    }

    getAttackArmiesBox(): HTMLDivElement{
        if(this.attackArmiesBox == undefined){
            this.attackArmiesBox = document.getElementById("attackArmiesBox") as HTMLDivElement;
        }
        return this.attackArmiesBox;
    }

    getUnsortedArmiesBox(): HTMLDivElement{
        if(this.unsortedArmiesBox == undefined){
            this.unsortedArmiesBox = document.getElementById("unsortedArmiesBox") as HTMLDivElement;
        }
        return this.unsortedArmiesBox;
    }

    getDefenseArmiesBox(): HTMLDivElement{
        if(this.defenseArmiesBox == undefined){
            this.defenseArmiesBox = document.getElementById("defenseArmiesBox") as HTMLDivElement;
        }
        return this.defenseArmiesBox;
    }

    getAttackBattleSide(): HTMLDivElement{
        if(this.attackBattleSide == undefined){
            this.attackBattleSide = document.getElementById("attackBattleSide") as HTMLDivElement;
        }
        return this.attackBattleSide;
    }

    getAttackDiceRoll(): HTMLSelectElement{
        if(this.attackDiceRoll == undefined){
            this.attackDiceRoll = document.getElementById("attackDiceRoll") as HTMLSelectElement;
        }
        return this.attackDiceRoll;
    }

    getDefenseDiceRoll(): HTMLSelectElement{
        if(this.defenseDiceRoll == undefined){
            this.defenseDiceRoll = document.getElementById("defenseDiceRoll") as HTMLSelectElement;
        }
        return this.defenseDiceRoll;
    }

    getDefenseBattleSide(): HTMLDivElement{
        if(this.defenseBattleSide == undefined){
            this.defenseBattleSide = document.getElementById("defenseBattleSide") as HTMLDivElement;
        }
        return this.defenseBattleSide;
    }

    getBattleButton(): HTMLButtonElement{
        if(this.battleButton == undefined){
            this.battleButton = document.getElementById("battleButton") as HTMLButtonElement;
        }
        return this.battleButton;
    }
}