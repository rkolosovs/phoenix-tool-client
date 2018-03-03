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

    constructor(listPosition: number, status: EventStatus, prerequisiteEvents: number[], protected fromArmy: number,
        protected toArmy: number, protected realm: Realm, protected position: [number, number],
                databasePrimaryKey: number){
            super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    getContent(): JSON{
        // TODO
        return JSON.parse('{}');
    }

    validGameState(): boolean{
        //Both armies exist and are in position.
        let ownArmiesOnCorrectField: Army[] = GameState.armies.filter(army =>
            army.owner === this.realm &&
            army.getPosition()[0] === this.position[0] &&
            army.getPosition()[1] === this.position[1]);
        return ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.fromArmy) &&
            ownArmiesOnCorrectField.some(army => army.getErkenfaraID() === this.toArmy);
    }

    checkEvent(): void{
        let armyFromPlaceInList = -1;
        let armyToPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let armyToId = this.toArmy;
        let realm = this.realm;
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() == armyFromId && GameState.armies[i].owner == realm) {
                armyFromPlaceInList = i;
                console.log("i1=" + i);
            }
            else if (GameState.armies[i].getErkenfaraID() == armyToId && GameState.armies[i].owner == realm) {
                armyToPlaceInList = i;
                console.log("i2=" + i);
            }
        }
        if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
            selectedArmyIndex = armyFromPlaceInList;
            ButtonFunctions.mergeSelectedArmy(armyToPlaceInList);
            preparedEvents.pop();
        }
        this.status = EventStatus.Checked;
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
        Controls.selectedArmyIndex = -1;
    }

    makeEventListItemText(): string{
        return "" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}