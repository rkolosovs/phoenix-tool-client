class GUI{
    //this holds all our UI elements and getter (with on-demand generation) for them
    private static canvas: HTMLCanvasElement;
    private static context: CanvasRenderingContext2D;
    private static buttonsBox: HTMLDivElement;
    private static toggleGMBarButton: HTMLButtonElement;
    private static topBar: HTMLDivElement;
    private static bigBox: HTMLDivElement;
    private static eventTabsButton: HTMLButtonElement;
    private static eventsTab: HTMLDivElement;
    private static mainButton: HTMLButtonElement;
    private static battleBox: BattleBox;
    private static shootingBigBox: ShootingBigBox;
    private static infoBox: InfoBox;

    static getCanvas(): HTMLCanvasElement{
        if(GUI.canvas == undefined){
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
            GUI.buttonsBox = document.getElementById("buttonsBox") as HTMLDivElement;
        }
        return GUI.buttonsBox;
    }

    static getToggleGMBarButton(): HTMLButtonElement{
        if(GUI.toggleGMBarButton == undefined){
            GUI.toggleGMBarButton = document.getElementById("ToggleGodModeBar") as HTMLButtonElement;
        }
        return GUI.toggleGMBarButton;
    }

    static getTopBar(): HTMLDivElement{
        if(GUI.topBar == undefined){
            GUI.topBar = document.getElementById("topBar") as HTMLDivElement;
        }
        return GUI.topBar;
    }

    static getBigBox(): HTMLDivElement{
        if(GUI.bigBox == undefined){
            GUI.bigBox = document.getElementById("bigBox") as HTMLDivElement;
        }
        return GUI.bigBox;
    }
}