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
define(["require", "exports", "../godmode/godModeFunctions", "../serverInteraction/authenticationFunctions"], function (require, exports, godModeFunctions_1, authenticationFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoChangeBox {
        getSelf() {
            if (this.self == undefined) {
                this.self = document.getElementById("infoChangeBox");
            }
            return this.self;
        }
        getOwnerChange() {
            if (this.ownerChange == undefined) {
                this.ownerChange = document.getElementById("ownerChange");
            }
            return this.ownerChange;
        }
        getArmyIdChange() {
            if (this.armyIdChange == undefined) {
                this.armyIdChange = document.getElementById("armyIdChange");
            }
            return this.armyIdChange;
        }
        getCountChange() {
            if (this.countChange == undefined) {
                this.countChange = document.getElementById("countChange");
            }
            return this.countChange;
        }
        getLeadersChange() {
            if (this.leadersChange == undefined) {
                this.leadersChange = document.getElementById("leadersChange");
            }
            return this.leadersChange;
        }
        getMountsChange() {
            if (this.mountsChange == undefined) {
                this.mountsChange = document.getElementById("mountsChange");
            }
            return this.mountsChange;
        }
        getLKPChange() {
            if (this.lkpChange == undefined) {
                this.lkpChange = document.getElementById("lkpChange");
            }
            return this.lkpChange;
        }
        getSKPChange() {
            if (this.skpChange == undefined) {
                this.skpChange = document.getElementById("skpChange");
            }
            return this.skpChange;
        }
        getMovePointsChange() {
            if (this.movePointsChange == undefined) {
                this.movePointsChange = document.getElementById("movePointsChange");
            }
            return this.movePointsChange;
        }
        getHeightPointsChange() {
            if (this.heightPointsChange == undefined) {
                this.heightPointsChange = document.getElementById("heightPointsChange");
            }
            return this.heightPointsChange;
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
                this.changeArmyInfo.onclick = function () { godModeFunctions_1.GodFunctions.changeArmyInfo(); };
            }
            return this.changeArmyInfo;
        }
        getLogoutButton() {
            if (this.logoutBtnChange == undefined) {
                this.logoutBtnChange = document.getElementById("logoutBtnChange");
                this.logoutBtnChange.onclick = function () { authenticationFunctions_1.Authentication.logoutFromServer(); };
            }
            return this.logoutBtnChange;
        }
    }
    exports.InfoChangeBox = InfoChangeBox;
});
//# sourceMappingURL=infoChangeBox.js.map