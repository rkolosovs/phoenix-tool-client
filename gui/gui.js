class GUI {
    static init() {
        GUI.canvas = document.createElement("canvas");
        GUI.canvas.setAttribute("id", "hexCanvas");
        document.body.appendChild(GUI.canvas);
        GUI.context = GUI.canvas.getContext('2d');
    }
}
