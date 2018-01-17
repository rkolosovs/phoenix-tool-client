"use strict";
var UIMaker;
(function (UIMaker) {
    //this holds functions to make HTML UI elements
    function makeElement(id, type, parent) {
        let result = document.createElement(type);
        result.setAttribute("id", id);
        parent.appendChild(result);
        return result;
    }
    UIMaker.makeElement = makeElement;
    // export function makeButton(id: string, text: string, styleClass: string, parent: HTMLElement, onClick: (MouseEvent) => any): HTMLButtonElement{
    //     let button = makeElement(id, "button", parent);
    //     button.className = styleClass;
    //     button.innerText = text;
    //     button.addEventListener("onclick", () => onClick());
    //     return button;
    // }
    //
    // export function makeBox(id: string, styleClass: string, parent: HTMLElement): HTMLDivElement{
    //     let box: HTMLDivElement = makeElement(id, "div", parent);
    //     box.className = styleClass;
    //     return box;
    // }
    // export function makeButtonsBox(): [HTMLDivElement, HTMLButtonElement]{
    //     let buttonsBox: HTMLDivElement = makeBox("buttonsBox", "prettyBox", document.body);
    //     let toggleGMBarButton = makeButton("ToggleGodModeBar", "toggle God Mode Bar", "fixedPrettyButton",
    //         buttonsBox, (event: MouseEvent) => toggleGodModeBar());
    //     return [buttonsBox, toggleGMBarButton];
    // }
})(UIMaker || (UIMaker = {}));
