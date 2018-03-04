"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class SplitEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, fromArmyId, newArmyId, realm, troops, leaders, mounts, lkp, skp, position, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.newArmyId = newArmyId;
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
    validGameState() {
        //The from-army exists and is in position.
        let fromArmy = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy == undefined) {
            return false;
        }
        //The new army doesn't yet exist.
        if (gameState_1.GameState.armies.some(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.newArmyId)) {
            return false;
        }
        //There are enough troops, officers, catapults and if at least one mount has to be split, there are enough of
        //those and army to be split from is a foot army. No check for viability of the remaining army is made since
        //abandoning a few stragglers or the catapults is not prohibited by the rules.
        return this.troops <= fromArmy.getTroopCount() &&
            this.leaders <= fromArmy.getOfficerCount() &&
            this.lkp <= fromArmy.getLightCatapultCount() &&
            this.skp <= fromArmy.getHeavyCatapultCount() &&
            ((this.mounts > 0 && fromArmy instanceof footArmy_1.FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }
    checkEvent() {
        let armyToSplitFrom = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId &&
            army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (armyToSplitFrom != undefined) {
            armyToSplitFrom.setTroopCount(armyToSplitFrom.getTroopCount() - this.troops);
            armyToSplitFrom.setOfficerCount(armyToSplitFrom.getOfficerCount() - this.leaders);
            if (armyToSplitFrom instanceof footArmy_1.FootArmy) {
                armyToSplitFrom.setMountCount(armyToSplitFrom.getMountCount() - this.mounts);
            }
            if (armyToSplitFrom instanceof footArmy_1.FootArmy || armyToSplitFrom instanceof fleet_1.Fleet) {
                armyToSplitFrom.setLightCatapultCount(armyToSplitFrom.getLightCatapultCount() - this.lkp);
                armyToSplitFrom.setHeavyCatapultCount(armyToSplitFrom.getHeavyCatapultCount() - this.skp);
            }
            if (armyToSplitFrom instanceof footArmy_1.FootArmy) {
                gameState_1.GameState.armies.push(new footArmy_1.FootArmy(this.newArmyId, this.realm, this.troops, this.leaders, this.lkp, this.skp, this.mounts, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints()));
            }
            else if (armyToSplitFrom instanceof riderArmy_1.RiderArmy) {
                gameState_1.GameState.armies.push(new riderArmy_1.RiderArmy(this.newArmyId, this.realm, this.troops, this.leaders, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints()));
            }
            else if (armyToSplitFrom instanceof fleet_1.Fleet) {
                gameState_1.GameState.armies.push(new fleet_1.Fleet(this.newArmyId, this.realm, this.troops, this.leaders, this.lkp, this.skp, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints()));
            }
        }
        this.status = 0 /* Checked */;
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        // TODO: detailed explanation
        let result = "" + this.realm.tag + "'s army " + this.fromArmyId + " splits off army " +
            this.newArmyId + " with ";
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
