"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
class MoveEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, realm, armyId, from, to, databasePrimaryKey) {
        super(listPosition, status, databasePrimaryKey);
        this.realm = realm;
        this.armyId = armyId;
        this.from = from;
        this.to = to;
    }
    getContent() {
        // TODO
    }
    checkEvent() {
        let army = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if (army != undefined) {
            //TODO use the new movement
            let adjacency = hexFunctions_1.HexFunction.getAdjacency(army.getPosition(), [this.to]);
            if (adjacency[0] === true) {
                army.moveToList(1);
                army.move(1); //move to ne
            }
            else if (adjacency[1] === true) {
                army.moveToList(2);
                army.move(2); //move to e
            }
            else if (adjacency[2] === true) {
                army.moveToList(3);
                army.move(3); //move to se
            }
            else if (adjacency[3] === true) {
                army.moveToList(4);
                army.move(4); //move to sw
            }
            else if (adjacency[4] === true) {
                army.moveToList(5);
                army.move(5); //move to w
            }
            else if (adjacency[5] === true) {
                army.moveToList(0);
                army.move(0); //move to nw
            }
            if (!this.unprocessedBattleAtContainingArmy(army.owner.tag, army.getErkenfaraID(), army.getPosition()[0], army.getPosition()[1])) {
                army.conquer();
            }
            this.status = 'checked';
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
        }
        else {
            window.alert("Army not found.");
        }
    }
    determineEventStatus() {
        if (this.armyExistsAndIsLocated(this.realm, this.armyId, this.from[0], this.from[1]) &&
            !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.from[0], this.from[1]) &&
            this.canMove(this.realm, this.armyId, this.from[0], this.from[1], this.to[0], this.to[1]) &&
            this.noPendingLoadEvents(this.realm, this.armyId, this.from[0], this.from[1]) &&
            this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1])) {
            this.status = 'available';
        }
        else if ((this.stillSplitEventsInFaction(this.realm) || this.armyExistsAndIsLocated(this.realm, this.armyId, this.from[0], this.from[1])) &&
            !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.from[0], this.from[1]) &&
            this.canMove(this.realm, this.armyId, this.from[0], this.from[1], this.to[0], this.to[1]) &&
            (!this.noPendingLoadEvents(this.realm, this.armyId, this.from[0], this.from[1]) ||
                !this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1]))) {
            this.status = 'withheld';
        }
        else if (this.stillSplitEventsInFaction(this.realm) || (this.armyExists(this.realm, this.armyId) &&
            this.possibleMoveOfArmyTo(this.realm, this.armyId, this.from[0], this.from[1]))) {
            this.status = 'withheld';
        }
        else {
            this.status = 'impossible';
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.listPosition;
        eli.innerHTML = "<div>Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " +
            this.from[1] + ") to (" + this.to[0] + ", " + this.to[1] + ")</div>";
        return this.commonEventListItem(eli, this.listPosition);
    }
    getType() {
        return "move";
    }
}
exports.MoveEvent = MoveEvent;
