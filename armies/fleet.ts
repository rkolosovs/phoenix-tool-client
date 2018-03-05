import {Army} from "./army";
import {Constants} from "../constants";
import SHIP_RP = Constants.SHIP_RP;
import GUARD_RP_MULT = Constants.GUARD_RP_MULT;
import {Realm} from "../realm";
import LIGHT_WS_RP = Constants.LIGHT_WS_RP;
import HEAVY_WS_RP = Constants.HEAVY_WS_RP;
import {LandArmy} from "./landArmy";
import {Direction} from "../map/direction";
import {HexFunction} from "../libraries/hexFunctions";
import {FieldType} from "../map/field";
import {Move} from "./move";
import SHIP_BP = Constants.SHIP_BP;
import HEAVY_WS_BP = Constants.HEAVY_WS_BP;
import LIGHT_WS_BP = Constants.LIGHT_WS_BP;
import SHIP_TRANSPORT_CAPACITY = Constants.SHIP_TRANSPORT_CAPACITY;
import {GameState} from "../gameState";
import {ArmyFunctions} from "../libraries/armyFunctions";
import {FootArmy} from "./footArmy";

export class Fleet extends Army{
    static readonly MAX_HEIGHT_POINTS: number = 0;
    protected transportedArmies: LandArmy[];

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, 0, isGuard);
        } else{
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, 0);
        }
        this.transportedArmies = [];
    }

    getErkenfaraID(): number{
        return 300 + this.id;
    }

    canHaveCatapults(): boolean{
        return !this.isGuard;
    }

    canHaveMounts(): boolean{
        return false;
    }

    getMaxMovePoints(): number{
        return Fleet.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return Fleet.MAX_HEIGHT_POINTS;
    }

    getRoomPointsSansOfficers(): number{
        if(this.isGuard){
            return this.troopCount * SHIP_RP * GUARD_RP_MULT +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        } else{
            return this.troopCount * SHIP_RP +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
    }

    move(direction: Direction): void {
        let move = this.possibleMoves.find(possMove => possMove.direction === direction);
        if(move != undefined){
            this.oldPosition[0] = this.position[0];
            this.oldPosition[1] = this.position[1];
            this.position[0] = move.destination[0];
            this.position[1] = move.destination[1];
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.transportedArmies.forEach(transportedArmy =>
                transportedArmy.changePosition((move as Move).destination));
        }
        // TODO: Throw errors. Compute new possible moves.
        // //to see and return the error why you cant move
        // clickedMoves(army);
        // return moveToList(army, direction);
    }

    checkForPossibleMove(direction: Direction): Move {
        let neighborCoords: [number, number][] = HexFunction.neighbors(this.position);
        let target: [number, number] = neighborCoords[direction];
        let neighborsOfNeighbors = HexFunction.neighbors(target).
            map((neighbor) => HexFunction.neighbors(neighbor)).
            reduce((total, current) => (total.concat(current)), []);
        // TODO: Effects of diplomacy go here.
        let coastalSailing = this.owner.territory.some(
            field => neighborsOfNeighbors.some(neighbor => field.coordinates[0] === neighbor[0] &&
                field.coordinates[1] === neighbor[1]));
        switch(HexFunction.fieldType(target)){
            case FieldType.SHALLOWS: //shallow sea
                if(this.lightCatapultCount + this.heavyCatapultCount <= 0){ //shallow sea & no warships
                    if(coastalSailing && this.movePoints >= 5){//shallow sea, coast & no warships
                        return new Move(5, 0, false, false, target, direction);
                    } else if(this.movePoints >= 7 ){//shallow sea, no coast & no warships
                        return new Move(7, 0, false, false, target, direction);
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                } else if(this.heavyCatapultCount > 0){ //shallow sea & heavy warships
                    if(coastalSailing && this.movePoints >= 7){//shallow sea, coast & heavy warships
                        return new Move(7, 0, false, false, target, direction);
                    } else if(this.movePoints >= 10 ){//shallow sea, no coast & heavy warships
                        return new Move(10, 0, false, false, target, direction);
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                } else if(this.lightCatapultCount > 0){//shallow sea & light warships
                    if(coastalSailing && this.movePoints >= 6){//shallow sea, coast & light warships
                        return new Move(6, 0, false, false, target, direction);
                    } else if(this.movePoints >= 8 ){//shallow sea, no coast & light warships
                        return new Move(8, 0, false, false, target, direction);
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case FieldType.DEEPSEA: //deep sea
                if(this.lightCatapultCount + this.heavyCatapultCount <= 0){//deep sea & no warships
                    if(coastalSailing && this.movePoints >= 8){//deep sea, coast & no warships
                        return new Move(8, 0, false, false, target, direction);
                    } else if(this.movePoints >= 12 ){//deep sea, no coast & no warships
                        return new Move(12, 0, false, false, target, direction);
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                } else if(this.heavyCatapultCount > 0){//deep sea & heavy warships
                    if(coastalSailing && this.movePoints >= 14){//deep sea, coast & heavy warships
                        return new Move(14, 0, false, false, target, direction);
                    } else if(this.movePoints >= 21 ){//deep sea, no coast & heavy warships
                        return new Move(21, 0, false, false, target, direction);
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                } else if(this.lightCatapultCount > 0){//deep sea & light warships
                    if(coastalSailing && this.movePoints >= 14){//deep sea, coast & light warships
                        return new Move(14, 0, false, false, target, direction);
                    } else if(this.movePoints >= 21 ){//deep sea, no coast & light warships
                        return new Move(21, 0, false, false, target, direction);
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            case FieldType.LOWLANDS:
            case FieldType.WOODS:
            case FieldType.HILLS:
            case FieldType.HIGHLANDS:
            case FieldType.MOUNTAINS:
            case FieldType.DESERT:
            case FieldType.SWAMP: throw new Error("You can't drive your ships up land.");
            default: throw new Error("Unknown terrain type.");
        }
    }

    canConquer(): boolean{
        return false;
    }

    totalBP(): number{
        return this.troopCount * SHIP_BP + this.lightCatapultCount * LIGHT_WS_BP +
            this.heavyCatapultCount * HEAVY_WS_BP;
    }

    takeBPDamage(bpDamage: number): void{
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * SHIP_BP / totalBP) / SHIP_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_WS_BP /
            totalBP) / LIGHT_WS_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_WS_BP /
            totalBP) / HEAVY_WS_BP);
        this.killTransportedTroops();
        this.wasShotAt = true;
    }

    merge(fromArmy: Army): void{
        if(!(fromArmy instanceof Fleet)){
            throw new Error("Can't merge armies other than fleets with a fleet.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        this.lightCatapultCount += fromArmy.getLightCatapultCount();
        this.heavyCatapultCount += fromArmy.getHeavyCatapultCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        ArmyFunctions.deleteArmy(fromArmy);
        let discardedArmies: number = 0;
        fromArmy.transportedArmies.forEach(transportedArmy => {
            fromArmy.unloadArmy(transportedArmy);
            try {
                this.loadArmy(transportedArmy);
            } catch(e){
                discardedArmies++;
            }
        });
        if(discardedArmies > 0){
            window.alert("" + discardedArmies + "armies have been thrown overboard.");
        }
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

    loadArmy(army: LandArmy): void {
        if(army.getRoomPoints() <= this.freeTransportCapacity()){
            this.transportedArmies.push(army);
            army.transportingFleet = this;
        } else {
            throw new Error("This army is too big for this fleet.");
        }
    }

    unloadArmy(army: LandArmy): void{
        let armyIndex: number = this.transportedArmies.indexOf(army);
        if(armyIndex >= 0){
            this.transportedArmies.splice(armyIndex, 1);
        }
        army.transportingFleet = undefined;
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