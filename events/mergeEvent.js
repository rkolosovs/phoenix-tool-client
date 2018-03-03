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
    getContent() {
        // TODO
        return JSON.parse('{}');
    }
    validGameState() {
        // TODO
        return false;
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
    // determineEventStatus(): void{
    //     let army1 = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
    //     let army2 = GameState.armies[this.findArmyPlaceInList(this.toArmy, this.realm)];
    //     if (army1 == undefined || army2 == undefined) {
    //         this.status = EventStatus.Withheld;
    //     }
    //     else if (army1.getPosition()[0] !== this.position[0] || army1.getPosition()[1] !== this.position[1] ||
    //         army2.getPosition()[0] !== this.position[0] || army2.getPosition()[1] !== this.position[1]) {
    //             this.status = EventStatus.Withheld;
    //     } else if (army1.constructor === army2.constructor &&
    //         army1.getPosition()[0] === army2.getPosition()[0] && army1.getPosition()[1] === army2.getPosition()[1]) {
    //             this.status = EventStatus.Available;
    //     }
    //     else if ((army1.constructor !== army2.constructor) ||
    //         ((((army1 instanceof FootArmy || army1 instanceof RiderArmy) && army1.getMovePoints() < 3) ||
    //             army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof FootArmy || army2 instanceof RiderArmy) &&
    //                 army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
    //                     this.status = EventStatus.Impossible;
    //     }
    //     else {
    //         this.status = EventStatus.Withheld;
    //     }
    // }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MergeEvent = MergeEvent;
