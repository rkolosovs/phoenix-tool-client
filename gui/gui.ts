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
    private static godmodeBox: GodModeBox;
    private static armyGeneratorBox: ArmyGeneratorBox;
    private static worldBenderBox: WorldBenderBox;
    private static riverBenderBox: RiverBenderBox;
    private static buildingCreationBox: BuildingCreationBox;
    private static wallCreationBox: WallCreationBox;
    private static harborCreationBox: HarborCreationBox;
    private static bridgeCreationBox: BridgeCreationBox;
    private static streetCreationBox: StreetCreationBox;

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

    static getEventTabsButton(): HTMLButtonElement{
        if(GUI.eventTabsButton == undefined){
            GUI.eventTabsButton = document.getElementById("eventTabsButton") as HTMLButtonElement;
        }
        return GUI.eventTabsButton;
    }

    static getButtonsBox(): HTMLDivElement{
        if(GUI.buttonsBox == undefined){
            GUI.buttonsBox = document.getElementById("buttonsBox") as HTMLDivElement;
        }
        return GUI.buttonsBox;
    }

    static getEventTabsButton(): HTMLButtonElement{
        if(GUI.eventTabsButton == undefined){
            GUI.eventTabsButton = document.getElementById("eventTabsButton") as HTMLButtonElement;
        }
        return GUI.eventTabsButton;
    }

    static getEventsTab(): HTMLDivElement{
        if(GUI.eventsTab == undefined){
            GUI.eventsTab = document.getElementById("eventsTab") as HTMLDivElement;
        }
        return GUI.eventsTab;
    }

    static getMainButton(): HTMLButtonElement{
        if(GUI.mainButton == undefined){
            GUI.mainButton = document.getElementById("mainButton") as HTMLButtonElement;
        }
        return GUI.mainButton;
    }

    static getBattleBox(): BattleBox{
        if(GUI.battleBox == undefined){
            GUI.battleBox = new BattleBox();
        }
        return GUI.battleBox;
    }

    static getShootingBigBox(): ShootingBigBox{
        if(GUI.shootingBigBox == undefined){
            GUI.shootingBigBox = new ShootingBigBox();
        }
        return GUI.shootingBigBox;
    }

    static getInfoBox(): InfoBox{
        if(GUI.infoBox == undefined){
            GUI.infoBox = new InfoBox();
        }
        return GUI.infoBox;
    }

    static getTransmuteBox(): HTMLDivElement{
        if(GUI.transmuteBox == undefined){
            GUI.transmuteBox = document.getElementById("transmuteBox") as HTMLDivElement;
        }
        return GUI.transmuteBox;
    }

    static getBackToSplitBox(): HTMLButtonElement{
        if(GUI.backToSplitBox == undefined){
            GUI.backToSplitBox = document.getElementById("backToSplitBox") as HTMLButtonElement;
        }
        return GUI.backToSplitBox;
    }

    static getRestoreInfoBox(): HTMLButtonElement{
        if(GUI.restoreInfoBox == undefined){
            GUI.restoreInfoBox = document.getElementById("restoreInfoBox") as HTMLButtonElement;
        }
        return GUI.restoreInfoBox;
    }

    static getMergeBox(): HTMLDivElement{
        if(GUI.mergeBox == undefined){
            GUI.mergeBox = document.getElementById("mergeBox") as HTMLDivElement;
        }
        return GUI.mergeBox;
    }

    static getSplitBox(): HTMLDivElement{
        if(GUI.splitBox == undefined){
            GUI.splitBox = document.getElementById("splitBox") as HTMLDivElement;
        }
        return GUI.splitBox;
    }

    static getSplitInput(): HTMLInputElement{
        if(GUI.splitInput == undefined){
            GUI.splitInput = document.getElementById("splitInput") as HTMLInputElement;
        }
        return GUI.splitInput;
    }

    static getSplitLeadersInput(): HTMLInputElement{
        if(GUI.splitLeadersInput == undefined){
            GUI.splitLeadersInput = document.getElementById("splitLeadersInput") as HTMLInputElement;
        }
        return GUI.splitLeadersInput;
    }

    static getSplitMountsInput(): HTMLInputElement{
        if(GUI.splitMountsInput == undefined){
            GUI.splitMountsInput = document.getElementById("splitMountsInput") as HTMLInputElement;
        }
        return GUI.splitMountsInput;
    }

    static getSplitLkpInput(): HTMLInputElement{
        if(GUI.splitLkpInput == undefined){
            GUI.splitLkpInput = document.getElementById("splitLkpInput") as HTMLInputElement;
        }
        return GUI.splitLkpInput;
    }

    static getSplitSkpInput(): HTMLInputElement{
        if(GUI.splitSkpInput == undefined){
            GUI.splitSkpInput = document.getElementById("splitSkpInput") as HTMLInputElement;
        }
        return GUI.splitSkpInput;
    }

    static getSplitSelectedArmy(): HTMLButtonElement{
        if(GUI.splitSelectedArmy == undefined){
            GUI.splitSelectedArmy = document.getElementById("splitSelectedArmy") as HTMLButtonElement;
        }
        return GUI.splitSelectedArmy;
    }

    static getActivateTransmuteBox(): HTMLButtonElement{
        if(GUI.activateTransmuteBox == undefined){
            GUI.activateTransmuteBox = document.getElementById("activateTransmuteBox") as HTMLButtonElement;
        }
        return GUI.activateTransmuteBox;
    }

    static getActivateMergeBox(): HTMLButtonElement{
        if(GUI.activateMergeBox == undefined){
            GUI.activateMergeBox = document.getElementById("activateMergeBox") as HTMLButtonElement;
        }
        return GUI.activateMergeBox;
    }

    static getSplitMountedBox(): HTMLDivElement{
        if(GUI.splitMountedBox == undefined){
            GUI.splitMountedBox = document.getElementById("splitMountedBox") as HTMLDivElement;
        }
        return GUI.splitMountedBox;
    }
}