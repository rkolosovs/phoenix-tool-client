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
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class TransferEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, toArmyId, realm, troops, leaders, mounts, lkp, skp, position, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.toArmyId = toArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.position = position;
    }
    typeAsString() {
        return "transfer";
    }
    getContent() {
        return "{'fromArmyId': " + this.fromArmyId + ", 'toArmyId': " + this.toArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        //Both armies exist, are in position and have the same type.
        //There are enough troops, officers, catapults and if at least one mount has to be split, there are enough
        //of those and army to be split from is a foot army. No check for viability of the remaining army is made
        //since abandoning a few stragglers or the catapults is not prohibited by the rules.
        return fromArmy != undefined &&
            toArmy != undefined &&
            fromArmy.constructor === toArmy.constructor &&
            this.troops <= fromArmy.getTroopCount() &&
            this.leaders <= fromArmy.getOfficerCount() &&
            this.lkp <= fromArmy.getLightCatapultCount() &&
            this.skp <= fromArmy.getHeavyCatapultCount() &&
            ((this.mounts > 0 && fromArmy instanceof footArmy_1.FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined && toArmy != undefined) {
            try {
                fromArmy.transferTo(toArmy, this.troops, this.leaders, this.lkp, this.skp, this.mounts);
                this.status = 0 /* Checked */;
                armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
                gui_1.GUI.getBigBox().fillEventList();
                drawingFunctions_1.Drawing.drawStuff();
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Army to be transferred to of from does not exist.");
        }
    }
    makeEventListItemText() {
        let result = "" + this.realm.tag + "'s army " + this.fromArmyId + " transfers ";
        if (this.troops !== 0) {
            result += this.troops + " troops, ";
        }
        if (this.leaders !== 0) {
            result += this.leaders + " leaders, ";
        }
        if (this.mounts !== 0) {
            result += this.mounts + " mounts, ";
        }
        if (this.lkp !== 0) {
            result += this.lkp + " lkp, ";
        }
        if (this.skp !== 0) {
            result += this.skp + " skp ";
        }
        return result + "to " + this.toArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.TransferEvent = TransferEvent;
//# sourceMappingURL=transferEvent.js.map