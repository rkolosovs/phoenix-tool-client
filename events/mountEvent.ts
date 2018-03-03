import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {FootArmy} from "../armies/footArmy";
import {Army} from "../armies/army";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";

export class MountEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, prerequisiteEvents: number[], protected fromArmy: number,
        protected newArmy: number, protected realm: Realm, protected troops: number, protected leaders: number, 
         protected position: [number, number], databasePrimaryKey: number){
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);

    }

    getContent(): JSON{
        // TODO
        return JSON.parse('{}');
    }

    validGameState(): boolean{
        // TODO
        return false;
    }

    checkEvent(): void{
        let armyFromPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let newArmyId = this.newArmy;
        let realm = this.realm;
        let toSplit = this.troops;
        let leadersToSplit = this.leaders;
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() == armyFromId && GameState.armies[i].owner == realm) {
                armyFromPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0) {
            let army: Army = GameState.armies[armyFromPlaceInList];
            if (army instanceof FootArmy) {
                (army as FootArmy).mount(toSplit, leadersToSplit, newArmyId);
                this.status = EventStatus.Checked;
				if (army instanceof RiderArmy) {
                    (army as RiderArmy).dismount(toSplit, leadersToSplit, newArmyId);
                this.status = EventStatus.Checked;
                }
            }
        }
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        let typefactor = 1;
        
        let army = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = EventStatus.Withheld;
        } else {
            if (army instanceof RiderArmy) {
                typefactor = 2;
            }
            else if (army instanceof Fleet) {
                typefactor = 100;
            }
            if (army.getPosition()[0] != this.position[0] || army.getPosition()[1] != this.position[1]) {
                this.status = EventStatus.Withheld;
            } else if ((army instanceof FootArmy && (((army.getTroopCount() - this.troops) >= 0) &&
                ((army.getOfficerCount() - this.leaders) >= 0) && (((army as FootArmy).getMountCount() - this.troops) >= 0))) ||
                (army instanceof RiderArmy && (((army.getTroopCount() - this.troops) >= 0) &&
                    ((army.getOfficerCount() - this.leaders) >= 0)))) {
                        this.status = EventStatus.Available;
            } else {
                this.status = EventStatus.Impossible;
            }
        }
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
        if(((army.getTroopCount() - this.troops) >= (100/typefactor)) &&
         ((army.getOfficerCount() - this.leaders) >= 1)) //&&
         //TODO probably needs to go and change the fields in the contrudtor accordingly
         //((mountCount - this.mounts) >= 0) &&
         //((lkpCount - this.lkp) >= 0) &&
         //((skpCount - this.skp) >= 0))
        {
            this.status = EventStatus.Available;
        }
        else
        {
            this.status = EventStatus.Impossible;
        }
    }

    makeEventListItemText(): string{
        return "" + this.realm.tag + "'s army " + this.fromArmy + " mounts " + this.troops + " troops, and " +
            this.leaders + " leaders to " + this.newArmy + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}