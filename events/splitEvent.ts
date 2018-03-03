import {Army} from "../armies/army";
import {PhoenixEvent} from "./event";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {FootArmy} from "../armies/footArmy";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {Drawing} from "../gui/drawingFunctions";
import {GUI} from "../gui/gui";

export class SplitEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: string, protected fromArmy: number, protected newArmy: number,
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
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() === armyFromId && GameState.armies[i].owner === realm) {
                armyFromPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0) {
            let armyToSplitFrom: Army = GameState.armies[armyFromPlaceInList];
            armyToSplitFrom.setTroopCount(armyToSplitFrom.getTroopCount() - toSplit);
            armyToSplitFrom.setOfficerCount(armyToSplitFrom.getOfficerCount() - leadersToSplit);
            if (armyToSplitFrom instanceof FootArmy) {
                armyToSplitFrom.setMountCount(armyToSplitFrom.getMountCount() - mountsToSplit);
            }
            if (armyToSplitFrom instanceof FootArmy || armyToSplitFrom instanceof Fleet) {
                armyToSplitFrom.setLightCatapultCount(armyToSplitFrom.getLightCatapultCount() - lkpToSplit);
                armyToSplitFrom.setHeavyCatapultCount(armyToSplitFrom.getHeavyCatapultCount() - skpToSplit);
            }
            if (Math.floor(newArmyId / 100) === 1) {
                GameState.armies.push(new FootArmy(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit,
                    mountsToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(),
                    armyToSplitFrom.getHeightPoints()));
            }
            else if (Math.floor(newArmyId / 100) === 2) {
                GameState.armies.push(new RiderArmy(newArmyId, realm, toSplit, leadersToSplit,
                    armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints()));
            }
            else if (Math.floor(newArmyId / 100) === 3) {
                GameState.armies.push(new Fleet(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit,
                    armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints()));
            }
        }
        this.status = 'checked';
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        let typefactor = 1;
        let army = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        } else {
            let mountCount: number = 0;
            let lkpCount: number = 0;
            let skpCount: number = 0;
            if (army instanceof RiderArmy) {
                typefactor = 2;
            }
            else if (army instanceof Fleet) {
                typefactor = 100;
                lkpCount = (army as Fleet).getLightCatapultCount();
                skpCount = (army as Fleet).getHeavyCatapultCount();
            } else if (army instanceof FootArmy) {
                mountCount = (army as FootArmy).getMountCount();
                lkpCount = (army as FootArmy).getLightCatapultCount();
                skpCount = (army as FootArmy).getHeavyCatapultCount();
            }
            if (army.getPosition()[0] != this.position[0] || army.getPosition()[1] != this.position[1]) {
                this.status = 'withheld';
            } else if (((army.getTroopCount() - this.troops) >= (100 / typefactor)) &&
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

    makeEventListItemText(): string{
        // TODO: detailed explanation
        let result: string = "" + this.realm.tag + "'s army " + this.fromArmy + " splits off army " +
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

    getType(): string{
        return "split";
    }
}