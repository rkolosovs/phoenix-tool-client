class GUI {
    static getCanvas() {
        if (GUI.canvas == undefined) {
            GUI.canvas = document.createElement("canvas");
            GUI.canvas.setAttribute("id", "hexCanvas");
            document.body.appendChild(GUI.canvas);
        }
        return GUI.canvas;
    }
    static getContext() {
        if (GUI.context == undefined) {
            GUI.context = GUI.canvas.getContext('2d');
        }
        return GUI.context;
    }
}
