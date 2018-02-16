"use strict";
class BattleEvent extends PhoenixEvent {
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
        let battleBox = GUI.getBattleBox();
        show(battleBox.getSelf());
        let partips = [];
        this.participants.forEach(function (item) {
            let a = GameState.armies.find(function (candidate) {
                return (item.owner.tag === candidate.owner.tag && (item.getErkenfaraID() === candidate.getErkenfaraID()));
            });
            partips.push(a);
        });
        battleBox.newBattle(partips, [this.x, this.y]);
        battleBox.getAttackDiceRoll().onchange = function () { battleBox.updateDisplay(); };
        battleBox.getDefenseDiceRoll().onchange = function () { battleBox.updateDisplay(); };
        let battleButton = GUI.getBattleBox().getBattleButton();
        battleButton.addEventListener("click", (e) => this.battleButtonLogic(battleBox));
        battleButton.disabled = true;
        battleButton.style.cursor = "not-allowed";
        GUI.getBattleBox().getCloseBattleButton().onclick = function () {
            hide(battleBox.getSelf());
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
        hide(battleBox.getSelf());
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }
}
