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
const types_1 = require("../types");
class MountEvent extends types_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, newArmyId, realm, troops, leaders, position, prerequisiteEvents, databasePrimaryKey) {
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.newArmyId = newArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.position = position;
    }
    typeAsString() {
        return "mount/dismount";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId +
            ", 'newArmy': " + this.newArmyId + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //The from-army exists and is in position.
        let fromArmy = types_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy == undefined) {
            return false;
        }
        //The new army doesn't yet exist.
        if (types_1.GameState.armies.some(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.newArmyId)) {
            return false;
        }
        if (fromArmy instanceof types_1.FootArmy) { //Mount case
            //There are enough troops, officers and mounts. No check for viability of the remaining army is made since
            //abandoning a few stragglers or the catapults is not prohibited by the rules.
            if (fromArmy.getTroopCount() < this.troops ||
                fromArmy.getOfficerCount() < this.leaders ||
                fromArmy.getMountCount() < this.troops) {
                return false;
            }
        }
        else { //Dismount case
            //There are enough troops and officers. No check for viability of the remaining army is made since
            //abandoning a few stragglers in not prohibited by the rules.
            if (fromArmy.getTroopCount() < this.troops || fromArmy.getOfficerCount() < this.leaders) {
                return false;
            }
        }
        return true;
    }
    checkEvent() {
        let fromArmy = types_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined) {
            if (fromArmy instanceof types_1.FootArmy) {
                fromArmy.mount(this.troops, this.leaders, this.newArmyId);
            }
            else if (fromArmy instanceof types_1.RiderArmy) {
                fromArmy.dismount(this.troops, this.leaders, this.newArmyId);
            }
            else {
                throw new Error("Army to mount/dismount from was neither a foot army nor a rider army.");
            }
            this.status = 0 /* Checked */;
            types_1.ArmyFunctions.checkArmiesForLiveliness();
            types_1.GUI.getBigBox().fillEventList();
            types_1.Drawing.drawStuff();
        }
        else {
            throw new Error("Army to mount/dismount from does not exist or isn't in position.");
        }
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " mounts " + this.troops + " troops, and " +
            this.leaders + " leaders to " + this.newArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MountEvent = MountEvent;
//# sourceMappingURL=mountEvent.js.map