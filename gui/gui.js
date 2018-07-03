"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
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
            GUI.toggleGMBarButton.onclick = function () { types_1.BoxVisibility.toggleGodModeBar(); };
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
            GUI.bigBox = new types_1.MainBox();
        }
        return GUI.bigBox;
    }
    static getMainButton() {
        if (GUI.mainButton == undefined) {
            GUI.mainButton = document.getElementById("mainButton");
            GUI.mainButton.onclick = function () { types_1.ButtonFunctions.mainButton(); };
        }
        return GUI.mainButton;
    }
    static getBattleBox() {
        if (GUI.battleBox == undefined) {
            GUI.battleBox = new types_1.BattleBox();
        }
        return GUI.battleBox;
    }
    static getShootingBigBox() {
        if (GUI.shootingBigBox == undefined) {
            GUI.shootingBigBox = new types_1.ShootingBigBox();
        }
        return GUI.shootingBigBox;
    }
    static getInfoBox() {
        if (GUI.infoBox == undefined) {
            GUI.infoBox = new types_1.InfoBox();
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
            GUI.backToSplitBox.onclick = function () { types_1.BoxVisibility.backToSplitBox(); };
        }
        return GUI.backToSplitBox;
    }
    static getRestoreInfoBox() {
        if (GUI.restoreInfoBox == undefined) {
            GUI.restoreInfoBox = document.getElementById("restoreInfoBox");
            GUI.restoreInfoBox.onclick = function () { types_1.BoxVisibility.restoreInfoBox(); };
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
            GUI.splitSelectedArmy.onclick = function () { types_1.ButtonFunctions.splitSelectedArmy(); };
        }
        return GUI.splitSelectedArmy;
    }
    static getActivateTransmuteBox() {
        if (GUI.activateTransmuteBox == undefined) {
            GUI.activateTransmuteBox = document.getElementById("activateTransmuteBox");
            GUI.activateTransmuteBox.onclick = function () { types_1.BoxVisibility.activateTransmuteBox(); };
        }
        return GUI.activateTransmuteBox;
    }
    static getActivateMergeBox() {
        if (GUI.activateMergeBox == undefined) {
            GUI.activateMergeBox = document.getElementById("activateMergeBox");
            GUI.activateMergeBox.onclick = function () { types_1.BoxVisibility.activateMergeBox(); };
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
            GUI.mount.onclick = function () { types_1.ButtonFunctions.mountSelected(); };
        }
        return GUI.mount;
    }
    static getAllMountButton() {
        if (GUI.allMount == undefined) {
            GUI.allMount = document.getElementById("allMount");
            GUI.allMount.onclick = function () { types_1.ButtonFunctions.allMountSelected(); };
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
            GUI.unMount.onclick = function () { types_1.ButtonFunctions.unMountSelected; };
        }
        return GUI.unMount;
    }
    static getAllUnMountButton() {
        if (GUI.allUnMount == undefined) {
            GUI.allUnMount = document.getElementById("allUnMount");
            GUI.allUnMount.onclick = function () { types_1.ButtonFunctions.allUnMountSelected; };
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
            GUI.fire.onclick = function () { types_1.ButtonFunctions.shootWithSelectedArmy(); };
        }
        return GUI.fire;
    }
    static getInfoChangeBox() {
        if (GUI.infoChangeBox == undefined) {
            GUI.infoChangeBox = new types_1.InfoChangeBox();
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
            GUI.loginBtn.addEventListener('click', types_1.Authentication.loginToServer, true);
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
            GUI.godmodeBox = new types_1.GodModeBox();
        }
        return GUI.godmodeBox;
    }
    static getArmyGeneratorBox() {
        if (GUI.armyGeneratorBox == undefined) {
            GUI.armyGeneratorBox = new types_1.ArmyGeneratorBox();
        }
        return GUI.armyGeneratorBox;
    }
    static getWorldBenderBox() {
        if (GUI.worldBenderBox == undefined) {
            GUI.worldBenderBox = new types_1.WorldBenderBox();
        }
        return GUI.worldBenderBox;
    }
    static getRiverBenderBox() {
        if (GUI.riverBenderBox == undefined) {
            GUI.riverBenderBox = new types_1.RiverBenderBox();
        }
        return GUI.riverBenderBox;
    }
    static getBuildingCreationBox() {
        if (GUI.buildingCreationBox == undefined) {
            GUI.buildingCreationBox = new types_1.BuildingCreationBox();
        }
        return GUI.buildingCreationBox;
    }
    static getWallCreationBox() {
        if (GUI.wallCreationBox == undefined) {
            GUI.wallCreationBox = new types_1.WallCreationBox();
        }
        return GUI.wallCreationBox;
    }
    static getHarborCreationBox() {
        if (GUI.harborCreationBox == undefined) {
            GUI.harborCreationBox = new types_1.HarborCreationBox();
        }
        return GUI.harborCreationBox;
    }
    static getBridgeCreationBox() {
        if (GUI.bridgeCreationBox == undefined) {
            GUI.bridgeCreationBox = new types_1.BridgeCreationBox();
        }
        return GUI.bridgeCreationBox;
    }
    static getStreetCreationBox() {
        if (GUI.streetCreationBox == undefined) {
            GUI.streetCreationBox = new types_1.StreetCreationBox();
        }
        return GUI.streetCreationBox;
    }
}
exports.GUI = GUI;
//# sourceMappingURL=gui.js.map