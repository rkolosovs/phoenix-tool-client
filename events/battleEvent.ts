import {GUI} from "../gui/gui";
import {Army} from "../armies/army";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import {BattleBox} from "../gui/battleBox";
import {PhoenixEvent} from "./event";
import {Realm} from "../realm";
import {EventStatus} from "./eventStatus";

export class BattleEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, prerequisiteEvents: number[], protected participants: Army[],
        protected realm: Realm, protected position: [number, number], databasePrimaryKey: number){
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

    checkEvent(): void{
        let battleBox: BattleBox = GUI.getBattleBox();
        BoxVisibility.show(battleBox.getSelf());

        let partips: Army[] = [];
        this.participants.forEach(function (item) {
            let a = GameState.armies.find(function (candidate) {
                return (item.owner.tag === candidate.owner.tag && (item.getErkenfaraID() === candidate.getErkenfaraID()));
            });
            if(a != undefined){
                partips.push(a);
            }
        });

        battleBox.newBattle(partips, this.position);
        battleBox.getAttackDiceRoll().onchange = function () { battleBox.updateDisplay() };
        battleBox.getDefenseDiceRoll().onchange = function () { battleBox.updateDisplay() };
        let battleButton: HTMLButtonElement = GUI.getBattleBox().getBattleButton();
        battleButton.addEventListener("click", (e:Event) => this.battleButtonLogic(battleBox));
        battleButton.disabled = true;
        battleButton.style.cursor = "not-allowed";
        GUI.getBattleBox().getCloseBattleButton().onclick = function () {
            BoxVisibility.hide(battleBox.getSelf());
        };
    }
    
    // determineEventStatus(): void{
    //     if (this.eachArmyExistsAndIsLocated(this.participants, this.position[0], this.position[1])) {
    //         this.status = EventStatus.Available;
    //     } else if (this.stillSplitEventsInFaction(this.realm) || (this.eachArmyExists(this.participants) &&
    //         this.possibleMoveOfEachArmyTo(this.participants, this.position[0], this.position[1]))) {
    //             this.status = EventStatus.Withheld;
    //     } else {
    //         this.status = EventStatus.Impossible;
    //     }
    // }
    
    makeEventListItemText(): string{
        let result: string = "Battle at (" + this.position[0] + ", " + this.position[1] + ") involving";
        for (let j = 0; j < this.participants.length; j++) {
            result += " [" + this.participants[j].owner.tag + " " + this.participants[j].getErkenfaraID() + "]";
        }
        return result;
    }

    private battleButtonLogic(battleBox: BattleBox): void {
        battleBox.battleHandler.resolve(parseInt(battleBox.getAttackDiceRoll().value),
            parseInt(battleBox.getDefenseDiceRoll().value));
        BoxVisibility.hide(battleBox.getSelf());
        this.status = EventStatus.Checked;
        GUI.getBigBox().fillEventList();
        Drawing.drawStuff();
    }

}