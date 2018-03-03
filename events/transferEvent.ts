import {Army} from "../armies/army";
import {PhoenixEvent} from "./event";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {FootArmy} from "../armies/footArmy";
import {Drawing} from "../gui/drawingFunctions";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";

export class TransferEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected fromArmy: number, protected toArmy: number,
                protected realm: Realm, protected troops: number, protected leaders: number, protected mounts: number,
                protected lkp: number, protected skp: number, protected position: [number, number],
                databasePrimaryKey: number){
        super(listPosition, status, databasePrimaryKey);
    }

    getContent(): JSON{
        // TODO
        return JSON.parse('{}');
    }

    checkEvent(): void{
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
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() === armyFromId && GameState.armies[i].owner === realm) {
                armyFromPlaceInList = i;
            }
            else if (GameState.armies[i].getErkenfaraID() === armyToId && GameState.armies[i].owner === realm) {
                armyToPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
            let armyToTransferFrom: Army = GameState.armies[armyFromPlaceInList];
            let armyToTransferTo: Army = GameState.armies[armyToPlaceInList];
            armyToTransferFrom.setTroopCount(armyToTransferFrom.getTroopCount() - toSplit);
            armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + toSplit);
            armyToTransferFrom.setOfficerCount(armyToTransferFrom.getOfficerCount() - leadersToSplit);
            armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToSplit);
            if (armyToTransferFrom instanceof FootArmy) {
                (armyToTransferFrom as FootArmy).setMountCount(
                    (armyToTransferFrom as FootArmy).getMountCount() - mountsToSplit);
                (armyToTransferTo as FootArmy).setMountCount(
                    (armyToTransferTo as FootArmy).getMountCount() + mountsToSplit);
            }
            if (armyToTransferFrom instanceof FootArmy || armyToTransferFrom instanceof Fleet) {
                armyToTransferFrom.setLightCatapultCount(armyToTransferFrom.getLightCatapultCount() - lkpToSplit);
                armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToSplit);
                armyToTransferFrom.setHeavyCatapultCount(armyToTransferFrom.getHeavyCatapultCount() - skpToSplit);
                armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToSplit);
            }
            if (leadersToSplit > 0 &&
                armyToTransferFrom.getMovePoints() < armyToTransferFrom.getMaxMovePoints()) {
                armyToTransferTo.setMovePoints(0);
            } else if (armyToTransferFrom.getMovePoints() < armyToTransferTo.getMovePoints()) {
                armyToTransferTo.setMovePoints(armyToTransferFrom.getMovePoints());
            }
            if (armyToTransferFrom.getHeightPoints() < armyToTransferTo.getHeightPoints()) {
                armyToTransferTo.setHeightPoints(armyToTransferFrom.getHeightPoints());
            }
        }
        this.status = EventStatus.Checked;
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        let army1 = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = GameState.armies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = EventStatus.Withheld;
        }
        else if (army1.getPosition()[0] !== this.position[0] || army1.getPosition()[1] !== this.position[1] ||
        army2.getPosition()[0] !== this.position[0] || army2.getPosition()[1] !== this.position[1]) {
            this.status = EventStatus.Withheld;
        } else if ((army1.constructor === army2.constructor || (this.troops === 0 && this.mounts === 0 && 
            this.lkp === 0 && this.skp === 0)) && army1.getPosition()[0] === army2.getPosition()[0] && 
                army1.getPosition()[1] === army2.getPosition()[1]) {
                    this.status = EventStatus.Available;
        }
        else if (((((army1 instanceof FootArmy || army1 instanceof RiderArmy) && army1.getMovePoints() < 3) || 
            army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof FootArmy || 
            army2 instanceof RiderArmy) && army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
            this.status = EventStatus.Impossible;
        }
        else {
            this.status = EventStatus.Withheld;
        }
    }

    makeEventListItemText(): string{
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