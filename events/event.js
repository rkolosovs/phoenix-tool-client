"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const hexFunctions_1 = require("../libraries/hexFunctions");
const gui_1 = require("../gui/gui");
class PhoenixEvent {
    constructor(listPosition, status, databasePrimaryKey) {
        this.listPosition = listPosition;
        this.status = status;
        this.databasePrimaryKey = databasePrimaryKey;
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
    //TODO this needs a big overhaul
    //begin of helper methods for event status determining
    stillSplitEventsInFaction(realm) {
        for (let i = 0; i < gameState_1.GameState.pendingNewEvents.length; i++) {
            let event = gameState_1.GameState.pendingNewEvents[i];
            if ((event.status === 3 /* Withheld */ || event.status === 4 /* Available */ ||
                event.status === 5 /* Undetermined */) &&
                event.getType() === 'split') {
                return true;
            }
        }
        return false;
    }
    noPendingLoadEvents(realm, armyId, fromX, fromY) {
        if (Math.floor(armyId / 100) != 3) {
            return true;
        }
        else {
            for (let i = 0; i < gameState_1.GameState.pendingNewEvents.length; i++) {
                let event = gameState_1.GameState.pendingNewEvents[i];
                if ((event.status === 'withheld' || event.status === 'available') && event.getType() === 'move' &&
                    Math.floor(event.content.armyId / 100) !== 3 &&
                    ((event.content.fromX === fromX && event.content.fromY === fromY) ||
                        (event.content.toX === fromX && event.content.toY === fromY))) {
                    return false;
                }
            }
            return true;
        }
    }
    noPendingMountEvents(realm, armyId, fromX, fromY) {
        if (Math.floor(armyId / 100) != 3) {
            for (let i = 0; i < gameState_1.GameState.pendingNewEvents.length; i++) {
                let event = gameState_1.GameState.pendingNewEvents[i];
                if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') &&
                    event.getType() === 'mount' && Math.floor(event.content.fromArmy) === armyId &&
                    (event.content.x === fromX && event.content.y === fromY)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return true;
        }
    }
    eachArmyExists(armies) {
        return (armies.length > 0) && (armies.map(function (army) {
            return this.armyExists(army.realm, army.armyId);
        }).reduce(function (total, current) {
            return total && current;
        }, true));
    }
    findArmyPlaceInList(armyId, owner) {
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getErkenfaraID() === armyId && gameState_1.GameState.armies[i].owner === owner) {
                return i;
            }
        }
        return -1;
    }
    eachArmyExistsAndIsLocated(armies, x, y) {
        return (armies.length > 0) && (armies.map(function (army) {
            return this.armyExistsAndIsLocated(army.realm, army.armyId, x, y);
        }, this).reduce(function (total, current) {
            return total && current;
        }, true));
    }
    possibleMoveOfEachArmyTo(armies, x, y) {
        return (armies.length > 0) && (armies.map(function (army) {
            return this.armyExistsAndIsLocated(army.realm, army.armyId, x, y) ||
                this.possibleMoveOfArmyTo(army.realm, army.armyId, x, y);
        }, this).reduce(function (total, current) {
            return total && current;
        }, true));
    }
    armyExists(realm, id) {
        return gameState_1.GameState.armies.some(function (val) {
            return (val.owner.tag === realm) && (val.getErkenfaraID() === id);
        }, this);
    }
    armyExistsAndIsLocated(realm, id, x, y) {
        return gameState_1.GameState.armies.some(function (val) {
            return (val.owner.tag === realm) &&
                (val.getErkenfaraID() === id) &&
                (val.getPosition()[0] === x) && (val.getPosition()[1] === y);
        }, this);
    }
    possibleMoveOfArmyTo(realm, id, x, y) {
        return gameState_1.GameState.pendingNewEvents.some(function (pEv) {
            return (pEv.getType() === 'move') && (pEv.content.realm === realm) &&
                (pEv.content.armyId === id) && (pEv.status !== 'deleted' || pEv.status !== 'checked') &&
                (pEv.content.toX === x) && (pEv.content.toY === y) &&
                (this.canMove(realm, id, pEv.content.fromX, pEv.content.fromY, x, y));
        }, this);
    }
    unprocessedBattleAtContainingArmy(realm, id, x, y) {
        return gameState_1.GameState.pendingNewEvents.some(function (pEv) {
            return (pEv.getType() === 'battle') &&
                (pEv.status !== 'deleted') &&
                (pEv.status !== 'checked') &&
                (pEv.content.x === x) &&
                (pEv.content.y === y) &&
                (pEv.content.participants.some(function (part) {
                    return (part.armyId === id) && (part.realm === realm);
                }, this));
        }, this);
    }
    canMove(realm, id, fromX, fromY, toX, toY) {
        let foundArmy = gameState_1.GameState.armies.find(function (army) {
            return (army.getErkenfaraID() === id) && (army.owner.tag === realm);
        }, this);
        if (foundArmy != undefined && foundArmy.getPosition()[0] === fromX && foundArmy.getPosition()[1] === fromY) {
            let adjacency = hexFunctions_1.HexFunction.getAdjacency([fromX, fromY], [[toX, toY]]);
            if (adjacency.reduce((total, current) => (total || current), false)) {
                foundArmy.possibleMoves = [];
                let direction = (adjacency.findIndex((dir) => dir === 1) + 1) % 6;
                foundArmy.checkForPossibleMove(direction);
                return foundArmy.possibleMoves.length > 0;
            }
            return false;
        }
        else {
            return false;
        }
    }
}
exports.PhoenixEvent = PhoenixEvent;
