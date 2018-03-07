import {GUI} from "./gui";
import {GameState} from "../gameState";
import {Drawing} from "./drawingFunctions";
import {Controls} from "../controls/controlVariables";
import {InfoBox} from "./infoBox";
import {InfoChangeBox} from "./infoChangeBox";
import {FootArmy} from "../armies/footArmy";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {LandArmy} from "../armies/landArmy";
import {Army} from "../armies/army";

export namespace BoxVisibility {
    export let worldCreationModeOn = false;
    export let worldCreationModeOnClick = false;
    export let riverCreationModeOn = false;
    export let buildingCreationModeOn = false;
    export let streetBuildingModeOn = false;
    export let harborBuildingModeOn = false;
    export let bridgeBuildingModeOn = false;
    export let wallBuildingModeOn = false;
    export let shootingModeOn = false;
    export let changeFieldToType = -1;
    export let armyCreationModeOn = false;
    export let armyWithNextClick = false;
    export let ownerBuffer: string = "";
    export let armyIdBuffer = 0;
    export let countBuffer = 0;
    export let leaderBuffer = 0;
    export let mountsBuffer = 0;
    export let lkpBuffer = 0;
    export let skpBuffer = 0;
    export let guardBuffer = false;

    export function toggleVisibility(element: HTMLElement): void {
        let classes = element.classList;
        if (classes.contains("invisible")) {
            classes.remove("invisible");
        } else {
            classes.add("invisible");
        }
    }

    export function show(element: HTMLElement): void {
        let classes = element.classList;
        if (classes.contains("invisible")) {
            classes.remove("invisible");
        }
    }

    export function hide(element: HTMLElement): void {
        let classes = element.classList;
        if (!classes.contains("invisible")) {
            classes.add("invisible");
        }
    }

    // switches bunttonBoxContent.style.visibility to "" and all others to "none"
    export function switchBtnBoxTo(buttonBoxContent: HTMLElement): void {
        hide(GUI.getWorldBenderBox().getSelf());
        hide(GUI.getRiverBenderBox().getSelf());
        hide(GUI.getWorldBenderBox().getCreationWarning());
        hide(GUI.getBuildingCreationBox().getSelf());
        hide(GUI.getStreetCreationBox().getSelf());
        hide(GUI.getHarborCreationBox().getSelf());
        hide(GUI.getBridgeCreationBox().getSelf());
        hide(GUI.getWallCreationBox().getSelf());
        hide(GUI.getButtonsBox());
        hide(GUI.getArmyGeneratorBox().getSelf());
        show(buttonBoxContent);
    }

    // switches activeMode to True and all others to false
    export function switchModeTo(activeMode: string): void {
        worldCreationModeOn = false;
        worldCreationModeOnClick = false;
        riverCreationModeOn = false;
        buildingCreationModeOn = false;
        streetBuildingModeOn = false;
        harborBuildingModeOn = false;
        bridgeBuildingModeOn = false;
        wallBuildingModeOn = false;
        shootingModeOn = false;
        changeFieldToType = -1;
        armyWithNextClick = false;
        armyCreationModeOn = false;
        switch (activeMode) {
            //worldCreationModeOnClick also has worldCreationModeOn enabled
            case "worldCreationModeOnClick": worldCreationModeOnClick = true;
            case "worldCreationModeOn": worldCreationModeOn = true; break;
            case "riverCreationModeOn": riverCreationModeOn = true; break;
            case "buildingCreationModeOn": buildingCreationModeOn = true; break;
            case "streetBuildingModeOn": streetBuildingModeOn = true; break;
            case "harborBuildingModeOn": harborBuildingModeOn = true; break;
            case "bridgeBuildingModeOn": bridgeBuildingModeOn = true; break;
            case "wallBuildingModeOn": wallBuildingModeOn = true; break;
            case "armyWithNextClick": armyWithNextClick = true; break;
            case "armyCreationModeOn": armyCreationModeOn = true; break;
            case "shootingModeOn": shootingModeOn = true; break;
            case "none": break;
        }
    }

    export function toggleArmyCreationMode(): void {
        if (armyCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!armyCreationModeOn) {
            switchModeTo("armyCreationModeOn");
            switchBtnBoxTo(GUI.getArmyGeneratorBox().getSelf());
        }
    }

    export function toggleWorldCreationMode(): void {
        if (worldCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!worldCreationModeOn) {
            switchModeTo("worldCreationModeOn");
            switchBtnBoxTo(GUI.getWorldBenderBox().getSelf());
        }
    }

    export function toggleRiverCreationMode(): void {
        if (riverCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!riverCreationModeOn) {
            switchModeTo("riverCreationModeOn");
            switchBtnBoxTo(GUI.getRiverBenderBox().getSelf());
        }
    }

    export function toggleBuildingCreationMode(): void {
        if (buildingCreationModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!buildingCreationModeOn) {
            switchBtnBoxTo(GUI.getBuildingCreationBox().getSelf());
            switchModeTo("buildingCreationModeOn");
        }
    }

    export function toggleStreetBuildingMode(): void {
        if (streetBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!streetBuildingModeOn) {
            switchModeTo("streetBuildingModeOn");
            switchBtnBoxTo(GUI.getStreetCreationBox().getSelf());
        }
    }

    export function toggleHarborBuildingMode(): void {
        if (harborBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!harborBuildingModeOn) {
            switchModeTo("harborBuildingModeOn");
            switchBtnBoxTo(GUI.getHarborCreationBox().getSelf());
        }
    }

    export function toggleBridgeBuildingMode(): void {
        if (bridgeBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!bridgeBuildingModeOn) {
            switchModeTo("bridgeBuildingModeOn");
            switchBtnBoxTo(GUI.getBridgeCreationBox().getSelf());
        }
    }

    export function toggleWallBuildingMode(): void {
        if (wallBuildingModeOn) {
            switchModeTo("none");
            switchBtnBoxTo(GUI.getButtonsBox());
        } else if (!wallBuildingModeOn) {
            switchModeTo("wallBuildingModeOn");
            switchBtnBoxTo(GUI.getWallCreationBox().getSelf());
        }
    }

    export function toggleGodModeBar(): void {
        if (GUI.getGodModeBox().getSelf().classList.contains("invisible")) {
            restoreInfoBox();
            writeRealmDropdown();
            show(GUI.getGodModeBox().getSelf());
            show(GUI.getInfoChangeBox().getSelf());
            hide(GUI.getInfoBox().getSelf());
        } else {
            hide(GUI.getGodModeBox().getSelf());
            hide(GUI.getInfoChangeBox().getSelf());
            show(GUI.getInfoBox().getSelf());
            updateInfoBox();
        }
    }

    export function writeRealmDropdown(): void {
        let factionsDropdown: HTMLSelectElement = GUI.getGodModeBox().getFactionToCreateBuildingsFor();
        let factionOptions: string = "";
        GameState.realms.forEach(realm => {
            if (realm.active) {
                factionOptions += "<option value=" + "'" + realm.tag + "'" + ">" + realm.name + "</option>";
            }
        });
        factionsDropdown.innerHTML = factionOptions;
    }

    // this is used to update the infoBox and the infoChangeBox with the currently selected Army
    export function updateInfoBox(): void {
        let infoBox: InfoBox = GUI.getInfoBox();
        let changeBox: InfoChangeBox = GUI.getInfoChangeBox();
        if (selectedArmyIndex != undefined) {
            // info Box
            let infoArmy = GameState.armies[selectedArmyIndex];
            if (infoArmy.isGuard) {
                infoBox.getGuardText().innerHTML = "Garde";
            } else {
                infoBox.getGuardText().innerHTML = "";
            }
            if (infoArmy instanceof FootArmy || infoArmy instanceof RiderArmy) {
                infoBox.getArmyIdText().innerHTML = "Heer " + infoArmy.getErkenfaraID();
            }
            else if (infoArmy instanceof Fleet) {
                infoBox.getArmyIdText().innerHTML = "Flotte " + infoArmy.getErkenfaraID();
            }
            infoBox.getCountText().innerHTML = "Truppen: " + infoArmy.getTroopCount();
            infoBox.getLeadersText().innerHTML = "Heerführer: " + infoArmy.getOfficerCount();
            infoBox.getMountsText().innerHTML = "mitgeführte Reittiere: " + (infoArmy as FootArmy).getMountCount();
            if (infoArmy instanceof RiderArmy) {
                hide(infoBox.getLKPText());
                hide(infoBox.getSKPText());
            } else {
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
            if (infoArmy instanceof FootArmy) {
                show(infoBox.getMountButton());
                hide(infoBox.getUnMountButton());
            } else if (infoArmy instanceof RiderArmy) {
                hide(infoBox.getMountButton());
                show(infoBox.getUnMountButton());
            } else {
                hide(infoBox.getMountButton());
                hide(infoBox.getUnMountButton());
            }
            //show shoot button
            if (infoArmy.getLightCatapultCount() > 0 || infoArmy.getHeavyCatapultCount() > 0 ||
                !(infoArmy as LandArmy).isTransported()) {
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
            changeBox.getArmyIdChangeInput().value = ""+infoArmy.getErkenfaraID();
            show(changeBox.getCountChange());
            changeBox.getCountChangeInput().value = ""+infoArmy.getTroopCount();
            show(changeBox.getLeadersChange());
            changeBox.getLeadersChangeInput().value = ""+infoArmy.getOfficerCount();
            show(changeBox.getMountsChange());
            changeBox.getMountsChangeInput().value = ""+(infoArmy as FootArmy).getMountCount();
            show(changeBox.getLKPChange());
            changeBox.getLKPChangeInput().value = ""+infoArmy.getLightCatapultCount();
            show(changeBox.getSKPChange());
            changeBox.getSKPChangeInput().value = ""+infoArmy.getHeavyCatapultCount();
            show(changeBox.getMovePointsChange());
            changeBox.getMovePointsChangeInput().value = ""+infoArmy.getMovePoints();
            show(changeBox.getHeightPointsChange());
            changeBox.getHeightPointsChangeInput().value = ""+infoArmy.getHeightPoints();
            show(changeBox.getChangeArmyInfoButton());
        } else {
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

    export function activateMountBox(): void {
        hide(GUI.getInfoBox().getSelf());
        show(GUI.getMountBox());
    }

    export function activateUnMountBox(): void {
        hide(GUI.getInfoBox().getSelf());
        show(GUI.getUnMountBox());
    }

    export function closeShootBox(): void {
        hide(GUI.getShootBox());
        switchModeTo("none");
        if (Controls.selectedFields[1] != undefined) {
            Controls.selectedFields.pop();
        }
        Drawing.drawStuff();
    }

    export function activateTransmuteBox(): boolean {
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        // depending on army type different fields are needed
        if (GameState.armies[selectedArmyIndex] instanceof FootArmy) {
            toSplit = parseInt(GUI.getSplitInput().value);
            leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(GUI.getSplitSkpInput().value);
            if (toSplit > (GameState.armies[selectedArmyIndex].getTroopCount() - 100)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
                return false;
            }
            if (mountsToSplit > (GameState.armies[selectedArmyIndex] as FootArmy).getMountCount()) {
                window.alert("So viele Reittiere hast du nicht.")
                return false;
            }
            if (lkpToSplit > GameState.armies[selectedArmyIndex].getLightCatapultCount()) {
                window.alert("So viele leichte Katapulte hast du nicht.")
                return false;
            }
            if (skpToSplit > GameState.armies[selectedArmyIndex].getHeavyCatapultCount()) {
                window.alert("So viele schwere Katapulte hast du nicht.")
                return false;
            }
        }
        else if (GameState.armies[selectedArmyIndex] instanceof RiderArmy) {
            toSplit = parseInt(GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
            if (toSplit > (GameState.armies[selectedArmyIndex].getTroopCount() - 50)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
                return false;
            }
        }
        else if (GameState.armies[selectedArmyIndex] instanceof Fleet) {
            toSplit = parseInt(GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
            if (toSplit > (GameState.armies[selectedArmyIndex].getTroopCount() - 1)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
                return false;
            }
            if (toSplit * 100 > ((GameState.armies[selectedArmyIndex] as Fleet).freeTransportCapacity())) {
                window.alert("Du kannst keine beladenen Schiffe verschieben.")
                return false;
            }
            if (lkpToSplit > GameState.armies[selectedArmyIndex].getLightCatapultCount()) {
                window.alert("So viele leichte Kriegsschiffe hast du nicht.")
                return false;
            }
            if (skpToSplit > GameState.armies[selectedArmyIndex].getHeavyCatapultCount()) {
                window.alert("So viele schwere Kriegsschiffe hast du nicht.")
                return false;
            }
        }
        if (leadersToSplit > (GameState.armies[selectedArmyIndex].getOfficerCount() - 1)) {
            window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
            return false;
        }
        GUI.getTransmuteBox().style.display = "";
        let selectedArmy: Army = GameState.armies[selectedArmyIndex];
        if (selectedArmy instanceof FootArmy) {
            hide(GUI.getSplitBox());
        }
        else if (selectedArmy instanceof RiderArmy) {
            hide(GUI.getSplitMountedBox());
        }
        else if (selectedArmy instanceof Fleet) {
            hide(GUI.getSplitFleetBox());
        }
        let onlyLeaders = false;
        if (selectedArmy instanceof FootArmy) {
            if (parseInt(GUI.getSplitInput().value) === 0 &&
                parseInt(GUI.getSplitLeadersInput().value) > 0 &&
                parseInt(GUI.getSplitMountsInput().value) === 0 &&
                parseInt(GUI.getSplitLkpInput().value) === 0 &&
                parseInt(GUI.getSplitSkpInput().value) === 0) {
                onlyLeaders = true;
            }
        }
        else if (selectedArmy instanceof RiderArmy) {
            if (parseInt(GUI.getSplitMountedInput().value) === 0 &&
                parseInt(GUI.getSplitMountedLeadersInput().value) > 0) {
                onlyLeaders = true;
            }
        }
        else if (selectedArmy instanceof Fleet) {
            if (parseInt(GUI.getSplitFleetInput().value) === 0 &&
                parseInt(GUI.getSplitFleetLeadersInput().value) > 0 &&
                parseInt(GUI.getSplitFleetLkpInput().value) === 0 &&
                parseInt(GUI.getSplitFleetSkpInput().value) === 0) {
                onlyLeaders = true;
            }
        }
        let selectedPos = GameState.armies[selectedArmyIndex].getPosition();
        let possibleTargets = [];
        let targetOwner = GameState.armies[selectedArmyIndex].owner;
        for (let i = 0; i < GameState.armies.length; i++) {
            if (i != selectedArmyIndex) {
                if (onlyLeaders) {
                    if (GameState.armies[i].owner === targetOwner &&
                        GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                        GameState.armies[i].getPosition()[1] === selectedPos[1]) {
                        possibleTargets.push(i);
                    }
                } else {
                    if (GameState.armies[i].owner === targetOwner &&
                        GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                        GameState.armies[i].getPosition()[1] === selectedPos[1] &&
                        GameState.armies[i].constructor === GameState.armies[selectedArmyIndex].constructor) {
                        possibleTargets.push(i);
                    }
                }
            }
        }
        if (possibleTargets != []) {
            if (document.getElementById("transmuteArmyButtonsSection") != undefined) {
                let d = GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(GUI.getActivateTransmuteBox());
            }
            if (possibleTargets.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "transmuteArmyButtonsSection")
                for (let i = 0; i < possibleTargets.length; i++) {
                    let btn = document.createElement("BUTTON") as HTMLButtonElement;
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = "transmuteBtn " + possibleTargets[i];
                    let t = document.createTextNode(""+GameState.armies[possibleTargets[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let posiInList = this.name.split(" ")[1];
                        transferTroopsFromSelectedArmy(posiInList);
                    });
                    x.appendChild(btn);
                }
                GUI.getTransmuteArmyButtonsPartition().appendChild(x);
                return true;
            }
            return false;
        }
        else {
            if (document.getElementById("transmuteArmyButtonsSection") != undefined) {
                let d = GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(GUI.getActivateTransmuteBox());
            }
            return false;
        }
    }

    export function activateMergeBox(): void {
        show(GUI.getMergeBox());
        let selectedArmy: Army = GameState.armies[selectedArmyIndex];
        if (selectedArmy instanceof FootArmy) {
            hide(GUI.getSplitBox());
        }
        else if (selectedArmy instanceof RiderArmy) {
            hide(GUI.getSplitMountedBox());
        }
        else if (selectedArmy instanceof Fleet) {
            hide(GUI.getSplitFleetBox());
        }
        let selectedPos = GameState.armies[selectedArmyIndex].getPosition();
        let possibleTargets = [];
        let targetOwner = GameState.armies[selectedArmyIndex].owner;
        for (let i = 0; i < GameState.armies.length; i++) {
            if (i != selectedArmyIndex) {
                if (GameState.armies[i].owner === targetOwner &&
                    GameState.armies[i].getPosition()[0] === selectedPos[0] &&
                    GameState.armies[i].getPosition()[1] === selectedPos[1] &&
                    GameState.armies[i].constructor === selectedArmy.constructor) {
                    possibleTargets.push(i);
                }
            }
        }
        if (possibleTargets != []) {
            if (GUI.getActivateMergeBox() != undefined) {
                let d = GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(GUI.getActivateMergeBox());
            }
            if (possibleTargets.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "mergeArmyButtonsSection")
                for (let i = 0; i < possibleTargets.length; i++) {
                    let btn = document.createElement("BUTTON") as HTMLButtonElement;
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = "mergeBtn " + possibleTargets[i];
                    let t = document.createTextNode(""+GameState.armies[possibleTargets[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let posiInList = this.name.split(" ")[1];
                        mergeSelectedArmy(posiInList);
                    });
                    x.appendChild(btn);
                }
                GUI.getTransmuteArmyButtonsPartition().appendChild(x);
            }
        }
        else {
            if (document.getElementById("mergeArmyButtonsSection") != undefined) {
                let d = GUI.getTransmuteArmyButtonsPartition();
                d.removeChild(GUI.getActivateMergeBox());
            }
        }
    }

    export function backToSplitBox(): void {
        hide(GUI.getMergeBox());
        hide(GUI.getTransmuteBox());
        if (GameState.armies[selectedArmyIndex] instanceof FootArmy) {
            show(GUI.getSplitBox());
            GUI.getSplitBox().style.display = "";
        }
        else if (GameState.armies[selectedArmyIndex] instanceof RiderArmy) {
            show(GUI.getSplitMountedBox());
        }
        else if (GameState.armies[selectedArmyIndex] instanceof Fleet) {
            show(GUI.getSplitFleetBox());
        }
    }

	// this is the cancel function for the mount/unmount and split boxes
    export function restoreInfoBox(): void {
        hide(GUI.getMountBox());
        hide(GUI.getUnMountBox());
        hide(GUI.getSplitBox());
        hide(GUI.getSplitMountedBox());
        hide(GUI.getSplitFleetBox());
        hide(GUI.getTransmuteBox());
        hide(GUI.getMergeBox());
        closeShootBox();
        if (GUI.getGodModeBox().getSelf().classList.contains("invisible")) {
            show(GUI.getInfoBox().getSelf());
        }
    }
}