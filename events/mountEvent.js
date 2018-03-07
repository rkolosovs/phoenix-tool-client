"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const riderArmy_1 = require("../armies/riderArmy");
const footArmy_1 = require("../armies/footArmy");
const gui_1 = require("../gui/gui");
const armyFunctions_1 = require("../libraries/armyFunctions");
class MountEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmyId, newArmyId, realm, troops, leaders, position, prerequisiteEvents, databasePrimaryKey) {
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmyId = fromArmyId;
        this.newArmyId = newArmyId;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.position = position;
    }
    typeAsString() {
        return "mount/dismount";
    }
    getContent() {
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId +
            ", 'newArmy': " + this.newArmyId + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
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
        if (fromArmy instanceof footArmy_1.FootArmy) {
            //There are enough troops, officers and mounts. No check for viability of the remaining army is made since
            //abandoning a few stragglers or the catapults is not prohibited by the rules.
            if (fromArmy.getTroopCount() < this.troops ||
                fromArmy.getOfficerCount() < this.leaders ||
                fromArmy.getMountCount() < this.troops) {
                return false;
            }
        }
        else {
            //There are enough troops and officers. No check for viability of the remaining army is made since
            //abandoning a few stragglers in not prohibited by the rules.
            if (fromArmy.getTroopCount() < this.troops || fromArmy.getOfficerCount() < this.leaders) {
                return false;
            }
        }
        return true;
    }
    checkEvent() {
        let fromArmy = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined) {
            if (fromArmy instanceof footArmy_1.FootArmy) {
                fromArmy.mount(this.troops, this.leaders, this.newArmyId);
            }
            else if (fromArmy instanceof riderArmy_1.RiderArmy) {
                fromArmy.dismount(this.troops, this.leaders, this.newArmyId);
            }
            else {
                throw new Error("Army to mount/dismount from was neither a foot army nor a rider army.");
            }
            this.status = 0 /* Checked */;
            armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
        }
        else {
            throw new Error("Army to mount/dismount from does not exist or isn't in position.");
        }
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " mounts " + this.troops + " troops, and " +
            this.leaders + " leaders to " + this.newArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MountEvent = MountEvent;
