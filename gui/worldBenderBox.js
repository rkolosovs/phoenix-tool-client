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
const app_1 = require("../app");
class WorldBenderBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("worldBenderBox");
        }
        return this.self;
    }
    getCreationWarning() {
        if (this.creationWarning == undefined) {
            this.creationWarning = document.getElementById("creationWarning");
        }
        return this.creationWarning;
    }
    getToggleOnClickWorldCreationMode() {
        if (this.toggleOnClickWorldCreationMode == undefined) {
            this.toggleOnClickWorldCreationMode = document.getElementById("ToggleOnClickWorldCreationMode");
            this.toggleOnClickWorldCreationMode.onclick = function () { godModeFunctions_1.GodFunctions.toggleOnClickWorldCreationMode(); };
        }
        return this.toggleOnClickWorldCreationMode;
    }
    getSaveFields() {
        if (this.saveFields == undefined) {
            this.saveFields = document.getElementById("SaveFields");
            this.saveFields.onclick = function () { app_1.Saving.saveFields(); };
        }
        return this.saveFields;
    }
    getChangeFieldSection() {
        if (this.changeFieldSection == undefined) {
            this.changeFieldSection = document.getElementById("changeFieldSection");
        }
        return this.changeFieldSection;
    }
    getChangeFieldClickedTo0() {
        if (this.changeFieldClickedTo0 == undefined) {
            this.changeFieldClickedTo0 = document.getElementById("ChangeFieldClickedTo0");
            this.changeFieldClickedTo0.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(0); };
        }
        return this.changeFieldClickedTo0;
    }
    getChangeFieldClickedTo1() {
        if (this.changeFieldClickedTo1 == undefined) {
            this.changeFieldClickedTo1 = document.getElementById("ChangeFieldClickedTo1");
            this.changeFieldClickedTo1.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(1); };
        }
        return this.changeFieldClickedTo1;
    }
    getChangeFieldClickedTo2() {
        if (this.changeFieldClickedTo2 == undefined) {
            this.changeFieldClickedTo2 = document.getElementById("ChangeFieldClickedTo2");
            this.changeFieldClickedTo2.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(2); };
        }
        return this.changeFieldClickedTo2;
    }
    getChangeFieldClickedTo3() {
        if (this.changeFieldClickedTo3 == undefined) {
            this.changeFieldClickedTo3 = document.getElementById("ChangeFieldClickedTo3");
            this.changeFieldClickedTo3.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(3); };
        }
        return this.changeFieldClickedTo3;
    }
    getChangeFieldClickedTo4() {
        if (this.changeFieldClickedTo4 == undefined) {
            this.changeFieldClickedTo4 = document.getElementById("ChangeFieldClickedTo4");
            this.changeFieldClickedTo4.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(4); };
        }
        return this.changeFieldClickedTo4;
    }
    getChangeFieldClickedTo5() {
        if (this.changeFieldClickedTo5 == undefined) {
            this.changeFieldClickedTo5 = document.getElementById("ChangeFieldClickedTo5");
            this.changeFieldClickedTo5.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(5); };
        }
        return this.changeFieldClickedTo5;
    }
    getChangeFieldClickedTo6() {
        if (this.changeFieldClickedTo6 == undefined) {
            this.changeFieldClickedTo6 = document.getElementById("ChangeFieldClickedTo6");
            this.changeFieldClickedTo6.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(6); };
        }
        return this.changeFieldClickedTo6;
    }
    getChangeFieldClickedTo7() {
        if (this.changeFieldClickedTo7 == undefined) {
            this.changeFieldClickedTo7 = document.getElementById("ChangeFieldClickedTo7");
            this.changeFieldClickedTo7.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(7); };
        }
        return this.changeFieldClickedTo7;
    }
    getChangeFieldClickedTo8() {
        if (this.changeFieldClickedTo8 == undefined) {
            this.changeFieldClickedTo8 = document.getElementById("ChangeFieldClickedTo8");
            this.changeFieldClickedTo8.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(8); };
        }
        return this.changeFieldClickedTo8;
    }
    getChangeFieldClickedTo9() {
        if (this.changeFieldClickedTo9 == undefined) {
            this.changeFieldClickedTo9 = document.getElementById("ChangeFieldClickedTo9");
            this.changeFieldClickedTo9.onclick = function () { godModeFunctions_1.GodFunctions.changeFieldClickedTo(9); };
        }
        return this.changeFieldClickedTo9;
    }
}
exports.WorldBenderBox = WorldBenderBox;
//# sourceMappingURL=worldBenderBox.js.map