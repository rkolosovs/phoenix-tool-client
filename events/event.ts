import {GameState} from "../gameState";
import {HexFunction} from "../libraries/hexFunctions";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";

export abstract class PhoenixEvent{

    constructor(protected listPosition: number, protected status: EventStatus,
                protected prerequisiteEvents: number[], protected databasePrimaryKey: number){
	}

    abstract checkEvent(): void;

    protected abstract makeEventListItemText(): string;

	abstract getContent(): JSON;

	protected abstract validGameState(): boolean;

    determineEventStatus(): void{
        if(this.validGameState() && this.prerequisiteEvents.every(prereqEvent =>
                GameState.pendingNewEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
                    (event.getStatus() === EventStatus.Checked || event.getStatus() === EventStatus.Deleted)))){
            //The event is available if the GM has attended to all prerequisite events and the board state allows it.
            this.status = EventStatus.Available;
        } else if(!this.validGameState() && this.prerequisiteEvents.every(prereqEvent =>
                GameState.pendingNewEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
                    (event.getStatus() === EventStatus.Checked || event.getStatus() === EventStatus.Deleted)))){
            //The event is not available because the board state doesn't allow it and it won't become available in the
            //future because all prerequisite events have been attended to by the GM. The GM has to manually fix the
            //board state to make the event available or delete it.
            this.status = EventStatus.Impossible;
        } else {
            //The event is not available but might become available in the future because the board state doesn't allow
            //it but some prerequisite events haven't been attended to by a GM yet and they might fix the board state.
            this.status = EventStatus.Withheld;
        }
    }

    makeEventListItem(): HTMLElement{
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.listPosition;
        eli.innerHTML = "<div>" + this.makeEventListItemText() + "</div>";

        let deleteButton: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement;
        deleteButton.id = "delBtn" + this.listPosition;
        deleteButton.classList.add("eventListButton");
        deleteButton.classList.add("eventListDeleteButton");
        deleteButton.addEventListener("click", (e:Event) => this.deleteEvent());
        let checkButton: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement;
        checkButton.id = "checkBtn" + this.listPosition;
        checkButton.classList.add("eventListButton");
        checkButton.classList.add("eventListCheckButton");
        checkButton.addEventListener("click", (e:Event) => this.checkEvent());
        eli.appendChild(deleteButton);
        eli.appendChild(checkButton);
    
        if (this.status === EventStatus.Checked) {
            eli.classList.add("checkedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        } else if (this.status === EventStatus.Deleted) {
            eli.classList.add("deletedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        } else if (this.status === EventStatus.Impossible) {
            eli.classList.add("impossibleELI");
            checkButton.disabled = true;
        } else if (this.status === EventStatus.Withheld) {
            eli.classList.add("withheldELI");
            checkButton.disabled = true;
        } else if (this.status === EventStatus.Available) {
            eli.classList.add("availableELI");
        }
    
        return eli;
    }

    deleteEvent(): void{
        this.status = EventStatus.Deleted;
        GUI.getBigBox().fillEventList();
    }

	getListPosition(): number{
		return this.listPosition;
	}

	setListPosition(newPosition: number): void{
		this.listPosition = newPosition;
	}

	getStatus(): EventStatus{
		return this.status;
	}

	setStatus(status: EventStatus): void{
		this.status = status;
	}

	getDatabasePrimaryKey(): number{
		return this.databasePrimaryKey;
	}

	//TODO this needs a big overhaul
    //begin of helper methods for event status determining
    protected stillSplitEventsInFaction(realm) {
	    for (let i = 0; i < GameState.pendingNewEvents.length; i++) {
		    let event = GameState.pendingNewEvents[i];
		    if ((event.status === EventStatus.Withheld || event.status === EventStatus.Available ||
                    event.status === EventStatus.Undetermined) &&
			    event.getType() === 'split') {
			    return true;
		    }
	    }
	    return false;
    }

    protected noPendingLoadEvents(realm, armyId, fromX, fromY) {
	    if (Math.floor(armyId / 100) != 3) {
		    return true;
	    } else {
		    for (let i = 0; i < GameState.pendingNewEvents.length; i++) {
			    let event = GameState.pendingNewEvents[i];
			    if ((event.status === 'withheld' || event.status === 'available') && event.getType() === 'move' &&
				    Math.floor(event.content.armyId / 100) !== 3 &&
				    ((event.content.fromX === fromX && event.content.fromY === fromY) ||
					    (event.content.toX === fromX && event.content.toY === fromY))) {
				    return false;
			    }
		    }
		    return true;
	    }
    }

    protected noPendingMountEvents(realm, armyId, fromX, fromY) {
        if (Math.floor(armyId / 100) != 3) {
            for (let i = 0; i < GameState.pendingNewEvents.length; i++) {
                let event = GameState.pendingNewEvents[i];
                if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') &&
                    event.getType() === 'mount' && Math.floor(event.content.fromArmy) === armyId &&
                    (event.content.x === fromX && event.content.y === fromY)) {
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

    protected eachArmyExists(armies) {
        return (armies.length > 0) && (armies.map(function (army: any) {
            return this.armyExists(army.realm, army.armyId);
        }).reduce(function (total, current) {
            return total && current;
        }, true));
    }

    protected findArmyPlaceInList(armyId, owner) {
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() === armyId && GameState.armies[i].owner === owner) {
                return i;
            }
        }
        return -1;
    }

    protected eachArmyExistsAndIsLocated(armies, x, y) {
        return (armies.length > 0) && (armies.map(function (army: any) {
            return this.armyExistsAndIsLocated(army.realm, army.armyId, x, y);
        }, this).reduce(function (total, current) {
            return total && current;
        }, true));
    }

    protected possibleMoveOfEachArmyTo(armies, x, y) {
        return (armies.length > 0) && (armies.map(function (army: any) {
            return this.armyExistsAndIsLocated(army.realm, army.armyId, x, y) ||
                this.possibleMoveOfArmyTo(army.realm, army.armyId, x, y);
        }, this).reduce(function (total, current) {
            return total && current;
        }, true));
    }

    protected armyExists(realm, id) {
        return GameState.armies.some(function (val) {
            return (val.owner.tag === realm) && (val.getErkenfaraID() === id);
        }, this);
    }

    protected armyExistsAndIsLocated(realm, id, x, y) {
        return GameState.armies.some(function (val) {
            return (val.owner.tag === realm) &&
                (val.getErkenfaraID() === id) &&
                (val.getPosition()[0] === x) && (val.getPosition()[1] === y);
        }, this);
    }

    protected possibleMoveOfArmyTo(realm, id, x, y) {
        return GameState.pendingNewEvents.some(function (pEv) {
            return (pEv.getType() === 'move') && (pEv.content.realm === realm) &&
                (pEv.content.armyId === id) && (pEv.status !== 'deleted' || pEv.status !== 'checked') &&
                (pEv.content.toX === x) && (pEv.content.toY === y) &&
                (this.canMove(realm, id, pEv.content.fromX, pEv.content.fromY, x, y));
        }, this);
    }

    protected unprocessedBattleAtContainingArmy(realm, id, x, y) {
        return GameState.pendingNewEvents.some(function (pEv) {
            return (pEv.getType() === 'battle') &&
                (pEv.status !== 'deleted') &&
                (pEv.status !== 'checked') &&
                (pEv.content.x === x) &&
                (pEv.content.y === y) &&
                (pEv.content.participants.some(function (part) {
                    return (part.armyId === id) && (part.realm === realm);
                }, this));
        }, this);
    }

    protected canMove(realm, id, fromX, fromY, toX, toY) {
        let foundArmy = GameState.armies.find(function (army) {
            return (army.getErkenfaraID() === id) && (army.owner.tag === realm);
        }, this);
        if (foundArmy != undefined && foundArmy.getPosition()[0] === fromX && foundArmy.getPosition()[1] === fromY) {
            let adjacency: any[] = HexFunction.getAdjacency([fromX, fromY], [[toX, toY]]);

            if (adjacency.reduce((total, current) => (total || current), false)) {
                foundArmy.possibleMoves = [];
                let direction = (adjacency.findIndex((dir) => dir === 1) + 1) % 6;
                foundArmy.checkForPossibleMove(direction);
                return foundArmy.possibleMoves.length > 0;
            }
            return false;
        } else {
            return false;
        }
    }
    //end of helper methods for event status determining

}