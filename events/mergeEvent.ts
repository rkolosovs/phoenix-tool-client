import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {FootArmy} from "../armies/footArmy";
import {ButtonFunctions} from "../controls/buttonFunctions";
import {GUI} from "../gui/gui";
import {Controls} from "../controls/controlVariables";
import {EventStatus} from "./eventStatus";

export class MergeEvent extends PhoenixEvent{

    constructor(listPosition: number, status: EventStatus, protected fromArmy: number,
        protected toArmy: number, protected realm: Realm, protected position: [number, number], databasePrimaryKey: number){
            super(listPosition, status, databasePrimaryKey);
    }

    getContent(): JSON{
        // TODO
        return JSON.parse('{}');
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
    
    determineEventStatus(): void{
        let army1 = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = GameState.armies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = EventStatus.Withheld;
        }
        else if (army1.getPosition()[0] !== this.position[0] || army1.getPosition()[1] !== this.position[1] ||
            army2.getPosition()[0] !== this.position[0] || army2.getPosition()[1] !== this.position[1]) {
                this.status = EventStatus.Withheld;
        } else if (army1.constructor === army2.constructor &&
            army1.getPosition()[0] === army2.getPosition()[0] && army1.getPosition()[1] === army2.getPosition()[1]) {
                this.status = EventStatus.Available;
        }
        else if ((army1.constructor !== army2.constructor) ||
            ((((army1 instanceof FootArmy || army1 instanceof RiderArmy) && army1.getMovePoints() < 3) ||
                army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof FootArmy || army2 instanceof RiderArmy) &&
                    army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
                        this.status = EventStatus.Impossible;
        }
        else {
            this.status = EventStatus.Withheld;
        }
    }

    makeEventListItemText(): string{
        return "" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy + " in (" +
            this.position[0] + "," + this.position[1] + ")";
    }
}