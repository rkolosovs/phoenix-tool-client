"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const landArmy_1 = require("./landArmy");
const gameState_1 = require("../gameState");
const fleet_1 = require("./fleet");
const constants_1 = require("../constants");
var FOOTMAN_RP = constants_1.Constants.FOOTMAN_RP;
var LIGHT_CATA_RP = constants_1.Constants.LIGHT_CATA_RP;
var HEAVY_CATA_RP = constants_1.Constants.HEAVY_CATA_RP;
var MOUNT_RP = constants_1.Constants.MOUNT_RP;
var FOOTMAN_BP = constants_1.Constants.FOOTMAN_BP;
var MOUNT_BP = constants_1.Constants.MOUNT_BP;
var LIGHT_CATA_BP = constants_1.Constants.LIGHT_CATA_BP;
var HEAVY_CATA_BP = constants_1.Constants.HEAVY_CATA_BP;
var OFFICER_RP = constants_1.Constants.OFFICER_RP;
const riderArmy_1 = require("./riderArmy");
const controlVariables_1 = require("../controls/controlVariables");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const armyFunctions_1 = require("../libraries/armyFunctions");
const mountEvent_1 = require("../events/mountEvent");
class FootArmy extends landArmy_1.LandArmy {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, mountCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
        }
        this.mountCount = mountCount;
    }
    getErkenfaraID() {
        return 100 + this.id;
    }
    getMaxMovePoints() {
        return FootArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return FootArmy.MAX_HEIGHT_POINTS;
    }
    getMountCount() {
        return this.mountCount;
    }
    setMountCount(value) {
        if (this.canHaveMounts()) {
            this.mountCount = Math.max(0, value);
        }
    }
    computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target) {
        switch (hexFunctions_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */: //watter
                //already embarked
                if (this.transportingFleet != undefined) {
                    throw new Error("You are already embarked on a Fleet.");
                    // there are no viable fleets on destination
                }
                else if (gameState_1.GameState.armies.filter(army => army instanceof fleet_1.Fleet && army.getPosition()[0] === target[0] &&
                    army.getPosition()[1] === target[1] && army.owner === this.owner && army.canLoad(this)).length === 0) {
                    throw new Error("You can't walk on Water.");
                    // at least one fleet on destination
                }
                else {
                    return 0; //embarking doesn't cost move points
                }
            case 2 /* LOWLANDS */:
            case 4 /* HILLS */:
            case 7 /* DESERT */: if (thereIsARiver && !thereIsABridge) { //plains, hills, desert
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //right of passage
                    if (this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 4) { //catapults, street & right of passage
                        return 4;
                    }
                    else if (this.movePoints >= 3) { //no catapults, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.movePoints >= 4) { //street & no right of passage
                    return 4;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else { //no street
                if (rightOfPassage) { //right of passage
                    if (this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 7) { //catapults, no street & right of passage
                        return 7;
                    }
                    else if (this.movePoints >= 4) { //no catapults, no street & right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.movePoints >= 7) { //no street & no right of passage
                    return 7;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            case 5 /* HIGHLANDS */: if (thereIsARiver && !thereIsABridge) { //highlands
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //street & right of passage
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) { //heavy catas, street & right of passage
                        return 7;
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light catas, street & right of passage
                        return 4;
                    }
                    else if (this.lightCatapultCount + this.heavyCatapultCount <= 0 && this.movePoints >= 3) { //no catas, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, street & no right of passage
                        if (this.movePoints >= 7) {
                            return 7;
                        }
                        else {
                            throw new Error("You don't have enough movement Points.");
                        }
                    }
                    else if (this.movePoints >= 4) { //light or no catas, street & no right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else { //no street
                if (rightOfPassage) { //no street & right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & right of passage
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light catas, no street & right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) { //no catas, no street & right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //no street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & no right of passage
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light or no catas, no street & no right of passage
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            case 6 /* MOUNTAINS */: if (thereIsARiver && !thereIsABridge) { //mountains
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //street & right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, street & right of passage
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light catas, street & right of passage
                        return 4;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3) { //no catas, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, street & no right of passage
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light catas, street & no right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) { //no catas, street & no right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else { //no street
                if (this.heavyCatapultCount + this.lightCatapultCount > 0) { //light or heavy catas, no street
                    throw new Error("You need a street to move into the mountains with catapults.");
                }
                else { //no catas, no street
                    if (rightOfPassage && this.movePoints >= 4) { //no catas, no street & right of passage
                        return 4;
                    }
                    else if (this.movePoints >= 7) { //no catas, no street & no right of passage
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            case 3 /* WOODS */:
            case 8 /* SWAMP */: if (thereIsARiver && !thereIsABridge) { //forest, swamp
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) { //street
                if (rightOfPassage) { //street & right of passage
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) { //heavy catas, street & right of passage
                        return 7;
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light catas, street & right of passage
                        return 4;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3) { //no catas, street & right of passage
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //street & no right of passage
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) { //heavy catas, street & no right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 4) { //light or no catas, street & no right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else { //no street
                if (rightOfPassage) { //no street & right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & right of passage
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light catas, no street & right of passage
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) { //no catas, no street & right of passage
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else { //no street & no right of passage
                    if (this.heavyCatapultCount > 0) { //heavy catas, no street & no right of passage
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7) { //light or no catas, no street & no right of passage
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
        }
    }
    takeRPDamage(rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (FOOTMAN_RP +
            OFFICER_RP * (this.officerCount / this.troopCount) +
            this.mountCount / this.troopCount +
            LIGHT_CATA_RP * (this.lightCatapultCount / this.troopCount) +
            HEAVY_CATA_RP * (this.heavyCatapultCount / this.troopCount))));
    }
    canHaveCatapults() {
        return !this.isGuard;
    }
    canHaveMounts() {
        return !this.isGuard;
    }
    getRoomPointsSansOfficers() {
        return this.troopCount * FOOTMAN_RP +
            this.lightCatapultCount * LIGHT_CATA_RP +
            this.heavyCatapultCount * HEAVY_CATA_RP +
            this.mountCount * MOUNT_RP;
    }
    totalBP() {
        return this.troopCount * FOOTMAN_BP + this.mountCount * MOUNT_BP +
            this.lightCatapultCount * LIGHT_CATA_BP + this.heavyCatapultCount * HEAVY_CATA_BP;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * FOOTMAN_BP / totalBP) / FOOTMAN_BP);
        this.setMountCount(this.mountCount - bpDamage * (this.mountCount * MOUNT_BP / totalBP) / MOUNT_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_CATA_BP /
            totalBP) / LIGHT_CATA_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_CATA_BP /
            totalBP) / HEAVY_CATA_BP);
        this.wasShotAt = true;
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
        if (this.mountCount < mountsToTransfer) {
            throw new Error("Not enough mounts to transfer");
        }
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        this.lightCatapultCount -= lkpToTransfer;
        this.heavyCatapultCount -= skpToTransfer;
        this.mountCount -= mountsToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToTransfer);
        armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToTransfer);
        armyToTransferTo.setMountCount(armyToTransferTo.getMountCount() + mountsToTransfer);
        if (troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer > 0) {
            armyToTransferTo.setMovePoints(Math.min(this.movePoints, armyToTransferTo.getMovePoints()));
        }
    }
    split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId) {
        if (this.isGuard) {
            throw new Error("Guard can't be split.");
        }
        if (troopsToSplit > this.troopCount) {
            throw new Error("Not enough troops.");
        }
        if (leadersToSplit > this.officerCount) {
            throw new Error("Not enough officers (at least 1 officer must stay with the old army).");
        }
        if (troopsToSplit + 100 > this.troopCount || leadersToSplit + 1 > this.officerCount) {
            if (!confirm("The remaining army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (troopsToSplit < 100 || leadersToSplit < 1) {
            if (!confirm("The new army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (mountsToSplit > this.mountCount) {
            throw new Error("Not enough mounts.");
        }
        if (lightCatapultsToSplit > this.lightCatapultCount) {
            throw new Error("Not enough light catapults.");
        }
        if (heavyCatapultsToSplit > this.heavyCatapultCount) {
            throw new Error("Not enough heavy catapults.");
        }
        gameState_1.GameState.armies.push(new FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
        this.mountCount -= mountsToSplit;
        this.lightCatapultCount -= lightCatapultsToSplit;
        this.heavyCatapultCount -= heavyCatapultsToSplit;
    }
    merge(fromArmy) {
        if (!(fromArmy instanceof FootArmy)) {
            throw new Error("Can't merge armies other than foot armies with a foot army.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        this.mountCount += fromArmy.getMountCount();
        this.lightCatapultCount += fromArmy.getLightCatapultCount();
        this.heavyCatapultCount += fromArmy.getHeavyCatapultCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        armyFunctions_1.ArmyFunctions.deleteArmy(fromArmy);
    }
    getLightCatapultDamage(diceRolls, conditions) {
        if (conditions === 6 /* LightCatapults */) {
            return diceRolls.map(roll => constants_1.Constants.LIGHT_CATA_DAMAGE[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    getHeavyCatapultDamage(diceRolls, conditions) {
        if (conditions === 1 /* Near */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_NEAR[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 3 /* High */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_HIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 2 /* FarAndHigh */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_FARANDHIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 0 /* Far */) {
            return diceRolls.map(roll => constants_1.Constants.HEAVY_CATA_DAMAGE_FAR[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    // mounting with parameters
    mount(toMount, leadersToMount, newArmyId) {
        // generiere armyId falls keine vorhanden
        if (newArmyId == undefined) {
            newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(2, this.owner);
        }
        // sitzen genug Truppen auf?
        if (toMount < 50) {
            window.alert("Es müssen mindestens 50 Reiter in einem Reiterheer sein.");
            return false;
        }
        // sitzen genug Heerführer auf?
        if (leadersToMount < 1) {
            window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
            return false;
        }
        // bleibt ein Hf bei der armee zurück?
        if (toMount != this.troopCount && leadersToMount === this.officerCount) {
            window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
            return false;
        }
        // genug Truppen vorhanden?
        if (toMount != this.troopCount && (toMount * 2 > this.getRoomPointsSansOfficers() - 100)) {
            window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
            return false;
            // genug Reittiere vorhanden?
        }
        // genug Truppen vorhanden?
        if (toMount > this.troopCount) {
            window.alert("Du hast zu wenige Truppen zum aufsitzen");
            return false;
            // genug Reittiere vorhanden?
        }
        else if (toMount > this.mountCount) {
            window.alert("Du hast zu wenige Reittiere zum aufsitzen");
            return false;
            // Sitzen alle auf?
        }
        else if (toMount === this.troopCount) {
            // neues Reiterheer mit generierter Id an selben Koordinaten
            let newArmy = new riderArmy_1.RiderArmy(newArmyId, this.owner, toMount, this.officerCount, this.getPosition(), 0, this.heightPoints, this.isGuard);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else {
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            }
            // Nachricht, falls Katapulte vorhanden waren.
            if (this.heavyCatapultCount > 0 || this.lightCatapultCount > 0) {
                window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.");
            }
            // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
            gameState_1.GameState.armies.push(newArmy);
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toMount, leadersToMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            armyFunctions_1.ArmyFunctions.deleteArmy(this);
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
        }
        else if (leadersToMount >= this.officerCount) {
            window.alert("Du hast zu wenige Heerführer zum aufsitzen");
            return false;
        }
        else if (this.isGuard) {
            window.alert("Die Garde muss zusammen bleiben");
            return false;
        }
        else {
            // neues Reiterheer mit generierter Id an selben Koordinaten
            let newArmy = new riderArmy_1.RiderArmy(newArmyId, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, toMount, leadersToMount, this.getPosition(), 0, this.heightPoints, false);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else {
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            }
            // zahlen im alten Heer anpassen
            this.setTroopCount(this.troopCount - toMount);
            this.setOfficerCount(this.officerCount - leadersToMount);
            this.setMountCount(this.mountCount - toMount);
            // in GameState.armies einfügen
            gameState_1.GameState.armies.push(newArmy);
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 0 /* Checked */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toMount, leadersToMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            // Controls.selectedArmyIndex zeigt auf neues Heer
            controlVariables_1.Controls.selectedArmyIndex = gameState_1.GameState.armies.length - 1;
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
        }
    }
}
FootArmy.MAX_MOVE_POINTS = 9;
exports.FootArmy = FootArmy;
