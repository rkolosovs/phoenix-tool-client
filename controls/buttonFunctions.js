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
const drawingFunctions_1 = require("../gui/drawingFunctions");
const shootingFunctions_1 = require("../armies/shootingFunctions");
const mergeEvent_1 = require("../events/mergeEvent");
const splitEvent_1 = require("../events/splitEvent");
const transferEvent_1 = require("../events/transferEvent");
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
    function splitSelectedArmy() {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        if (login === 'sl' || login === selectedArmy.owner.tag) {
            try {
                let troopsToSplit = parseInt(gui_1.GUI.getSplitInput().value);
                let leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
                let mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
                let lightCatapultsToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
                let heavyCatapultsToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
                let newArmyId = -1;
                if (selectedArmy instanceof footArmy_1.FootArmy) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit) || isNaN(mountsToSplit) ||
                        isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))) {
                        newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(1, selectedArmy.owner);
                    }
                    else {
                        throw new Error("All values have to be a valid number.");
                    }
                }
                else if (selectedArmy instanceof riderArmy_1.RiderArmy) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit))) {
                        lightCatapultsToSplit = 0;
                        heavyCatapultsToSplit = 0;
                        mountsToSplit = 0;
                        newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(2, selectedArmy.owner);
                    }
                    else {
                        throw new Error("Troops and leaders have to be a valid number.");
                    }
                }
                else if (selectedArmy instanceof fleet_1.Fleet) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit) ||
                        isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))) {
                        mountsToSplit = 0;
                        newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(3, selectedArmy.owner);
                    }
                    else {
                        throw new Error("All values have to be a valid number.");
                    }
                }
                else {
                    throw new Error("Unknown army type.");
                }
                selectedArmy.split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId);
                gameState_1.GameState.newEvents.push(new splitEvent_1.SplitEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, selectedArmy.getErkenfaraID(), newArmyId, selectedArmy.owner, troopsToSplit, leadersToSplit, mountsToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, selectedArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Man muss eingeloggt sein, um Armeen aufzusplaten.");
        }
        armyFunctions_1.ArmyFunctions.checkArmiesForLiveliness();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        drawingFunctions_1.Drawing.drawStuff();
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
    function transferTroopsFromSelectedArmy(transferToId) {
        let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        let armyToTransferTo = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === transferToId && army.owner === selectedArmy.owner);
        if (armyToTransferTo != undefined) {
            let troopsToTransfer = parseInt(gui_1.GUI.getSplitInput().value);
            let leadersToTransfer = parseInt(gui_1.GUI.getSplitLeadersInput().value);
            let mountsToTransfer = parseInt(gui_1.GUI.getSplitMountsInput().value);
            let lkpToTransfer = parseInt(gui_1.GUI.getSplitLkpInput().value);
            let skpToTransfer = parseInt(gui_1.GUI.getSplitSkpInput().value);
            if (isNaN(troopsToTransfer) || isNaN(leadersToTransfer)) {
                window.alert("Give a proper number of troops and officers to be transferred.");
                return;
            }
            else {
                if (selectedArmy instanceof riderArmy_1.RiderArmy || armyToTransferTo instanceof riderArmy_1.RiderArmy) {
                    mountsToTransfer = 0;
                    lkpToTransfer = 0;
                    skpToTransfer = 0;
                }
                else {
                    if (isNaN(lkpToTransfer) || isNaN(skpToTransfer)) {
                        window.alert("Give a proper number of catapults to be transferred.");
                        return;
                    }
                    else {
                        if (selectedArmy instanceof fleet_1.Fleet || armyToTransferTo instanceof fleet_1.Fleet) {
                            mountsToTransfer = 0;
                        }
                        else if (isNaN(mountsToTransfer)) {
                            window.alert("Give a proper number of mounts to be transferred.");
                            return;
                        }
                    }
                }
            }
            //All relevant input values are valid. Executing the actual transfer now.
            try {
                selectedArmy.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
                gameState_1.GameState.newEvents.push(new transferEvent_1.TransferEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, selectedArmy.getErkenfaraID(), armyToTransferTo.getErkenfaraID(), selectedArmy.owner, troopsToTransfer, leadersToTransfer, mountsToTransfer, lkpToTransfer, skpToTransfer, selectedArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Die Zielarmee existiert nicht.");
        }
    }
    ButtonFunctions.transferTroopsFromSelectedArmy = transferTroopsFromSelectedArmy;
    // merges selectedArmy with the army at position mergeId in GameState.armies
    function mergeSelectedArmy(fromArmyId) {
        let toArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
        let fromArmy = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === fromArmyId && army.owner === toArmy.owner);
        if (fromArmy != undefined) {
            try {
                toArmy.merge(fromArmy);
                gameState_1.GameState.newEvents.push(new mergeEvent_1.MergeEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, fromArmy.getErkenfaraID(), toArmy.getErkenfaraID(), toArmy.owner, toArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            drawingFunctions_1.Drawing.drawStuff();
        }
        else {
            window.alert("Army to be merged into selected army doesn't exist.");
        }
    }
    ButtonFunctions.mergeSelectedArmy = mergeSelectedArmy;
    //TODO: throw errors instead of returning a boolean
    function shootButtonLogic(shootEvent) {
        let shootBox = gui_1.GUI.getShootingBigBox();
        let shooter = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === shootEvent.getShooterId() && army.owner === shootEvent.getRealm());
        let lkpRolls = [];
        let skpRolls = [];
        for (let i = 0; i < 10; i++) {
            let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
            let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
            if (!isNaN(currentRollLKP) && currentRollLKP !== 0) {
                for (let j = 0; j < currentRollLKP; j++) {
                    lkpRolls.push(i);
                }
            }
            if (!isNaN(currentRollSKP) && currentRollSKP !== 0) {
                for (let j = 0; j < currentRollSKP; j++) {
                    skpRolls.push(i);
                }
            }
        }
        //TODO check target field
        if (lkpRolls.length < shootEvent.getLightCatapultCount()) {
            window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (skpRolls.length < shootEvent.getHeavyCatapultCount()) {
            window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (lkpRolls.length > shootEvent.getLightCatapultCount()) {
            window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (skpRolls.length > shootEvent.getHeavyCatapultCount()) {
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (shooter != undefined) {
            shootingFunctions_1.ShootingFunctions.fernkampf(lkpRolls, skpRolls, shooter, shootEvent.getTarget(), shootEvent.getTo(), null);
            // TODO chars
            boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
            shootEvent.setStatus(0 /* Checked */);
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
            return true;
        }
        else {
            return false;
        }
    }
    ButtonFunctions.shootButtonLogic = shootButtonLogic;
})(ButtonFunctions = exports.ButtonFunctions || (exports.ButtonFunctions = {}));
