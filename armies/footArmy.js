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
                if (rightOfPassage) {
                    if (this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else if (this.movePoints >= 3) {
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.movePoints >= 4) {
                    return 4;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else {
                if (rightOfPassage) {
                    if (this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.movePoints >= 4) {
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else if (this.movePoints >= 7) {
                    return 7;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            case 5 /* HIGHLANDS */: if (thereIsARiver && !thereIsABridge) {
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else if (this.lightCatapultCount + this.heavyCatapultCount <= 0 && this.movePoints >= 3) {
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else {
                    if (this.heavyCatapultCount > 0) {
                        if (this.movePoints >= 7) {
                            return 7;
                        }
                        else {
                            throw new Error("You don't have enough movement Points.");
                        }
                    }
                    else if (this.movePoints >= 4) {
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else {
                if (rightOfPassage) {
                    if (this.heavyCatapultCount > 0) {
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else {
                    if (this.heavyCatapultCount > 0) {
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            case 6 /* MOUNTAINS */: if (thereIsARiver && !thereIsABridge) {
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (this.heavyCatapultCount > 0) {
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3) {
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else {
                    if (this.heavyCatapultCount > 0) {
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else {
                if (this.heavyCatapultCount + this.lightCatapultCount > 0) {
                    throw new Error("You need a street to move into the mountains with catapults.");
                }
                else {
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
            }
            case 3 /* WOODS */:
            case 8 /* SWAMP */: if (thereIsARiver && !thereIsABridge) {
                if (this.movePoints >= this.getMaxMovePoints()) {
                    return 9;
                }
                else {
                    throw new Error("You need you full movement to cross a river.");
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3) {
                        return 3;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else {
                    if (this.heavyCatapultCount > 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            }
            else {
                if (rightOfPassage) {
                    if (this.heavyCatapultCount > 0) {
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    }
                    else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7) {
                        return 7;
                    }
                    else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4) {
                        return 4;
                    }
                    else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
                else {
                    if (this.heavyCatapultCount > 0) {
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    }
                    else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7) {
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
    takeBPDamage(bpDamage) {
        let totalBP = this.troopCount * FOOTMAN_BP + this.mountCount * MOUNT_BP +
            this.lightCatapultCount * LIGHT_CATA_BP + this.heavyCatapultCount * HEAVY_CATA_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * FOOTMAN_BP / totalBP) / FOOTMAN_BP);
        this.setMountCount(this.mountCount - bpDamage * (this.mountCount * MOUNT_BP / totalBP) / MOUNT_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_CATA_BP /
            totalBP) / LIGHT_CATA_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_CATA_BP /
            totalBP) / HEAVY_CATA_BP);
        this.wasShotAt = true;
    }
    fireLightCatapults(dicerolls, badConditions) {
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if (badConditions === "lkp") {
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
                        damageBP += 125;
                        break;
                    case 3:
                        damageBP += 150;
                        break;
                    case 2:
                        damageBP += 175;
                        break;
                    case 1:
                        damageBP += 200;
                        break;
                    case 0:
                        damageBP += 225;
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
                        damageBP += 30;
                        break;
                    case 8:
                        damageBP += 60;
                        break;
                    case 7:
                        damageBP += 90;
                        break;
                    case 6:
                        damageBP += 120;
                        break;
                    case 5:
                        damageBP += 150;
                        break;
                    case 4:
                        damageBP += 180;
                        break;
                    case 3:
                        damageBP += 210;
                        break;
                    case 2:
                        damageBP += 240;
                        break;
                    case 1:
                        damageBP += 270;
                        break;
                    case 0:
                        damageBP += 300;
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
        else if (badConditions === "farAndUp") {
            for (let i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 5;
                        break;
                    case 8:
                        damageBP += 10;
                        break;
                    case 7:
                        damageBP += 30;
                        break;
                    case 6:
                        damageBP += 40;
                        break;
                    case 5:
                        damageBP += 50;
                        break;
                    case 4:
                        damageBP += 65;
                        break;
                    case 3:
                        damageBP += 80;
                        break;
                    case 2:
                        damageBP += 100;
                        break;
                    case 1:
                        damageBP += 120;
                        break;
                    case 0:
                        damageBP += 150;
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
                        damageBP += 5;
                        break;
                    case 7:
                        damageBP += 10;
                        break;
                    case 6:
                        damageBP += 30;
                        break;
                    case 5:
                        damageBP += 50;
                        break;
                    case 4:
                        damageBP += 70;
                        break;
                    case 3:
                        damageBP += 90;
                        break;
                    case 2:
                        damageBP += 110;
                        break;
                    case 1:
                        damageBP += 130;
                        break;
                    case 0:
                        damageBP += 150;
                        break;
                }
            }
        }
        return damageBP;
    }
}
FootArmy.MAX_MOVE_POINTS = 9;
exports.FootArmy = FootArmy;
