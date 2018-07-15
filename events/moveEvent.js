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
define(["require", "exports", "../libraries/hexFunctions", "./event", "../gui/drawingFunctions", "../gameState", "../gui/gui", "./battleEvent"], function (require, exports, hexFunctions_1, event_1, drawingFunctions_1, gameState_1, gui_1, battleEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MoveEvent extends event_1.PhoenixEvent {
        constructor(listPosition, status, realm, armyId, from, to, prerequisiteEvents, databasePrimaryKey) {
            super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
            this.realm = realm;
            this.armyId = armyId;
            this.from = from;
            this.to = to;
        }
        typeAsString() {
            return "move";
        }
        getContent() {
            return "{'armyId': " + this.armyId + ", 'realm': " + this.realm.tag +
                ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
                ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] + "}";
        }
        validGameState() {
            //The army exists, is positioned on the from-field and the army can move to the to-field.
            let army = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
                this.armyId === army.getErkenfaraID());
            if (army != undefined) {
                try {
                    army.checkForPossibleMove(hexFunctions_1.HexFunction.getDirectionToNeighbor(this.from, this.to));
                }
                catch (e) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
        checkEvent() {
            let army = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
                this.armyId === army.getErkenfaraID());
            if (army != undefined) {
                let direction = hexFunctions_1.HexFunction.getDirectionToNeighbor(this.from, this.to);
                army.checkForPossibleMove(direction);
                army.move(direction);
                if (!gameState_1.GameState.loadedEvents.some(event => (event instanceof battleEvent_1.BattleEvent) &&
                    !(event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */) &&
                    event.getPosition()[0] === this.to[0] &&
                    event.getPosition()[1] === this.to[1] &&
                    event.getParticipants().some(participant => army.getErkenfaraID() === participant.id &&
                        army.owner.tag === participant.realm))) {
                    army.conquer();
                }
                this.status = 0 /* Checked */;
                gui_1.GUI.getBigBox().fillEventList();
                drawingFunctions_1.Drawing.drawStuff();
            }
            else {
                window.alert("Army not found.");
            }
        }
        makeEventListItemText() {
            return "Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " + this.from[1] +
                ") to (" + this.to[0] + ", " + this.to[1] + ")";
        }
    }
    exports.MoveEvent = MoveEvent;
});
//# sourceMappingURL=moveEvent.js.map