import {HexFunction} from "../libraries/hexFunctions";
import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {GUI} from "../gui/gui";
import {Army} from "../armies/army";
import {Direction} from "../map/direction";
import {EventStatus} from "./eventStatus";

export class MoveEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, prerequisiteEvents: number[], protected realm: Realm,
                protected armyId: number, protected from: [number, number], protected to: [number, number],
                databasePrimaryKey: number){
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

    checkEvent(){
        let army: Army|undefined = GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if(army != undefined) {
            let direction: Direction = HexFunction.getDirectionToNeighbor(this.from, this.to);
            army.checkForPossibleMove(direction);
            army.move(direction);
            if (!this.unprocessedBattleAtContainingArmy(army.owner.tag, army.getErkenfaraID(),
                    army.getPosition()[0], army.getPosition()[1])) {
                army.conquer();
            }
            this.status = EventStatus.Checked;
            GUI.getBigBox().fillEventList();
            Drawing.drawStuff();
        } else {
            window.alert("Army not found.");
        }
    }
    
    // determineEventStatus(): void{
    //     if (this.armyExistsAndIsLocated(this.realm, this.armyId, this.from[0], this.from[1]) &&
    //     !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.from[0], this.from[1]) &&
    //     this.canMove(this.realm, this.armyId, this.from[0], this.from[1], this.to[0], this.to[1]) &&
    //     this.noPendingLoadEvents(this.realm, this.armyId, this.from[0], this.from[1]) &&
    //     this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1])) {
    //     this.status = EventStatus.Available;
    //     } else if ((this.stillSplitEventsInFaction(this.realm) || this.armyExistsAndIsLocated(this.realm, this.armyId,
    //             this.from[0], this.from[1])) && !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId,
    //             this.from[0], this.from[1]) && this.canMove(this.realm, this.armyId, this.from[0], this.from[1],
    //             this.to[0], this.to[1]) && (!this.noPendingLoadEvents(this.realm, this.armyId, this.from[0],
    //             this.from[1]) || !this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1]))) {
    //         this.status = EventStatus.Withheld;
    //     } else if (this.stillSplitEventsInFaction(this.realm) || (this.armyExists(this.realm, this.armyId) &&
    //         this.possibleMoveOfArmyTo(this.realm, this.armyId, this.from[0], this.from[1]))) {
    //         this.status = EventStatus.Withheld;
    //     } else {
    //         this.status = EventStatus.Impossible;
    //     }
    // }

    makeEventListItemText(): string{
        return "Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " + this.from[1] +
            ") to (" + this.to[0] + ", " + this.to[1] + ")";
    }
}