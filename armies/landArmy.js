"use strict";
class LandArmy extends Army {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
        }
        this.isTransported = false;
    }
    getMaxMovePoints() {
        return LandArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return LandArmy.MAX_HEIGHT_POINTS;
    }
    canConquer() {
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}
