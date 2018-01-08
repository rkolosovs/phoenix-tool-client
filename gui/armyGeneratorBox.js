class ArmyGeneratorBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("armyGeneratorBox");
        }
        return this.self;
    }
    getOwnerField() {
        if (this.ownerField == undefined) {
            this.ownerField = document.getElementById("ownerField");
        }
        return this.ownerField;
    }
    getArmyNumberField() {
        if (this.armyNumberField == undefined) {
            this.armyNumberField = document.getElementById("armyNumberField");
        }
        return this.armyNumberField;
    }
    getCountField() {
        if (this.countField == undefined) {
            this.countField = document.getElementById("countField");
        }
        return this.countField;
    }
    getLeaderField() {
        if (this.leaderField == undefined) {
            this.leaderField = document.getElementById("leaderField");
        }
        return this.leaderField;
    }
    getMountsField() {
        if (this.mountsField == undefined) {
            this.mountsField = document.getElementById("mountsField");
        }
        return this.mountsField;
    }
    getLKPField() {
        if (this.lkpField == undefined) {
            this.lkpField = document.getElementById("lkpField");
        }
        return this.lkpField;
    }
    getSKPField() {
        if (this.skpField == undefined) {
            this.skpField = document.getElementById("skpField");
        }
        return this.skpField;
    }
    getGuardField() {
        if (this.guardField == undefined) {
            this.guardField = document.getElementById("guardField");
        }
        return this.guardField;
    }
    getGenerateArmyBtn() {
        if (this.generateArmyBtn == undefined) {
            this.generateArmyBtn = document.getElementById("GenerateArmyBtn");
        }
        return this.generateArmyBtn;
    }
}
