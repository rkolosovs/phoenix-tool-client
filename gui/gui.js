"use strict";
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
    static getTransmuteArmyButtonsPartition() {
        if (GUI.transmuteArmyButtonsPartition == undefined) {
            GUI.transmuteArmyButtonsPartition = document.getElementById("transmuteArmyButtonsPartition");
        }
        return GUI.transmuteArmyButtonsPartition;
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
    static getSplitMountedInput() {
        if (GUI.splitMountedInput == undefined) {
            GUI.splitMountedInput = document.getElementById("splitMountedInput");
        }
        return GUI.splitMountedInput;
    }
    static getSplitMountedLeadersInput() {
        if (GUI.splitMountedLeadersInput == undefined) {
            GUI.splitMountedLeadersInput = document.getElementById("splitMountedLeadersInput");
        }
        return GUI.splitMountedLeadersInput;
    }
    static getSplitFleetBox() {
        if (GUI.splitFleetBox == undefined) {
            GUI.splitFleetBox = document.getElementById("splitFleetBox");
        }
        return GUI.splitFleetBox;
    }
    static getSplitFleetInput() {
        if (GUI.splitFleetInput == undefined) {
            GUI.splitFleetInput = document.getElementById("splitFleetInput");
        }
        return GUI.splitFleetInput;
    }
    static getSplitFleetLeadersInput() {
        if (GUI.splitFleetLeadersInput == undefined) {
            GUI.splitFleetLeadersInput = document.getElementById("splitFleetLeadersInput");
        }
        return GUI.splitFleetLeadersInput;
    }
    static getSplitFleetLkpInput() {
        if (GUI.splitFleetLkpInput == undefined) {
            GUI.splitFleetLkpInput = document.getElementById("splitFleetLkpInput");
        }
        return GUI.splitFleetLkpInput;
    }
    static getSplitFleetSkpInput() {
        if (GUI.splitFleetSkpInput == undefined) {
            GUI.splitFleetSkpInput = document.getElementById("splitFleetSkpInput");
        }
        return GUI.splitFleetSkpInput;
    }
    static getMountBox() {
        if (GUI.mountBox == undefined) {
            GUI.mountBox = document.getElementById("mountBox");
        }
        return GUI.mountBox;
    }
    static getMountInput() {
        if (GUI.mountInput == undefined) {
            GUI.mountInput = document.getElementById("mountInput");
        }
        return GUI.mountInput;
    }
    static getMountLeaderInput() {
        if (GUI.mountLeaderInput == undefined) {
            GUI.mountLeaderInput = document.getElementById("mountLeaderInput");
        }
        return GUI.mountLeaderInput;
    }
    static getMountButton() {
        if (GUI.mount == undefined) {
            GUI.mount = document.getElementById("mount");
        }
        return GUI.mount;
    }
    static getAllMountButton() {
        if (GUI.allMount == undefined) {
            GUI.allMount = document.getElementById("allMount");
        }
        return GUI.allMount;
    }
    static getUnMountBox() {
        if (GUI.unMountBox == undefined) {
            GUI.unMountBox = document.getElementById("unMountBox");
        }
        return GUI.unMountBox;
    }
    static getUnMountInput() {
        if (GUI.unMountInput == undefined) {
            GUI.unMountInput = document.getElementById("unMountInput");
        }
        return GUI.unMountInput;
    }
    static getUnMountLeaderInput() {
        if (GUI.unMountLeaderInput == undefined) {
            GUI.unMountLeaderInput = document.getElementById("unMountLeaderInput");
        }
        return GUI.unMountLeaderInput;
    }
    static getUnMountButton() {
        if (GUI.unMount == undefined) {
            GUI.unMount = document.getElementById("unMount");
        }
        return GUI.unMount;
    }
    static getAllUnMountButton() {
        if (GUI.allUnMount == undefined) {
            GUI.allUnMount = document.getElementById("allUnMount");
        }
        return GUI.allUnMount;
    }
    static getShootBox() {
        if (GUI.shootBox == undefined) {
            GUI.shootBox = document.getElementById("shootBox");
        }
        return GUI.shootBox;
    }
    static getShootingLKPInput() {
        if (GUI.shootingLKPInput == undefined) {
            GUI.shootingLKPInput = document.getElementById("shootingLKPInput");
        }
        return GUI.shootingLKPInput;
    }
    static getShootingSKPInput() {
        if (GUI.shootingSKPInput == undefined) {
            GUI.shootingSKPInput = document.getElementById("shootingSKPInput");
        }
        return GUI.shootingSKPInput;
    }
    static getFireButton() {
        if (GUI.fire == undefined) {
            GUI.fire = document.getElementById("fire");
        }
        return GUI.fire;
    }
    static getInfoChangeBox() {
        if (GUI.infoChangeBox == undefined) {
            GUI.infoChangeBox = new InfoChangeBox();
        }
        return GUI.infoChangeBox;
    }
    static getLoginBox() {
        if (GUI.loginBox == undefined) {
            GUI.loginBox = document.getElementById("loginBox");
        }
        return GUI.loginBox;
    }
    static getLoginNameInput() {
        if (GUI.loginName == undefined) {
            GUI.loginName = document.getElementById("loginName");
        }
        return GUI.loginName;
    }
    static getLoginPasswordInput() {
        if (GUI.loginPassword == undefined) {
            GUI.loginPassword = document.getElementById("loginPassword");
        }
        return GUI.loginPassword;
    }
    static getLoginButton() {
        if (GUI.loginBtn == undefined) {
            GUI.loginBtn = document.getElementById("loginBtn");
        }
        return GUI.loginBtn;
    }
    static getMinimapBox() {
        if (GUI.minimapBox == undefined) {
            GUI.minimapBox = document.getElementById("minimapBox");
        }
        return GUI.minimapBox;
    }
    static getGodModeBox() {
        if (GUI.godmodeBox == undefined) {
            GUI.godmodeBox = new GodModeBox();
        }
        return GUI.godmodeBox;
    }
    static getArmyGeneratorBox() {
        if (GUI.armyGeneratorBox == undefined) {
            GUI.armyGeneratorBox = new ArmyGeneratorBox();
        }
        return GUI.armyGeneratorBox;
    }
    static getWorldBenderBox() {
        if (GUI.worldBenderBox == undefined) {
            GUI.worldBenderBox = new WorldBenderBox();
        }
        return GUI.worldBenderBox;
    }
    static getRiverBenderBox() {
        if (GUI.riverBenderBox == undefined) {
            GUI.riverBenderBox = new RiverBenderBox();
        }
        return GUI.riverBenderBox;
    }
    static getBuildingCreationBox() {
        if (GUI.buildingCreationBox == undefined) {
            GUI.buildingCreationBox = new BuildingCreationBox();
        }
        return GUI.buildingCreationBox;
    }
    static getWallCreationBox() {
        if (GUI.wallCreationBox == undefined) {
            GUI.wallCreationBox = new WallCreationBox();
        }
        return GUI.wallCreationBox;
    }
    static getHarborCreationBox() {
        if (GUI.harborCreationBox == undefined) {
            GUI.harborCreationBox = new HarborCreationBox();
        }
        return GUI.harborCreationBox;
    }
    static getBridgeCreationBox() {
        if (GUI.bridgeCreationBox == undefined) {
            GUI.bridgeCreationBox = new BridgeCreationBox();
        }
        return GUI.bridgeCreationBox;
    }
    static getStreetCreationBox() {
        if (GUI.streetCreationBox == undefined) {
            GUI.streetCreationBox = new StreetCreationBox();
        }
        return GUI.streetCreationBox;
    }
}
