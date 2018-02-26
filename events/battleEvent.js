"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
class BattleEvent extends event_1.PhoenixEvent {
    constructor(id, status, participants, realm, x, y, pk) {
        super(id, status, pk);
        this.id = id;
        this.status = status;
        this.participants = participants;
        this.realm = realm;
        this.x = x;
        this.y = y;
        this.pk = pk;
    }
    checkEvent() {
        let battleBox = gui_1.GUI.getBattleBox();
        boxVisibilty_1.BoxVisibility.show(battleBox.getSelf());
        let partips = [];
        this.participants.forEach(function (item) {
            let a = gameState_1.GameState.armies.find(function (candidate) {
                return (item.owner.tag === candidate.owner.tag && (item.getErkenfaraID() === candidate.getErkenfaraID()));
            });
            partips.push(a);
        });
        battleBox.newBattle(partips, [this.x, this.y]);
        battleBox.getAttackDiceRoll().onchange = function () { battleBox.updateDisplay(); };
        battleBox.getDefenseDiceRoll().onchange = function () { battleBox.updateDisplay(); };
        let battleButton = gui_1.GUI.getBattleBox().getBattleButton();
        battleButton.addEventListener("click", (e) => this.battleButtonLogic(battleBox));
        battleButton.disabled = true;
        battleButton.style.cursor = "not-allowed";
        gui_1.GUI.getBattleBox().getCloseBattleButton().onclick = function () {
            boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
        };
    }
    determineEventStatus() {
        if (this.eachArmyExistsAndIsLocated(this.participants, this.x, this.y)) {
            this.status = 'available';
        }
        else if (this.stillSplitEventsInFaction(this.realm) || (this.eachArmyExists(this.participants) &&
            this.possibleMoveOfEachArmyTo(this.participants, this.x, this.y))) {
            this.status = 'withheld';
        }
        else {
            this.status = 'impossible';
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        let html = "<div>Battle at (" + this.x + ", " + this.y + ") involving";
        let partips = this.participants;
        for (let j = 0; j < partips.length; j++) {
            html += " [" + partips[j].owner.tag + " " + partips[j].getErkenfaraID() + "]";
        }
        eli.innerHTML = html + "</div>";
        return this.commonEventListItem(eli, this.id);
    }
    getType() {
        return "battle";
    }
    battleButtonLogic(battleBox) {
        battleBox.battleHandler.resolve(battleBox.getAttackDiceRoll(), battleBox.getDefenseDiceRoll());
        boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
        this.status = 'checked';
        fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
}
exports.BattleEvent = BattleEvent;
