"use strict";
class Fleet extends Army {
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
            this.oldPosition = this.position;
            this.position = move.destination;
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.transportedArmies.forEach(transportedArmy => transportedArmy.changePosition(move.destination));
        }
        // TODO: Throw errors. Compute new possible moves.
        // //to see and return the error why you cant move
        // clickedMoves(army);
        // return moveToList(army, direction);
    }
    canConquer() {
        return false;
    }
    takeBPDamage(bpDamage) {
        let totalBP = this.troopCount * SHIP_BP +
            this.lightCatapultCount * LIGHT_WS_BP + this.heavyCatapultCount * HEAVY_WS_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * SHIP_BP / totalBP) / SHIP_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_WS_BP /
            totalBP) / LIGHT_WS_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_WS_BP /
            totalBP) / HEAVY_WS_BP);
        this.killTransportedTroops();
        this.wasShotAt = true;
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
            return "ok";
        }
        else {
            return "This army is too big for this fleet.";
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
