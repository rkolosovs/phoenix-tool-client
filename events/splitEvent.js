"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const gameState_1 = require("../gameState");
const footArmy_1 = require("../armies/footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class SplitEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, newArmyId, realm, troops, leaders, mounts, lkp, skp, position, prerequisiteEvents, databasePrimaryKey) {
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
    typeAsString() {
        return "split";
    }
    getContent() {
        return "{'fromArmyId': " + this.fromArmyId + ", 'newArmyId': " + this.newArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
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
            try {
                armyToSplitFrom.split(this.troops, this.leaders, this.lkp, this.skp, this.mounts, this.newArmyId);
                this.status = 0 /* Checked */;
            }
            catch (e) {
                window.alert(e.message);
            }
        }
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
