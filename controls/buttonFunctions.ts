import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Saving} from "../serverInteraction/savingFunctions";
import {GameState} from "../gameState";

export namespace ButtonFunctions{

    export function mainButton() {
        BoxVisibility.toggleVisibility(GUI.getBigBox().getSelf());
    }

    export function nextTurn() {
        let message = "";
        if (GameState.currentTurn.realm == undefined) {
            message = "Do you want to end the pre-turn phase?";
        } else if (GameState.currentTurn.status === 'fi') {
            message = "Do you want to end processing the turn of " + GameState.currentTurn.realm + "?";
        } else if (login === 'sl') {
            message = "Do you want to end the turn of " + GameState.currentTurn.realm + "?";
        } else {
            message = "Do you want to end your turn?";
        }

        if (confirm(message)) {
            Saving.sendEvents();
        }
    }
}