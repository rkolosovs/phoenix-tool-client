"use strict";
class ShootingBigBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("shootingBigBox");
        }
        return this.self;
    }
    getCloseRangedBattleButton() {
        if (this.closeRangedBattleButton == undefined) {
            this.closeRangedBattleButton = document.getElementById("closeRangedBattleButton");
        }
        return this.closeRangedBattleButton;
    }
    getShootingInfo() {
        if (this.shootingInfo == undefined) {
            this.shootingInfo = document.getElementById("shootingInfo");
        }
        return this.shootingInfo;
    }
    getShooterTitleText() {
        if (this.shooterTitleText == undefined) {
            this.shooterTitleText = document.getElementById("shooterTitleText");
        }
        return this.shooterTitleText;
    }
    getAttackersLKPText() {
        if (this.attackersLKPText == undefined) {
            this.attackersLKPText = document.getElementById("attackersLKPText");
        }
        return this.attackersLKPText;
    }
    getAttackersSKPText() {
        if (this.attackersSKPText == undefined) {
            this.attackersSKPText = document.getElementById("attackersSKPText");
        }
        return this.attackersSKPText;
    }
    getTargetText() {
        if (this.targetText == undefined) {
            this.targetText = document.getElementById("targetText");
        }
        return this.targetText;
    }
    getXTargetText() {
        if (this.xTargetText == undefined) {
            this.xTargetText = document.getElementById("xTargetText");
        }
        return this.xTargetText;
    }
    getYTargetText() {
        if (this.yTargetText == undefined) {
            this.yTargetText = document.getElementById("yTargetText");
        }
        return this.yTargetText;
    }
    getAttackLKPBox() {
        if (this.attackLKPBox == undefined) {
            this.attackLKPBox = document.getElementById("attackLKPBox");
        }
        return this.attackLKPBox;
    }
    getLKPInputs() {
        if (this.lkpInputs == undefined || this.lkpInputs.length === 0) {
            this.lkpInputs = [document.getElementById("LKP0Input"),
                document.getElementById("LKP1Input"),
                document.getElementById("LKP2Input"),
                document.getElementById("LKP3Input"),
                document.getElementById("LKP4Input"),
                document.getElementById("LKP5Input"),
                document.getElementById("LKP6Input"),
                document.getElementById("LKP7Input"),
                document.getElementById("LKP8Input"),
                document.getElementById("LKP9Input")];
        }
        return this.lkpInputs;
    }
    getAttackSKPBox() {
        if (this.attackSKPBox == undefined) {
            this.attackSKPBox = document.getElementById("attackSKPBox");
        }
        return this.attackSKPBox;
    }
    getSKPInputs() {
        if (this.skpInputs == undefined || this.skpInputs.length === 0) {
            this.skpInputs = [document.getElementById("SKP0Input"),
                document.getElementById("SKP1Input"),
                document.getElementById("SKP2Input"),
                document.getElementById("SKP3Input"),
                document.getElementById("SKP4Input"),
                document.getElementById("SKP5Input"),
                document.getElementById("SKP6Input"),
                document.getElementById("SKP7Input"),
                document.getElementById("SKP8Input"),
                document.getElementById("SKP9Input")];
        }
        return this.skpInputs;
    }
    getRangedBattleButton() {
        if (this.rangedBattleButton == undefined) {
            this.rangedBattleButton = document.getElementById("rangedBattleButton");
        }
        return this.rangedBattleButton;
    }
}
