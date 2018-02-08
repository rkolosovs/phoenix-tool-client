"use strict";
class RiderArmy extends LandArmy {
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
        switch (HexFunction.fieldType(target[0], target[1])) {
            case FieldType.SHALLOWS:
            case FieldType.DEEPSEA://watter
                //already embarked
                if (this.transportingFleet != undefined) {
                    throw new Error("You are already embarked on a Fleet.");
                    // there are no viable fleets on destination
                }
                else if (GameState.armies.filter(army => army instanceof Fleet && army.getPosition() === target &&
                    army.owner === this.owner && army.canLoad(this)).length === 0) {
                    throw new Error("You can't walk on Water.");
                    // at least one fleet on destination
                }
                else {
                    return 0; //embarking doesn't cost move points
                }
            case 2:
            case 4:
            case 7: if (thereIsARiver && !thereIsABridge) {
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
            case 5: if (thereIsARiver && !thereIsABridge) {
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
            case 6: throw new Error("Cavalry can not move through the mountains."); //mountains
            case 3:
            case 8: if (thereIsARiver && !thereIsABridge) {
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
        this.takeDamage(Math.ceil(rpDamage / (RIDER_RP +
            OFFICER_RP * (this.officerCount / this.troopCount))));
    }
    canHaveCatapults() {
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
