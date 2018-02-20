import {GUI} from "../gui/gui";

export namespace ButtonFunctions{
    export function mainButton() {
        toggleVisibility(GUI.getBigBox().getSelf());
    }
}