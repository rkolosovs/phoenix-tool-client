class RiderArmy extends LandArmy {
    constructor(id, owner, troopCount, officerCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints);
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
