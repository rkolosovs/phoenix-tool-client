import {GameState} from "../gameState";
import {HexFunction} from "../libraries/hexFunctions";
import {GUI} from "../gui/gui";
import {EventStatus} from "./eventStatus";

export abstract class PhoenixEvent{

    constructor(protected listPosition: number, protected status: EventStatus,
                protected prerequisiteEvents: number[]|undefined, protected databasePrimaryKey: number|undefined){
	}

    abstract checkEvent(): void;

    protected abstract makeEventListItemText(): string;

	protected abstract getContent(): string;

	protected abstract getType():string;

	protected abstract validGameState(): boolean;

	asJSON(): JSON{
	    return JSON.parse("'type': " + this.getType() + ", 'content': " + this.getContent() + "}");
    }

    determineEventStatus(): void{
        if(this.validGameState() && (this.prerequisiteEvents as number[]).every(prereqEvent =>
                GameState.loadedEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
                    (event.getStatus() === EventStatus.Checked || event.getStatus() === EventStatus.Deleted)))){
            //The event is available if the GM has attended to all prerequisite events and the board state allows it.
            this.status = EventStatus.Available;
        } else if(!this.validGameState() && (this.prerequisiteEvents as number[]).every(prereqEvent =>
                GameState.loadedEvents.some(event => event.getDatabasePrimaryKey() === prereqEvent &&
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

	getDatabasePrimaryKey(): number|undefined{
		return this.databasePrimaryKey;
	}
}