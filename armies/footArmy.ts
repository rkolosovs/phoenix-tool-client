class FootArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 9;
    protected mountCount: number;

    constructor(args: any[]){
        //TODO
    }

    takeRPDamage(rpDamage: number): void{
        this.takeDamage(Math.ceil(rpDamage/(FOOTMAN_RP+
            OFFICER_RP*(this.officerCount/this.troopCount)+
            this.mountCount/this.troopCount+
            LIGHT_CATA_RP*(this.lightCatapultCount/this.troopCount)+
            HEAVY_CATA_RP*(this.heavyCatapultCount/this.troopCount))));
    }

    canHaveCatapults(): boolean{
        return !this.isGuard;
    }

    canConquer(): boolean{
        //TODO
    }

    takeBPDamage(bpDamage: number): void{
        //TODO
    }

    fireLightCatapults(args: any[]): void{
        //TODO
    }

    fireHeavyCatapults(args: any[]): void{
        //TODO
    }
}