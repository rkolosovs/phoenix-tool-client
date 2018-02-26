import {GameState} from "../gameState";
import {HexFunction} from "../libraries/hexFunctions";
import {Constants} from "../constants";

export abstract class Army extends MobileEntity{
    protected troopCount: number;
    protected officerCount: number;
    protected lightCatapultCount: number = 0;
    protected heavyCatapultCount: number = 0;
    protected lightCatapultsShot: number = 0;
    protected heavyCatapultsShot: number = 0;
    multiArmyField: boolean = false;
    targetList: [number, number][] = []; //TODO: this needs to be reviewed, together with findShottingTargets ect.
    isGuard: boolean = false;
    wasShotAt: boolean = false;
    possibleTargets: Field[] = [];

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

    abstract canHaveCatapults(): boolean;

    abstract canHaveMounts(): boolean;

    abstract getRoomPointsSansOfficers(): number;

    abstract canConquer(): boolean;

    abstract takeBPDamage(bpDamage: number): void;

    abstract fireLightCatapults(dicerolls: number[], badConditions: string): number;

    abstract fireHeavyCatapults(dicerolls: number[], badConditions: string): number;

    getTroopCount(): number{
        return this.troopCount;
    }

    getMaxMovePoints(): number{
        return Army.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return Army.MAX_HEIGHT_POINTS;
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

    getHeavyCatapultsShot(): number{
        return this.heavyCatapultsShot;
    }

    addHeavyCatapultsShot(value: number): void{
        if(this.getHeavyCatapultsShot() + Math.max(0, value) <= this.getHeavyCatapultCount()) {
            this.heavyCatapultsShot += Math.max(0, value);
        }
    }

    getLightCatapultsShot(): number{
        return this.lightCatapultsShot;
    }

    addLightCatapultsShot(value: number): void{
        if(this.getLightCatapultsShot() + Math.max(0, value) <= this.getLightCatapultCount()) {
            this.lightCatapultsShot += Math.max(0, value);
        }
    }

    conquer(): void {
        if(this.canConquer()){
            let field: Field = GameState.fields[HexFunction.positionInList(this.position)];
            GameState.realms.forEach(realm => { //delete from other territories (if there)
                let index = realm.territory.indexOf(field);
                if(index !== -1){
                    realm.territory.splice(index, 1);
                }
            });
            this.owner.territory.push(field); //add to owner's realm's territory
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
        return this.getRoomPointsSansOfficers() + this.officerCount * Constants.OFFICER_RP;
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