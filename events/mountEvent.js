"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const riderArmy_1 = require("../armies/riderArmy");
const footArmy_1 = require("../armies/footArmy");
const gui_1 = require("../gui/gui");
class MountEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, fromArmy, newArmy, realm, troops, leaders, position, databasePrimaryKey) {
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.fromArmy = fromArmy;
        this.newArmy = newArmy;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.position = position;
    }
    getContent() {
        // TODO
        return JSON.parse('{}');
    }
    validGameState() {
        // TODO
        return false;
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
                this.status = 0 /* Checked */;
                if (army instanceof riderArmy_1.RiderArmy) {
                    army.dismount(toSplit, leadersToSplit, newArmyId);
                    this.status = 0 /* Checked */;
                }
            }
        }
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
    // determineEventStatus(): void{
    //     let typefactor = 1;
    //
    //     let army = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
    //     if (army == undefined) {
    //         this.status = EventStatus.Withheld;
    //     } else {
    //         if (army instanceof RiderArmy) {
    //             typefactor = 2;
    //         }
    //         else if (army instanceof Fleet) {
    //             typefactor = 100;
    //         }
    //         if (army.getPosition()[0] != this.position[0] || army.getPosition()[1] != this.position[1]) {
    //             this.status = EventStatus.Withheld;
    //         } else if ((army instanceof FootArmy && (((army.getTroopCount() - this.troops) >= 0) &&
    //             ((army.getOfficerCount() - this.leaders) >= 0) && (((army as FootArmy).getMountCount() - this.troops) >= 0))) ||
    //             (army instanceof RiderArmy && (((army.getTroopCount() - this.troops) >= 0) &&
    //                 ((army.getOfficerCount() - this.leaders) >= 0)))) {
    //                     this.status = EventStatus.Available;
    //         } else {
    //             this.status = EventStatus.Impossible;
    //         }
    //     }
    //     let mountCount: number = 0;
    //     let lkpCount: number = 0;
    //     let skpCount: number = 0;
    //     if (army instanceof RiderArmy) {
    //         typefactor = 2;
    //     }
    //     else if (army instanceof Fleet) {
    //         typefactor = 100;
    //         lkpCount = (army as Fleet).getLightCatapultCount();
    //         skpCount = (army as Fleet).getHeavyCatapultCount();
    //     } else if (army instanceof FootArmy) {
    //         mountCount = (army as FootArmy).getMountCount();
    //         lkpCount = (army as FootArmy).getLightCatapultCount();
    //         skpCount = (army as FootArmy).getHeavyCatapultCount();
    //     }
    //     if(((army.getTroopCount() - this.troops) >= (100/typefactor)) &&
    //      ((army.getOfficerCount() - this.leaders) >= 1)) //&&
    //      //TODO probably needs to go and change the fields in the contrudtor accordingly
    //      //((mountCount - this.mounts) >= 0) &&
    //      //((lkpCount - this.lkp) >= 0) &&
    //      //((skpCount - this.skp) >= 0))
    //     {
    //         this.status = EventStatus.Available;
    //     }
    //     else
    //     {
    //         this.status = EventStatus.Impossible;
    //     }
    // }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.fromArmy + " mounts " + this.troops + " troops, and " +
            this.leaders + " leaders to " + this.newArmy + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}
exports.MountEvent = MountEvent;
