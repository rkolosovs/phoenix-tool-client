"use strict";
class BattleBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("battleBox");
        }
        return this.self;
    }
    getCloseBattleButton() {
        if (this.closeBattleButton == undefined) {
            this.closeBattleButton = document.getElementById("closeBattleButton");
        }
        return this.closeBattleButton;
    }
    getAttackersTitleText() {
        if (this.attackersTitleText == undefined) {
            this.attackersTitleText = document.getElementById("attackersTitleText");
        }
        return this.attackersTitleText;
    }
    getDefendersTitleText() {
        if (this.defendersTitleText == undefined) {
            this.defendersTitleText = document.getElementById("defendersTitleText");
        }
        return this.defendersTitleText;
    }
    getAttackArmiesBox() {
        if (this.attackArmiesBox == undefined) {
            this.attackArmiesBox = document.getElementById("attackArmiesBox");
        }
        return this.attackArmiesBox;
    }
    getUnsortedArmiesBox() {
        if (this.unsortedArmiesBox == undefined) {
            this.unsortedArmiesBox = document.getElementById("unsortedArmiesBox");
        }
        return this.unsortedArmiesBox;
    }
    getDefenseArmiesBox() {
        if (this.defenseArmiesBox == undefined) {
            this.defenseArmiesBox = document.getElementById("defenseArmiesBox");
        }
        return this.defenseArmiesBox;
    }
    getAttackBattleSide() {
        if (this.attackBattleSide == undefined) {
            this.attackBattleSide = document.getElementById("attackBattleSide");
        }
        return this.attackBattleSide;
    }
    getAttackDiceRoll() {
        if (this.attackDiceRoll == undefined) {
            this.attackDiceRoll = document.getElementById("attackDiceRoll");
        }
        return this.attackDiceRoll;
    }
    getDefenseDiceRoll() {
        if (this.defenseDiceRoll == undefined) {
            this.defenseDiceRoll = document.getElementById("defenseDiceRoll");
        }
        return this.defenseDiceRoll;
    }
    getDefenseBattleSide() {
        if (this.defenseBattleSide == undefined) {
            this.defenseBattleSide = document.getElementById("defenseBattleSide");
        }
        return this.defenseBattleSide;
    }
    getBattleButton() {
        if (this.battleButton == undefined) {
            this.battleButton = document.getElementById("battleButton");
        }
        return this.battleButton;
    }
}
