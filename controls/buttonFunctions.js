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
var ButtonFunctions;
(function (ButtonFunctions) {
    var show = types_1.BoxVisibility.show;
    var hide = types_1.BoxVisibility.hide;
    function mainButton() {
        types_1.BoxVisibility.toggleVisibility(types_1.GUI.getBigBox().getSelf());
    }
    ButtonFunctions.mainButton = mainButton;
    function toggleShootingMode() {
        if (types_1.BoxVisibility.shootingModeOn) {
            types_1.BoxVisibility.closeShootBox();
        }
        else if (!types_1.BoxVisibility.shootingModeOn) {
            types_1.BoxVisibility.switchModeTo("shootingModeOn");
            show(types_1.GUI.getShootBox());
            types_1.GameState.armies[types_1.Controls.selectedArmyIndex].findShootingTargets();
            types_1.Drawing.drawStuff();
        }
    }
    ButtonFunctions.toggleShootingMode = toggleShootingMode;
    function activateSplitbox() {
        if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.FootArmy) {
            show(types_1.GUI.getSplitBox());
        }
        else if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.RiderArmy) {
            show(types_1.GUI.getSplitMountedBox());
        }
        else if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.Fleet) {
            show(types_1.GUI.getSplitFleetBox());
        }
        hide(types_1.GUI.getInfoBox().getSelf());
    }
    ButtonFunctions.activateSplitbox = activateSplitbox;
    function nextTurn() {
        let message = "";
        if (types_1.GameState.currentTurn.realm == undefined) {
            message = "Do you want to end the pre-turn phase?";
        }
        else if (types_1.GameState.currentTurn.status === 'fi') {
            message = "Do you want to end processing the turn of " + types_1.GameState.currentTurn.realm + "?";
        }
        else if (types_1.GameState.login === 'sl') {
            message = "Do you want to end the turn of " + types_1.GameState.currentTurn.realm + "?";
        }
        else {
            message = "Do you want to end your turn?";
        }
        if (confirm(message)) {
            types_1.Saving.sendEvents();
        }
    }
    ButtonFunctions.nextTurn = nextTurn;
    // the splitArmy funtion of the split box
    function splitSelectedArmy() {
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        if (types_1.GameState.login === 'sl' || types_1.GameState.login === selectedArmy.owner.tag) {
            try {
                let troopsToSplit = parseInt(types_1.GUI.getSplitInput().value);
                let leadersToSplit = parseInt(types_1.GUI.getSplitLeadersInput().value);
                let mountsToSplit = parseInt(types_1.GUI.getSplitMountsInput().value);
                let lightCatapultsToSplit = parseInt(types_1.GUI.getSplitLkpInput().value);
                let heavyCatapultsToSplit = parseInt(types_1.GUI.getSplitSkpInput().value);
                let newArmyId = -1;
                if (selectedArmy instanceof types_1.FootArmy) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit) || isNaN(mountsToSplit) ||
                        isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))) {
                        newArmyId = types_1.ArmyFunctions.generateArmyId(1, selectedArmy.owner);
                    }
                    else {
                        throw new Error("All values have to be a valid number.");
                    }
                }
                else if (selectedArmy instanceof types_1.RiderArmy) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit))) {
                        lightCatapultsToSplit = 0;
                        heavyCatapultsToSplit = 0;
                        mountsToSplit = 0;
                        newArmyId = types_1.ArmyFunctions.generateArmyId(2, selectedArmy.owner);
                    }
                    else {
                        throw new Error("Troops and leaders have to be a valid number.");
                    }
                }
                else if (selectedArmy instanceof types_1.Fleet) {
                    if (!(isNaN(troopsToSplit) || isNaN(leadersToSplit) ||
                        isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))) {
                        mountsToSplit = 0;
                        newArmyId = types_1.ArmyFunctions.generateArmyId(3, selectedArmy.owner);
                    }
                    else {
                        throw new Error("All values have to be a valid number.");
                    }
                }
                else {
                    throw new Error("Unknown army type.");
                }
                selectedArmy.split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId);
                types_1.GameState.newEvents.push(new types_1.SplitEvent(types_1.GameState.newEvents.length, 0 /* Checked */, selectedArmy.getErkenfaraID(), newArmyId, selectedArmy.owner, troopsToSplit, leadersToSplit, mountsToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, selectedArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
        }
        else {
            window.alert("Man muss eingeloggt sein, um Armeen aufzusplaten.");
        }
        types_1.ArmyFunctions.checkArmiesForLiveliness();
        types_1.BoxVisibility.restoreInfoBox();
        types_1.BoxVisibility.updateInfoBox();
        types_1.Drawing.drawStuff();
    }
    ButtonFunctions.splitSelectedArmy = splitSelectedArmy;
    // the mount function of the mount box
    function mountSelected() {
        if (types_1.GUI.getMountInput().value === "" || types_1.GUI.getMountLeaderInput().value === "" ||
            types_1.GUI.getMountInput().value == undefined || types_1.GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toMount = parseInt(types_1.GUI.getMountInput().value);
        let leadersToMount = parseInt(types_1.GUI.getMountLeaderInput().value);
        if (isNaN(toMount) || isNaN(leadersToMount)) {
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        types_1.GameState.armies[types_1.Controls.selectedArmyIndex].mount(toMount, leadersToMount);
    }
    ButtonFunctions.mountSelected = mountSelected;
    // the unMount function of the unMount box
    function unMountSelected() {
        if (types_1.GUI.getUnMountInput().value === "" || types_1.GUI.getMountLeaderInput().value === "" ||
            types_1.GUI.getUnMountLeaderInput().value == undefined || types_1.GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toUnMount = parseInt(types_1.GUI.getUnMountInput().value);
        let leadersToUnMount = parseInt(types_1.GUI.getUnMountLeaderInput().value);
        if (isNaN(toUnMount) || isNaN(leadersToUnMount)) {
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        types_1.GameState.armies[types_1.Controls.selectedArmyIndex].dismount(toUnMount, leadersToUnMount);
    }
    ButtonFunctions.unMountSelected = unMountSelected;
    function allMountSelected() {
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        selectedArmy.mount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }
    ButtonFunctions.allMountSelected = allMountSelected;
    function allUnMountSelected() {
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        selectedArmy.dismount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }
    ButtonFunctions.allUnMountSelected = allUnMountSelected;
    // move troops or leaders from Controls.selectedArmyIndex to the army at position mergeId in GameState.armies
    function transferTroopsFromSelectedArmy(transferToId) {
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        let armyToTransferTo = types_1.GameState.armies.find(army => army.getErkenfaraID() === transferToId && army.owner === selectedArmy.owner);
        if (armyToTransferTo != undefined) {
            let troopsToTransfer = parseInt(types_1.GUI.getSplitInput().value);
            let leadersToTransfer = parseInt(types_1.GUI.getSplitLeadersInput().value);
            let mountsToTransfer = parseInt(types_1.GUI.getSplitMountsInput().value);
            let lkpToTransfer = parseInt(types_1.GUI.getSplitLkpInput().value);
            let skpToTransfer = parseInt(types_1.GUI.getSplitSkpInput().value);
            if (isNaN(troopsToTransfer) || isNaN(leadersToTransfer)) {
                window.alert("Give a proper number of troops and officers to be transferred.");
                return;
            }
            else {
                if (selectedArmy instanceof types_1.RiderArmy || armyToTransferTo instanceof types_1.RiderArmy) {
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
                        if (selectedArmy instanceof types_1.Fleet || armyToTransferTo instanceof types_1.Fleet) {
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
                types_1.GameState.newEvents.push(new types_1.TransferEvent(types_1.GameState.newEvents.length, 0 /* Checked */, selectedArmy.getErkenfaraID(), armyToTransferTo.getErkenfaraID(), selectedArmy.owner, troopsToTransfer, leadersToTransfer, mountsToTransfer, lkpToTransfer, skpToTransfer, selectedArmy.getPosition()));
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
        let toArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        let fromArmy = types_1.GameState.armies.find(army => army.getErkenfaraID() === fromArmyId && army.owner === toArmy.owner);
        if (fromArmy != undefined) {
            try {
                toArmy.merge(fromArmy);
                types_1.GameState.newEvents.push(new types_1.MergeEvent(types_1.GameState.newEvents.length, 0 /* Checked */, fromArmy.getErkenfaraID(), toArmy.getErkenfaraID(), toArmy.owner, toArmy.getPosition()));
            }
            catch (e) {
                window.alert(e.message);
            }
            types_1.BoxVisibility.updateInfoBox();
            types_1.BoxVisibility.restoreInfoBox();
            types_1.Drawing.drawStuff();
        }
        else {
            window.alert("Army to be merged into selected army doesn't exist.");
        }
    }
    ButtonFunctions.mergeSelectedArmy = mergeSelectedArmy;
    //read the proper inputs, check validity and construct a shoot event
    function shootWithSelectedArmy() {
        let selectedArmy = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
        if (types_1.GameState.login === 'guest') {
            window.alert("Du musst eingeloggt sein um das zu tun.");
            return;
        }
        else if (types_1.GameState.login !== 'sl' && types_1.GameState.login !== selectedArmy.owner.tag) {
            window.alert("Du kannst nur mit deinen eigenen Armeen schießen.");
            return;
        }
        let lkpToShootCount = parseInt(types_1.GUI.getShootingLKPInput().value);
        let skpToShootCount = parseInt(types_1.GUI.getShootingSKPInput().value);
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
        if (types_1.Controls.selectedFields.length < 2) {
            window.alert("Wählen Sie ein Feld auf das Sie schießen wollen.");
            return;
        }
        let shootingTarget = types_1.Controls.shootingTarget;
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
        types_1.GameState.newEvents.push(new types_1.ShootEvent(types_1.GameState.newEvents.length, 0 /* Checked */, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getID(), shootingTarget, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition(), lkpToShootCount, skpToShootCount, target));
        types_1.BoxVisibility.updateInfoBox();
        window.alert("Die Geschosse sind unterwegs. Warte auf die Zugauswertung, um das Ergebnis zu erfahren!");
        types_1.Drawing.drawStuff();
    }
    ButtonFunctions.shootWithSelectedArmy = shootWithSelectedArmy;
    function shootButtonLogic(shootEvent) {
        let shootBox = types_1.GUI.getShootingBigBox();
        let shooter = types_1.GameState.armies.find(army => army.getErkenfaraID() === shootEvent.getShooterId() && army.owner === shootEvent.getRealm());
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
            types_1.ShootingFunctions.inflictRangedDamage(lkpRolls, skpRolls, shooter, shootEvent.getTarget(), shootEvent.getTo(), null);
            shooter.shootAt(shootEvent.getTo(), shootEvent.getTarget(), shootEvent.getLightCatapultCount(), shootEvent.getHeavyCatapultCount());
            // TODO chars
            types_1.BoxVisibility.hide(shootBox.getSelf());
            shootEvent.setStatus(0 /* Checked */);
            types_1.GUI.getBigBox().fillEventList();
            types_1.Drawing.drawStuff();
            return;
        }
    }
    ButtonFunctions.shootButtonLogic = shootButtonLogic;
})(ButtonFunctions = exports.ButtonFunctions || (exports.ButtonFunctions = {}));
//# sourceMappingURL=buttonFunctions.js.map