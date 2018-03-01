"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const savingFunctions_1 = require("../serverInteraction/savingFunctions");
const gameState_1 = require("../gameState");
const controlVariables_1 = require("./controlVariables");
const riderArmy_1 = require("../armies/riderArmy");
const footArmy_1 = require("../armies/footArmy");
const armyFunctions_1 = require("../libraries/armyFunctions");
const fleet_1 = require("../armies/fleet");
var ButtonFunctions;
(function (ButtonFunctions) {
    function mainButton() {
        boxVisibilty_1.BoxVisibility.toggleVisibility(gui_1.GUI.getBigBox().getSelf());
    }
    ButtonFunctions.mainButton = mainButton;
    function nextTurn() {
        let message = "";
        if (gameState_1.GameState.currentTurn.realm == undefined) {
            message = "Do you want to end the pre-turn phase?";
        }
        else if (gameState_1.GameState.currentTurn.status === 'fi') {
            message = "Do you want to end processing the turn of " + gameState_1.GameState.currentTurn.realm + "?";
        }
        else if (login === 'sl') {
            message = "Do you want to end the turn of " + gameState_1.GameState.currentTurn.realm + "?";
        }
        else {
            message = "Do you want to end your turn?";
        }
        if (confirm(message)) {
            savingFunctions_1.Saving.sendEvents();
        }
    }
    ButtonFunctions.nextTurn = nextTurn;
    // the splitArmy funtion of the split box
    // TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
    function splitSelectedArmy() {
        if (login === 'guest') {
            window.alert("Zuschauer haben keine Rechte.");
            return false;
        }
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].isGuard) {
            window.alert("Garde Armeen können nicht geteilt werden.");
            return false;
        }
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        // depending on army type different fields are needed
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            toSplit = parseInt(gui_1.GUI.getSplitInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
            if (toSplit > (selectedArmy.getTroopCount() - 100)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (toSplit < 100) {
                window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.");
                return false;
            }
            if (mountsToSplit > selectedArmy.getMountCount()) {
                window.alert("So viele Reittiere hast du nicht.");
                return false;
            }
            if (lkpToSplit > selectedArmy.getLightCatapultCount()) {
                window.alert("So viele leichte Katapulte hast du nicht.");
                return false;
            }
            if (skpToSplit > selectedArmy.getHeavyCatapultCount()) {
                window.alert("So viele schwere Katapulte hast du nicht.");
                return false;
            }
        }
        else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            toSplit = parseInt(gui_1.GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitMountedLeadersInput().value);
            if (toSplit > (selectedArmy.getTroopCount() - 50)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (toSplit < 50) {
                window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)");
                return false;
            }
        }
        else if (selectedArmy instanceof fleet_1.Fleet) {
            toSplit = parseInt(gui_1.GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(gui_1.GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(gui_1.GUI.getSplitFleetSkpInput().value);
            if (toSplit > (selectedArmy.getTroopCount() - 1)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
                return false;
            }
            if (toSplit * 100 > (selectedArmy.freeTransportCapacity())) {
                window.alert("Du kannst keine beladenen Schiffe abspalten.");
                return false;
            }
            if (toSplit < 1) {
                window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)");
                return false;
            }
            if (lkpToSplit > selectedArmy.getLightCatapultCount()) {
                window.alert("So viele leichte Kriegsschiffe hast du nicht.");
                return false;
            }
            if (skpToSplit > selectedArmy.getHeavyCatapultCount()) {
                window.alert("So viele schwere Kriegsschiffe hast du nicht.");
                return false;
            }
        }
        if (leadersToSplit > (selectedArmy.getOfficerCount() - 1)) {
            window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.");
            return false;
        }
        if (leadersToSplit < 1) {
            window.alert("Es muss mindestens 1 Heerführer abgespalten werden.");
            return false;
        }
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            let newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(1, selectedArmy.owner);
            if (newArmyId === -1) {
                return false;
            }
            let newArmy = new footArmy_1.FootArmy(newArmyId, selectedArmy.owner, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, [selectedArmy.getPosition()[0],
                selectedArmy.getPosition()[1]], selectedArmy.getMovePoints(), selectedArmy.getHeightPoints(), false);
            gameState_1.GameState.armies.push(newArmy);
            selectedArmy.setTroopCount(selectedArmy.getTroopCount() - toSplit);
            selectedArmy.setOfficerCount(selectedArmy.getOfficerCount() - leadersToSplit);
            selectedArmy.setLightCatapultCount(selectedArmy.getLightCatapultCount() - lkpToSplit);
            selectedArmy.setHeavyCatapultCount(selectedArmy.getHeavyCatapultCount() - skpToSplit);
            selectedArmy.setMountCount(selectedArmy.getMountCount() - mountsToSplit);
            gameState_1.GameState.armies.push({
                type: "split", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    realm: selectedArmy.owner.tag,
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: lkpToSplit,
                    skp: skpToSplit,
                    mounts: mountsToSplit,
                    x: selectedArmy.getPosition()[0],
                    y: selectedArmy.getPosition()[1],
                    newArmysId: newArmyId
                }
            });
        }
        if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            let newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(2, selectedArmy.owner);
            if (newArmyId === -1) {
                return false;
            }
            let newArmy = new riderArmy_1.RiderArmy(newArmyId, selectedArmy.owner, toSplit, leadersToSplit, [selectedArmy.getPosition()[0],
                selectedArmy.getPosition()[1]], selectedArmy.getMovePoints(), selectedArmy.getHeightPoints(), false);
            gameState_1.GameState.armies.push(newArmy);
            selectedArmy.setTroopCount(selectedArmy.getTroopCount() - toSplit);
            selectedArmy.setOfficerCount(selectedArmy.getOfficerCount() - leadersToSplit);
            preparedEvents.push({
                type: "split", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    realm: selectedArmy.owner.tag,
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: 0,
                    skp: 0,
                    mounts: 0,
                    x: selectedArmy.getPosition()[0],
                    y: selectedArmy.getPosition()[1],
                    newArmysId: newArmyId
                }
            });
        }
        if (selectedArmy instanceof fleet_1.Fleet) {
            let newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(3, selectedArmy.owner);
            if (newArmyId === -1) {
                return false;
            }
            let newArmy = new fleet_1.Fleet(newArmyId, selectedArmy.owner, toSplit, leadersToSplit, lkpToSplit, skpToSplit, [selectedArmy.getPosition()[0],
                selectedArmy.getPosition()[1]], selectedArmy.getMovePoints(), false);
            gameState_1.GameState.armies.push(newArmy);
            selectedArmy.setTroopCount(selectedArmy.getTroopCount() - toSplit);
            selectedArmy.setOfficerCount(selectedArmy.getOfficerCount() - leadersToSplit);
            selectedArmy.setLightCatapultCount(selectedArmy.getLightCatapultCount() - lkpToSplit);
            selectedArmy.setHeavyCatapultCount(selectedArmy.getHeavyCatapultCount() - skpToSplit);
            preparedEvents.push({
                type: "split", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    realm: selectedArmy.owner.tag,
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: lkpToSplit,
                    skp: skpToSplit,
                    mounts: 0,
                    x: selectedArmy.getPosition()[0],
                    y: selectedArmy.getPosition()[1],
                    newArmysId: newArmyId
                }
            });
        }
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        return true;
    }
    ButtonFunctions.splitSelectedArmy = splitSelectedArmy;
    // the mount function of the mount box
    function mountSelected() {
        if (gui_1.GUI.getMountInput().value === "" || gui_1.GUI.getMountLeaderInput().value === "" ||
            gui_1.GUI.getMountInput().value == undefined || gui_1.GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toMount = parseInt(gui_1.GUI.getMountInput().value);
        let leadersToMount = parseInt(gui_1.GUI.getMountLeaderInput().value);
        if (isNaN(toMount) || isNaN(leadersToMount)) {
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].mount(toMount, leadersToMount);
    }
    ButtonFunctions.mountSelected = mountSelected;
    // the unMount function of the unMount box
    function unMountSelected() {
        if (gui_1.GUI.getUnMountInput().value === "" || gui_1.GUI.getMountLeaderInput().value === "" ||
            gui_1.GUI.getUnMountLeaderInput().value == undefined || gui_1.GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toUnMount = parseInt(gui_1.GUI.getUnMountInput().value);
        let leadersToUnMount = parseInt(gui_1.GUI.getUnMountLeaderInput().value);
        if (isNaN(toUnMount) || isNaN(leadersToUnMount)) {
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].dismount(toUnMount, leadersToUnMount);
    }
    ButtonFunctions.unMountSelected = unMountSelected;
    function allMountSelected() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        selectedArmy.mount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }
    ButtonFunctions.allMountSelected = allMountSelected;
    function allUnMountSelected() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        selectedArmy.dismount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }
    ButtonFunctions.allUnMountSelected = allUnMountSelected;
    // move troops or leaders from Controls.selectedArmyIndex to the army at position mergeId in GameState.armies
    function transferTroopsFromSelectedArmy(mergeId) {
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        // depending on army type different fields are needed
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            toSplit = parseInt(gui_1.GUI.getSplitInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
            if (toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
                selectedArmy.setTroopCount(selectedArmy.getTroopCount() - toSplit);
                gameState_1.GameState.armies[mergeId].setTroopCount(gameState_1.GameState.armies[mergeId].getTroopCount() + toSplit);
                selectedArmy.setOfficerCount(selectedArmy.getOfficerCount() - leadersToSplit);
                gameState_1.GameState.armies[mergeId].setOfficerCount(gameState_1.GameState.armies[mergeId].getOfficerCount() + leadersToSplit);
                if (selectedArmy instanceof footArmy_1.FootArmy) {
                    selectedArmy.setMountCount(selectedArmy.getMountCount() - mountsToSplit);
                    gameState_1.GameState.armies[mergeId].setMountCount(gameState_1.GameState.armies[mergeId].getMountCount() + mountsToSplit);
                }
                selectedArmy.setLightCatapultCount(selectedArmy.getLightCatapultCount() - lkpToSplit);
                gameState_1.GameState.armies[mergeId].getLightCatapultCount() += lkpToSplit;
                selectedArmy.setHeavyCatapultCount(selectedArmy.getHeavyCatapultCount() - skpToSplit);
                gameState_1.GameState.armies[mergeId].getHeavyCatapultCount() += skpToSplit;
                if (leadersToSplit > 0 && selectedArmy.getMovePoints() < selectedArmy.getMaxMovePoints()) {
                    gameState_1.GameState.armies[mergeId].setMovePoints(0);
                }
                else if (selectedArmy.getMovePoints() < gameState_1.GameState.armies[mergeId].getMovePoints()) {
                    gameState_1.GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
                }
                if (selectedArmy.getHeightPoints() < gameState_1.GameState.armies[mergeId].getHeightPoints()) {
                    gameState_1.GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
                }
                preparedEvents.push({
                    type: "transfer", content: {
                        fromArmyId: selectedArmy.getErkenfaraID(),
                        toArmyId: gameState_1.GameState.armies[mergeId].getErkenfaraID(),
                        realm: selectedArmy.owner.tag,
                        troops: toSplit,
                        leaders: leadersToSplit,
                        lkp: lkpToSplit,
                        skp: skpToSplit,
                        mounts: mountsToSplit,
                        x: selectedArmy.getPosition()[0],
                        y: selectedArmy.getPosition()[1]
                    }
                });
            }
            else {
                window.alert("Es müssen positive Werte abgespalten werden");
                return false;
            }
        }
        else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            toSplit = parseInt(gui_1.GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitMountedLeadersInput().value);
            if (toSplit >= 0 && leadersToSplit >= 0) {
                selectedArmy.getTroopCount() -= toSplit;
                gameState_1.GameState.armies[mergeId].getTroopCount() += toSplit;
                selectedArmy.getOfficerCount() -= leadersToSplit;
                gameState_1.GameState.armies[mergeId].getOfficerCount() += leadersToSplit;
                selectedArmy.getLightCatapultCount() -= lkpToSplit;
                gameState_1.GameState.armies[mergeId].getLightCatapultCount() += lkpToSplit;
                selectedArmy.getHeavyCatapultCount() -= skpToSplit;
                gameState_1.GameState.armies[mergeId].getHeavyCatapultCount() += skpToSplit;
                if (leadersToSplit > 0 && selectedArmy.getMovePoints() < selectedArmy.getMaxMovePoints()) {
                    gameState_1.GameState.armies[mergeId].setMovePoints(0);
                }
                else if (selectedArmy.getMovePoints() < gameState_1.GameState.armies[mergeId].getMovePoints()) {
                    gameState_1.GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
                }
                if (selectedArmy.getHeightPoints() < gameState_1.GameState.armies[mergeId].getHeightPoints()) {
                    gameState_1.GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
                }
                preparedEvents.push({
                    type: "transfer", content: {
                        fromArmyId: selectedArmy.getErkenfaraID(),
                        toArmyId: gameState_1.GameState.armies[mergeId].getErkenfaraID(),
                        realm: selectedArmy.owner.tag,
                        troops: toSplit,
                        leaders: leadersToSplit,
                        lkp: 0,
                        skp: 0,
                        mounts: 0,
                        x: selectedArmy.getPosition()[0],
                        y: selectedArmy.getPosition()[1]
                    }
                });
            }
            else {
                window.alert("Es müssen positive Werte abgespalten werden");
                return false;
            }
        }
        else if (selectedArmy instanceof fleet_1.Fleet) {
            toSplit = parseInt(gui_1.GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(gui_1.GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(gui_1.GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(gui_1.GUI.getSplitFleetSkpInput().value);
            if (toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
                selectedArmy.getTroopCount() -= toSplit;
                gameState_1.GameState.armies[mergeId].getTroopCount() += toSplit;
                selectedArmy.getOfficerCount() -= leadersToSplit;
                gameState_1.GameState.armies[mergeId].getOfficerCount() += leadersToSplit;
                selectedArmy.getLightCatapultCount() -= lkpToSplit;
                gameState_1.GameState.armies[mergeId].getLightCatapultCount() += lkpToSplit;
                selectedArmy.getHeavyCatapultCount() -= skpToSplit;
                gameState_1.GameState.armies[mergeId].getHeavyCatapultCount() += skpToSplit;
                if (leadersToSplit > 0 && selectedArmy.getMovePoints() < selectedArmy.getMaxMovePoints()) {
                    gameState_1.GameState.armies[mergeId].setMovePoints(0);
                }
                else if (selectedArmy.getMovePoints() < gameState_1.GameState.armies[mergeId].getMovePoints()) {
                    gameState_1.GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
                }
                if (selectedArmy.getHeightPoints() < gameState_1.GameState.armies[mergeId].getHeightPoints()) {
                    gameState_1.GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
                }
                preparedEvents.push({
                    type: "transfer", content: {
                        fromArmyId: selectedArmy.getErkenfaraID(),
                        toArmyId: gameState_1.GameState.armies[mergeId].getErkenfaraID(),
                        realm: selectedArmy.owner.tag,
                        troops: toSplit,
                        leaders: leadersToSplit,
                        lkp: lkpToSplit,
                        skp: skpToSplit,
                        mounts: 0,
                        x: selectedArmy.getPosition()[0],
                        y: selectedArmy.getPosition()[1]
                    }
                });
            }
            else {
                window.alert("Es müssen positive Werte abgespalten werden");
                return false;
            }
        }
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        return true;
    }
    ButtonFunctions.transferTroopsFromSelectedArmy = transferTroopsFromSelectedArmy;
    // merges selectedArmy with the army at position mergeId in GameState.armies
    function mergeSelectedArmy(mergeId) {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        // depending on army type different fields are needed
        if (selectedArmy instanceof footArmy_1.FootArmy) {
            gameState_1.GameState.armies[mergeId].getTroopCount() += selectedArmy.getTroopCount();
            gameState_1.GameState.armies[mergeId].getOfficerCount() += selectedArmy.getOfficerCount();
            gameState_1.GameState.armies[mergeId].getMountCount() += selectedArmy.getMountCount();
            gameState_1.GameState.armies[mergeId].getLightCatapultCount() += selectedArmy.getLightCatapultCount();
            gameState_1.GameState.armies[mergeId].getHeavyCatapultCount() += selectedArmy.getHeavyCatapultCount();
            if (selectedArmy.getMovePoints() < gameState_1.GameState.armies[mergeId].getMovePoints()) {
                gameState_1.GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
            }
            if (selectedArmy.getHeightPoints() < gameState_1.GameState.armies[mergeId].getHeightPoints()) {
                gameState_1.GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
            }
            preparedEvents.push({
                type: "merge", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    toArmyId: gameState_1.GameState.armies[mergeId].getErkenfaraID(),
                    realm: selectedArmy.owner.tag,
                    troops: selectedArmy.getTroopCount(),
                    leaders: selectedArmy.getOfficerCount(),
                    lkp: selectedArmy.getLightCatapultCount(),
                    skp: selectedArmy.getHeavyCatapultCount(),
                    mounts: selectedArmy.getMountCount(),
                    x: selectedArmy.getPosition()[0],
                    y: selectedArmy.getPosition()[1]
                }
            });
            armyFunctions_1.ArmyFunctions.deleteArmy(selectedArmy);
        }
        else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
            gameState_1.GameState.armies[mergeId].getTroopCount() += selectedArmy.getTroopCount();
            gameState_1.GameState.armies[mergeId].getOfficerCount() += selectedArmy.getOfficerCount();
            if (selectedArmy.getMovePoints() < gameState_1.GameState.armies[mergeId].getMovePoints()) {
                gameState_1.GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
            }
            if (selectedArmy.getHeightPoints() < gameState_1.GameState.armies[mergeId].getHeightPoints()) {
                gameState_1.GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
            }
            preparedEvents.push({
                type: "merge", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    toArmyId: gameState_1.GameState.armies[mergeId].getErkenfaraID(),
                    realm: selectedArmy.owner.tag,
                    troops: selectedArmy.getTroopCount(),
                    leaders: selectedArmy.getOfficerCount(),
                    lkp: 0,
                    skp: 0,
                    mounts: 0,
                    x: selectedArmy.getPosition()[0],
                    y: selectedArmy.getPosition()[1]
                }
            });
            armyFunctions_1.ArmyFunctions.deleteArmy(selectedArmy);
        }
        else if (selectedArmy instanceof fleet_1.Fleet) {
            gameState_1.GameState.armies[mergeId].getTroopCount() += selectedArmy.getTroopCount();
            gameState_1.GameState.armies[mergeId].getOfficerCount() += selectedArmy.getOfficerCount();
            gameState_1.GameState.armies[mergeId].getLightCatapultCount() += selectedArmy.getLightCatapultCount();
            gameState_1.GameState.armies[mergeId].getHeavyCatapultCount() += selectedArmy.getHeavyCatapultCount();
            gameState_1.GameState.armies[mergeId].loadedArmies = gameState_1.GameState.armies[mergeId].loadedArmies.concat(selectedArmy.loadedArmies);
            if (selectedArmy.getMovePoints() < gameState_1.GameState.armies[mergeId].getMovePoints()) {
                gameState_1.GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
            }
            if (selectedArmy.getHeightPoints() < gameState_1.GameState.armies[mergeId].getHeightPoints()) {
                gameState_1.GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
            }
            if (selectedArmy.loadedArmies.length > 0) {
                for (let j = 0; j < selectedArmy.loadedArmies.length; j++) {
                    for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                        if (selectedArmy.loadedArmies[j] == gameState_1.GameState.armies[i].getErkenfaraID() &&
                            gameState_1.GameState.armies[mergeId].owner === gameState_1.GameState.armies[i].owner) {
                            gameState_1.GameState.armies[i].isLoadedIn = gameState_1.GameState.armies[mergeId].getErkenfaraID();
                        }
                    }
                }
            }
            for (let j = 0; j < gameState_1.GameState.armies[mergeId].loadedArmies.length; j++) {
                for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                    if (gameState_1.GameState.armies[mergeId].loadedArmies[j] == gameState_1.GameState.armies[i].getErkenfaraID() &&
                        gameState_1.GameState.armies[mergeId].owner === gameState_1.GameState.armies[i].owner) {
                    }
                }
            }
            preparedEvents.push({
                type: "merge", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    toArmyId: gameState_1.GameState.armies[mergeId].getErkenfaraID(),
                    realm: selectedArmy.owner.tag,
                    troops: selectedArmy.getTroopCount(),
                    leaders: selectedArmy.getOfficerCount(),
                    lkp: 0,
                    skp: 0,
                    mounts: 0,
                    x: selectedArmy.getPosition()[0],
                    y: selectedArmy.getPosition()[1]
                }
            });
            armyFunctions_1.ArmyFunctions.deleteArmy(selectedArmy);
        }
        if (mergeId = gameState_1.GameState.armies.length) {
            mergeId -= 1;
        }
        controlVariables_1.Controls.selectedArmyIndex = mergeId;
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
    }
    ButtonFunctions.mergeSelectedArmy = mergeSelectedArmy;
})(ButtonFunctions = exports.ButtonFunctions || (exports.ButtonFunctions = {}));
