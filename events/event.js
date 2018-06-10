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
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
class PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, databasePrimaryKey) {
        this.listPosition = listPosition;
        this.status = status;
        this.prerequisiteEvents = prerequisiteEvents;
        this.databasePrimaryKey = databasePrimaryKey;
    }
    asStringifiedJSON() {
        return JSON.stringify({ 'type': this.typeAsString(), 'content': JSON.parse(this.getContent()) });
    }
    asJSON() {
        return JSON.parse(this.asStringifiedJSON());
    }
    determineEventStatus() {
        if (this.validGameState() && this.prerequisiteEvents.every(prereqEvent => gameState_1.GameState.loadedEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
            (event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */)))) {
            //The event is available if the GM has attended to all prerequisite events and the board state allows it.
            this.status = 4 /* Available */;
        }
        else if (!this.validGameState() && this.prerequisiteEvents.every(prereqEvent => gameState_1.GameState.loadedEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
            (event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */)))) {
            //The event is not available because the board state doesn't allow it and it won't become available in the
            //future because all prerequisite events have been attended to by the GM. The GM has to manually fix the
            //board state to make the event available or delete it.
            this.status = 2 /* Impossible */;
        }
        else {
            //The event is not available but might become available in the future because the board state doesn't allow
            //it but some prerequisite events haven't been attended to by a GM yet and they might fix the board state.
            this.status = 3 /* Withheld */;
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.listPosition;
        eli.innerHTML = "<div>" + this.makeEventListItemText() + "</div>";
        let deleteButton = document.createElement("BUTTON");
        deleteButton.id = "delBtn" + this.listPosition;
        deleteButton.classList.add("eventListButton");
        deleteButton.classList.add("eventListDeleteButton");
        deleteButton.addEventListener("click", (e) => this.deleteEvent());
        let checkButton = document.createElement("BUTTON");
        checkButton.id = "checkBtn" + this.listPosition;
        checkButton.classList.add("eventListButton");
        checkButton.classList.add("eventListCheckButton");
        checkButton.addEventListener("click", (e) => this.checkEvent());
        eli.appendChild(deleteButton);
        eli.appendChild(checkButton);
        if (this.status === 0 /* Checked */) {
            eli.classList.add("checkedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        }
        else if (this.status === 1 /* Deleted */) {
            eli.classList.add("deletedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        }
        else if (this.status === 2 /* Impossible */) {
            eli.classList.add("impossibleELI");
            checkButton.disabled = true;
        }
        else if (this.status === 3 /* Withheld */) {
            eli.classList.add("withheldELI");
            checkButton.disabled = true;
        }
        else if (this.status === 4 /* Available */) {
            eli.classList.add("availableELI");
        }
        return eli;
    }
    deleteEvent() {
        this.status = 1 /* Deleted */;
        gui_1.GUI.getBigBox().fillEventList();
    }
    getListPosition() {
        return this.listPosition;
    }
    setListPosition(newPosition) {
        this.listPosition = newPosition;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getDatabasePrimaryKey() {
        return this.databasePrimaryKey;
    }
}
exports.PhoenixEvent = PhoenixEvent;
//# sourceMappingURL=event.js.map