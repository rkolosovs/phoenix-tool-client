import {GUI} from "../gui/gui";
import {Army} from "../armies/army";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import {BattleBox} from "../gui/battleBox";
import {PhoenixEvent} from "./event";
import {Realm} from "../realm";

export class BattleEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected status: string, protected participants: Army[],
        protected realm: Realm, protected x: number, protected y: number, protected pk: number){

        super(id, status, pk);
    }

    checkEvent(): void{
        let battleBox: BattleBox = GUI.getBattleBox();
        BoxVisibility.show(battleBox.getSelf());

        let partips = [];
        this.participants.forEach(function (item) {
            let a = GameState.armies.find(function (candidate) {
                return (item.owner.tag === candidate.owner.tag && (item.getErkenfaraID() === candidate.getErkenfaraID()));
            });
            partips.push(a);
        });

        battleBox.newBattle(partips, [this.x, this.y]);
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
    
    determineEventStatus(): void{
        if (this.eachArmyExistsAndIsLocated(this.participants, this.x, this.y)) {
            this.status = 'available';
        } else if (this.stillSplitEventsInFaction(this.realm) || (this.eachArmyExists(this.participants) &&
            this.possibleMoveOfEachArmyTo(this.participants, this.x, this.y))) {
                this.status = 'withheld';
        } else {
            this.status = 'impossible';
        }
    }
    
    makeEventListItem(): HTMLElement{

        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        
        let html = "<div>Battle at (" + this.x + ", " + this.y + ") involving";
        let partips = this.participants
        for (let j = 0; j < partips.length; j++) {
            html += " [" + partips[j].owner.tag + " " + partips[j].getErkenfaraID() + "]";
        }
        eli.innerHTML = html + "</div>";

        return this.commonEventListItem(eli, this.id);
    }

    getType(): string{
        return "battle";
    }

    private battleButtonLogic(battleBox: BattleBox): void {
        battleBox.battleHandler.resolve(battleBox.getAttackDiceRoll(), battleBox.getDefenseDiceRoll());
        BoxVisibility.hide(battleBox.getSelf());
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }

}