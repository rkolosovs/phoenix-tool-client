import {Army} from "../armies/army";
import {PhoenixEvent} from "./event";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {FootArmy} from "../armies/footArmy";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {Drawing} from "../gui/drawingFunctions";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";
import {ArmyFunctions} from "../libraries/armyFunctions";

export class SplitEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected fromArmyId: number, protected newArmyId: number,
                protected realm: Realm, protected troops: number, protected leaders: number, protected mounts: number,
                protected lkp: number, protected skp: number, protected position: [number, number],
                prerequisiteEvents?: number[], databasePrimaryKey?: number){
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    protected getType(): string{
        return "split";
    }

    protected getContent(): string{
        return "{'fromArmyId': " + this.fromArmyId + ", 'newArmyId': " + this.newArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
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
        //There are enough troops, officers, catapults and if at least one mount has to be split, there are enough of
        //those and army to be split from is a foot army. No check for viability of the remaining army is made since
        //abandoning a few stragglers or the catapults is not prohibited by the rules.
        return this.troops <= fromArmy.getTroopCount() &&
            this.leaders <= fromArmy.getOfficerCount() &&
            this.lkp <= fromArmy.getLightCatapultCount() &&
            this.skp <= fromArmy.getHeavyCatapultCount() &&
            ((this.mounts > 0 && fromArmy instanceof FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }

    checkEvent(): void{
        let armyToSplitFrom: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === this.fromArmyId &&
            army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        if (armyToSplitFrom != undefined) {
            armyToSplitFrom.setTroopCount(armyToSplitFrom.getTroopCount() - this.troops);
            armyToSplitFrom.setOfficerCount(armyToSplitFrom.getOfficerCount() - this.leaders);
            if (armyToSplitFrom instanceof FootArmy) {
                armyToSplitFrom.setMountCount(armyToSplitFrom.getMountCount() - this.mounts);
            }
            if (armyToSplitFrom instanceof FootArmy || armyToSplitFrom instanceof Fleet) {
                armyToSplitFrom.setLightCatapultCount(armyToSplitFrom.getLightCatapultCount() - this.lkp);
                armyToSplitFrom.setHeavyCatapultCount(armyToSplitFrom.getHeavyCatapultCount() - this.skp);
            }
            if (armyToSplitFrom instanceof FootArmy) {
                GameState.armies.push(new FootArmy(this.newArmyId, this.realm, this.troops, this.leaders, this.lkp,
                    this.skp, this.mounts, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(),
                    armyToSplitFrom.getHeightPoints()));
            }
            else if (armyToSplitFrom instanceof RiderArmy) {
                GameState.armies.push(new RiderArmy(this.newArmyId, this.realm, this.troops, this.leaders,
                    armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints()));
            }
            else if (armyToSplitFrom instanceof Fleet) {
                GameState.armies.push(new Fleet(this.newArmyId, this.realm, this.troops, this.leaders, this.lkp,
                    this.skp, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints()));
            }
        }
        this.status = EventStatus.Checked;
        ArmyFunctions.checkArmiesForLiveliness();
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }

    makeEventListItemText(): string{
        // TODO: detailed explanation
        let result: string = "" + this.realm.tag + "'s army " + this.fromArmyId + " splits off army " +
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