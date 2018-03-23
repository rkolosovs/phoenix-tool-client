import {BuildingType, Building} from "./building";
import {Realm} from "../realm";
import {Constants} from "../constants";

export abstract class DestructibleBuilding extends Building{

    constructor(type: BuildingType, position: [number, number], owner: Realm, protected buildPoints: number){
        super(type, position, owner);
    }

    getMaxBP(): number{
        switch(this.type){
            case BuildingType.CASTLE: return Constants.CASTLE_BP;
            case BuildingType.CITY: return Constants.CITY_BP;
            case BuildingType.FORTRESS: return Constants.FORTRESS_BP;
            case BuildingType.CAPITAL: return Constants.CAPITAL_BP;
            case BuildingType.CAPITAL_FORT: return Constants.CAPITAL_FORTRESS_BP;
            default: return 0;
        }
    }

    setBuildPoints(newBP: number): void{
        this.buildPoints = Math.min(Math.max(0, newBP), this.getMaxBP());
    }

    getBuildPoints(): number{
        return this.buildPoints;
    }
}