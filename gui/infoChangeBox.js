class InfoChangeBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("infoChangeBox");
        }
        return this.self;
    }
    getGuardChangeInput() {
        if (this.guardChangeInput == undefined) {
            this.guardChangeInput = document.getElementById("guardChangeInput");
        }
        return this.guardChangeInput;
    }
    getOwnerChangeInput() {
        if (this.ownerChangeInput == undefined) {
            this.ownerChangeInput = document.getElementById("ownerChangeInput");
        }
        return this.ownerChangeInput;
    }
    getArmyIdChangeInput() {
        if (this.armyIdChangeInput == undefined) {
            this.armyIdChangeInput = document.getElementById("armyIdChangeInput");
        }
        return this.armyIdChangeInput;
    }
    getCountChangeInput() {
        if (this.countChangeInput == undefined) {
            this.countChangeInput = document.getElementById("countChangeInput");
        }
        return this.countChangeInput;
    }
    getLeadersChangeInput() {
        if (this.leadersChangeInput == undefined) {
            this.leadersChangeInput = document.getElementById("leadersChangeInput");
        }
        return this.leadersChangeInput;
    }
    getMountsChangeInput() {
        if (this.mountsChangeInput == undefined) {
            this.mountsChangeInput = document.getElementById("mountsChangeInput");
        }
        return this.mountsChangeInput;
    }
    getLKPChangeInput() {
        if (this.lkpChangeInput == undefined) {
            this.lkpChangeInput = document.getElementById("lkpChangeInput");
        }
        return this.lkpChangeInput;
    }
    getSKPChangeInput() {
        if (this.skpChangeInput == undefined) {
            this.skpChangeInput = document.getElementById("skpChangeInput");
        }
        return this.skpChangeInput;
    }
    getMovePointsChangeInput() {
        if (this.movePointsChangeInput == undefined) {
            this.movePointsChangeInput = document.getElementById("movePointsChangeInput");
        }
        return this.movePointsChangeInput;
    }
    getHeightPointsChangeInput() {
        if (this.heightPointsChangeInput == undefined) {
            this.heightPointsChangeInput = document.getElementById("heightPointsChangeInput");
        }
        return this.heightPointsChangeInput;
    }
    getChangeArmyInfoButton() {
        if (this.changeArmyInfo == undefined) {
            this.changeArmyInfo = document.getElementById("changeArmyInfo");
        }
        return this.changeArmyInfo;
    }
    getLogoutButton() {
        if (this.logoutBtnChange == undefined) {
            this.logoutBtnChange = document.getElementById("logoutBtnChange");
        }
        return this.logoutBtnChange;
    }
}
