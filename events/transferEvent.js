"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const gui_1 = require("../gui/gui");
class TransferEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmy, toArmy, realm, troops, leaders, mounts, lkp, skp, position, databasePrimaryKey) {
        super(listPosition, status, databasePrimaryKey);
        this.fromArmy = fromArmy;
        this.toArmy = toArmy;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.position = position;
    }
    getContent() {
        // TODO
        return JSON.parse('{}');
    }
    checkEvent() {
        console.log("this is a transfer event");
        let armyFromPlaceInList = -1;
        let armyToPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let armyToId = this.toArmy;
        let realm = this.realm;
        let toSplit = this.troops;
        let leadersToSplit = this.leaders;
        let mountsToSplit = this.mounts;
        let lkpToSplit = this.lkp;
        let skpToSplit = this.skp;
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getErkenfaraID() === armyFromId && gameState_1.GameState.armies[i].owner === realm) {
                armyFromPlaceInList = i;
            }
            else if (gameState_1.GameState.armies[i].getErkenfaraID() === armyToId && gameState_1.GameState.armies[i].owner === realm) {
                armyToPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
            let armyToTransferFrom = gameState_1.GameState.armies[armyFromPlaceInList];
            let armyToTransferTo = gameState_1.GameState.armies[armyToPlaceInList];
            armyToTransferFrom.setTroopCount(armyToTransferFrom.getTroopCount() - toSplit);
            armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + toSplit);
            armyToTransferFrom.setOfficerCount(armyToTransferFrom.getOfficerCount() - leadersToSplit);
            armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToSplit);
            if (armyToTransferFrom instanceof footArmy_1.FootArmy) {
                armyToTransferFrom.setMountCount(armyToTransferFrom.getMountCount() - mountsToSplit);
                armyToTransferTo.setMountCount(armyToTransferTo.getMountCount() + mountsToSplit);
            }
            if (armyToTransferFrom instanceof footArmy_1.FootArmy || armyToTransferFrom instanceof fleet_1.Fleet) {
                armyToTransferFrom.setLightCatapultCount(armyToTransferFrom.getLightCatapultCount() - lkpToSplit);
                armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToSplit);
                armyToTransferFrom.setHeavyCatapultCount(armyToTransferFrom.getHeavyCatapultCount() - skpToSplit);
                armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToSplit);
            }
            if (leadersToSplit > 0 &&
                armyToTransferFrom.getMovePoints() < armyToTransferFrom.getMaxMovePoints()) {
                armyToTransferTo.setMovePoints(0);
            }
            else if (armyToTransferFrom.getMovePoints() < armyToTransferTo.getMovePoints()) {
                armyToTransferTo.setMovePoints(armyToTransferFrom.getMovePoints());
            }
            if (armyToTransferFrom.getHeightPoints() < armyToTransferTo.getHeightPoints()) {
                armyToTransferTo.setHeightPoints(armyToTransferFrom.getHeightPoints());
            }
        }
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
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
        else if ((army1.constructor === army2.constructor || (this.troops === 0 && this.mounts === 0 &&
            this.lkp === 0 && this.skp === 0)) && army1.getPosition()[0] === army2.getPosition()[0] &&
            army1.getPosition()[1] === army2.getPosition()[1]) {
            this.status = 4 /* Available */;
        }
        else if (((((army1 instanceof footArmy_1.FootArmy || army1 instanceof riderArmy_1.RiderArmy) && army1.getMovePoints() < 3) ||
            army1 instanceof fleet_1.Fleet && army1.getMovePoints() < 5) && (((army2 instanceof footArmy_1.FootArmy ||
            army2 instanceof riderArmy_1.RiderArmy) && army2.getMovePoints() < 3) || army2 instanceof fleet_1.Fleet && army2.getMovePoints() < 5))) {
            this.status = 2 /* Impossible */;
        }
        else {
            this.status = 3 /* Withheld */;
        }
    }
    makeEventListItemText() {
        let result = "" + this.realm.tag + "'s army " + this.fromArmy + " transfers ";
        if (this.troops !== 0) {
            result += this.troops + " troops, ";
        }
        if (this.leaders !== 0) {
            result += this.leaders + " leaders, ";
        }
        if (this.mounts !== 0) {
            result += this.mounts + " mounts, ";
        }
        if (this.lkp !== 0) {
            result += this.lkp + " lkp, ";
        }
        if (this.skp !== 0) {
            result += this.skp + " skp ";
        }
        return result + "to " + this.toArmy + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.TransferEvent = TransferEvent;
