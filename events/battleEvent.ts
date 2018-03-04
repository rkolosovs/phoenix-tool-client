import {GUI} from "../gui/gui";
import {Army} from "../armies/army";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import {BattleBox} from "../gui/battleBox";
import {PhoenixEvent} from "./event";
import {EventStatus} from "./eventStatus";

export class BattleEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, prerequisiteEvents: number[],
                protected participants: {'id': number, 'realm': string}[], protected position: [number, number],
                databasePrimaryKey: number){
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    protected getType(): string{
        return "battle";
    }

    protected getContent(): string{
        return "{'x': " + this.position[0] + ", 'y': " + this.position[1] +
            ", 'participants': [" + this.participants.map(participant =>
                    "{'armyId': " + participant.id + ", 'realm': " + participant.realm + "}").reduce(
                        (total, current) => total+current, "") + "]}";
    }

    getPosition(): [number, number]{
        return [this.position[0], this.position[1]];
    }

    getParticipants(): {'id': number, 'realm': string}[]{
        return this.participants;
    }

    protected validGameState(): boolean{
        //Every participating army exists and is located at the position of the battle.
        return this.participants.every(participant => GameState.armies.some(army =>
            army.getErkenfaraID() === participant.id &&
            army.owner.tag === participant.realm &&
            army.getPosition()[0] === this.position[0] && army.getPosition()[1] === this.position[1]));
    }

    checkEvent(): void{
        let battleBox: BattleBox = GUI.getBattleBox();
        BoxVisibility.show(battleBox.getSelf());

        let participatingArmies: Army[] = [];
        this.participants.forEach(participant => {
            let army = GameState.armies.find(candidate => {
                return (participant.realm === candidate.owner.tag && (participant.id === candidate.getErkenfaraID()));
            });
            if(army != undefined){
                participatingArmies.push(army);
            } else{
                throw new Error("A participating army is missing.");
            }
        });

        battleBox.newBattle(participatingArmies, this.position);
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
    
    makeEventListItemText(): string{
        let result: string = "Battle at (" + this.position[0] + ", " + this.position[1] + ") involving";
        for (let j = 0; j < this.participants.length; j++) {
            result += " [" + this.participants[j].realm + " " + this.participants[j].id + "]";
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