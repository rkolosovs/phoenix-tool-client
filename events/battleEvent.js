"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
class BattleEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, participants, realm, position, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.participants = participants;
        this.realm = realm;
        this.position = position;
    }
    getContent() {
        // TODO
        return JSON.parse('{}');
    }
    validGameState() {
        // TODO
        return false;
    }
    checkEvent() {
        let battleBox = gui_1.GUI.getBattleBox();
        boxVisibilty_1.BoxVisibility.show(battleBox.getSelf());
        let partips = [];
        this.participants.forEach(function (item) {
            let a = gameState_1.GameState.armies.find(function (candidate) {
                return (item.owner.tag === candidate.owner.tag && (item.getErkenfaraID() === candidate.getErkenfaraID()));
            });
            if (a != undefined) {
                partips.push(a);
            }
        });
        battleBox.newBattle(partips, this.position);
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
        if (this.eachArmyExistsAndIsLocated(this.participants, this.position[0], this.position[1])) {
            this.status = 4 /* Available */;
        }
        else if (this.stillSplitEventsInFaction(this.realm) || (this.eachArmyExists(this.participants) &&
            this.possibleMoveOfEachArmyTo(this.participants, this.position[0], this.position[1]))) {
            this.status = 3 /* Withheld */;
        }
        else {
            this.status = 2 /* Impossible */;
        }
    }
    makeEventListItemText() {
        let result = "Battle at (" + this.position[0] + ", " + this.position[1] + ") involving";
        for (let j = 0; j < this.participants.length; j++) {
            result += " [" + this.participants[j].owner.tag + " " + this.participants[j].getErkenfaraID() + "]";
        }
        return result;
    }
    battleButtonLogic(battleBox) {
        battleBox.battleHandler.resolve(parseInt(battleBox.getAttackDiceRoll().value), parseInt(battleBox.getDefenseDiceRoll().value));
        boxVisibilty_1.BoxVisibility.hide(battleBox.getSelf());
        this.status = 0 /* Checked */;
        gui_1.GUI.getBigBox().fillEventList();
        drawingFunctions_1.Drawing.drawStuff();
    }
}
exports.BattleEvent = BattleEvent;
