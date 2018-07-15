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
define(["require", "exports", "../gui/gui", "../gui/boxVisibilty", "../gui/drawingFunctions", "../gameState", "./event"], function (require, exports, gui_1, boxVisibilty_1, drawingFunctions_1, gameState_1, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleEvent extends event_1.PhoenixEvent {
        constructor(listPosition, status, participants, position, prerequisiteEvents, databasePrimaryKey) {
            super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
            this.participants = participants;
            this.position = position;
        }
        typeAsString() {
            return "battle";
        }
        getContent() {
            return "{'x': " + this.position[0] + ", 'y': " + this.position[1] +
                ", 'participants': [" + this.participants.map(participant => "{'armyId': " + participant.id + ", 'realm': " + participant.realm + "}").reduce((total, current) => total + current, "") + "]}";
        }
        getPosition() {
            return [this.position[0], this.position[1]];
        }
        getParticipants() {
            return this.participants;
        }
        addParticipants(id, realm) {
            this.participants.push({ id, realm });
        }
        validGameState() {
            //Every participating army exists and is located at the position of the battle.
            return this.participants.every(participant => gameState_1.GameState.armies.some(army => army.getErkenfaraID() === participant.id &&
                army.owner.tag === participant.realm &&
                army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]));
        }
        checkEvent() {
            let battleBox = gui_1.GUI.getBattleBox();
            boxVisibilty_1.BoxVisibility.show(battleBox.getSelf());
            let participatingArmies = [];
            this.participants.forEach(participant => {
                let army = gameState_1.GameState.armies.find(candidate => {
                    return (participant.realm === candidate.owner.tag && (participant.id === candidate.getErkenfaraID()));
                });
                if (army != undefined) {
                    participatingArmies.push(army);
                }
                else {
                    throw new Error("A participating army is missing.");
                }
            });
            battleBox.newBattle(participatingArmies, this.position);
            battleBox.getAttackDiceRoll().onchange = function () { battleBox.updateDisplay(); };
            battleBox.getDefenseDiceRoll().onchange = function () { battleBox.updateDisplay(); };
            let battleButton = gui_1.GUI.getBattleBox().getBattleButton();
            battleButton.addEventListener("click", (e) => this.battleButtonLogic(battleBox));
            battleButton.disabled = true;
            battleButton.style.cursor = "not-allowed";
            gui_1.GUI.getBattleBox().getCloseBattleButton().onclick = function () {
                boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
            };
        }
        makeEventListItemText() {
            let result = "Battle at (" + this.position[0] + ", " + this.position[1] + ") involving";
            for (let j = 0; j < this.participants.length; j++) {
                result += " [" + this.participants[j].realm + " " + this.participants[j].id + "]";
            }
            return result;
        }
        battleButtonLogic(battleBox) {
            if (battleBox.battleHandler != undefined) {
                battleBox.battleHandler.resolve(parseInt(battleBox.getAttackDiceRoll().value), parseInt(battleBox.getDefenseDiceRoll().value));
                boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
                this.status = 0 /* Checked */;
                gui_1.GUI.getBigBox().fillEventList();
                drawingFunctions_1.Drawing.drawStuff();
            }
            else {
                throw new Error("BattleHandler is not instantiated prior to use.");
            }
        }
    }
    exports.BattleEvent = BattleEvent;
});
//# sourceMappingURL=battleEvent.js.map