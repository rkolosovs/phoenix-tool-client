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
var SHIP_RP = types_1.Constants.SHIP_RP;
var GUARD_RP_MULT = types_1.Constants.GUARD_RP_MULT;
var LIGHT_WS_RP = types_1.Constants.LIGHT_WS_RP;
var HEAVY_WS_RP = types_1.Constants.HEAVY_WS_RP;
var SHIP_BP = types_1.Constants.SHIP_BP;
var HEAVY_WS_BP = types_1.Constants.HEAVY_WS_BP;
var LIGHT_WS_BP = types_1.Constants.LIGHT_WS_BP;
var SHIP_TRANSPORT_CAPACITY = types_1.Constants.SHIP_TRANSPORT_CAPACITY;
class Fleet extends types_1.Army {
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
        else {
            throw new Error("Move not possible.");
        }
    }
    checkForPossibleMove(direction) {
        let neighborCoords = types_1.HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let neighborsOfNeighbors = types_1.HexFunction.neighbors(target).
            map((neighbor) => types_1.HexFunction.neighbors(neighbor)).
            reduce((total, current) => (total.concat(current)), []);
        // TODO: Effects of diplomacy go here.
        let coastalSailing = this.owner.territory.some(field => neighborsOfNeighbors.some(neighbor => field.coordinates[0] === neighbor[0] &&
            field.coordinates[1] === neighbor[1]));
        switch (types_1.HexFunction.fieldType(target)) {
            case 0 /* SHALLOWS */: //shallow sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) { //shallow sea & no warships
                    if (coastalSailing && this.movePoints >= 5) { //shallow sea, coast & no warships
                        return new types_1.Move(5, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 7) { //shallow sea, no coast & no warships
                        return new types_1.Move(7, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) { //shallow sea & heavy warships
                    if (coastalSailing && this.movePoints >= 7) { //shallow sea, coast & heavy warships
                        return new types_1.Move(7, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 10) { //shallow sea, no coast & heavy warships
                        return new types_1.Move(10, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) { //shallow sea & light warships
                    if (coastalSailing && this.movePoints >= 6) { //shallow sea, coast & light warships
                        return new types_1.Move(6, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 8) { //shallow sea, no coast & light warships
                        return new types_1.Move(8, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case 1 /* DEEPSEA */: //deep sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) { //deep sea & no warships
                    if (coastalSailing && this.movePoints >= 8) { //deep sea, coast & no warships
                        return new types_1.Move(8, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 12) { //deep sea, no coast & no warships
                        return new types_1.Move(12, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) { //deep sea & heavy warships
                    if (coastalSailing && this.movePoints >= 14) { //deep sea, coast & heavy warships
                        return new types_1.Move(14, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 21) { //deep sea, no coast & heavy warships
                        return new types_1.Move(21, 0, false, false, target, direction);
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) { //deep sea & light warships
                    if (coastalSailing && this.movePoints >= 14) { //deep sea, coast & light warships
                        return new types_1.Move(14, 0, false, false, target, direction);
                    }
                    else if (this.movePoints >= 21) { //deep sea, no coast & light warships
                        return new types_1.Move(21, 0, false, false, target, direction);
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
        if (troopsToSplit * types_1.Constants.SHIP_TRANSPORT_CAPACITY > this.freeTransportCapacity()) {
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
        types_1.GameState.armies.push(new types_1.FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, lightCatapultsToSplit, heavyCatapultsToSplit, 0, this.getPosition(), this.movePoints, this.heightPoints));
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
        types_1.ArmyFunctions.deleteArmy(fromArmy);
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
    getLightCatapultDamage(diceRolls, conditions) {
        if (conditions === 6 /* LightCatapults */) {
            return diceRolls.map(roll => types_1.Constants.LIGHT_WS_DAMAGE[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
    }
    getHeavyCatapultDamage(diceRolls, conditions) {
        if (conditions === 1 /* Near */) {
            return diceRolls.map(roll => types_1.Constants.HEAVY_WS_DAMAGE_NEAR[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 3 /* High */) {
            return diceRolls.map(roll => types_1.Constants.HEAVY_WS_DAMAGE_HIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 2 /* FarAndHigh */) {
            return diceRolls.map(roll => types_1.Constants.HEAVY_WS_DAMAGE_FARANDHIGH[roll]).reduce((total, current) => total + current, 0);
        }
        else if (conditions === 0 /* Far */) {
            return diceRolls.map(roll => types_1.Constants.HEAVY_WS_DAMAGE_FAR[roll]).reduce((total, current) => total + current, 0);
        }
        else {
            return 0;
        }
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
//# sourceMappingURL=fleet.js.map