import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {ButtonFunctions} from "../controls/buttonFunctions";
import {GUI} from "../gui/gui";
import {Controls} from "../controls/controlVariables";
import {EventStatus} from "./eventStatus";
import {Army} from "../armies/army";

export class MergeEvent extends PhoenixEvent{

    constructor(listPosition: number, status: EventStatus, protected fromArmyId: number, protected toArmyId: number,
                protected realm: Realm, protected position: [number, number], prerequisiteEvents?: number[],
                databasePrimaryKey?: number){
            super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    typeAsString(): string{
        return "merge";
    }

    protected getContent(): string{
        return "{'realm': " + this.realm.tag + ", 'fromArmy': " + this.fromArmyId + ", 'toArmy', " +
            this.toArmyId + "'x': " + this.position[0] + ", 'y': " + this.position[1] + "}";
    }

    protected validGameState(): boolean{
        //Both armies exist and are in position.
        let ownArmiesOnCorrectField: Army[] = GameState.armies.filter(army =>
            army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        return ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.fromArmyId) &&
            ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.toArmyId);
    }

    checkEvent(): void{
        let fromArmy: Army|undefined = GameState.armies.find(
            army => army.getErkenfaraID() === this.fromArmyId && army.owner === this.realm);
        let toArmy: Army|undefined = GameState.armies.find(
            army => army.getErkenfaraID() === this.toArmyId && army.owner === this.realm);
        if (fromArmy != undefined && toArmy != undefined) {
            toArmy.merge(fromArmy);
        } else {
            throw new Error("One of the armies to be merged does not exist.");
        }
        this.status = EventStatus.Checked;
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }

    makeEventListItemText(): string{
        return "" + this.realm.tag + "'s army " + this.fromArmyId + " merges with army " + this.toArmyId + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}