class Fleet extends Army{
    static readonly MAX_HEIGHT_POINTS = 0;
    protected transportedArmies: LandArmy[] = [];

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, heightPoints: number,
                isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints, isGuard);
        } else{
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints);
        }
    }

    getErkenfaraID(): number{
        return 300 + this.id;
    }

    canHaveCatapults(): boolean{
        return !this.isGuard;
    }

    getRoomPointsSansOfficers(): number{
        if(isGuard){
            return this.troopCount * SHIP_RP * GUARD_RP_MULT +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        } else{
            return this.troopCount * SHIP_RP +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
    }

    canConquer(): boolean{
        return false;
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

    takeDamage(losses: number): void{
        super.takeDamage(losses);
        this.killTransportedTroops();
    }

    usedTransportCapacity(): number{
        //TODO
    }

    maxTransportCapacity(): number{
        //TODO
    }

    freeTransportCapacity(): number{
        //TODO
    }

    canLoad(armyToLoad: LandArmy): boolean{
        //TODO
    }

    loadArmy(army: LandArmy): void{
        //TODO
    }

    killTransportedTroops(): void{
        let usedCapacity = this.usedTransportCapacity();
        let overload = usedCapacity - this.maxTransportCapacity();
        if(overload > 0){
            this.transportedArmies.forEach(transportedArmy =>
                transportedArmy.takeRPDamage(Math.ceil(overload * (transportedArmy.getRoomPoints()/usedCapacity)))
            );
        }
    }
}