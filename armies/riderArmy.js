"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexFunctions_1 = require("../libraries/hexFunctions");
const landArmy_1 = require("./landArmy");
const gameState_1 = require("../gameState");
const fleet_1 = require("./fleet");
const constants_1 = require("../constants");
var RIDER_RP = constants_1.Constants.RIDER_RP;
var OFFICER_RP = constants_1.Constants.OFFICER_RP;
var RIDER_BP = constants_1.Constants.RIDER_BP;
const controlVariables_1 = require("../controls/controlVariables");
const multifieldFunctions_1 = require("../gui/multifieldFunctions");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const footArmy_1 = require("./footArmy");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const armyFunctions_1 = require("../libraries/armyFunctions");
const mountEvent_1 = require("../events/mountEvent");
class RiderArmy extends landArmy_1.LandArmy {
    constructor(id, owner, troopCount, officerCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints);
        }
    }
    getErkenfaraID() {
        return 200 + this.id;
    }
    getMaxMovePoints() {
        return RiderArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return RiderArmy.MAX_HEIGHT_POINTS;
    }
    computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target) {
        switch (hexFunctions_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */://watter
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
            case 7 /* DESERT */: if (thereIsARiver && !thereIsABridge) {
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && this.movePoints >= 3) {
                    return 3;
                }
                else if (this.movePoints >= 4) {
                    return 4;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && this.movePoints >= 4) {
                return 4;
            }
            else if (this.movePoints >= 7) {
                return 7;
            }
            else {
                throw new Error("You don't have enough movement Points.");
            }
            case 5 /* HIGHLANDS */: if (thereIsARiver && !thereIsABridge) {
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && this.movePoints >= 4) {
                    return 4;
                }
                else if (this.movePoints >= 7) {
                    return 7;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && this.movePoints >= 7) {
                return 7;
            }
            else if (this.movePoints >= 21) {
                return 21;
            }
            else {
                throw new Error("You don't have enough movement Points.");
            }
            case 6 /* MOUNTAINS */: throw new Error("Cavalry can not move through the mountains."); //mountains
            case 3 /* WOODS */:
            case 8 /* SWAMP */: if (thereIsARiver && !thereIsABridge) {
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return this.getMaxMovePoints();
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && this.getMovePoints() >= 3) {
                    return 3;
                }
                else if (this.getMovePoints() >= 5) {
                    return 5;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && this.getMovePoints() >= 5) {
                return 5;
            }
            else if (this.getMovePoints() >= 10) {
                return 10;
            }
            else {
                throw new Error("You don't have enough movement Points.");
            }
            default: throw new Error("Unknown terrain type.");
        }
    }
    takeRPDamage(rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (RIDER_RP + OFFICER_RP * (this.officerCount / this.troopCount))));
    }
    canHaveCatapults() {
        return false;
    }
    canHaveMounts() {
        return false;
    }
    getRoomPointsSansOfficers() {
        return this.troopCount * RIDER_RP;
    }
    totalBP() {
        return this.troopCount * RIDER_BP;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage / RIDER_BP);
        this.wasShotAt = true;
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        if (troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer > 0) {
            this.movePoints = Math.min(this.movePoints, armyToTransferTo.getMovePoints());
            armyToTransferTo.setMovePoints(Math.min(this.movePoints, armyToTransferTo.getMovePoints()));
        }
    }
    split(troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, mountsToSplit, newArmyId) {
        if (this.isGuard) {
            throw new Error("Guard can't be split.");
        }
        if (troopsToSplit + 50 > this.troopCount) {
            throw new Error("Not enough troops (at least 50 riders must stay with the old army).");
        }
        if (troopsToSplit < 50) {
            throw new Error("New army must have at least 50 soldiers.");
        }
        if (leadersToSplit + 1 > this.officerCount) {
            throw new Error("Not enough officers (at least 1 officer must stay with the old army).");
        }
        if (leadersToSplit < 1) {
            throw new Error("New army must have at least 1 officer.");
        }
        gameState_1.GameState.armies.push(new footArmy_1.FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, 0, 0, 0, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
    }
    merge(fromArmy) {
        if (!(fromArmy instanceof RiderArmy)) {
            throw new Error("Can't merge armies other than rider armies with a rider army.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        armyFunctions_1.ArmyFunctions.deleteArmy(fromArmy);
    }
    fireLightCatapults(dicerolls, badConditions) {
        return 0;
    }
    fireHeavyCatapults(dicerolls, badConditions) {
        return 0;
    }
    // the unMount function of the unMount box
    //TODO: If the mounted army has moved, set the new foot army's move points to the apropriate, non-max value.
    dismount(toUnMount, leadersToUnMount, newArmyId) {
        // generiere armyId falls keine vorhanden
        if (newArmyId == undefined) {
            newArmyId = armyFunctions_1.ArmyFunctions.generateArmyId(1, this.owner);
        }
        // sitzen genug Truppen ab?
        if (toUnMount < 100) {
            window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
            return false;
        }
        // bleibt ein hf be der Armee?
        if (toUnMount != this.troopCount && leadersToUnMount === this.officerCount) {
            window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
            return false;
        }
        // genug Truppen vorhanden?
        if (toUnMount != this.troopCount && (toUnMount * 2 > this.getRoomPointsSansOfficers() - 100)) {
            window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
            return false;
            // genug Reittiere vorhanden?
        }
        // sitzen genug Heerführer ab?
        if (leadersToUnMount < 1) {
            window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
            return false;
        }
        console.log(toUnMount);
        if (toUnMount > this.troopCount) {
            window.alert("So viele Truppen hast du nicht zum absitzen");
            return false;
            // genug Truppen vorhanden?
        }
        else if ((toUnMount == this.troopCount)) {
            // neues Heer mit generierter Id an selben Koordinaten
            let newArmy = new footArmy_1.FootArmy(newArmyId, this.owner, toUnMount, this.officerCount, 0, 0, toUnMount, this.position, 0, this.heightPoints, this.isGuard);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
            gameState_1.GameState.armies.push(newArmy);
            if (this.multiArmyField === true) {
                multifieldFunctions_1.MultiFieldFunctions.addToMultifield(this, newArmy);
                // deleteFromMultifield(this);
            }
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 5 /* Undetermined */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toUnMount, leadersToUnMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            armyFunctions_1.ArmyFunctions.deleteArmy(this);
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
            // genug Heerführer?
        }
        else if (leadersToUnMount >= this.officerCount) {
            window.alert("Du hast zu wenige Heerführer zum absitzen");
            return false;
        }
        else if (this.isGuard) {
            window.alert("Die Garde muss zusammen bleiben");
            return false;
        }
        else {
            // neues Heer mit generierter Id an selben Koordinaten
            let newArmy = new footArmy_1.FootArmy(newArmyId, this.owner, toUnMount, leadersToUnMount, 0, 0, toUnMount, this.position, 0, this.heightPoints, false);
            if (this.getMovePoints() !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            }
            else
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            // zahlen im alten Reiterheer anpassen
            this.setTroopCount(this.troopCount - toUnMount);
            this.setOfficerCount(this.officerCount - leadersToUnMount);
            // in GameState.armies einfügen
            gameState_1.GameState.armies.push(newArmy);
            if (this.multiArmyField === true) {
                multifieldFunctions_1.MultiFieldFunctions.addToMultifield(this, newArmy);
                // deleteFromMultifield(this);
            }
            //in GameState.events pushen
            let eventToPush = new mountEvent_1.MountEvent(gameState_1.GameState.newEvents.length, 5 /* Undetermined */, this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toUnMount, leadersToUnMount, [this.position[0], this.position[1]]);
            gameState_1.GameState.newEvents.push(eventToPush);
            // armyIndex zeigt auf neues Heer
            controlVariables_1.Controls.selectedArmyIndex = gameState_1.GameState.armies.length - 1;
            drawingFunctions_1.Drawing.drawStuff();
            boxVisibilty_1.BoxVisibility.restoreInfoBox();
            boxVisibilty_1.BoxVisibility.updateInfoBox();
            return true;
        }
    }
}
RiderArmy.MAX_MOVE_POINTS = 21;
exports.RiderArmy = RiderArmy;
