class GUI{
    //this holds all our UI elements
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    static init(): void {
        GUI.canvas = document.createElement("canvas") as HTMLCanvasElement;
        GUI.canvas.setAttribute("id", "hexCanvas");
        document.body.appendChild(GUI.canvas);
        GUI.context = GUI.canvas.getContext('2d');
    }
}