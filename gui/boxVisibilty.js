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
var BoxVisibility;
(function (BoxVisibility) {
    BoxVisibility.worldCreationModeOn = false;
    BoxVisibility.worldCreationModeOnClick = false;
    BoxVisibility.riverCreationModeOn = false;
    BoxVisibility.buildingCreationModeOn = false;
    BoxVisibility.streetBuildingModeOn = false;
    BoxVisibility.harborBuildingModeOn = false;
    BoxVisibility.bridgeBuildingModeOn = false;
    BoxVisibility.wallBuildingModeOn = false;
    BoxVisibility.shootingModeOn = false;
    BoxVisibility.changeFieldToType = -1;
    BoxVisibility.armyCreationModeOn = false;
    BoxVisibility.armyWithNextClick = false;
    BoxVisibility.ownerBuffer = "";
    BoxVisibility.armyIdBuffer = 0;
    BoxVisibility.countBuffer = 0;
    BoxVisibility.leaderBuffer = 0;
    BoxVisibility.mountsBuffer = 0;
    BoxVisibility.lkpBuffer = 0;
    BoxVisibility.skpBuffer = 0;
    BoxVisibility.guardBuffer = false;
    function toggleVisibility(element) {
        let classes = element.classList;
        if (classes.contains("invisible")) {
            classes.remove("invisible");
        }
        else {
            classes.add("invisible");
        }
    }
    BoxVisibility.toggleVisibility = toggleVisibility;
    function show(element) {
        let classes = element.classList;
        if (classes.contains("invisible")) {
            classes.remove("invisible");
        }
    }
    BoxVisibility.show = show;
    function hide(element) {
        let classes = element.classList;
        if (!classes.contains("invisible")) {
            classes.add("invisible");
        }
    }
    BoxVisibility.hide = hide;
    // switches bunttonBoxContent.style.visibility to "" and all others to "none"
    function switchBtnBoxTo(buttonBoxContent) {
        hide(types_1.GUI.getWorldBenderBox().getSelf());
        hide(types_1.GUI.getRiverBenderBox().getSelf());
        hide(types_1.GUI.getWorldBenderBox().getCreationWarning());
        hide(types_1.GUI.getBuildingCreationBox().getSelf());
        hide(types_1.GUI.getStreetCreationBox().getSelf());
        hide(types_1.GUI.getHarborCreationBox().getSelf());
        hide(types_1.GUI.getBridgeCreationBox().getSelf());
        hide(types_1.GUI.getWallCreationBox().getSelf());
        hide(types_1.GUI.getButtonsBox());
        hide(types_1.GUI.getArmyGeneratorBox().getSelf());
        show(buttonBoxContent);
    }
    BoxVisibility.switchBtnBoxTo = switchBtnBoxTo;
    // switches activeMode to True and all others to false
    function switchModeTo(activeMode) {
        BoxVisibility.worldCreationModeOn = false;
        BoxVisibility.worldCreationModeOnClick = false;
        BoxVisibility.riverCreationModeOn = false;
        BoxVisibility.buildingCreationModeOn = false;
        BoxVisibility.streetBuildingModeOn = false;
        BoxVisibility.harborBuildingModeOn = false;
        BoxVisibility.bridgeBuildingModeOn = false;
        BoxVisibility.wallBuildingModeOn = false;
        BoxVisibility.shootingModeOn = false;
        BoxVisibility.changeFieldToType = -1;
        BoxVisibility.armyWithNextClick = false;
        BoxVisibility.armyCreationModeOn = false;
        switch (activeMode) {
            //worldCreationModeOnClick also has worldCreationModeOn enabled
            case "worldCreationModeOnClick": BoxVisibility.worldCreationModeOnClick = true;
            case "worldCreationModeOn":
                BoxVisibility.worldCreationModeOn = true;
                break;
            case "riverCreationModeOn":
                BoxVisibility.riverCreationModeOn = true;
                break;
            case "buildingCreationModeOn":
                BoxVisibility.buildingCreationModeOn = true;
                break;
            case "streetBuildingModeOn":
                BoxVisibility.streetBuildingModeOn = true;
                break;
            case "harborBuildingModeOn":
                BoxVisibility.harborBuildingModeOn = true;
                break;
            case "bridgeBuildingModeOn":
                BoxVisibility.bridgeBuildingModeOn = true;
                break;
            case "wallBuildingModeOn":
                BoxVisibility.wallBuildingModeOn = true;
                break;
            case "armyWithNextClick":
                BoxVisibility.armyWithNextClick = true;
                break;
            case "armyCreationModeOn":
                BoxVisibility.armyCreationModeOn = true;
                break;
            case "shootingModeOn":
                BoxVisibility.shootingModeOn = true;
                break;
            case "none": break;
        }
    }
    BoxVisibility.switchModeTo = switchModeTo;
    function toggleArmyCreationMode() {
        if (BoxVisibility.armyCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.armyCreationModeOn) {
            switchModeTo("armyCreationModeOn");
            switchBtnBoxTo(types_1.GUI.getArmyGeneratorBox().getSelf());
        }
    }
    BoxVisibility.toggleArmyCreationMode = toggleArmyCreationMode;
    function toggleWorldCreationMode() {
        if (BoxVisibility.worldCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.worldCreationModeOn) {
            switchModeTo("worldCreationModeOn");
            switchBtnBoxTo(types_1.GUI.getWorldBenderBox().getSelf());
        }
    }
    BoxVisibility.toggleWorldCreationMode = toggleWorldCreationMode;
    function toggleRiverCreationMode() {
        if (BoxVisibility.riverCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.riverCreationModeOn) {
            switchModeTo("riverCreationModeOn");
            switchBtnBoxTo(types_1.GUI.getRiverBenderBox().getSelf());
        }
    }
    BoxVisibility.toggleRiverCreationMode = toggleRiverCreationMode;
    function toggleBuildingCreationMode() {
        if (BoxVisibility.buildingCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.buildingCreationModeOn) {
            switchBtnBoxTo(types_1.GUI.getBuildingCreationBox().getSelf());
            switchModeTo("buildingCreationModeOn");
        }
    }
    BoxVisibility.toggleBuildingCreationMode = toggleBuildingCreationMode;
    function toggleStreetBuildingMode() {
        if (BoxVisibility.streetBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.streetBuildingModeOn) {
            switchModeTo("streetBuildingModeOn");
            switchBtnBoxTo(types_1.GUI.getStreetCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleStreetBuildingMode = toggleStreetBuildingMode;
    function toggleHarborBuildingMode() {
        if (BoxVisibility.harborBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.harborBuildingModeOn) {
            switchModeTo("harborBuildingModeOn");
            switchBtnBoxTo(types_1.GUI.getHarborCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleHarborBuildingMode = toggleHarborBuildingMode;
    function toggleBridgeBuildingMode() {
        if (BoxVisibility.bridgeBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.bridgeBuildingModeOn) {
            switchModeTo("bridgeBuildingModeOn");
            switchBtnBoxTo(types_1.GUI.getBridgeCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleBridgeBuildingMode = toggleBridgeBuildingMode;
    function toggleWallBuildingMode() {
        if (BoxVisibility.wallBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
        }
        else if (!BoxVisibility.wallBuildingModeOn) {
            switchModeTo("wallBuildingModeOn");
            switchBtnBoxTo(types_1.GUI.getWallCreationBox().getSelf());
        }
    }
    BoxVisibility.toggleWallBuildingMode = toggleWallBuildingMode;
    function toggleGodModeBar() {
        if (types_1.GUI.getGodModeBox().getSelf().classList.contains("invisible")) {
            restoreInfoBox();
            writeRealmDropdown();
            show(types_1.GUI.getGodModeBox().getSelf());
            show(types_1.GUI.getInfoChangeBox().getSelf());
            hide(types_1.GUI.getInfoBox().getSelf());
        }
        else {
            hide(types_1.GUI.getGodModeBox().getSelf());
            hide(types_1.GUI.getInfoChangeBox().getSelf());
            show(types_1.GUI.getInfoBox().getSelf());
            updateInfoBox();
        }
    }
    BoxVisibility.toggleGodModeBar = toggleGodModeBar;
    function writeRealmDropdown() {
        let factionsDropdown = types_1.GUI.getGodModeBox().getFactionToCreateBuildingsFor();
        let factionOptions = "";
        types_1.GameState.realms.forEach(realm => {
            if (realm.active) {
                factionOptions += "<option value=" + "'" + realm.tag + "'" + ">" + realm.name + "</option>";
            }
        });
        factionsDropdown.innerHTML = factionOptions;
    }
    BoxVisibility.writeRealmDropdown = writeRealmDropdown;
    // this is used to update the infoBox and the infoChangeBox with the currently selected Army
    function updateInfoBox() {
        let infoBox = types_1.GUI.getInfoBox();
        let changeBox = types_1.GUI.getInfoChangeBox();
        if (types_1.Controls.selectedArmyIndex != undefined) {
            // info Box
            let infoArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
            if (infoArmy.isGuard) {
                infoBox.getGuardText().innerHTML = "Garde";
            }
            else {
                infoBox.getGuardText().innerHTML = "";
            }
            if (infoArmy instanceof types_1.FootArmy || infoArmy instanceof types_1.RiderArmy) {
                infoBox.getArmyIdText().innerHTML = "Heer " + infoArmy.getErkenfaraID();
            }
            else if (infoArmy instanceof types_1.Fleet) {
                infoBox.getArmyIdText().innerHTML = "Flotte " + infoArmy.getErkenfaraID();
            }
            infoBox.getCountText().innerHTML = "Truppen: " + infoArmy.getTroopCount();
            infoBox.getLeadersText().innerHTML = "Heerführer: " + infoArmy.getOfficerCount();
            infoBox.getMountsText().innerHTML = "mitgeführte Reittiere: " + infoArmy.getMountCount();
            if (infoArmy instanceof types_1.RiderArmy) {
                hide(infoBox.getLKPText());
                hide(infoBox.getSKPText());
            }
            else {
                show(infoBox.getLKPText());
                show(infoBox.getSKPText());
            }
            infoBox.getLKPText().innerHTML = "leichte Katapulte: " + infoArmy.getLightCatapultCount() + " (" +
                (infoArmy.getLightCatapultCount() - infoArmy.getLightCatapultsShot()) + ")";
            infoBox.getSKPText().innerHTML = "schwere Katapulte: " + infoArmy.getHeavyCatapultCount() + " (" +
                (infoArmy.getHeavyCatapultCount() - infoArmy.getHeavyCatapultsShot()) + ")";
            infoBox.getMovePointsText().innerHTML = "Bewegungspunkte: " + infoArmy.getMovePoints();
            infoBox.getHeightPointsText().innerHTML = "Höhenstufen: " + infoArmy.getHeightPoints();
            show(infoBox.getSplitButton());
            if (infoArmy instanceof types_1.FootArmy) {
                show(infoBox.getMountButton());
                hide(infoBox.getUnMountButton());
            }
            else if (infoArmy instanceof types_1.RiderArmy) {
                hide(infoBox.getMountButton());
                show(infoBox.getUnMountButton());
            }
            else {
                hide(infoBox.getMountButton());
                hide(infoBox.getUnMountButton());
            }
            //show shoot button
            if (infoArmy.getLightCatapultCount() > 0 || infoArmy.getHeavyCatapultCount() > 0 ||
                !infoArmy.isTransported()) {
                show(infoBox.getShootButton());
            }
            else {
                hide(infoBox.getShootButton());
            }
            // change Box (GodMode)
            changeBox.getGuardChangeInput().checked = infoArmy.isGuard;
            show(changeBox.getGuardChangeInput());
            show(changeBox.getOwnerChange());
            changeBox.getOwnerChangeInput().value = infoArmy.owner.tag;
            show(changeBox.getArmyIdChange());
            changeBox.getArmyIdChangeInput().value = "" + infoArmy.getErkenfaraID();
            show(changeBox.getCountChange());
            changeBox.getCountChangeInput().value = "" + infoArmy.getTroopCount();
            show(changeBox.getLeadersChange());
            changeBox.getLeadersChangeInput().value = "" + infoArmy.getOfficerCount();
            show(changeBox.getMountsChange());
            changeBox.getMountsChangeInput().value = "" + infoArmy.getMountCount();
            show(changeBox.getLKPChange());
            changeBox.getLKPChangeInput().value = "" + infoArmy.getLightCatapultCount();
            show(changeBox.getSKPChange());
            changeBox.getSKPChangeInput().value = "" + infoArmy.getHeavyCatapultCount();
            show(changeBox.getMovePointsChange());
            changeBox.getMovePointsChangeInput().value = "" + infoArmy.getMovePoints();
            show(changeBox.getHeightPointsChange());
            changeBox.getHeightPointsChangeInput().value = "" + infoArmy.getHeightPoints();
            show(changeBox.getChangeArmyInfoButton());
        }
        else {
            // info Box
            infoBox.getGuardText().innerHTML = "";
            infoBox.getArmyIdText().innerHTML = "";
            infoBox.getCountText().innerHTML = "";
            infoBox.getLeadersText().innerHTML = "";
            infoBox.getMountsText().innerHTML = "";
            infoBox.getLKPText().innerHTML = "";
            infoBox.getSKPText().innerHTML = "";
            infoBox.getMovePointsText().innerHTML = "";
            infoBox.getHeightPointsText().innerHTML = "";
            hide(infoBox.getMountButton());
            hide(infoBox.getUnMountButton());
            hide(infoBox.getShootButton());
            hide(infoBox.getSplitButton());
            // change Box (GM)
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
            hide(changeBox.getGuardChangeInput());
        }
    }
    BoxVisibility.updateInfoBox = updateInfoBox;
    function activateMountBox() {
        hide(types_1.GUI.getInfoBox().getSelf());
        show(types_1.GUI.getMountBox());
    }
    BoxVisibility.activateMountBox = activateMountBox;
    function activateUnMountBox() {
        hide(types_1.GUI.getInfoBox().getSelf());
        show(types_1.GUI.getUnMountBox());
    }
    BoxVisibility.activateUnMountBox = activateUnMountBox;
    function closeShootBox() {
        hide(types_1.GUI.getShootBox());
        switchModeTo("none");
        if (types_1.Controls.shootingTarget != undefined) {
            types_1.Controls.shootingTarget = undefined;
        }
        types_1.Drawing.drawStuff();
    }
    BoxVisibility.closeShootBox = closeShootBox;
    function activateTransmuteBox() {
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        // depending on army type different fields are needed
        if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.FootArmy) {
            toSplit = parseInt(types_1.GUI.getSplitInput().value);
            leadersToSplit = parseInt(types_1.GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(types_1.GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(types_1.GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(types_1.GUI.getSplitSkpInput().value);
            if (toSplit > (types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getTroopCount() - 100)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (mountsToSplit > types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getMountCount()) {
                window.alert("So viele Reittiere hast du nicht.");
                return false;
            }
            if (lkpToSplit > types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getLightCatapultCount()) {
                window.alert("So viele leichte Katapulte hast du nicht.");
                return false;
            }
            if (skpToSplit > types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getHeavyCatapultCount()) {
                window.alert("So viele schwere Katapulte hast du nicht.");
                return false;
            }
        }
        else if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.RiderArmy) {
            toSplit = parseInt(types_1.GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(types_1.GUI.getSplitMountedLeadersInput().value);
            if (toSplit > (types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getTroopCount() - 50)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
        }
        else if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.Fleet) {
            toSplit = parseInt(types_1.GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(types_1.GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(types_1.GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(types_1.GUI.getSplitFleetSkpInput().value);
            if (toSplit > (types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getTroopCount() - 1)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (toSplit * 100 > (types_1.GameState.armies[types_1.Controls.selectedArmyIndex].freeTransportCapacity())) {
                window.alert("Du kannst keine beladenen Schiffe verschieben.");
                return false;
            }
            if (lkpToSplit > types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getLightCatapultCount()) {
                window.alert("So viele leichte Kriegsschiffe hast du nicht.");
                return false;
            }
            if (skpToSplit > types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getHeavyCatapultCount()) {
                window.alert("So viele schwere Kriegsschiffe hast du nicht.");
                return false;
            }
        }
        if (leadersToSplit > (types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getOfficerCount() - 1)) {
            window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.");
            return false;
        }
        types_1.GUI.getTransmuteBox().style.display = "";
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        if (selectedArmy instanceof types_1.FootArmy) {
            hide(types_1.GUI.getSplitBox());
        }
        else if (selectedArmy instanceof types_1.RiderArmy) {
            hide(types_1.GUI.getSplitMountedBox());
        }
        else if (selectedArmy instanceof types_1.Fleet) {
            hide(types_1.GUI.getSplitFleetBox());
        }
        let onlyLeaders = false;
        if (selectedArmy instanceof types_1.FootArmy) {
            if (parseInt(types_1.GUI.getSplitInput().value) === 0 &&
                parseInt(types_1.GUI.getSplitLeadersInput().value) > 0 &&
                parseInt(types_1.GUI.getSplitMountsInput().value) === 0 &&
                parseInt(types_1.GUI.getSplitLkpInput().value) === 0 &&
                parseInt(types_1.GUI.getSplitSkpInput().value) === 0) {
                onlyLeaders = true;
            }
        }
        else if (selectedArmy instanceof types_1.RiderArmy) {
            if (parseInt(types_1.GUI.getSplitMountedInput().value) === 0 &&
                parseInt(types_1.GUI.getSplitMountedLeadersInput().value) > 0) {
                onlyLeaders = true;
            }
        }
        else if (selectedArmy instanceof types_1.Fleet) {
            if (parseInt(types_1.GUI.getSplitFleetInput().value) === 0 &&
                parseInt(types_1.GUI.getSplitFleetLeadersInput().value) > 0 &&
                parseInt(types_1.GUI.getSplitFleetLkpInput().value) === 0 &&
                parseInt(types_1.GUI.getSplitFleetSkpInput().value) === 0) {
                onlyLeaders = true;
            }
        }
        let selectedPos = types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition();
        let possibleTargets = [];
        let targetOwner = types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner;
        for (let i = 0; i < types_1.GameState.armies.length; i++) {
            if (i != types_1.Controls.selectedArmyIndex) {
                if (onlyLeaders) {
                    if (types_1.GameState.armies[i].owner === targetOwner &&
                        types_1.GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                        types_1.GameState.armies[i].getPosition()[1] === selectedPos[1]) {
                        possibleTargets.push(i);
                    }
                }
                else {
                    if (types_1.GameState.armies[i].owner === targetOwner &&
                        types_1.GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                        types_1.GameState.armies[i].getPosition()[1] === selectedPos[1] &&
                        types_1.GameState.armies[i].constructor === types_1.GameState.armies[types_1.Controls.selectedArmyIndex].constructor) {
                        possibleTargets.push(i);
                    }
                }
            }
        }
        if (possibleTargets != []) {
            if (document.getElementById("transmuteArmyButtonsSection") != undefined) {
                let d = types_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(types_1.GUI.getActivateTransmuteBox());
            }
            if (possibleTargets.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "transmuteArmyButtonsSection");
                for (let i = 0; i < possibleTargets.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = "transmuteBtn " + possibleTargets[i];
                    let t = document.createTextNode("" + types_1.GameState.armies[possibleTargets[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let posiInList = this.name.split(" ")[1];
                        types_1.ButtonFunctions.transferTroopsFromSelectedArmy(parseInt(posiInList));
                    });
                    x.appendChild(btn);
                }
                types_1.GUI.getTransmuteArmyButtonsPartition().appendChild(x);
                return true;
            }
            return false;
        }
        else {
            if (document.getElementById("transmuteArmyButtonsSection") != undefined) {
                let d = types_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(types_1.GUI.getActivateTransmuteBox());
            }
            return false;
        }
    }
    BoxVisibility.activateTransmuteBox = activateTransmuteBox;
    function activateMergeBox() {
        show(types_1.GUI.getMergeBox());
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        if (selectedArmy instanceof types_1.FootArmy) {
            hide(types_1.GUI.getSplitBox());
        }
        else if (selectedArmy instanceof types_1.RiderArmy) {
            hide(types_1.GUI.getSplitMountedBox());
        }
        else if (selectedArmy instanceof types_1.Fleet) {
            hide(types_1.GUI.getSplitFleetBox());
        }
        let selectedPos = types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition();
        let possibleTargets = [];
        let targetOwner = types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner;
        for (let i = 0; i < types_1.GameState.armies.length; i++) {
            if (i != types_1.Controls.selectedArmyIndex) {
                if (types_1.GameState.armies[i].owner === targetOwner &&
                    types_1.GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                    types_1.GameState.armies[i].getPosition()[1] === selectedPos[1] &&
                    types_1.GameState.armies[i].constructor === selectedArmy.constructor) {
                    possibleTargets.push(i);
                }
            }
        }
        if (possibleTargets != []) {
            if (types_1.GUI.getActivateMergeBox() != undefined) {
                let d = types_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(types_1.GUI.getActivateMergeBox());
            }
            if (possibleTargets.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "mergeArmyButtonsSection");
                for (let i = 0; i < possibleTargets.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = "mergeBtn " + possibleTargets[i];
                    let t = document.createTextNode("" + types_1.GameState.armies[possibleTargets[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let posiInList = this.name.split(" ")[1];
                        types_1.ButtonFunctions.mergeSelectedArmy(parseInt(posiInList));
                    });
                    x.appendChild(btn);
                }
                types_1.GUI.getTransmuteArmyButtonsPartition().appendChild(x);
            }
        }
        else {
            if (document.getElementById("mergeArmyButtonsSection") != undefined) {
                let d = types_1.GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(types_1.GUI.getActivateMergeBox());
            }
        }
    }
    BoxVisibility.activateMergeBox = activateMergeBox;
    function backToSplitBox() {
        hide(types_1.GUI.getMergeBox());
        hide(types_1.GUI.getTransmuteBox());
        if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.FootArmy) {
            show(types_1.GUI.getSplitBox());
            types_1.GUI.getSplitBox().style.display = "";
        }
        else if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.RiderArmy) {
            show(types_1.GUI.getSplitMountedBox());
        }
        else if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.Fleet) {
            show(types_1.GUI.getSplitFleetBox());
        }
    }
    BoxVisibility.backToSplitBox = backToSplitBox;
    // this is the cancel function for the mount/unmount and split boxes
    function restoreInfoBox() {
        hide(types_1.GUI.getMountBox());
        hide(types_1.GUI.getUnMountBox());
        hide(types_1.GUI.getSplitBox());
        hide(types_1.GUI.getSplitMountedBox());
        hide(types_1.GUI.getSplitFleetBox());
        hide(types_1.GUI.getTransmuteBox());
        hide(types_1.GUI.getMergeBox());
        closeShootBox();
        if (types_1.GUI.getGodModeBox().getSelf().classList.contains("invisible")) {
            show(types_1.GUI.getInfoBox().getSelf());
        }
    }
    BoxVisibility.restoreInfoBox = restoreInfoBox;
})(BoxVisibility = exports.BoxVisibility || (exports.BoxVisibility = {}));
//# sourceMappingURL=boxVisibilty.js.map