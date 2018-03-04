"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const buttonFunctions_1 = require("../controls/buttonFunctions");
const gui_1 = require("../gui/gui");
const controlVariables_1 = require("../controls/controlVariables");
class MergeEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, fromArmy, toArmy, realm, position, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmy = fromArmy;
        this.toArmy = toArmy;
        this.realm = realm;
        this.position = position;
    }
    getType() {
        return "merge";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmy + ", 'toArmy', " +
            this.toArmy + "'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        //Both armies exist and are in position.
        let ownArmiesOnCorrectField = gameState_1.GameState.armies.filter(army => army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        return ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.fromArmy) &&
            ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.toArmy);
    }
    checkEvent() {
        let armyFromPlaceInList = -1;
        let armyToPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let armyToId = this.toArmy;
        let realm = this.realm;
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getErkenfaraID() == armyFromId && gameState_1.GameState.armies[i].owner == realm) {
                armyFromPlaceInList = i;
                console.log("i1=" + i);
            }
            else if (gameState_1.GameState.armies[i].getErkenfaraID() == armyToId && gameState_1.GameState.armies[i].owner == realm) {
                armyToPlaceInList = i;
                console.log("i2=" + i);
            }
        }
        if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
            selectedArmyIndex = armyFromPlaceInList;
            buttonFunctions_1.ButtonFunctions.mergeSelectedArmy(armyToPlaceInList);
            gameState_1.GameState.events.pop();
        }
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
        controlVariables_1.Controls.selectedArmyIndex = -1;
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MergeEvent = MergeEvent;
