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
    checkForPossibleMove(direction) {
        let neighborCoords = HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let neighborsOfNeighbors = HexFunction.neighbors(target).
            map((neighbor) => HexFunction.neighbors(neighbor)).
            reduce((total, current) => (total.concat(current)), []);
        // TODO: Effects of diplomacy go here.
        let coastalSailing = borders.some((realm) => (realm === this.owner && realm.land.some((field) => neighborsOfNeighbors.some((neighbor) => (field[0] === neighbor[0] && field[1] === neighbor[1])))));
        switch (HexFunction.fieldType(target)) {
            case FieldType.SHALLOWS://shallow sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) {
                    if (coastalSailing && this.movePoints >= 5) {
                        this.possibleMoves.push(new Move(5, 0, false, false, target, direction));
                        break;
                    }
                    else if (this.movePoints >= 7) {
                        this.possibleMoves.push(new Move(7, 0, false, false, target, direction));
                        break;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 7) {
                        this.possibleMoves.push(new Move(7, 0, false, false, target, direction));
                        break;
                    }
                    else if (this.movePoints >= 10) {
                        this.possibleMoves.push(new Move(10, 0, false, false, target, direction));
                        break;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 6) {
                        this.possibleMoves.push(new Move(6, 0, false, false, target, direction));
                        break;
                    }
                    else if (this.movePoints >= 8) {
                        this.possibleMoves.push(new Move(8, 0, false, false, target, direction));
                        break;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case FieldType.DEEPSEA://deep sea
                if (this.lightCatapultCount + this.heavyCatapultCount <= 0) {
                    if (coastalSailing && this.movePoints >= 8) {
                        this.possibleMoves.push(new Move(8, 0, false, false, target, direction));
                        break;
                    }
                    else if (this.movePoints >= 12) {
                        this.possibleMoves.push(new Move(12, 0, false, false, target, direction));
                        break;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.heavyCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 14) {
                        this.possibleMoves.push(new Move(14, 0, false, false, target, direction));
                        break;
                    }
                    else if (this.movePoints >= 21) {
                        this.possibleMoves.push(new Move(21, 0, false, false, target, direction));
                        break;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.lightCatapultCount > 0) {
                    if (coastalSailing && this.movePoints >= 14) {
                        this.possibleMoves.push(new Move(14, 0, false, false, target, direction));
                        break;
                    }
                    else if (this.movePoints >= 21) {
                        this.possibleMoves.push(new Move(21, 0, false, false, target, direction));
                        break;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case FieldType.LOWLANDS:
            case FieldType.WOODS:
            case FieldType.HILLS:
            case FieldType.HIGHLANDS:
            case FieldType.MOUNTAINS:
            case FieldType.DESERT:
            case FieldType.SWAMP: throw new Error("You can't drive your ships up land.");
            default: throw new Error("Unknown terrain type.");
        }
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
