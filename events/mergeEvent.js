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
class MergeEvent extends types_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, toArmyId, realm, position, prerequisiteEvents, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.toArmyId = toArmyId;
        this.realm = realm;
        this.position = position;
    }
    typeAsString() {
        return "merge";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId + ", 'toArmy', " +
            this.toArmyId + "'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //Both armies exist and are in position.
        let ownArmiesOnCorrectField = types_1.GameState.armies.filter(army => army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        return ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.fromArmyId) &&
            ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.toArmyId);
    }
    checkEvent() {
        let fromArmy = types_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm);
        let toArmy = types_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm);
        if (fromArmy != undefined && toArmy != undefined) {
            toArmy.merge(fromArmy);
        }
        else {
            throw new Error("One of the armies to be merged does not exist.");
        }
        this.status = 0 /* Checked */;
        types_1.GUI.getBigBox().fillEventList();
        types_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " merges with army " + this.toArmyId + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MergeEvent = MergeEvent;
//# sourceMappingURL=mergeEvent.js.map