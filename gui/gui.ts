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
    private static transmuteBox: HTMLDivElement;
    private static backToSplitBox: HTMLButtonElement;
    private static restoreInfoBox: HTMLButtonElement;
    private static mergeBox: HTMLDivElement;
    private static splitBox: HTMLDivElement;
    private static splitInput: HTMLInputElement;
    private static splitLeadersInput: HTMLInputElement;
    private static splitMountsInput: HTMLInputElement;
    private static splitLkpInput: HTMLInputElement;
    private static splitSkpInput: HTMLInputElement;
    private static splitSelectedArmy: HTMLButtonElement;
    private static activateTransmuteBox: HTMLButtonElement;
    private static activateMergeBox: HTMLButtonElement;
    private static splitMountedBox: HTMLDivElement;
    private static splitMountedInput: HTMLInputElement;
    private static splitMountedLeadersInput: HTMLInputElement;
    private static splitFleetBox: HTMLDivElement;
    private static splitFleetInput: HTMLInputElement;
    private static splitFleetLeadersInput: HTMLInputElement;
    private static splitFleetLkpInput: HTMLInputElement;
    private static splitFleetSkpInput: HTMLInputElement;
    private static mountBox: HTMLDivElement;
    private static mountInput: HTMLInputElement;
    private static mountLeaderInput: HTMLInputElement;
    private static mount: HTMLButtonElement;
    private static allMount: HTMLButtonElement;
    private static unMountBox: HTMLDivElement;
    private static unMountInput: HTMLInputElement;
    private static unMountLeaderInput: HTMLInputElement;
    private static unMount: HTMLButtonElement;
    private static allUnMount: HTMLButtonElement;
    private static shootBox: HTMLDivElement;
    private static shootingLKPInput: HTMLInputElement;
    private static shootingSKPInput: HTMLInputElement;
    private static fire: HTMLButtonElement;
    private static infoChangeBox: InfoChangeBox;
    private static loginBox: HTMLDivElement;
    private static loginName: HTMLInputElement;
    private static loginPassword: HTMLInputElement;
    private static loginBtn: HTMLButtonElement;
    private static minimapBox: HTMLDivElement;

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