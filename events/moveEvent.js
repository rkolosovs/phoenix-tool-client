"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
const battleEvent_1 = require("./battleEvent");
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
