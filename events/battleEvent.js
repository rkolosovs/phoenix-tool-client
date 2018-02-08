"use strict";
class BattleEvent extends PhoenixEvent {
    constructor(id, type, status, participants, realm, x, y) {
        super(id, type, status);
        this.id = id;
        this.type = type;
        this.status = status;
        this.participants = participants;
        this.realm = realm;
        this.x = x;
        this.y = y;
    }
    checkEvent() {
        let battleBox = GUI.getBattleBox();
        show(battleBox.getSelf());
        let partips = [];
        this.participants.forEach(function (item) {
            let a = listOfArmies.find(function (candidate) {
                return (item.owner.tag === candidate.ownerTag()) && (item.getErkenfaraID() === candidate.armyId);
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
        if (eachArmyExistsAndIsLocated(this.participants, this.x, this.y)) {
            this.status = 'available';
        }
        else if (stillSplitEventsInFaction(this.realm) || (eachArmyExists(this.participants) &&
            possibleMoveOfEachArmyTo(this.participants, this.x, this.y))) {
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
    battleButtonLogic(battleBox) {
        battleBox.battleHandler.resolve(battleBox.getAttackDiceRoll(), battleBox.getDefenseDiceRoll());
        hide(battleBox.getSelf());
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }
}
