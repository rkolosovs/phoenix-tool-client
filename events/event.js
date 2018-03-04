"use strict";
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
    asJSON() {
        return JSON.parse("'type': " + this.getType() + ", 'content': " + this.getContent() +
            ", 'prerequisites': [" + this.prerequisiteEvents.reduce((total, current) => total + current, "") +
            "], 'pk': " + this.databasePrimaryKey + "}");
    }
    determineEventStatus() {
        if (this.validGameState() && this.prerequisiteEvents.every(prereqEvent => gameState_1.GameState.events.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
            (event.getStatus() === 0 /* Checked */ || event.getStatus() === 1 /* Deleted */)))) {
            //The event is available if the GM has attended to all prerequisite events and the board state allows it.
            this.status = 4 /* Available */;
        }
        else if (!this.validGameState() && this.prerequisiteEvents.every(prereqEvent => gameState_1.GameState.events.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
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
