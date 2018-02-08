"use strict";
class Army extends MobileEntity {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        super(id, owner, position, movePoints, heightPoints);
        this.lightCatapultCount = 0;
        this.heavyCatapultCount = 0;
        this.isGuard = false;
        this.wasShotAt = false;
        this.setTroopCount(troopCount);
        this.setOfficerCount(officerCount);
        if (isGuard != undefined) {
            this.isGuard = isGuard;
        }
        this.setLightCatapultCount(lightCatapultCount);
        this.setHeavyCatapultCount(heavyCatapultCount);
    }
    getTroopCount() {
        return this.troopCount;
    }
    getMaxMovePoints() {
        return Army.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return Army.MAX_HEIGHT_POINTS;
    }
    setTroopCount(value) {
        this.troopCount = Math.max(0, value);
    }
    getOfficerCount() {
        return this.officerCount;
    }
    setOfficerCount(value) {
        this.officerCount = Math.max(0, value);
    }
    getLightCatapultCount() {
        return this.lightCatapultCount;
    }
    setLightCatapultCount(value) {
        if (this.canHaveCatapults()) {
            this.lightCatapultCount = Math.max(0, value);
        }
    }
    getHeavyCatapultCount() {
        return this.heavyCatapultCount;
    }
    setHeavyCatapultCount(value) {
        if (this.canHaveCatapults()) {
            this.heavyCatapultCount = Math.max(0, value);
        }
    }
    conquer() {
        if (this.canConquer()) {
            let field = GameState.fields[HexFunction.positionInList(this.position)];
            GameState.realms.forEach(realm => {
                let index = realm.territory.indexOf(field);
                if (index !== -1) {
                    realm.territory.splice(index, 1);
                }
            });
            this.owner.territory.push(field); //add to owner's realm's territory
        }
    }
    takeDamage(losses) {
        let factor = losses / this.troopCount;
        this.setTroopCount(this.troopCount - Math.floor(losses));
        this.setOfficerCount(this.officerCount - Math.floor(this.officerCount * factor));
        this.setLightCatapultCount(this.lightCatapultCount - Math.floor(this.lightCatapultCount * factor));
        this.setHeavyCatapultCount(this.heavyCatapultCount - Math.floor(this.heavyCatapultCount * factor));
    }
    getRoomPoints() {
        return this.getRoomPointsSansOfficers() + this.officerCount * OFFICER_RP;
    }
    leaderGp() {
        let gp = 0;
        if (this.officerCount < 101) {
            gp += this.officerCount;
        }
        else if (this.officerCount < 201) {
            gp += (100 + (this.officerCount - 100) / 2);
        }
        else {
            gp += 200;
        }
        if (this.isGuard) {
            gp += 300;
        }
        return gp;
    }
    isAlive() {
        //TODO: Check for character leaders on the field once characters are implemented.
        return this.getRoomPointsSansOfficers() >= 100 && this.officerCount >= 1;
    }
}
