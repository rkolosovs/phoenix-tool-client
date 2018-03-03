"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
class MoveEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, realm, armyId, from, to, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.realm = realm;
        this.armyId = armyId;
        this.from = from;
        this.to = to;
    }
    getContent() {
        // TODO
        return JSON.parse('{}');
    }
    validGameState() {
        // TODO
        return false;
    }
    checkEvent() {
        let army = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if (army != undefined) {
            let direction = hexFunctions_1.HexFunction.getDirectionToNeighbor(this.from, this.to);
            army.checkForPossibleMove(direction);
            army.move(direction);
            if (!this.unprocessedBattleAtContainingArmy(army.owner.tag, army.getErkenfaraID(), army.getPosition()[0], army.getPosition()[1])) {
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
    // determineEventStatus(): void{
    //     if (this.armyExistsAndIsLocated(this.realm, this.armyId, this.from[0], this.from[1]) &&
    //     !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.from[0], this.from[1]) &&
    //     this.canMove(this.realm, this.armyId, this.from[0], this.from[1], this.to[0], this.to[1]) &&
    //     this.noPendingLoadEvents(this.realm, this.armyId, this.from[0], this.from[1]) &&
    //     this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1])) {
    //     this.status = EventStatus.Available;
    //     } else if ((this.stillSplitEventsInFaction(this.realm) || this.armyExistsAndIsLocated(this.realm, this.armyId,
    //             this.from[0], this.from[1])) && !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId,
    //             this.from[0], this.from[1]) && this.canMove(this.realm, this.armyId, this.from[0], this.from[1],
    //             this.to[0], this.to[1]) && (!this.noPendingLoadEvents(this.realm, this.armyId, this.from[0],
    //             this.from[1]) || !this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1]))) {
    //         this.status = EventStatus.Withheld;
    //     } else if (this.stillSplitEventsInFaction(this.realm) || (this.armyExists(this.realm, this.armyId) &&
    //         this.possibleMoveOfArmyTo(this.realm, this.armyId, this.from[0], this.from[1]))) {
    //         this.status = EventStatus.Withheld;
    //     } else {
    //         this.status = EventStatus.Impossible;
    //     }
    // }
    makeEventListItemText() {
        return "Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " + this.from[1] +
            ") to (" + this.to[0] + ", " + this.to[1] + ")";
    }
}
exports.MoveEvent = MoveEvent;
