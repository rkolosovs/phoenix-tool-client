namespace UIMaker{
    //this holds functions to make HTML UI elements

    export function makeElement(id: string, type: string, parent: HTMLElement): HTMLElement{
        let result: HTMLElement = document.createElement(type);
        result.setAttribute("id", id);
        parent.appendChild(result);
        return result;
    }

    export function makeButton(id: string, styleClass: string, parent: HTMLElement, onClick: (MouseEvent) => any): HTMLButtonElement{
        let button = makeElement(id, "button", parent);
        button.className = styleClass;
        button.addEventListener("onclick", onClick);
        return button;
    }

    function makeBox(id: string, styleClass: string, parent: HTMLElement): HTMLDivElement{
        let box: HTMLDivElement = makeElement(id, "div", parent);
        box.className = styleClass;
        return box;
    }

    export function makeButtonsBox(): [HTMLDivElement, HTMLButtonElement]{
        let buttonsBox: HTMLDivElement = makeBox("buttonsBox", "prettyBox", document.body);
        let toggleGMBarButton = makeButton("ToggleGodModeBar", "fixedPrettyButton", buttonBox, (event: MouseEvent) => toggleGodModeBar());
        return [buttonsBox, toggleGMBarButton];
    }
}