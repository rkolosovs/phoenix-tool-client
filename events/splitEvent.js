"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
class SplitEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmy, newArmy, realm, troops, leaders, mounts, lkp, skp, position, databasePrimaryKey) {
        super(listPosition, status, databasePrimaryKey);
        this.fromArmy = fromArmy;
        this.newArmy = newArmy;
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
            if (Math.floor(newArmyId / 100) === 1) {
                gameState_1.GameState.armies.push(new footArmy_1.FootArmy(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints()));
            }
            else if (Math.floor(newArmyId / 100) === 2) {
                gameState_1.GameState.armies.push(new riderArmy_1.RiderArmy(newArmyId, realm, toSplit, leadersToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints()));
            }
            else if (Math.floor(newArmyId / 100) === 3) {
                gameState_1.GameState.armies.push(new fleet_1.Fleet(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints()));
            }
        }
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    determineEventStatus() {
        let typefactor = 1;
        let army = gameState_1.GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 3 /* Withheld */;
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
            if (army.getPosition()[0] != this.position[0] || army.getPosition()[1] != this.position[1]) {
                this.status = 3 /* Withheld */;
            }
            else if (((army.getTroopCount() - this.troops) >= (100 / typefactor)) &&
                ((army.getOfficerCount() - this.leaders) >= 1) &&
                ((mountCount - this.mounts) >= 0) &&
                ((lkpCount - this.lkp) >= 0) &&
                ((skpCount - this.skp) >= 0)) {
                this.status = 4 /* Available */;
            }
            else {
                this.status = 2 /* Impossible */;
            }
        }
    }
    makeEventListItemText() {
        // TODO: detailed explanation
        let result = "" + this.realm.tag + "'s army " + this.fromArmy + " splits off army " +
            this.newArmy + " with ";
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
        return result + "in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.SplitEvent = SplitEvent;
