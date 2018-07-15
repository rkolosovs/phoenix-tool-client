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
define(["require", "exports", "../gui/gui", "../gui/boxVisibilty", "../serverInteraction/savingFunctions", "../gameState", "./controlVariables", "../armies/riderArmy", "../armies/footArmy", "../libraries/armyFunctions", "../armies/fleet", "../gui/drawingFunctions", "../armies/shootingFunctions", "../events/shootEvent", "../events/mergeEvent", "../events/splitEvent", "../events/transferEvent"], function (require, exports, gui_1, boxVisibilty_1, savingFunctions_1, gameState_1, controlVariables_1, riderArmy_1, footArmy_1, armyFunctions_1, fleet_1, drawingFunctions_1, shootingFunctions_1, shootEvent_1, mergeEvent_1, splitEvent_1, transferEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ButtonFunctions;
    (function (ButtonFunctions) {
        var show = boxVisibilty_1.BoxVisibility.show;
        var hide = boxVisibilty_1.BoxVisibility.hide;
        function mainButton() {
            boxVisibilty_1.BoxVisibility.toggleVisibility(gui_1.GUI.getBigBox().getSelf());
        }
        ButtonFunctions.mainButton = mainButton;
        function toggleShootingMode() {
            if (boxVisibilty_1.BoxVisibility.shootingModeOn) {
                boxVisibilty_1.BoxVisibility.closeShootBox();
            }
            else if (!boxVisibilty_1.BoxVisibility.shootingModeOn) {
                boxVisibilty_1.BoxVisibility.switchModeTo("shootingModeOn");
                show(gui_1.GUI.getShootBox());
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].findShootingTargets();
                drawingFunctions_1.Drawing.drawStuff();
            }
        }
        ButtonFunctions.toggleShootingMode = toggleShootingMode;
        function activateSplitbox() {
            if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof footArmy_1.FootArmy) {
                show(gui_1.GUI.getSplitBox());
            }
            else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof riderArmy_1.RiderArmy) {
                show(gui_1.GUI.getSplitMountedBox());
            }
            else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof fleet_1.Fleet) {
                show(gui_1.GUI.getSplitFleetBox());
            }
            hide(gui_1.GUI.getInfoBox().getSelf());
        }
        ButtonFunctions.activateSplitbox = activateSplitbox;
        function nextTurn() {
            let message = "";
            if (gameState_1.GameState.currentTurn.realm == undefined) {
                message = "Do you want to end the pre-turn phase?";
            }
            else if (gameState_1.GameState.currentTurn.status === 'fi') {
                message = "Do you want to end processing the turn of " + gameState_1.GameState.currentTurn.realm + "?";
            }
            else if (gameState_1.GameState.login === 'sl') {
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
            if (gameState_1.GameState.login === 'sl' || gameState_1.GameState.login === selectedArmy.owner.tag) {
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
        //read the proper inputs, check validity and construct a shoot event
        function shootWithSelectedArmy() {
            let selectedArmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
            if (gameState_1.GameState.login === 'guest') {
                window.alert("Du musst eingeloggt sein um das zu tun.");
                return;
            }
            else if (gameState_1.GameState.login !== 'sl' && gameState_1.GameState.login !== selectedArmy.owner.tag) {
                window.alert("Du kannst nur mit deinen eigenen Armeen schießen.");
                return;
            }
            let lkpToShootCount = parseInt(gui_1.GUI.getShootingLKPInput().value);
            let skpToShootCount = parseInt(gui_1.GUI.getShootingSKPInput().value);
            if (isNaN(lkpToShootCount)) {
                lkpToShootCount = 0;
            }
            if (isNaN(skpToShootCount)) {
                skpToShootCount = 0;
            }
            if (lkpToShootCount === 0 && skpToShootCount === 0) {
                window.alert("Du muss mit mindestens einem Katapult schießen.");
                return;
            }
            if (controlVariables_1.Controls.selectedFields.length < 2) {
                window.alert("Wählen Sie ein Feld auf das Sie schießen wollen.");
                return;
            }
            let shootingTarget = controlVariables_1.Controls.shootingTarget;
            if (selectedArmy.targetList.length < 1) {
                window.alert("No available targets.");
                return;
            }
            else if (!selectedArmy.targetList.some(field => field[0] ===
                shootingTarget[0] && field[1] === shootingTarget[1])) {
                window.alert("Ungültiges Ziel.");
                return;
            }
            //TODO: Shoot at things other than the field (mainly the wall).
            let target = 0 /* OnField */;
            try {
                selectedArmy.shootAt(shootingTarget, target, lkpToShootCount, skpToShootCount);
            }
            catch (e) {
                window.alert(e.message);
            }
            gameState_1.GameState.newEvents.push(new shootEvent_1.ShootEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getID(), shootingTarget, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition(), lkpToShootCount, skpToShootCount, target));
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            window.alert("Die Geschosse sind unterwegs. Warte auf die Zugauswertung, um das Ergebnis zu erfahren!");
            drawingFunctions_1.Drawing.drawStuff();
        }
        ButtonFunctions.shootWithSelectedArmy = shootWithSelectedArmy;
        function shootButtonLogic(shootEvent) {
            let shootBox = gui_1.GUI.getShootingBigBox();
            let shooter = gameState_1.GameState.armies.find(army => army.getErkenfaraID() === shootEvent.getShooterId() && army.owner === shootEvent.getRealm());
            let lkpRolls = [];
            let skpRolls = [];
            for (let i = 0; i < 10; i++) { //creating the dice roll array
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
                window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen.");
                return;
            }
            else if (skpRolls.length < shootEvent.getHeavyCatapultCount()) {
                window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen.");
                return;
            }
            else if (lkpRolls.length > shootEvent.getLightCatapultCount()) {
                window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen.");
                return;
            }
            else if (skpRolls.length > shootEvent.getHeavyCatapultCount()) {
                window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen.");
                return;
            }
            else if (shooter == undefined) {
                window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
                return;
            }
            else {
                shootingFunctions_1.ShootingFunctions.inflictRangedDamage(lkpRolls, skpRolls, shooter, shootEvent.getTarget(), shootEvent.getTo(), null);
                shooter.shootAt(shootEvent.getTo(), shootEvent.getTarget(), shootEvent.getLightCatapultCount(), shootEvent.getHeavyCatapultCount());
                // TODO chars
                boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
                shootEvent.setStatus(0 /* Checked */);
                gui_1.GUI.getBigBox().fillEventList();
                drawingFunctions_1.Drawing.drawStuff();
                return;
            }
        }
        ButtonFunctions.shootButtonLogic = shootButtonLogic;
    })(ButtonFunctions = exports.ButtonFunctions || (exports.ButtonFunctions = {}));
});
//# sourceMappingURL=buttonFunctions.js.map