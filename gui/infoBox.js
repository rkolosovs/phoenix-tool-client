"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InfoBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("infoBox");
        }
        return this.self;
    }
    getArmySelectButtons() {
        if (this.armySelectBtns == undefined) {
            this.armySelectBtns = document.getElementById("armySelectBtns");
        }
        return this.armySelectBtns;
    }
    getArmyIdText() {
        if (this.armyId == undefined) {
            this.armyId = document.getElementById("armyId");
        }
        return this.armyId;
    }
    getGuardText() {
        if (this.guard == undefined) {
            this.guard = document.getElementById("guard");
        }
        return this.guard;
    }
    getCountText() {
        if (this.count == undefined) {
            this.count = document.getElementById("count");
        }
        return this.count;
    }
    getLeadersText() {
        if (this.leaders == undefined) {
            this.leaders = document.getElementById("leaders");
        }
        return this.leaders;
    }
    getMountsText() {
        if (this.mounts == undefined) {
            this.mounts = document.getElementById("mounts");
        }
        return this.mounts;
    }
    getLKPText() {
        if (this.lkp == undefined) {
            this.lkp = document.getElementById("lkp");
        }
        return this.lkp;
    }
    getSKPText() {
        if (this.skp == undefined) {
            this.skp = document.getElementById("skp");
        }
        return this.skp;
    }
    getMovePointsText() {
        if (this.movePoints == undefined) {
            this.movePoints = document.getElementById("movePoints");
        }
        return this.movePoints;
    }
    getHeightPointsText() {
        if (this.heightPoints == undefined) {
            this.heightPoints = document.getElementById("heightPoints");
        }
        return this.heightPoints;
    }
    getMountButton() {
        if (this.mount == undefined) {
            this.mount = document.getElementById("mount");
        }
        return this.mount;
    }
    getUnMountButton() {
        if (this.unMount == undefined) {
            this.unMount = document.getElementById("unMount");
        }
        return this.unMount;
    }
    getSplitButton() {
        if (this.splitBtn == undefined) {
            this.splitBtn = document.getElementById("splitBtn");
        }
        return this.splitBtn;
    }
    getShootButton() {
        if (this.shoot == undefined) {
            this.shoot = document.getElementById("shoot");
        }
        return this.shoot;
    }
    getLogoutButton() {
        if (this.logoutBtn == undefined) {
            this.logoutBtn = document.getElementById("logoutBtn");
        }
        return this.logoutBtn;
    }
}
exports.InfoBox = InfoBox;
