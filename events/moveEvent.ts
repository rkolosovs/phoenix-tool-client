import {HexFunction} from "../libraries/hexFunctions";
import {PhoenixEvent} from "./event";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {GUI} from "../gui/gui";
import {Army} from "../armies/army";

export class MoveEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: string, protected realm: Realm, protected armyId: number,
                protected from: [number, number], protected to: [number, number], databasePrimaryKey: number){
        super(listPosition, status, databasePrimaryKey);
    }

    getContent(): JSON{
        // TODO
        return JSON.parse('{}');
    }

    checkEvent(){
        let army: Army|undefined = GameState.armies.find(army => army.owner === this.realm &&
            this.armyId === army.getErkenfaraID());
        if(army != undefined) {
            //TODO use the new movement
            let adjacency = HexFunction.getAdjacency(army.getPosition(), [this.to]);
            if (adjacency[0] === true) {
                army.moveToList(1);
                army.move(1);//move to ne
            } else if (adjacency[1] === true) {
                army.moveToList(2);
                army.move(2);//move to e
            } else if (adjacency[2] === true) {
                army.moveToList(3);
                army.move(3);//move to se
            } else if (adjacency[3] === true) {
                army.moveToList(4);
                army.move(4);//move to sw
            } else if (adjacency[4] === true) {
                army.moveToList(5);
                army.move(5);//move to w
            } else if (adjacency[5] === true) {
                army.moveToList(0);
                army.move(0);//move to nw
            }
            if (!this.unprocessedBattleAtContainingArmy(army.owner.tag, army.getErkenfaraID(),
                    army.getPosition()[0], army.getPosition()[1])) {
                army.conquer();
            }
            this.status = 'checked';
            GUI.getBigBox().fillEventList();
            Drawing.drawStuff();
        } else {
            window.alert("Army not found.");
        }
    }
    
    determineEventStatus(): void{
        if (this.armyExistsAndIsLocated(this.realm, this.armyId, this.from[0], this.from[1]) &&
        !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.from[0], this.from[1]) &&
        this.canMove(this.realm, this.armyId, this.from[0], this.from[1], this.to[0], this.to[1]) &&
        this.noPendingLoadEvents(this.realm, this.armyId, this.from[0], this.from[1]) &&
        this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1])) {
        this.status = 'available';
        } else if ((this.stillSplitEventsInFaction(this.realm) || this.armyExistsAndIsLocated(this.realm, this.armyId,
                this.from[0], this.from[1])) && !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId,
                this.from[0], this.from[1]) && this.canMove(this.realm, this.armyId, this.from[0], this.from[1],
                this.to[0], this.to[1]) && (!this.noPendingLoadEvents(this.realm, this.armyId, this.from[0],
                this.from[1]) || !this.noPendingMountEvents(this.realm, this.armyId, this.from[0], this.from[1]))) {
            this.status = 'withheld';
        } else if (this.stillSplitEventsInFaction(this.realm) || (this.armyExists(this.realm, this.armyId) &&
            this.possibleMoveOfArmyTo(this.realm, this.armyId, this.from[0], this.from[1]))) {
            this.status = 'withheld';
        } else {
            this.status = 'impossible';
        }
    }

    makeEventListItemText(): string{
        return "Move " + this.realm + " army " + this.armyId + " from (" + this.from[0] + ", " + this.from[1] +
            ") to (" + this.to[0] + ", " + this.to[1] + ")";
    }

    getType(): string{
        return "move";
    }
}