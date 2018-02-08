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

    computeMoveCost(thereIsAStreet: boolean, thereIsAHarbor: boolean, thereIsARiver: boolean, thereIsABridge: boolean,
                    rightOfPassage: boolean, target: [number, number]): number{
        switch(HexFunction.fieldType(target[0], target[1])){
            case FieldType.SHALLOWS:
            case FieldType.DEEPSEA: //watter
                //already embarked
                if(this.transportingFleet != undefined){
                    throw new Error("You are already embarked on a Fleet.");
                // there are no viable fleets on destination
                } else if(GameState.armies.filter(army => army instanceof Fleet && army.getPosition() === target &&
                        army.owner === this.owner && (army as Fleet).canLoad(this)).length === 0){
                    throw new Error("You can't walk on Water.");
                // at least one fleet on destination
                } else {
                    return 0; //embarking doesn't cost move points
                }
            case 2:
            case 4:
            case 7: if(thereIsARiver && !thereIsABridge){ //plains, hills, desert
                if(this.movePoints >= this.getMaxMovePoints()){
                    return this.getMaxMovePoints();
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){//street
                if (rightOfPassage && this.movePoints >= 3){ //street & right of passage
                    return 3;
                } else if(this.movePoints >= 4){ //street & no right of passage
                    return 4;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else if(rightOfPassage && this.movePoints >= 4){ //no street & right of passage
                return 4;
            } else if(this.movePoints >= 7){ //no street & no right of passage
                return 7;
            } else {
                throw new Error("You don't have enough movement Points.");
            }
            case 5: if(thereIsARiver && !thereIsABridge){ //highlands
                if(this.movePoints >= this.getMaxMovePoints()){
                    return this.getMaxMovePoints();
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){
                if (rightOfPassage && this.movePoints >= 4){ //street & right of passage
                    return 4;
                } else if(this.movePoints >= 7){ //street & no right of passage
                    return 7;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else if(rightOfPassage && this.movePoints >= 7){ //no street & right of passage
                return 7;
            } else if(this.movePoints >= 21){ //no street & no right of passage
                return 21;
            } else {
                throw new Error("You don't have enough movement Points.");
            }
            case 6: throw new Error("Cavalry can not move through the mountains."); //mountains
            case 3:
            case 8: if(thereIsARiver && !thereIsABridge){ //forest, swamp
                if(this.movePoints >= this.getMaxMovePoints()){
                    return this.getMaxMovePoints();
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){
                if(rightOfPassage && army.remainingMovePoints >= 3){ //street & right of passage
                    return 3;
                } else if(army.remainingMovePoints >= 5){ //street & no right of passage
                    return 5;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else if(rightOfPassage && army.remainingMovePoints >= 5){//no street && right of passage
                return 5;
            } else if(army.remainingMovePoints >= 10){//no street & no right of passage
                return 10;
            } else {
                throw new Error("You don't have enough movement Points.");
            }
            default: throw new Error("Unknown terrain type.");
        }
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