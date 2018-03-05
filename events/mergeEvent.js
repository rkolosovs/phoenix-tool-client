"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
class MergeEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, fromArmyId, toArmyId, realm, position, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.toArmyId = toArmyId;
        this.realm = realm;
        this.position = position;
    }
    getType() {
        return "merge";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId + ", 'toArmy', " +
            this.toArmyId + "'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //Both armies exist and are in position.
        let ownArmiesOnCorrectField = gameState_1.GameState.armies.filter(army => army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        return ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.fromArmyId) &&
            ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.toArmyId);
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm);
        if (fromArmy != undefined && toArmy != undefined) {
            toArmy.merge(fromArmy);
        }
        else {
            throw new Error("One of the armies to be merged does not exist.");
        }
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " merges with army " + this.toArmyId + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MergeEvent = MergeEvent;
