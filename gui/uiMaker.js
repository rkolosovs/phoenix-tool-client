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
    function makeButton(id, text, styleClass, parent, onClick) {
        let button = makeElement(id, "button", parent);
        button.className = styleClass;
        button.innerText = text;
        button.addEventListener("onclick", () => onClick());
        return button;
    }
    UIMaker.makeButton = makeButton;
    function makeBox(id, styleClass, parent) {
        let box = makeElement(id, "div", parent);
        box.className = styleClass;
        return box;
    }
    UIMaker.makeBox = makeBox;
    function makeButtonsBox() {
        let buttonsBox = makeBox("buttonsBox", "prettyBox", document.body);
        let toggleGMBarButton = makeButton("ToggleGodModeBar", "toggle God Mode Bar", "fixedPrettyButton", buttonsBox, (event) => toggleGodModeBar());
        return [buttonsBox, toggleGMBarButton];
    }
    UIMaker.makeButtonsBox = makeButtonsBox;
})(UIMaker || (UIMaker = {}));
