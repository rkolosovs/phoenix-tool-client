class LandArmy extends Army{
    isTransported: boolean;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, heightPoints: number,
                isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints);
        }
        this.isTransported = false;
    }

    takeRPDamage(rpDamage: number): void;

    getMaxMovePoints(): number{
        return LandArmy.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return LandArmy.MAX_HEIGHT_POINTS;
    }

    canConquer(): boolean{
        return
    }
}