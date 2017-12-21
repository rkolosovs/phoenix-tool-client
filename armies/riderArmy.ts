class RiderArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 21;

    constructor(args: any[]){
        //TODO
    }

    takeRPDamage(rpDamage: number): void{
        this.takeDamage(Math.ceil(rpDamage/(RIDER_RP+
            OFFICER_RP*(this.officerCount/this.troopCount))));
    }

    canHaveCatapults(): boolean{
        return false;
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