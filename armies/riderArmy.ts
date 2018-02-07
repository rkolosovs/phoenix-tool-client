class RiderArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 21;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, position: [number, number],
                movePoints: number, heightPoints: number, isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints);
        }
    }

    getErkenfaraID(): number{
        return 200 + this.id;
    }

    getMaxMovePoints(): number{
        return RiderArmy.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return RiderArmy.MAX_HEIGHT_POINTS;
    }

    takeRPDamage(rpDamage: number): void{
        this.takeDamage(Math.ceil(rpDamage/(RIDER_RP+
            OFFICER_RP*(this.officerCount/this.troopCount))));
    }

    canHaveCatapults(): boolean{
        return false;
    }

    getRoomPointsSansOfficers(): number{
        return this.troopCount * RIDER_RP;
    }

    takeBPDamage(bpDamage: number): void{
        let totalBP = this.troopCount * RIDER_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage / RIDER_BP);
        this.wasShotAt = true;
    }

    fireLightCatapults(dicerolls: number[], badConditions: string): number{
        return 0;
    }

    fireHeavyCatapults(dicerolls: number[], badConditions: string): number{
        return 0;
    }
}