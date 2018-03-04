import {Army} from "../armies/army";
import {PhoenixEvent} from "./event";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {FootArmy} from "../armies/footArmy";
import {Drawing} from "../gui/drawingFunctions";
import {Fleet} from "../armies/fleet";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";
import {ArmyFunctions} from "../libraries/armyFunctions";

export class TransferEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, prerequisiteEvents: number[], protected fromArmyId: number,
                protected toArmyId: number, protected realm: Realm, protected troops: number, protected leaders: number,
                protected mounts: number, protected lkp: number, protected skp: number,
                protected position: [number, number], databasePrimaryKey: number){
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    protected getType(): string{
        return "transfer";
    }

    protected getContent(): string{
        return "{'fromArmyId': " + this.fromArmyId + ", 'toArmyId': " + this.toArmyId +
            ", 'realm': " + this.realm.tag + ", 'troops': " + this.troops + ", 'leaders': " + this.leaders +
            ", 'mounts': " + this.mounts + ", 'lkp': " + this.lkp + ", 'skp': " + this.skp +
            ", 'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }

    protected validGameState(): boolean{
        let fromArmy: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
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
            ((this.mounts > 0 && fromArmy instanceof FootArmy && this.mounts <= fromArmy.getMountCount()) ||
                this.mounts <= 0);
    }

    checkEvent(): void{
        let fromArmy: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        let toArmy: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === this.toArmyId && army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]);
        if (fromArmy != undefined && toArmy != undefined) {
            fromArmy.setTroopCount(fromArmy.getTroopCount() - this.troops);
            toArmy.setTroopCount(toArmy.getTroopCount() + this.troops);
            fromArmy.setOfficerCount(fromArmy.getOfficerCount() - this.leaders);
            toArmy.setOfficerCount(toArmy.getOfficerCount() + this.leaders);
            if (fromArmy instanceof FootArmy) {
                (fromArmy as FootArmy).setMountCount(
                    (fromArmy as FootArmy).getMountCount() - this.mounts);
                (toArmy as FootArmy).setMountCount(
                    (toArmy as FootArmy).getMountCount() + this.mounts);
            }
            if (fromArmy instanceof FootArmy || fromArmy instanceof Fleet) {
                fromArmy.setLightCatapultCount(fromArmy.getLightCatapultCount() - this.lkp);
                toArmy.setLightCatapultCount(toArmy.getLightCatapultCount() + this.lkp);
                fromArmy.setHeavyCatapultCount(fromArmy.getHeavyCatapultCount() - this.skp);
                toArmy.setHeavyCatapultCount(toArmy.getHeavyCatapultCount() + this.skp);
            }
            if (this.leaders > 0 &&
                fromArmy.getMovePoints() < fromArmy.getMaxMovePoints()) {
                toArmy.setMovePoints(0);
            } else if (fromArmy.getMovePoints() < toArmy.getMovePoints()) {
                toArmy.setMovePoints(fromArmy.getMovePoints());
            }
            if (fromArmy.getHeightPoints() < toArmy.getHeightPoints()) {
                toArmy.setHeightPoints(fromArmy.getHeightPoints());
            }
        }
        this.status = EventStatus.Checked;
        ArmyFunctions.checkArmiesForLiveliness();
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }

    makeEventListItemText(): string{
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