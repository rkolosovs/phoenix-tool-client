import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";

export namespace ButtonFunctions{

    export function mainButton() {
        BoxVisibility.toggleVisibility(GUI.getBigBox().getSelf());
    }
}