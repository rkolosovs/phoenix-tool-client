class GUI{
    //this holds all our UI elements and getter (with on-demand generation) for them
    private static canvas: HTMLCanvasElement;
    private static context: CanvasRenderingContext2D;
    private static buttonsBox: HTMLDivElement;
    private static toggleGMBarButton: HTMLButtonElement;
    private static topBar: HTMLDivElement;

    static getCanvas(): HTMLCanvasElement{
        if(GUI.canvas == undefined){
            // GUI.canvas = UIMaker.makeElement("hexCanvas", "canvas", document.body);
            GUI.canvas = document.getElementById("hexCanvas") as HTMLCanvasElement;
        }
        return GUI.canvas;
    }

    static getContext(): CanvasRenderingContext2D{
        if(GUI.context == undefined){
            GUI.context = GUI.getCanvas().getContext('2d');
        }
        return GUI.context;
    }

    static getButtonsBox(): HTMLDivElement{
        if(GUI.buttonsBox == undefined){
            // GUI.buttonsBox = UIMaker.makeButtonsBox();
            GUI.buttonsBox = document.getElementById("buttonsBox") as HTMLDivElement;
        }
        return GUI.buttonsBox;
    }

    static getToggleGMBarButton(): HTMLButtonElement{
        if(GUI.toggleGMBarButton == undefined){
            // GUI.toggleGMBarButton = UIMaker.makeButtonsBox();
            GUI.toggleGMBarButton = document.getElementById("ToggleGodModeBar") as HTMLButtonElement;
        }
        return GUI.toggleGMBarButton;
    }

    static getTopBar(): HTMLDivElement{
        if(GUI.topBar == undefined){
            // GUI.topBar = UIMaker.makeBox("topBar", "prettyBox", document.body);
            GUI.topBar = document.getElementById("topBar") as HTMLDivElement;
        }
        return GUI.topBar;
    }
}