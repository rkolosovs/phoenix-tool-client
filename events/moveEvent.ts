/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import {HexFunction, PhoenixEvent, Drawing, GameState, Realm, GUI, 
    Army, Direction, EventStatus, BattleEvent} from "../types";

export class MoveEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected realm: Realm, protected armyId: number,
                protected from: [number, number], protected to: [number, number], prerequisiteEvents?: number[],
                databasePrimaryKey?: number){
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    typeAsString(): string{
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