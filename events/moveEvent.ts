import {HexFunction} from "../libraries/hexFunctions";
import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {GUI} from "../gui/gui";
import {Army} from "../armies/army";
import {Direction} from "../map/direction";
import {EventStatus} from "./eventStatus";
import {BattleEvent} from "./battleEvent";

export class MoveEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected realm: Realm, protected armyId: number,
                protected from: [number, number], protected to: [number, number], prerequisiteEvents?: number[],
                databasePrimaryKey?: number){
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    protected typeAsString(): string{
        return "move";
    }

    protected getContent(): string{
        return "{'armyId': " + this.armyId + ", 'realm': " + this.realm.tag +
            ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
            ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] + "}";
    }

    protected validGameState(): boolean{
        //The army exists, is positioned on the from-field and the army can move to the to-field.
        let army: Army|undefined = GameState.armies.find(army =>
            army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if(army != undefined){
            try{
                army.checkForPossibleMove(HexFunction.getDirectionToNeighbor(this.from, this.to));
            }catch(e){
                return false;
            }
            return true;
        } else{
            return false;
        }
    }

    checkEvent(){
        let army: Army|undefined = GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if(army != undefined) {
            let direction: Direction = HexFunction.getDirectionToNeighbor(this.from, this.to);
            army.checkForPossibleMove(direction);
            army.move(direction);
            if (!GameState.loadedEvents.some(event =>
                    (event instanceof BattleEvent) &&
                    !(event.getStatus() === EventStatus.Checked || event.getStatus() === EventStatus.Deleted) &&
                    (event as BattleEvent).getPosition()[0] === this.to[0] &&
                    (event as BattleEvent).getPosition()[1] === this.to[1] &&
                    (event as BattleEvent).getParticipants().some(participant =>
                        (army as Army).getErkenfaraID() === participant.id &&
                        (army as Army).owner.tag === participant.realm))){
                army.conquer();
            }
            this.status = EventStatus.Checked;
            GUI.getBigBox().fillEventList();
            Drawing.drawStuff();
        } else {
            window.alert("Army not found.");
        }
    }

    makeEventListItemText(): string{
        return "Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " + this.from[1] +
            ") to (" + this.to[0] + ", " + this.to[1] + ")";
    }
}