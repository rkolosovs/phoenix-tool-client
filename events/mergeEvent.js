"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const footArmy_1 = require("../armies/footArmy");
const buttonFunctions_1 = require("../controls/buttonFunctions");
const gui_1 = require("../gui/gui");
const controlVariables_1 = require("../controls/controlVariables");
class MergeEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmy, toArmy, realm, position, databasePrimaryKey) {
        super(listPosition, status, databasePrimaryKey);
        this.fromArmy = fromArmy;
        this.toArmy = toArmy;
        this.realm = realm;
        this.position = position;
    }
    getContent() {
        // TODO
        return JSON.parse('{}');
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
            preparedEvents.pop();
        }
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
        controlVariables_1.Controls.selectedArmyIndex = -1;
    }
    determineEventStatus() {
        let army1 = gameState_1.GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = gameState_1.GameState.armies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = 3 /* Withheld */;
        }
        else if (army1.getPosition()[0] !== this.position[0] || army1.getPosition()[1] !== this.position[1] ||
            army2.getPosition()[0] !== this.position[0] || army2.getPosition()[1] !== this.position[1]) {
            this.status = 3 /* Withheld */;
        }
        else if (army1.constructor === army2.constructor &&
            army1.getPosition()[0] === army2.getPosition()[0] && army1.getPosition()[1] === army2.getPosition()[1]) {
            this.status = 4 /* Available */;
        }
        else if ((army1.constructor !== army2.constructor) ||
            ((((army1 instanceof footArmy_1.FootArmy || army1 instanceof riderArmy_1.RiderArmy) && army1.getMovePoints() < 3) ||
                army1 instanceof fleet_1.Fleet && army1.getMovePoints() < 5) && (((army2 instanceof footArmy_1.FootArmy || army2 instanceof riderArmy_1.RiderArmy) &&
                army2.getMovePoints() < 3) || army2 instanceof fleet_1.Fleet && army2.getMovePoints() < 5))) {
            this.status = 2 /* Impossible */;
        }
        else {
            this.status = 3 /* Withheld */;
        }
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MergeEvent = MergeEvent;
