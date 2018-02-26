"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const footArmy_1 = require("../armies/footArmy");
class MergeEvent extends event_1.PhoenixEvent {
    constructor(id, status, fromArmy, toArmy, realm, x, y, pk) {
        super(id, status, pk);
        this.id = id;
        this.status = status;
        this.fromArmy = fromArmy;
        this.toArmy = toArmy;
        this.realm = realm;
        this.x = x;
        this.y = y;
        this.pk = pk;
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
            mergeSelectedArmy(armyToPlaceInList);
            preparedEvents.pop();
        }
        this.status = 'checked';
        fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
        selectedArmyIndex = undefined;
    }
    determineEventStatus() {
        let army1 = gameState_1.GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = gameState_1.GameState.armies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = 'withheld';
        }
        else if (army1.getPosition()[0] !== this.x || army1.getPosition()[1] !== this.y ||
            army2.getPosition()[0] !== this.x || army2.getPosition()[1] !== this.y) {
            this.status = 'withheld';
        }
        else if (army1.constructor === army2.constructor &&
            army1.getPosition()[0] === army2.getPosition()[0] && army1.getPosition()[1] === army2.getPosition()[1]) {
            this.status = 'available';
        }
        else if ((army1.constructor !== army2.constructor) ||
            ((((army1 instanceof footArmy_1.FootArmy || army1 instanceof riderArmy_1.RiderArmy) && army1.getMovePoints() < 3) ||
                army1 instanceof fleet_1.Fleet && army1.getMovePoints() < 5) && (((army2 instanceof footArmy_1.FootArmy || army2 instanceof riderArmy_1.RiderArmy) &&
                army2.getMovePoints() < 3) || army2 instanceof fleet_1.Fleet && army2.getMovePoints() < 5))) {
            this.status = 'impossible';
        }
        else {
            this.status = 'withheld';
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        eli.innerHTML = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy +
            " in (" + this.x + "," + this.y + ").</div>";
        return this.commonEventListItem(eli, this.id);
    }
    getType() {
        return "merge";
    }
}
exports.MergeEvent = MergeEvent;
