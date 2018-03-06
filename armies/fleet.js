"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const army_1 = require("./army");
const constants_1 = require("../constants");
var SHIP_RP = constants_1.Constants.SHIP_RP;
var GUARD_RP_MULT = constants_1.Constants.GUARD_RP_MULT;
var LIGHT_WS_RP = constants_1.Constants.LIGHT_WS_RP;
var HEAVY_WS_RP = constants_1.Constants.HEAVY_WS_RP;
const hexFunctions_1 = require("../libraries/hexFunctions");
const move_1 = require("./move");
var SHIP_BP = constants_1.Constants.SHIP_BP;
var HEAVY_WS_BP = constants_1.Constants.HEAVY_WS_BP;
var LIGHT_WS_BP = constants_1.Constants.LIGHT_WS_BP;
var SHIP_TRANSPORT_CAPACITY = constants_1.Constants.SHIP_TRANSPORT_CAPACITY;
const gameState_1 = require("../gameState");
const armyFunctions_1 = require("../libraries/armyFunctions");
const footArmy_1 = require("./footArmy");
class Fleet extends army_1.Army {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, 0, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, 0);
        }
        this.transportedArmies = [];
    }
    getErkenfaraID() {
        return 300 + this.id;
    }
    canHaveCatapults() {
        return !this.isGuard;
    }
    canHaveMounts() {
        return false;
    }
    getMaxMovePoints() {
        return Fleet.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return Fleet.MAX_HEIGHT_POINTS;
    }
    getRoomPointsSansOfficers() {
        if (this.isGuard) {
            return this.troopCount * SHIP_RP * GUARD_RP_MULT +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
        else {
            return this.troopCount * SHIP_RP +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
    }
    move(direction) {
        let move = this.possibleMoves.find(possMove => possMove.direction === direction);
        if (move != undefined) {
            this.oldPosition[0] = this.position[0];
            this.oldPosition[1] = this.position[1];
            this.position[0] = move.destination[0];
            this.position[1] = move.destination[1];
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.transportedArmies.forEach(transportedArmy => transportedArmy.changePosition(move.destination));
        }
        // TODO: Throw errors. Compute new possible moves.
        // //to see and return the error why you cant move
        // clickedMoves(army);
        // return moveToList(army, direction);
    }
    checkForPossibleMove(direction) {
        let neighborCoords = hexFunctions_1.HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let neighborsOfNeighbors = hexFunctions_1.HexFunction.neighbors(target).
            map((neighbor) => hexFunctions_1.HexFunction.neighbors(neighbor)).
            reduce((total, current) => (total.concat(current)), []);
        // TODO: Effects of diplomacy go here.
        let coastalSailing = this.owner.territory.some(field => neighborsOfNeighbors.some(neighbor => field.coordinates[0] === neighbor[0] &&
            field.coordinates[1] === neighbor[1]));
        switch (hexFunctions_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */://shallow sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) {
                    if (coastalSailing && this.movePoints >= 5) {
                        return new move_1.Move(5, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 7) {
                        return new move_1.Move(7, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 7) {
                        return new move_1.Move(7, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 10) {
                        return new move_1.Move(10, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 6) {
                        return new move_1.Move(6, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 8) {
                        return new move_1.Move(8, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case 1 /* DEEPSEA */://deep sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) {
                    if (coastalSailing && this.movePoints >= 8) {
                        return new move_1.Move(8, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 12) {
                        return new move_1.Move(12, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 14) {
                        return new move_1.Move(14, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 21) {
                        return new move_1.Move(21, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 14) {
                        return new move_1.Move(14, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 21) {
                        return new move_1.Move(21, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case 2 /* LOWLANDS */:
            case 3 /* WOODS */:
            case 4 /* HILLS */:
            case 5 /* HIGHLANDS */:
            case 6 /* MOUNTAINS */:
            case 7 /* DESERT */:
            case 8 /* SWAMP */: throw new Error("You can't drive your ships up land.");
            default: throw new Error("Unknown terrain type.");
        }
    }
    canConquer() {
        return false;
    }
    totalBP() {
        return this.troopCount * SHIP_BP + this.lightCatapultCount * LIGHT_WS_BP +
            this.heavyCatapultCount * HEAVY_WS_BP;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * SHIP_BP / totalBP) / SHIP_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_WS_BP /
            totalBP) / LIGHT_WS_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_WS_BP /
            totalBP) / HEAVY_WS_BP);
        this.killTransportedTroops();
        this.wasShotAt = true;
    }
    transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer) {
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer, mountsToTransfer);
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        this.lightCatapultCount -= lkpToTransfer;
        this.heavyCatapultCount -= skpToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToTransfer);
        armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToTransfer);
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
            throw new Error("Not enough officers.");
        }
        if (troopsToSplit * constants_1.Constants.SHIP_TRANSPORT_CAPACITY > this.freeTransportCapacity()) {
            throw new Error("Du kannst keine beladenen Schiffe abspalten.");
        }
        if (lightCatapultsToSplit > this.lightCatapultCount) {
            throw new Error("Not enough light catapults.");
        }
        if (heavyCatapultsToSplit > this.heavyCatapultCount) {
            throw new Error("Not enough heavy catapults.");
        }
        if (troopsToSplit + 1 > this.troopCount || leadersToSplit + 1 > this.officerCount) {
            if (!confirm("The remaining fleet is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if (troopsToSplit < 1 || leadersToSplit < 1) {
            if (!confirm("The new fleet is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        gameState_1.GameState.armies.push(new footArmy_1.FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, 0, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
        this.lightCatapultCount -= lightCatapultsToSplit;
        this.heavyCatapultCount -= heavyCatapultsToSplit;
    }
    merge(fromArmy) {
        if (!(fromArmy instanceof Fleet)) {
            throw new Error("Can't merge armies other than fleets with a fleet.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        this.lightCatapultCount += fromArmy.getLightCatapultCount();
        this.heavyCatapultCount += fromArmy.getHeavyCatapultCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        armyFunctions_1.ArmyFunctions.deleteArmy(fromArmy);
        let discardedArmies = 0;
        fromArmy.transportedArmies.forEach(transportedArmy => {
            fromArmy.unloadArmy(transportedArmy);
            try {
                this.loadArmy(transportedArmy);
            }
            catch (e) {
                discardedArmies++;
            }
        });
        if (discardedArmies > 0) {
            window.alert("" + discardedArmies + "armies have been thrown overboard.");
        }
    }
    fireLightCatapults(dicerolls, badConditions) {
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if (badConditions === "lkp") {
            for (let i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 5;
                        break;
                    case 7:
                        damageBP += 10;
                        break;
                    case 6:
                        damageBP += 25;
                        break;
                    case 5:
                        damageBP += 50;
                        break;
                    case 4:
                        damageBP += 75;
                        break;
                    case 3:
                        damageBP += 100;
                        break;
                    case 2:
                        damageBP += 125;
                        break;
                    case 1:
                        damageBP += 150;
                        break;
                    case 0:
                        damageBP += 175;
                        break;
                }
            }
        }
        return damageBP;
    }
    fireHeavyCatapults(dicerolls, badConditions) {
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if (badConditions === "short") {
            for (let i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 5;
                        break;
                    case 8:
                        damageBP += 10;
                        break;
                    case 7:
                        damageBP += 40;
                        break;
                    case 6:
                        damageBP += 70;
                        break;
                    case 5:
                        damageBP += 100;
                        break;
                    case 4:
                        damageBP += 130;
                        break;
                    case 3:
                        damageBP += 160;
                        break;
                    case 2:
                        damageBP += 190;
                        break;
                    case 1:
                        damageBP += 220;
                        break;
                    case 0:
                        damageBP += 250;
                        break;
                }
            }
        }
        else if (badConditions === "high") {
            for (let i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 0;
                        break;
                    case 7:
                        damageBP += 5;
                        break;
                    case 6:
                        damageBP += 10;
                        break;
                    case 5:
                        damageBP += 30;
                        break;
                    case 4:
                        damageBP += 40;
                        break;
                    case 3:
                        damageBP += 50;
                        break;
                    case 2:
                        damageBP += 65;
                        break;
                    case 1:
                        damageBP += 80;
                        break;
                    case 0:
                        damageBP += 100;
                        break;
                }
            }
        }
        else if (badConditions === "farAndUp") {
            for (let i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 5;
                        break;
                    case 7:
                        damageBP += 10;
                        break;
                    case 6:
                        damageBP += 30;
                        break;
                    case 5:
                        damageBP += 40;
                        break;
                    case 4:
                        damageBP += 50;
                        break;
                    case 3:
                        damageBP += 65;
                        break;
                    case 2:
                        damageBP += 80;
                        break;
                    case 1:
                        damageBP += 100;
                        break;
                    case 0:
                        damageBP += 120;
                        break;
                }
            }
        }
        else if (badConditions === "far") {
            for (let i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 0;
                        break;
                    case 7:
                        damageBP += 0;
                        break;
                    case 6:
                        damageBP += 5;
                        break;
                    case 5:
                        damageBP += 10;
                        break;
                    case 4:
                        damageBP += 20;
                        break;
                    case 3:
                        damageBP += 40;
                        break;
                    case 2:
                        damageBP += 60;
                        break;
                    case 1:
                        damageBP += 80;
                        break;
                    case 0:
                        damageBP += 100;
                        break;
                }
            }
        }
        return damageBP;
    }
    takeDamage(losses) {
        super.takeDamage(losses);
        this.killTransportedTroops();
    }
    usedTransportCapacity() {
        let loaded = 0;
        this.transportedArmies.forEach(transportedArmy => loaded += transportedArmy.getRoomPoints());
        return loaded;
    }
    maxTransportCapacity() {
        return this.troopCount * SHIP_TRANSPORT_CAPACITY;
    }
    freeTransportCapacity() {
        return this.maxTransportCapacity() - this.usedTransportCapacity();
    }
    canLoad(armyToLoad) {
        return this.freeTransportCapacity() >= armyToLoad.getRoomPoints();
    }
    loadArmy(army) {
        if (army.getRoomPoints() <= this.freeTransportCapacity()) {
            this.transportedArmies.push(army);
            army.transportingFleet = this;
        }
        else {
            throw new Error("This army is too big for this fleet.");
        }
    }
    unloadArmy(army) {
        let armyIndex = this.transportedArmies.indexOf(army);
        if (armyIndex >= 0) {
            this.transportedArmies.splice(armyIndex, 1);
        }
        army.transportingFleet = undefined;
    }
    killTransportedTroops() {
        let usedCapacity = this.usedTransportCapacity();
        let overload = usedCapacity - this.maxTransportCapacity();
        if (overload > 0) {
            this.transportedArmies.forEach(transportedArmy => transportedArmy.takeRPDamage(Math.ceil(overload * (transportedArmy.getRoomPoints() / usedCapacity))));
        }
    }
}
Fleet.MAX_HEIGHT_POINTS = 0;
exports.Fleet = Fleet;
