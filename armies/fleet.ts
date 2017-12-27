class Fleet extends Army{
    static readonly MAX_HEIGHT_POINTS = 0;
    protected transportedArmies: LandArmy[];

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
        this.transportedArmies = [];
    }

    getErkenfaraID(): number{
        return 300 + this.id;
    }

    canHaveCatapults(): boolean{
        return !this.isGuard;
    }

    getMaxMovePoints(): number{
        return Fleet.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return Fleet.MAX_HEIGHT_POINTS;
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
        let totalBP = this.troopCount * SHIP_BP +
            this.lightCatapultCount * LIGHT_WS_BP + this.heavyCatapultCount * HEAVY_WS_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * SHIP_BP / totalBP) / SHIP_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_WS_BP /
            totalBP) / LIGHT_WS_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_WS_BP /
            totalBP) / HEAVY_WS_BP);
        this.killTransportedTroops();
        this.wasShotAt = true;
    }

    fireLightCatapults(dicerolls: number[], badConditions: string): number{
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if(badConditions === "lkp"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0; break;
                    case 8: damageBP += 5; break;
                    case 7: damageBP += 10; break;
                    case 6: damageBP += 25; break;
                    case 5: damageBP += 50; break;
                    case 4: damageBP += 75; break;
                    case 3: damageBP += 100; break;
                    case 2: damageBP += 125; break;
                    case 1: damageBP += 150; break;
                    case 0: damageBP += 175; break;
                }
            }
        }
        return damageBP;
    }

    fireHeavyCatapults(dicerolls: number[], badConditions: string): number{
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if(badConditions === "short"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5; break;
                    case 8: damageBP += 10; break;
                    case 7: damageBP += 40; break;
                    case 6: damageBP += 70; break;
                    case 5: damageBP += 100; break;
                    case 4: damageBP += 130; break;
                    case 3: damageBP += 160; break;
                    case 2: damageBP += 190; break;
                    case 1: damageBP += 220; break;
                    case 0: damageBP += 250; break;
                }
            }
        } else if(badConditions === "high"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0; break;
                    case 8: damageBP += 0; break;
                    case 7: damageBP += 5; break;
                    case 6: damageBP += 10; break;
                    case 5: damageBP += 30; break;
                    case 4: damageBP += 40; break;
                    case 3: damageBP += 50; break;
                    case 2: damageBP += 65; break;
                    case 1: damageBP += 80; break;
                    case 0: damageBP += 100; break;
                }
            }
        } else if(badConditions === "farAndUp"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0; break;
                    case 8: damageBP += 5; break;
                    case 7: damageBP += 10; break;
                    case 6: damageBP += 30; break;
                    case 5: damageBP += 40; break;
                    case 4: damageBP += 50; break;
                    case 3: damageBP += 65; break;
                    case 2: damageBP += 80; break;
                    case 1: damageBP += 100; break;
                    case 0: damageBP += 120; break;
                }
            }
        } else if(badConditions === "far"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0; break;
                    case 8: damageBP += 0; break;
                    case 7: damageBP += 0; break;
                    case 6: damageBP += 5; break;
                    case 5: damageBP += 10; break;
                    case 4: damageBP += 20; break;
                    case 3: damageBP += 40; break;
                    case 2: damageBP += 60; break;
                    case 1: damageBP += 80; break;
                    case 0: damageBP += 100; break;
                }
            }
        }
        return damageBP;
    }

    takeDamage(losses: number): void{
        super.takeDamage(losses);
        this.killTransportedTroops();
    }

    usedTransportCapacity(): number{
        let loaded = 0;
        this.transportedArmies.forEach(transportedArmy => loaded += transportedArmy.getRoomPoints());
        return loaded;
    }

    maxTransportCapacity(): number{
        return this.troopCount * SHIP_TRANSPORT_CAPACITY;
    }

    freeTransportCapacity(): number{
        return this.maxTransportCapacity() - this.usedTransportCapacity();
    }

    canLoad(armyToLoad: LandArmy): boolean{
        return this.freeTransportCapacity() >= armyToLoad.getRoomPoints();
    }

    loadArmy(army: LandArmy): string{
        if(listOfArmies[index].raumpunkte() <= this.currentCapacity()){
            this.loadedArmies.push(army);
            army.isTransported = true;
            return "ok";
        } else {
            return "This army is too big for this fleet.";
        }
    }

    unloadArmy(army: LandArmy): void{
        let armyIndex: number = this.transportedArmies.indexOf(army);
        if(armyIndex >= 0){
            this.transportedArmies.splice(armyIndex, 1);
        }
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