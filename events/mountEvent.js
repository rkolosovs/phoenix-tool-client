"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const footArmy_1 = require("../armies/footArmy");
const gui_1 = require("../gui/gui");
class MountEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, fromArmy, newArmy, realm, troops, leaders, position, databasePrimaryKey) {
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, databasePrimaryKey);
        this.fromArmy = fromArmy;
        this.newArmy = newArmy;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.position = position;
    }
    getContent() {
        // TODO
    }
    checkEvent() {
        let armyFromPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let newArmyId = this.newArmy;
        let realm = this.realm;
        let toSplit = this.troops;
        let leadersToSplit = this.leaders;
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getErkenfaraID() == armyFromId && gameState_1.GameState.armies[i].owner == realm) {
                armyFromPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0) {
            let army = gameState_1.GameState.armies[armyFromPlaceInList];
            if (army instanceof footArmy_1.FootArmy) {
                army.mount(toSplit, leadersToSplit, newArmyId);
                this.status = 'checked';
                if (army instanceof riderArmy_1.RiderArmy) {
                    army.dismount(toSplit, leadersToSplit, newArmyId);
                    this.status = 'checked';
                }
            }
        }
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    determineEventStatus() {
        let typefactor = 1;
        let army = gameState_1.GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        }
        else {
            if (army instanceof riderArmy_1.RiderArmy) {
                typefactor = 2;
            }
            else if (army instanceof fleet_1.Fleet) {
                typefactor = 100;
            }
            if (army.getPosition()[0] != this.position[0] || army.getPosition()[1] != this.position[1]) {
                this.status = 'withheld';
            }
            else if ((army instanceof footArmy_1.FootArmy && (((army.getTroopCount() - this.troops) >= 0) &&
                ((army.getOfficerCount() - this.leaders) >= 0) && ((army.getMountCount() - this.troops) >= 0))) ||
                (army instanceof riderArmy_1.RiderArmy && (((army.getTroopCount() - this.troops) >= 0) &&
                    ((army.getOfficerCount() - this.leaders) >= 0)))) {
                this.status = 'available';
            }
            else {
                this.status = 'impossible';
            }
        }
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
        if (((army.getTroopCount() - this.troops) >= (100 / typefactor)) &&
            ((army.getOfficerCount() - this.leaders) >= 1)) 
        //((mountCount - this.mounts) >= 0) &&//TODO probably needs to go and change the fields in the contrudtor accordingly
        //((lkpCount - this.lkp) >= 0) &&
        //((skpCount - this.skp) >= 0))
        {
            this.status = 'available';
        }
        else {
            this.status = 'impossible';
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.listPosition;
        eli.innerHTML = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " mounts " + this.troops + " troops, and "
            + this.leaders + " leaders to " + this.newArmy + " in (" + this.position[0] + "," + this.position[1] + ").</div>";
        return this.commonEventListItem(eli, this.listPosition);
    }
    getType() {
        return "mount";
    }
}
exports.MountEvent = MountEvent;
