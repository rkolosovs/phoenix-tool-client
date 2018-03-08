import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {RiderArmy} from "../armies/riderArmy";
import {FootArmy} from "../armies/footArmy";
import {Army} from "../armies/army";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";
import {ArmyFunctions} from "../libraries/armyFunctions";

export class MountEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected fromArmyId: number, protected newArmyId: number,
                protected realm: Realm, protected troops: number, protected leaders: number,
                protected position: [number, number], prerequisiteEvents?: number[], databasePrimaryKey?: number){
        //protected mounts: number, protected lkp: number, protected skp: number,
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    typeAsString(): string{
        return "mount/dismount";
    }

    protected getContent(): string{
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId +
            ", 'newArmy': " + this.newArmyId + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }

    protected validGameState(): boolean{
        //The from-army exists and is in position.
        let fromArmy: Army|undefined = GameState.armies.find(army =>
            army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if(fromArmy == undefined){
            return false;
        }
        //The new army doesn't yet exist.
        if(GameState.armies.some(army =>
                army.owner === this.realm &&
                army.getErkenfaraID() === this.newArmyId)){
            return false;
        }
        if(fromArmy instanceof FootArmy){//Mount case
            //There are enough troops, officers and mounts. No check for viability of the remaining army is made since
            //abandoning a few stragglers or the catapults is not prohibited by the rules.
            if(fromArmy.getTroopCount() < this.troops ||
                fromArmy.getOfficerCount() < this.leaders ||
                fromArmy.getMountCount() < this.troops){
                return false;
            }
        } else{//Dismount case
            //There are enough troops and officers. No check for viability of the remaining army is made since
            //abandoning a few stragglers in not prohibited by the rules.
            if(fromArmy.getTroopCount() < this.troops || fromArmy.getOfficerCount() < this.leaders){
                return false;
            }
        }
        return true;
    }

    checkEvent(): void{
        let fromArmy: Army|undefined = GameState.armies.find(army =>
            army.owner === this.realm &&
            army.getErkenfaraID() === this.fromArmyId &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if(fromArmy != undefined){
            if(fromArmy instanceof FootArmy){
                fromArmy.mount(this.troops, this.leaders, this.newArmyId);
            } else if(fromArmy instanceof RiderArmy){
                fromArmy.dismount(this.troops, this.leaders, this.newArmyId);
            } else{
                throw new Error("Army to mount/dismount from was neither a foot army nor a rider army.");
            }
            this.status = EventStatus.Checked;
            ArmyFunctions.checkArmiesForLiveliness();
            GUI.getBigBox().fillEventList();
            Drawing.drawStuff();
        } else{
            throw new Error("Army to mount/dismount from does not exist or isn't in position.");
        }
    }

    makeEventListItemText(): string{
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " mounts " + this.troops + " troops, and " +
            this.leaders + " leaders to " + this.newArmyId + " in (" + this.position[0] + "," + this.position[1] + ")";
    }
}