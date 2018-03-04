"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const fleet_1 = require("../armies/fleet");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class TransferEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, fromArmyId, toArmyId, realm, troops, leaders, mounts, lkp, skp, position, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.toArmyId = toArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.position = position;
    }
    getType() {
        return "transfer";
    }
    getContent() {
        return "{'fromArmyId': " + this.fromArmyId + ", 'toArmyId': " + this.toArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }
    validGameState() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        //Both armies exist, are in position and have the same type.
        //There are enough troops, officers, catapults and if at least one mount has to be split, there are enough
        //of those and army to be split from is a foot army. No check for viability of the remaining army is made
        //since abandoning a few stragglers or the catapults is not prohibited by the rules.
        return fromArmy != undefined &&
            toArmy != undefined &&
            fromArmy.constructor === toArmy.constructor &&
            this.troops <= fromArmy.getTroopCount() &&
            this.leaders <= fromArmy.getOfficerCount() &&
            this.lkp <= fromArmy.getLightCatapultCount() &&
            this.skp <= fromArmy.getHeavyCatapultCount() &&
            ((this.mounts > 0 && fromArmy instanceof footArmy_1.FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined && toArmy != undefined) {
            fromArmy.setTroopCount(fromArmy.getTroopCount() - this.troops);
            toArmy.setTroopCount(toArmy.getTroopCount() + this.troops);
            fromArmy.setOfficerCount(fromArmy.getOfficerCount() - this.leaders);
            toArmy.setOfficerCount(toArmy.getOfficerCount() + this.leaders);
            if (fromArmy instanceof footArmy_1.FootArmy) {
                fromArmy.setMountCount(fromArmy.getMountCount() - this.mounts);
                toArmy.setMountCount(toArmy.getMountCount() + this.mounts);
            }
            if (fromArmy instanceof footArmy_1.FootArmy || fromArmy instanceof fleet_1.Fleet) {
                fromArmy.setLightCatapultCount(fromArmy.getLightCatapultCount() - this.lkp);
                toArmy.setLightCatapultCount(toArmy.getLightCatapultCount() + this.lkp);
                fromArmy.setHeavyCatapultCount(fromArmy.getHeavyCatapultCount() - this.skp);
                toArmy.setHeavyCatapultCount(toArmy.getHeavyCatapultCount() + this.skp);
            }
            if (this.leaders > 0 &&
                fromArmy.getMovePoints() < fromArmy.getMaxMovePoints()) {
                toArmy.setMovePoints(0);
            }
            else if (fromArmy.getMovePoints() < toArmy.getMovePoints()) {
                toArmy.setMovePoints(fromArmy.getMovePoints());
            }
            if (fromArmy.getHeightPoints() < toArmy.getHeightPoints()) {
                toArmy.setHeightPoints(fromArmy.getHeightPoints());
            }
        }
        this.status = 0 /* Checked */;
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    makeEventListItemText() {
        let result = "" + this.realm.tag + "'s army " + this.fromArmyId + " transfers ";
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
        return result + "to " + this.toArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.TransferEvent = TransferEvent;
