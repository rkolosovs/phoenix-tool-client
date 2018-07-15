"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const godModeFunctions_1 = require("../godmode/godModeFunctions");
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
            this.generateArmyBtn.onclick = function () { godModeFunctions_1.GodFunctions.generateArmyBtn(); };
        }
        return this.generateArmyBtn;
    }
}
exports.ArmyGeneratorBox = ArmyGeneratorBox;
//# sourceMappingURL=armyGeneratorBox.js.map