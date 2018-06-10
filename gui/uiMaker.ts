/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

export namespace UIMaker{
    //this holds functions to make HTML UI elements

    export function makeElement(id: string, type: string, parent: HTMLElement): HTMLElement{
        let result: HTMLElement = document.createElement(type);
        result.setAttribute("id", id);
        parent.appendChild(result);
        return result;
    }

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
}