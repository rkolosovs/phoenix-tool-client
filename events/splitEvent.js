"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const drawingFunctions_1 = require("../gui/drawingFunctions");
class SplitEvent extends event_1.PhoenixEvent {
    constructor(id, status, fromArmy, newArmy, realm, troops, leaders, mounts, lkp, skp, x, y, pk) {
        super(id, status, pk);
        this.id = id;
        this.status = status;
        this.fromArmy = fromArmy;
        this.newArmy = newArmy;
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
        console.log("this is a split event");
        let armyFromPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let newArmyId = this.newArmy;
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
        }
        if (armyFromPlaceInList >= 0) {
            let armyToSplitFrom = gameState_1.GameState.armies[armyFromPlaceInList];
            armyToSplitFrom.setTroopCount(armyToSplitFrom.getTroopCount() - toSplit);
            armyToSplitFrom.setOfficerCount(armyToSplitFrom.getOfficerCount() - leadersToSplit);
            if (armyToSplitFrom instanceof footArmy_1.FootArmy) {
                armyToSplitFrom.setMountCount(armyToSplitFrom.getMountCount() - mountsToSplit);
            }
            if (armyToSplitFrom instanceof footArmy_1.FootArmy || armyToSplitFrom instanceof fleet_1.Fleet) {
                armyToSplitFrom.setLightCatapultCount(armyToSplitFrom.getLightCatapultCount() - lkpToSplit);
                armyToSplitFrom.setHeavyCatapultCount(armyToSplitFrom.getHeavyCatapultCount() - skpToSplit);
            }
            let army;
            if (Math.floor(newArmyId / 100) === 1) {
                army = new footArmy_1.FootArmy(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints());
                // new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false,
                // GameState.armies[armyFromPlaceInList].x, GameState.armies[armyFromPlaceInList].y, realm);
            }
            else if (Math.floor(newArmyId / 100) === 2) {
                army = new riderArmy_1.RiderArmy(newArmyId, realm, toSplit, leadersToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints());
                // new reiterHeer(newArmyId, toSplit, leadersToSplit, false, GameState.armies[armyFromPlaceInList].x,
                // GameState.armies[armyFromPlaceInList].y, realm);
            }
            else if (Math.floor(newArmyId / 100) === 3) {
                army = new fleet_1.Fleet(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints());
                // new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false,
                // GameState.armies[armyFromPlaceInList].x, GameState.armies[armyFromPlaceInList].y, realm);
            }
            gameState_1.GameState.armies.push(army);
        }
        this.status = 'checked';
        fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    determineEventStatus() {
        let typefactor = 1;
        let army = gameState_1.GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        }
        else {
            let mountCount = 0;
            let lkpCount = 0;
            let skpCount = 0;
            if (army instanceof riderArmy_1.RiderArmy) {
                typefactor = 2;
            }
            else if (army instanceof fleet_1.Fleet) {
                typefactor = 100;
                lkpCount = army.getLightCatapultCount();
                skpCount = army.getHeavyCatapultCount();
            }
            else if (army instanceof footArmy_1.FootArmy) {
                mountCount = army.getMountCount();
                lkpCount = army.getLightCatapultCount();
                skpCount = army.getHeavyCatapultCount();
            }
            if (army.getPosition()[0] != this.x || army.getPosition()[1] != this.y) {
                this.status = 'withheld';
            }
            else if (((army.getTroopCount() - this.troops) >= (100 / typefactor)) &&
                ((army.getOfficerCount() - this.leaders) >= 1) &&
                ((mountCount - this.mounts) >= 0) &&
                ((lkpCount - this.lkp) >= 0) &&
                ((skpCount - this.skp) >= 0)) {
                this.status = 'available';
            }
            else {
                this.status = 'impossible';
            }
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        // TODO: detailed explanation
        let innerHTMLString = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " splits off army " + this.newArmy + " with ";
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
        innerHTMLString += "in (" + this.x + "," + this.y + ").</div>";
        eli.innerHTML = innerHTMLString;
        return this.commonEventListItem(eli, this.id);
    }
    getType() {
        return "split";
    }
}
exports.SplitEvent = SplitEvent;
