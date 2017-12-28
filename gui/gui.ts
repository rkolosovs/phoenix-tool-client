class GUI{
    //this holds all our UI elements
    static canvas: HTMLCanvasElement;

    static init(): void {
        GUI.canvas = new HTMLCanvasElement();
        GUI.canvas.setAttribute("id", "hexCanvas");
        document.body.appendChild(GUI.canvas);
    }
}