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
define(["require", "exports", "../controls/buttonFunctions", "./boxVisibilty", "../serverInteraction/authenticationFunctions"], function (require, exports, buttonFunctions_1, boxVisibilty_1, authenticationFunctions_1) {
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
                this.mount.onclick = function () { boxVisibilty_1.BoxVisibility.activateMountBox(); };
            }
            return this.mount;
        }
        getUnMountButton() {
            if (this.unMount == undefined) {
                this.unMount = document.getElementById("unMount");
                this.unMount.onclick = function () { boxVisibilty_1.BoxVisibility.activateUnMountBox(); };
            }
            return this.unMount;
        }
        getSplitButton() {
            if (this.splitBtn == undefined) {
                this.splitBtn = document.getElementById("splitBtn");
                this.splitBtn.onclick = function () { buttonFunctions_1.ButtonFunctions.activateSplitbox(); };
            }
            return this.splitBtn;
        }
        getShootButton() {
            if (this.shoot == undefined) {
                this.shoot = document.getElementById("shoot");
                this.shoot.onclick = function () { buttonFunctions_1.ButtonFunctions.toggleShootingMode(); };
            }
            return this.shoot;
        }
        getLogoutButton() {
            if (this.logoutBtn == undefined) {
                this.logoutBtn = document.getElementById("logoutBtn");
                this.logoutBtn.onclick = function () { authenticationFunctions_1.Authentication.logoutFromServer(); };
            }
            return this.logoutBtn;
        }
    }
    exports.InfoBox = InfoBox;
});
//# sourceMappingURL=infoBox.js.map