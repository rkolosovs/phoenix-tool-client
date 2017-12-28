class GUI{
    //this holds all our UI elements
    private static canvas: HTMLCanvasElement;
    private static context: CanvasRenderingContext2D;

    static getCanvas(): HTMLCanvasElement{
        if(GUI.canvas == undefined){
            GUI.canvas = document.createElement("canvas") as HTMLCanvasElement;
            GUI.canvas.setAttribute("id", "hexCanvas");
            document.body.appendChild(GUI.canvas);
        }
        return GUI.canvas;
    }

    static getContext(): CanvasRenderingContext2D{
        if(GUI.context == undefined){
            GUI.context = GUI.canvas.getContext('2d');
        }
        return GUI.context;
    }
}