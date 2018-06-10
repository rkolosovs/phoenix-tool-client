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

import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Saving} from "../serverInteraction/savingFunctions";
import {GameState} from "../gameState";
import {Controls} from "./controlVariables";
import {RiderArmy} from "../armies/riderArmy";
import {FootArmy} from "../armies/footArmy";
import {Army} from "../armies/army";
import {ArmyFunctions} from "../libraries/armyFunctions";
import {Fleet} from "../armies/fleet";
import {EventStatus} from "../events/eventStatus";
import {Drawing} from "../gui/drawingFunctions";
import {ShootingFunctions, ShootingTarget} from "../armies/shootingFunctions";
import {ShootingBigBox} from "../gui/shootingBigBox";
import {ShootEvent} from "../events/shootEvent";
import {MergeEvent} from "../events/mergeEvent";
import {SplitEvent} from "../events/splitEvent";
import {TransferEvent} from "../events/transferEvent";

export namespace ButtonFunctions{

    import show = BoxVisibility.show;
    import hide = BoxVisibility.hide;

    export function mainButton() {
        BoxVisibility.toggleVisibility(GUI.getBigBox().getSelf());
    }

    export function toggleShootingMode(): void {
        if (BoxVisibility.shootingModeOn) {
            BoxVisibility.closeShootBox();
        } else if (!BoxVisibility.shootingModeOn) {
            BoxVisibility.switchModeTo("shootingModeOn");
            show(GUI.getShootBox());
            GameState.armies[Controls.selectedArmyIndex].findShootingTargets();
            Drawing.drawStuff();
        }
    }

    export function activateSplitbox(): void {
        if (GameState.armies[Controls.selectedArmyIndex] instanceof FootArmy) {
            show(GUI.getSplitBox());
        }
        else if (GameState.armies[Controls.selectedArmyIndex] instanceof RiderArmy) {
            show(GUI.getSplitMountedBox());
        }
        else if (GameState.armies[Controls.selectedArmyIndex] instanceof Fleet) {
            show(GUI.getSplitFleetBox());
        }
        hide(GUI.getInfoBox().getSelf());
    }

    export function nextTurn() {
        let message = "";
        if (GameState.currentTurn.realm == undefined) {
            message = "Do you want to end the pre-turn phase?";
        } else if (GameState.currentTurn.status === 'fi') {
            message = "Do you want to end processing the turn of " + GameState.currentTurn.realm + "?";
        } else if (GameState.login === 'sl') {
            message = "Do you want to end the turn of " + GameState.currentTurn.realm + "?";
        } else {
            message = "Do you want to end your turn?";
        }

        if (confirm(message)) {
            Saving.sendEvents();
        }
    }

    // the splitArmy funtion of the split box
    export function splitSelectedArmy(): void {
        let selectedArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        if (GameState.login === 'sl' || GameState.login === selectedArmy.owner.tag) {
            try {
                let troopsToSplit: number = parseInt(GUI.getSplitInput().value);
                let leadersToSplit: number = parseInt(GUI.getSplitLeadersInput().value);
                let mountsToSplit: number = parseInt(GUI.getSplitMountsInput().value);
                let lightCatapultsToSplit: number = parseInt(GUI.getSplitLkpInput().value);
                let heavyCatapultsToSplit: number = parseInt(GUI.getSplitSkpInput().value);
                let newArmyId: number = -1;
                if (selectedArmy instanceof FootArmy){
                    if(!(isNaN(troopsToSplit) || isNaN(leadersToSplit) || isNaN(mountsToSplit) ||
                            isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))){
                        newArmyId = ArmyFunctions.generateArmyId(1, selectedArmy.owner);
                    } else{
                        throw new Error("All values have to be a valid number.");
                    }
                } else if (selectedArmy instanceof RiderArmy){
                    if(!(isNaN(troopsToSplit) || isNaN(leadersToSplit))){
                        lightCatapultsToSplit = 0;
                        heavyCatapultsToSplit  = 0;
                        mountsToSplit = 0;
                        newArmyId = ArmyFunctions.generateArmyId(2, selectedArmy.owner);
                    } else{
                        throw new Error("Troops and leaders have to be a valid number.");
                    }
                } else if (selectedArmy instanceof Fleet){
                    if(!(isNaN(troopsToSplit) || isNaN(leadersToSplit) ||
                            isNaN(lightCatapultsToSplit) || isNaN(heavyCatapultsToSplit))){
                        mountsToSplit = 0;
                        newArmyId = ArmyFunctions.generateArmyId(3, selectedArmy.owner);
                    } else{
                        throw new Error("All values have to be a valid number.");
                    }
                } else{
                    throw new Error("Unknown army type.");
                }
                selectedArmy.split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit,
                    mountsToSplit, newArmyId);
                GameState.newEvents.push(new SplitEvent(GameState.newEvents.length, EventStatus.Checked,
                    selectedArmy.getErkenfaraID(), newArmyId, selectedArmy.owner, troopsToSplit, leadersToSplit,
                    mountsToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, selectedArmy.getPosition()));
            } catch(e){
                window.alert((e as Error).message);
            }
        } else{
            window.alert("Man muss eingeloggt sein, um Armeen aufzusplaten.");
        }
        ArmyFunctions.checkArmiesForLiveliness();
        BoxVisibility.restoreInfoBox();
        BoxVisibility.updateInfoBox();
        Drawing.drawStuff();
    }

    // the mount function of the mount box
    export function mountSelected() {
        if (GUI.getMountInput().value === "" || GUI.getMountLeaderInput().value === "" ||
            GUI.getMountInput().value == undefined || GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toMount: number = parseInt(GUI.getMountInput().value);
        let leadersToMount: number = parseInt(GUI.getMountLeaderInput().value);
        if(isNaN(toMount) || isNaN(leadersToMount)){
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        (GameState.armies[Controls.selectedArmyIndex] as FootArmy).mount(toMount, leadersToMount);
    }

    // the unMount function of the unMount box
    export function unMountSelected() {
        if (GUI.getUnMountInput().value === "" || GUI.getMountLeaderInput().value === "" ||
            GUI.getUnMountLeaderInput().value == undefined || GUI.getMountLeaderInput().value == undefined) {
            throw new Error("Alle felder müssen ausgefüllt sein");
        }
        let toUnMount: number = parseInt(GUI.getUnMountInput().value);
        let leadersToUnMount: number = parseInt(GUI.getUnMountLeaderInput().value);
        if(isNaN(toUnMount) || isNaN(leadersToUnMount)){
            throw new Error("Tragen sie Zahlen für Truppen und Heerführer ein.");
        }
        (GameState.armies[Controls.selectedArmyIndex] as RiderArmy).dismount(toUnMount, leadersToUnMount);
    }

    export function allMountSelected() {
        let selectedArmy: FootArmy = (GameState.armies[Controls.selectedArmyIndex] as FootArmy);
        selectedArmy.mount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }

    export function allUnMountSelected() {
        let selectedArmy: RiderArmy = (GameState.armies[Controls.selectedArmyIndex] as RiderArmy);
        selectedArmy.dismount(selectedArmy.getTroopCount(), selectedArmy.getOfficerCount());
    }

    // move troops or leaders from Controls.selectedArmyIndex to the army at position mergeId in GameState.armies
    export function transferTroopsFromSelectedArmy(transferToId: number): void {
        let selectedArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        let armyToTransferTo: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === transferToId && army.owner === selectedArmy.owner);
        if(armyToTransferTo != undefined){
            let troopsToTransfer: number = parseInt(GUI.getSplitInput().value);
            let leadersToTransfer: number = parseInt(GUI.getSplitLeadersInput().value);
            let mountsToTransfer: number = parseInt(GUI.getSplitMountsInput().value);
            let lkpToTransfer: number = parseInt(GUI.getSplitLkpInput().value);
            let skpToTransfer: number = parseInt(GUI.getSplitSkpInput().value);
            if (isNaN(troopsToTransfer) || isNaN(leadersToTransfer)) {
                window.alert("Give a proper number of troops and officers to be transferred.");
                return;
            } else{
                if(selectedArmy instanceof RiderArmy || armyToTransferTo instanceof RiderArmy){
                    mountsToTransfer = 0;
                    lkpToTransfer = 0;
                    skpToTransfer = 0;
                } else{
                    if (isNaN(lkpToTransfer) || isNaN(skpToTransfer)) {
                        window.alert("Give a proper number of catapults to be transferred.");
                        return;
                    } else{
                        if (selectedArmy instanceof Fleet || armyToTransferTo instanceof Fleet){
                            mountsToTransfer = 0;
                        } else if (isNaN(mountsToTransfer)){
                            window.alert("Give a proper number of mounts to be transferred.");
                            return;
                        }
                    }
                }
            }
            //All relevant input values are valid. Executing the actual transfer now.
            try{
                selectedArmy.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer,
                    skpToTransfer, mountsToTransfer);
                GameState.newEvents.push(new TransferEvent(GameState.newEvents.length, EventStatus.Checked,
                    selectedArmy.getErkenfaraID(), armyToTransferTo.getErkenfaraID(), selectedArmy.owner,
                    troopsToTransfer, leadersToTransfer, mountsToTransfer, lkpToTransfer, skpToTransfer,
                    selectedArmy.getPosition()));
            } catch(e){
                window.alert((e as Error).message);
            }
        } else{
            window.alert("Die Zielarmee existiert nicht.");
        }
    }

    // merges selectedArmy with the army at position mergeId in GameState.armies
    export function mergeSelectedArmy(fromArmyId: number): void {
        let toArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        let fromArmy: Army|undefined = GameState.armies.find(army =>
            army.getErkenfaraID() === fromArmyId && army.owner === toArmy.owner);
        if(fromArmy != undefined){
            try {
                toArmy.merge(fromArmy);
                GameState.newEvents.push(new MergeEvent(GameState.newEvents.length, EventStatus.Checked,
                    fromArmy.getErkenfaraID(), toArmy.getErkenfaraID(), toArmy.owner, toArmy.getPosition()));
            } catch(e){
                window.alert((e as Error).message);
            }
            BoxVisibility.updateInfoBox();
            BoxVisibility.restoreInfoBox();
            Drawing.drawStuff();
        } else {
            window.alert("Army to be merged into selected army doesn't exist.");
        }
    }

    //read the proper inputs, check validity and construct a shoot event
    export function shootWithSelectedArmy(): void {
        let selectedArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        if (GameState.login === 'guest') {
            window.alert("Du musst eingeloggt sein um das zu tun.");
            return;
        } else if(GameState.login !== 'sl' && GameState.login !== selectedArmy.owner.tag){
            window.alert("Du kannst nur mit deinen eigenen Armeen schießen.");
            return;
        }

        let lkpToShootCount = parseInt(GUI.getShootingLKPInput().value);
        let skpToShootCount = parseInt(GUI.getShootingSKPInput().value);

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
        if (Controls.selectedFields.length < 2) {
            window.alert("Wählen Sie ein Feld auf das Sie schießen wollen.");
            return;
        }
        let shootingTarget: [number, number] = Controls.shootingTarget as [number, number];
        if (selectedArmy.targetList.length < 1) {
            window.alert("No available targets.");
            return;
        } else if (!selectedArmy.targetList.some(field => field[0] ===
                    shootingTarget[0] && field[1] === shootingTarget[1])) {
            window.alert("Ungültiges Ziel.");
            return;
        }
        //TODO: Shoot at things other than the field (mainly the wall).
        let target: ShootingTarget = ShootingTarget.OnField;

        try {
            selectedArmy.shootAt(shootingTarget, target, lkpToShootCount, skpToShootCount);
        } catch(e){
            window.alert((e as Error).message);
        }

        GameState.newEvents.push(new ShootEvent(GameState.newEvents.length, EventStatus.Checked,
            GameState.armies[Controls.selectedArmyIndex].owner, GameState.armies[Controls.selectedArmyIndex].getID(),
            shootingTarget, GameState.armies[Controls.selectedArmyIndex].getPosition(),
            lkpToShootCount, skpToShootCount, target));

        BoxVisibility.updateInfoBox();
        window.alert("Die Geschosse sind unterwegs. Warte auf die Zugauswertung, um das Ergebnis zu erfahren!");
        Drawing.drawStuff();
    }

    export function shootButtonLogic(shootEvent: ShootEvent): void{
        let shootBox: ShootingBigBox = GUI.getShootingBigBox();
        let shooter: Army|undefined = GameState.armies.find(
            army => army.getErkenfaraID() === shootEvent.getShooterId() && army.owner === shootEvent.getRealm());
        let lkpRolls = [];
        let skpRolls = [];
        for(let i = 0; i < 10; i++){//creating the dice roll array
            let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
            let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
            if(!isNaN(currentRollLKP) && currentRollLKP !== 0){
                for(let j = 0; j < currentRollLKP; j++){
                    lkpRolls.push(i);
                }
            }
            if(!isNaN(currentRollSKP) && currentRollSKP !== 0){
                for(let j = 0; j < currentRollSKP; j++){
                    skpRolls.push(i);
                }
            }
        }
        //TODO check target field

        if(lkpRolls.length < shootEvent.getLightCatapultCount()){
            window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen.");
            return;
        } else if(skpRolls.length < shootEvent.getHeavyCatapultCount()){
            window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen.");
            return;
        } else if(lkpRolls.length > shootEvent.getLightCatapultCount()){
            window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen.");
            return;
        } else if(skpRolls.length > shootEvent.getHeavyCatapultCount()){
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen.");
            return;
        } else if(shooter == undefined){
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return;
        } else{
            ShootingFunctions.inflictRangedDamage(lkpRolls, skpRolls, shooter, shootEvent.getTarget(),
                shootEvent.getTo(), null);
            shooter.shootAt(shootEvent.getTo(), shootEvent.getTarget(), shootEvent.getLightCatapultCount(),
                shootEvent.getHeavyCatapultCount());
            // TODO chars
            BoxVisibility.hide(shootBox.getSelf());
            shootEvent.setStatus(EventStatus.Checked);
            GUI.getBigBox().fillEventList();
            Drawing.drawStuff();
            return;
        }
    }
}