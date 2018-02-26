"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const riderArmy_1 = require("../armies/riderArmy");
class TransferEvent extends event_1.PhoenixEvent {
    constructor(id, status, fromArmy, toArmy, realm, troops, leaders, mounts, lkp, skp, x, y, pk) {
        super(id, status, pk);
        this.id = id;
        this.status = status;
        this.fromArmy = fromArmy;
        this.toArmy = toArmy;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.x = x;
        this.y = y;
        this.pk = pk;
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
            if (armyToTransferFrom instanceof footArmy_1.FootArmy || armyToTransferFrom instanceof Fleet) {
                armyToTransferFrom.setLightCatapultCount(armyToTransferFrom.getLightCatapultCount() - lkpToSplit);
                armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToSplit);
                armyToTransferFrom.setHeavyCatapultCount(armyToTransferFrom.getHeavyCatapultCount() - skpToSplit);
                armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToSplit);
            }
            if (leadersToSplit > 0 &&
                gameState_1.GameState.armies[armyFromPlaceInList].getMovePoints() < gameState_1.GameState.armies[armyFromPlaceInList].getMaxMovePoints()) {
                gameState_1.GameState.armies[armyToPlaceInList].setMovePoints(0);
            }
            else if (gameState_1.GameState.armies[armyFromPlaceInList].getMovePoints() < gameState_1.GameState.armies[armyToPlaceInList].getMovePoints()) {
                gameState_1.GameState.armies[armyToPlaceInList].setMovePoints(gameState_1.GameState.armies[armyFromPlaceInList].getMovePoints());
            }
            if (gameState_1.GameState.armies[armyFromPlaceInList].getHeightPoints() < gameState_1.GameState.armies[armyToPlaceInList].getHeightPoints()) {
                gameState_1.GameState.armies[armyToPlaceInList].setHeightPoints(gameState_1.GameState.armies[armyFromPlaceInList].getHeightPoints());
            }
        }
        this.status = 'checked';
        fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
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
        else if ((army1.constructor === army2.constructor || (this.troops === 0 && this.mounts === 0 &&
            this.lkp === 0 && this.skp === 0)) && army1.getPosition()[0] === army2.getPosition()[0] &&
            army1.getPosition()[1] === army2.getPosition()[1]) {
            this.status = 'available';
        }
        else if (((((army1 instanceof footArmy_1.FootArmy || army1 instanceof riderArmy_1.RiderArmy) && army1.getMovePoints() < 3) ||
            army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof footArmy_1.FootArmy ||
            army2 instanceof riderArmy_1.RiderArmy) && army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
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
        let innerHTMLString = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " transfers ";
        if (this.troops !== 0) {
            innerHTMLString += this.troops + " troops, ";
        }
        if (this.leaders !== 0) {
            innerHTMLString += this.leaders + " leaders, ";
        }
        if (this.mounts !== 0) {
            innerHTMLString += this.mounts + " mounts, ";
        }
        if (this.lkp !== 0) {
            innerHTMLString += this.lkp + " lkp, ";
        }
        if (this.skp !== 0) {
            innerHTMLString += this.skp + " skp ";
        }
        innerHTMLString += "to " + this.toArmy + " in (" + this.x + "," + this.y + ").</div>";
        eli.innerHTML = innerHTMLString;
        return this.commonEventListItem(eli, this.id);
    }
    getType() {
        return "transfer";
    }
}
exports.TransferEvent = TransferEvent;
