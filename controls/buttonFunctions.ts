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

export namespace ButtonFunctions{

    export function mainButton() {
        BoxVisibility.toggleVisibility(GUI.getBigBox().getSelf());
    }

    export function nextTurn() {
        let message = "";
        if (GameState.currentTurn.realm == undefined) {
            message = "Do you want to end the pre-turn phase?";
        } else if (GameState.currentTurn.status === 'fi') {
            message = "Do you want to end processing the turn of " + GameState.currentTurn.realm + "?";
        } else if (login === 'sl') {
            message = "Do you want to end the turn of " + GameState.currentTurn.realm + "?";
        } else {
            message = "Do you want to end your turn?";
        }

        if (confirm(message)) {
            Saving.sendEvents();
        }
    }

    // the splitArmy funtion of the split box
    // TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
    export function splitSelectedArmy(): boolean {
        if (login === 'guest') {
            window.alert("Zuschauer haben keine Rechte.");
            return false;
        }
        if (GameState.armies[Controls.selectedArmyIndex].isGuard) {
            window.alert("Garde Armeen können nicht geteilt werden.");
            return false;
        }
        let selectedArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        // depending on army type different fields are needed
        if (selectedArmy instanceof FootArmy) {
            toSplit = parseInt(GUI.getSplitInput().value);
            leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(GUI.getSplitSkpInput().value);
            if (toSplit > (selectedArmy.getTroopCount() - 100)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
                return false;
            }
            if (toSplit < 100) {
                window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.")
                return false;
            }
            if (mountsToSplit > selectedArmy.getMountCount()) {
                window.alert("So viele Reittiere hast du nicht.")
                return false;
            }
            if (lkpToSplit > selectedArmy.getLightCatapultCount()) {
                window.alert("So viele leichte Katapulte hast du nicht.")
                return false;
            }
            if (skpToSplit > selectedArmy.getHeavyCatapultCount()) {
                window.alert("So viele schwere Katapulte hast du nicht.")
                return false;
            }
        }
        else if (selectedArmy instanceof RiderArmy) {
            toSplit = parseInt(GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
            if (toSplit > (selectedArmy.getTroopCount() - 50)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
                return false;
            }
            if (toSplit < 50) {
                window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)")
                return false;
            }
        }
        else if (selectedArmy instanceof Fleet) {
            toSplit = parseInt(GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
            if (toSplit > (selectedArmy.getTroopCount() - 1)) {
                window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
                return false;
            }
            if (toSplit * 100 > (selectedArmy.freeTransportCapacity())) {
                window.alert("Du kannst keine beladenen Schiffe abspalten.")
                return false;
            }
            if (toSplit < 1) {
                window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)")
                return false;
            }
            if (lkpToSplit > selectedArmy.getLightCatapultCount()) {
                window.alert("So viele leichte Kriegsschiffe hast du nicht.")
                return false;
            }
            if (skpToSplit > selectedArmy.getHeavyCatapultCount()) {
                window.alert("So viele schwere Kriegsschiffe hast du nicht.")
                return false;
            }
        }
        if (leadersToSplit > (selectedArmy.getOfficerCount() - 1)) {
            window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
            return false;
        }
        if (leadersToSplit < 1) {
            window.alert("Es muss mindestens 1 Heerführer abgespalten werden.")
            return false;
        }
        if (selectedArmy instanceof FootArmy) {
            let newArmyId = ArmyFunctions.generateArmyId(1, selectedArmy.owner);
            if(newArmyId === -1){
                return false;
            }
            let newArmy = new FootArmy(newArmyId, selectedArmy.owner, toSplit,
                leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, [selectedArmy.getPosition()[0],
                    selectedArmy.getPosition()[1]],
                selectedArmy.getMovePoints(),
                selectedArmy.getHeightPoints(), false,);
            GameState.armies.push(newArmy);
            selectedArmy.setTroopCount(selectedArmy.getTroopCount() - toSplit);
            selectedArmy.setOfficerCount(selectedArmy.getOfficerCount() - leadersToSplit);
            selectedArmy.setLightCatapultCount(selectedArmy.getLightCatapultCount() - lkpToSplit);
            selectedArmy.setHeavyCatapultCount(selectedArmy.getHeavyCatapultCount() - skpToSplit);
            selectedArmy.setMountCount(selectedArmy.getMountCount() - mountsToSplit);
            GameState.armies.push({
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
        if (selectedArmy instanceof RiderArmy) {
            let newArmyId = ArmyFunctions.generateArmyId(2, selectedArmy.owner);
            if(newArmyId === -1){
                return false;
            }
            let newArmy = new RiderArmy(newArmyId, selectedArmy.owner, toSplit, leadersToSplit,
                [selectedArmy.getPosition()[0],
                    selectedArmy.getPosition()[1]],
                selectedArmy.getMovePoints(),
                selectedArmy.getHeightPoints(), false);
            GameState.armies.push(newArmy);
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
        if (selectedArmy instanceof Fleet) {
            let newArmyId = ArmyFunctions.generateArmyId(3, selectedArmy.owner);
            if(newArmyId === -1){
                return false;
            }
            let newArmy = new Fleet(newArmyId, selectedArmy.owner, toSplit, leadersToSplit,
                lkpToSplit, skpToSplit, [selectedArmy.getPosition()[0],
                    selectedArmy.getPosition()[1]],
                selectedArmy.getMovePoints(), false);
            GameState.armies.push(newArmy);
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
        BoxVisibility.restoreInfoBox();
        BoxVisibility.updateInfoBox();
        return true;
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
    export function transferTroopsFromSelectedArmy(mergeId: number): boolean {
        let toSplit = 0;
        let leadersToSplit = 0;
        let mountsToSplit = 0;
        let lkpToSplit = 0;
        let skpToSplit = 0;
        let selectedArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        // depending on army type different fields are needed
        if (selectedArmy instanceof FootArmy) {
            toSplit = parseInt(GUI.getSplitInput().value);
            leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
            mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
            lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
            skpToSplit = parseInt(GUI.getSplitSkpInput().value);
            if (toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
                selectedArmy.setTroopCount(selectedArmy.getTroopCount() - toSplit);
                GameState.armies[mergeId].setTroopCount(GameState.armies[mergeId].getTroopCount() + toSplit);
                selectedArmy.setOfficerCount(selectedArmy.getOfficerCount() - leadersToSplit);
                GameState.armies[mergeId].setOfficerCount(GameState.armies[mergeId].getOfficerCount() + leadersToSplit);
                if(selectedArmy instanceof FootArmy) {
                    (selectedArmy as FootArmy).setMountCount((selectedArmy as FootArmy).getMountCount() - mountsToSplit);
                    (GameState.armies[mergeId] as FootArmy).setMountCount(
                        (GameState.armies[mergeId] as FootArmy).getMountCount() + mountsToSplit);
                }
                selectedArmy.setLightCatapultCount(selectedArmy.getLightCatapultCount() - lkpToSplit);
                GameState.armies[mergeId].getLightCatapultCount() += lkpToSplit;
                selectedArmy.setHeavyCatapultCount(selectedArmy.getHeavyCatapultCount() - skpToSplit);
                GameState.armies[mergeId].getHeavyCatapultCount() += skpToSplit;
                if (leadersToSplit > 0 && selectedArmy.getMovePoints() < selectedArmy.getMaxMovePoints()) {
                    GameState.armies[mergeId].setMovePoints(0);
                } else if (selectedArmy.getMovePoints() < GameState.armies[mergeId].getMovePoints()) {
                    GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
                }
                if (selectedArmy.getHeightPoints() < GameState.armies[mergeId].getHeightPoints()) {
                    GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());

                }
                preparedEvents.push({
                    type: "transfer", content: {
                        fromArmyId: selectedArmy.getErkenfaraID(),
                        toArmyId: GameState.armies[mergeId].getErkenfaraID(),
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
            } else {
                window.alert("Es müssen positive Werte abgespalten werden");
                return false;
            }
        }
        else if (selectedArmy instanceof RiderArmy) {
            toSplit = parseInt(GUI.getSplitMountedInput().value);
            leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
            if (toSplit >= 0 && leadersToSplit >= 0) {
                selectedArmy.getTroopCount() -= toSplit;
                GameState.armies[mergeId].getTroopCount() += toSplit;
                selectedArmy.getOfficerCount() -= leadersToSplit;
                GameState.armies[mergeId].getOfficerCount() += leadersToSplit;
                selectedArmy.getLightCatapultCount() -= lkpToSplit;
                GameState.armies[mergeId].getLightCatapultCount() += lkpToSplit;
                selectedArmy.getHeavyCatapultCount() -= skpToSplit;
                GameState.armies[mergeId].getHeavyCatapultCount() += skpToSplit;

                if (leadersToSplit > 0 && selectedArmy.getMovePoints() < selectedArmy.getMaxMovePoints()) {
                    GameState.armies[mergeId].setMovePoints(0);
                } else if (selectedArmy.getMovePoints() < GameState.armies[mergeId].getMovePoints()) {
                    GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
                }
                if (selectedArmy.getHeightPoints() < GameState.armies[mergeId].getHeightPoints()) {
                    GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
                }
                preparedEvents.push({
                    type: "transfer", content: {
                        fromArmyId: selectedArmy.getErkenfaraID(),
                        toArmyId: GameState.armies[mergeId].getErkenfaraID(),
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
            } else {
                window.alert("Es müssen positive Werte abgespalten werden");
                return false;
            }
        }
        else if (selectedArmy instanceof Fleet) {
            toSplit = parseInt(GUI.getSplitFleetInput().value);
            leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
            lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
            skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
            if (toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
                selectedArmy.getTroopCount() -= toSplit;
                GameState.armies[mergeId].getTroopCount() += toSplit;
                selectedArmy.getOfficerCount() -= leadersToSplit;
                GameState.armies[mergeId].getOfficerCount() += leadersToSplit;
                selectedArmy.getLightCatapultCount() -= lkpToSplit;
                GameState.armies[mergeId].getLightCatapultCount() += lkpToSplit;
                selectedArmy.getHeavyCatapultCount() -= skpToSplit;
                GameState.armies[mergeId].getHeavyCatapultCount() += skpToSplit;
                if (leadersToSplit > 0 && selectedArmy.getMovePoints() < selectedArmy.getMaxMovePoints()) {
                    GameState.armies[mergeId].setMovePoints(0);
                } else if (selectedArmy.getMovePoints() < GameState.armies[mergeId].getMovePoints()) {
                    GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
                }
                if (selectedArmy.getHeightPoints() < GameState.armies[mergeId].getHeightPoints()) {
                    GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
                }
                preparedEvents.push({
                    type: "transfer", content: {
                        fromArmyId: selectedArmy.getErkenfaraID(),
                        toArmyId: GameState.armies[mergeId].getErkenfaraID(),
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
            } else {
                window.alert("Es müssen positive Werte abgespalten werden");
                return false;
            }
        }
        BoxVisibility.updateInfoBox();
        BoxVisibility.restoreInfoBox();
        return true;
    }

    // merges selectedArmy with the army at position mergeId in GameState.armies
    export function mergeSelectedArmy(mergeId: number) {
        let selectedArmy: Army = GameState.armies[Controls.selectedArmyIndex];
        // depending on army type different fields are needed
        if (selectedArmy instanceof FootArmy) {
            GameState.armies[mergeId].getTroopCount() += selectedArmy.getTroopCount();
            GameState.armies[mergeId].getOfficerCount() += selectedArmy.getOfficerCount();
            GameState.armies[mergeId].getMountCount() += selectedArmy.getMountCount();
            GameState.armies[mergeId].getLightCatapultCount() += selectedArmy.getLightCatapultCount();
            GameState.armies[mergeId].getHeavyCatapultCount() += selectedArmy.getHeavyCatapultCount();
            if (selectedArmy.getMovePoints() < GameState.armies[mergeId].getMovePoints()) {
                GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
            }
            if (selectedArmy.getHeightPoints() < GameState.armies[mergeId].getHeightPoints()) {
                GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
            }
            preparedEvents.push({
                type: "merge", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    toArmyId: GameState.armies[mergeId].getErkenfaraID(),
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
            ArmyFunctions.deleteArmy(selectedArmy);
        }
        else if (selectedArmy instanceof RiderArmy) {
            GameState.armies[mergeId].getTroopCount() += selectedArmy.getTroopCount();
            GameState.armies[mergeId].getOfficerCount() += selectedArmy.getOfficerCount();
            if (selectedArmy.getMovePoints() < GameState.armies[mergeId].getMovePoints()) {
                GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
            }
            if (selectedArmy.getHeightPoints() < GameState.armies[mergeId].getHeightPoints()) {
                GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
            }
            preparedEvents.push({
                type: "merge", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    toArmyId: GameState.armies[mergeId].getErkenfaraID(),
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
            ArmyFunctions.deleteArmy(selectedArmy);
        }
        else if (selectedArmy instanceof Fleet) {
            GameState.armies[mergeId].getTroopCount() += selectedArmy.getTroopCount();
            GameState.armies[mergeId].getOfficerCount() += selectedArmy.getOfficerCount();
            GameState.armies[mergeId].getLightCatapultCount() += selectedArmy.getLightCatapultCount();
            GameState.armies[mergeId].getHeavyCatapultCount() += selectedArmy.getHeavyCatapultCount();
            GameState.armies[mergeId].loadedArmies = GameState.armies[mergeId].loadedArmies.concat(selectedArmy.loadedArmies);
            if (selectedArmy.getMovePoints() < GameState.armies[mergeId].getMovePoints()) {
                GameState.armies[mergeId].setMovePoints(selectedArmy.getMovePoints());
            }
            if (selectedArmy.getHeightPoints() < GameState.armies[mergeId].getHeightPoints()) {
                GameState.armies[mergeId].setHeightPoints(selectedArmy.getHeightPoints());
            }
            if (selectedArmy.loadedArmies.length > 0) {
                for (let j = 0; j < selectedArmy.loadedArmies.length; j++) {
                    for (let i = 0; i < GameState.armies.length; i++) {
                        if (selectedArmy.loadedArmies[j] == GameState.armies[i].getErkenfaraID() &&
                            GameState.armies[mergeId].owner === GameState.armies[i].owner) {
                            GameState.armies[i].isLoadedIn = GameState.armies[mergeId].getErkenfaraID();
                        }
                    }
                }
            }
            for (let j = 0; j < GameState.armies[mergeId].loadedArmies.length; j++) {
                for (let i = 0; i < GameState.armies.length; i++) {
                    if (GameState.armies[mergeId].loadedArmies[j] == GameState.armies[i].getErkenfaraID() &&
                        GameState.armies[mergeId].owner === GameState.armies[i].owner) {
                    }
                }
            }
            preparedEvents.push({
                type: "merge", content: {
                    fromArmyId: selectedArmy.getErkenfaraID(),
                    toArmyId: GameState.armies[mergeId].getErkenfaraID(),
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
            ArmyFunctions.deleteArmy(selectedArmy);
        }
        if (mergeId = GameState.armies.length) {
            mergeId -= 1;
        }
        Controls.selectedArmyIndex = mergeId;
        BoxVisibility.updateInfoBox();
        BoxVisibility.restoreInfoBox();
    }
}