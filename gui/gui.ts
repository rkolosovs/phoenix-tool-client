class GUI{
    //this holds all our UI elements and getter (with on-demand generation) for them
    private static canvas: HTMLCanvasElement;
    private static context: CanvasRenderingContext2D;
    private static buttonsBox: HTMLDivElement;
    private static toggleGMBarButton: HTMLButtonElement;

    static getCanvas(): HTMLCanvasElement{
        if(GUI.canvas == undefined){
            GUI.canvas = UIMaker.makeElement("hexCanvas", "canvas", document.body);
            // GUI.canvas = document.createElement("canvas") as HTMLCanvasElement;
            // GUI.canvas.setAttribute("id", "hexCanvas");
            // document.body.appendChild(GUI.canvas);
        }
        return GUI.canvas;
    }

    static getContext(): CanvasRenderingContext2D{
        if(GUI.context == undefined){
            GUI.context = GUI.canvas.getContext('2d');
        }
        return GUI.context;
    }

    static getButtonsBox(): HTMLDivElement{
        if(GUI.buttonsBox == undefined){
            UIMaker.makeButtonsBox();
        }
        return GUI.buttonsBox;
    }

    static getToggleGMBarButton(): HTMLButtonElement{
        if(GUI.toggleGMBarButton == undefined){
            UIMaker.makeButtonsBox();
        }
        return GUI.toggleGMBarButton;
    }
}