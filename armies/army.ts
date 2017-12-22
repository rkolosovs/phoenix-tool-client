class Army extends MapEntity{
    protected troopCount: number;
    protected officerCount: number;
    protected lightCatapultCount: number = 0;
    protected heavyCatapultCount: number = 0;
    isGuard: boolean = false;
    wasShotAt: boolean = false;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, heightPoints: number,
                isGuard?: boolean){
        super(id, owner, position, movePoints, heightPoints);
        this.setTroopCount(troopCount);
        this.setOfficerCount(officerCount);
        if(isGuard != undefined){this.isGuard = isGuard;}
        this.setLightCatapultCount(lightCatapultCount);
        this.setHeavyCatapultCount(heavyCatapultCount);
    }

    canHaveCatapults(): boolean;

    getRoomPointsSansOfficers(): number;

    canConquer(): boolean;

    takeBPDamage(bpDamage: number): void;

    fireLightCatapults(dicerolls: number[], badConditions: string): number;

    fireHeavyCatapults(dicerolls: number[], badConditions: string): number;

    getTroopCount(): number{
        return this.troopCount;
    }

    setTroopCount(value: number): void{
        this.troopCount = Math.max(0, value);
    }

    getOfficerCount(): number{
        return this.officerCount;
    }

    setOfficerCount(value: number): void{
        this.officerCount = Math.max(0, value);
    }

    getLightCatapultCount(): number{
        return this.lightCatapultCount;
    }

    setLightCatapultCount(value: number): void{
        if(this.canHaveCatapults()) {
            this.lightCatapultCount = Math.max(0, value);
        }
    }

    getHeavyCatapultCount(): number{
        return this.heavyCatapultCount;
    }

    setHeavyCatapultCount(value: number): void{
        if(this.canHaveCatapults()) {
            this.heavyCatapultCount = Math.max(0, value);
        }
    }

    takeDamage(losses: number): void{
        let factor: number = losses / this.troopCount;
        this.setTroopCount(this.troopCount - Math.floor(losses));
        this.setOfficerCount(this.officerCount - Math.floor(this.officerCount * factor));
        this.setLightCatapultCount(this.lightCatapultCount - Math.floor(this.lightCatapultCount * factor));
        this.setHeavyCatapultCount(this.heavyCatapultCount - Math.floor(this.heavyCatapultCount * factor));
    }

    getRoomPoints(): number{
        return getRoomPointsSansOfficers() + this.officerCount * OFFICER_RP;
    }

    leaderGp(): number {
        let gp = 0;

        if(this.officerCount < 101) {
            gp += this.officerCount;
        } else if(this.officerCount < 201) {
            gp += (100 + (this.officerCount-100) / 2 );
        } else {
            gp += 200;
        }

        if(this.isGuard){
            gp += 300;
        }

        return gp;
    }

    isAlive(): boolean{
        //TODO: Check for character leaders on the field once characters are implemented.
        return this.getRoomPointsSansOfficers() >= 100 && this.officerCount >= 1;
    }
}