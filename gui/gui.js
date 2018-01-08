class GUI {
    static getCanvas() {
        if (GUI.canvas == undefined) {
            GUI.canvas = document.getElementById("hexCanvas");
        }
        return GUI.canvas;
    }
    static getContext() {
        if (GUI.context == undefined) {
            GUI.context = GUI.getCanvas().getContext('2d');
        }
        return GUI.context;
    }
    static getButtonsBox() {
        if (GUI.buttonsBox == undefined) {
            GUI.buttonsBox = document.getElementById("buttonsBox");
        }
        return GUI.buttonsBox;
    }
    static getToggleGMBarButton() {
        if (GUI.toggleGMBarButton == undefined) {
            GUI.toggleGMBarButton = document.getElementById("ToggleGodModeBar");
        }
        return GUI.toggleGMBarButton;
    }
    static getTopBar() {
        if (GUI.topBar == undefined) {
            GUI.topBar = document.getElementById("topBar");
        }
        return GUI.topBar;
    }
    static getBigBox() {
        if (GUI.bigBox == undefined) {
            GUI.bigBox = document.getElementById("bigBox");
        }
        return GUI.bigBox;
    }
    static getEventTabsButton() {
        if (GUI.eventTabsButton == undefined) {
            GUI.eventTabsButton = document.getElementById("eventTabsButton");
        }
        return GUI.eventTabsButton;
    }
    static getButtonsBox() {
        if (GUI.buttonsBox == undefined) {
            GUI.buttonsBox = document.getElementById("buttonsBox");
        }
        return GUI.buttonsBox;
    }
    static getEventTabsButton() {
        if (GUI.eventTabsButton == undefined) {
            GUI.eventTabsButton = document.getElementById("eventTabsButton");
        }
        return GUI.eventTabsButton;
    }
    static getEventsTab() {
        if (GUI.eventsTab == undefined) {
            GUI.eventsTab = document.getElementById("eventsTab");
        }
        return GUI.eventsTab;
    }
    static getMainButton() {
        if (GUI.mainButton == undefined) {
            GUI.mainButton = document.getElementById("mainButton");
        }
        return GUI.mainButton;
    }
    static getBattleBox() {
        if (GUI.battleBox == undefined) {
            GUI.battleBox = new BattleBox();
        }
        return GUI.battleBox;
    }
    static getShootingBigBox() {
        if (GUI.shootingBigBox == undefined) {
            GUI.shootingBigBox = new ShootingBigBox();
        }
        return GUI.shootingBigBox;
    }
    static getInfoBox() {
        if (GUI.infoBox == undefined) {
            GUI.infoBox = new InfoBox();
        }
        return GUI.infoBox;
    }
    static getTransmuteBox() {
        if (GUI.transmuteBox == undefined) {
            GUI.transmuteBox = document.getElementById("transmuteBox");
        }
        return GUI.transmuteBox;
    }
    static getBackToSplitBox() {
        if (GUI.backToSplitBox == undefined) {
            GUI.backToSplitBox = document.getElementById("backToSplitBox");
        }
        return GUI.backToSplitBox;
    }
    static getRestoreInfoBox() {
        if (GUI.restoreInfoBox == undefined) {
            GUI.restoreInfoBox = document.getElementById("restoreInfoBox");
        }
        return GUI.restoreInfoBox;
    }
    static getMergeBox() {
        if (GUI.mergeBox == undefined) {
            GUI.mergeBox = document.getElementById("mergeBox");
        }
        return GUI.mergeBox;
    }
    static getSplitBox() {
        if (GUI.splitBox == undefined) {
            GUI.splitBox = document.getElementById("splitBox");
        }
        return GUI.splitBox;
    }
    static getSplitInput() {
        if (GUI.splitInput == undefined) {
            GUI.splitInput = document.getElementById("splitInput");
        }
        return GUI.splitInput;
    }
    static getSplitLeadersInput() {
        if (GUI.splitLeadersInput == undefined) {
            GUI.splitLeadersInput = document.getElementById("splitLeadersInput");
        }
        return GUI.splitLeadersInput;
    }
    static getSplitMountsInput() {
        if (GUI.splitMountsInput == undefined) {
            GUI.splitMountsInput = document.getElementById("splitMountsInput");
        }
        return GUI.splitMountsInput;
    }
    static getSplitLkpInput() {
        if (GUI.splitLkpInput == undefined) {
            GUI.splitLkpInput = document.getElementById("splitLkpInput");
        }
        return GUI.splitLkpInput;
    }
    static getSplitSkpInput() {
        if (GUI.splitSkpInput == undefined) {
            GUI.splitSkpInput = document.getElementById("splitSkpInput");
        }
        return GUI.splitSkpInput;
    }
    static getSplitSelectedArmy() {
        if (GUI.splitSelectedArmy == undefined) {
            GUI.splitSelectedArmy = document.getElementById("splitSelectedArmy");
        }
        return GUI.splitSelectedArmy;
    }
    static getActivateTransmuteBox() {
        if (GUI.activateTransmuteBox == undefined) {
            GUI.activateTransmuteBox = document.getElementById("activateTransmuteBox");
        }
        return GUI.activateTransmuteBox;
    }
    static getActivateMergeBox() {
        if (GUI.activateMergeBox == undefined) {
            GUI.activateMergeBox = document.getElementById("activateMergeBox");
        }
        return GUI.activateMergeBox;
    }
    static getSplitMountedBox() {
        if (GUI.splitMountedBox == undefined) {
            GUI.splitMountedBox = document.getElementById("splitMountedBox");
        }
        return GUI.splitMountedBox;
    }
}
