class GUI {
    static getCanvas() {
        if (GUI.canvas == undefined) {
            // GUI.canvas = UIMaker.makeElement("hexCanvas", "canvas", document.body);
            GUI.canvas = document.getElementById("hexCanvas");
        }
        return GUI.canvas;
    }
    static getContext() {
        if (GUI.context == undefined) {
            GUI.context = GUI.getCanvas().getContext('2d');
        }
        return GUI.context;
    }
    static getButtonsBox() {
        if (GUI.buttonsBox == undefined) {
            // GUI.buttonsBox = UIMaker.makeButtonsBox();
            GUI.buttonsBox = document.getElementById("buttonsBox");
        }
        return GUI.buttonsBox;
    }
    static getToggleGMBarButton() {
        if (GUI.toggleGMBarButton == undefined) {
            // GUI.toggleGMBarButton = UIMaker.makeButtonsBox();
            GUI.toggleGMBarButton = document.getElementById("ToggleGodModeBar");
        }
        return GUI.toggleGMBarButton;
    }
    static getTopBar() {
        if (GUI.topBar == undefined) {
            // GUI.topBar = UIMaker.makeBox("topBar", "prettyBox", document.body);
            GUI.topBar = document.getElementById("topBar");
        }
        return GUI.topBar;
    }
}
