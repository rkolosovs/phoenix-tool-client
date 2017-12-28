class GUI {
    static getCanvas() {
        if (GUI.canvas == undefined) {
            GUI.canvas = UIMaker.makeElement("hexCanvas", "canvas", document.body);
            // GUI.canvas = document.createElement("canvas") as HTMLCanvasElement;
            // GUI.canvas.setAttribute("id", "hexCanvas");
            // document.body.appendChild(GUI.canvas);
        }
        return GUI.canvas;
    }
    static getContext() {
        if (GUI.context == undefined) {
            GUI.context = GUI.canvas.getContext('2d');
        }
        return GUI.context;
    }
    static getButtonsBox() {
        if (GUI.buttonsBox == undefined) {
            UIMaker.makeButtonsBox();
        }
        return GUI.buttonsBox;
    }
    static getToggleGMBarButton() {
        if (GUI.toggleGMBarButton == undefined) {
            UIMaker.makeButtonsBox();
        }
        return GUI.toggleGMBarButton;
    }
}
