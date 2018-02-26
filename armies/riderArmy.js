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
                if (rightOfPassage && army.remainingMovePoints >= 3) {
                    return 3;
                }
                else if (army.remainingMovePoints >= 5) {
                    return 5;
                }
                else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            else if (rightOfPassage && army.remainingMovePoints >= 5) {
                return 5;
            }
            else if (army.remainingMovePoints >= 10) {
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
    takeBPDamage(bpDamage) {
        let totalBP = this.troopCount * RIDER_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage / RIDER_BP);
        this.wasShotAt = true;
    }
    fireLightCatapults(dicerolls, badConditions) {
        return 0;
    }
    fireHeavyCatapults(dicerolls, badConditions) {
        return 0;
    }
}
RiderArmy.MAX_MOVE_POINTS = 21;
exports.RiderArmy = RiderArmy;
