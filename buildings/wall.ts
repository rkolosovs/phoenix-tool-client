import {Direction, directionToString} from "../map/direction";
import {DestructibleBuilding} from "./destructibleBuilding";
import {BuildingType} from "./building";
import {Realm} from "../realm";
import {Constants} from "../constants";
import {GameState} from "../gameState";

export class Wall extends DestructibleBuilding{

    constructor(type: BuildingType, position: [number, number], owner: Realm, buildPoints: number,
                readonly facing: Direction, protected guardCount: number){
        super(type, position, owner, buildPoints);
    }

    getMaxBP(): number{
        return Constants.WALL_BP;
    }

    getGuardCount(): number{
        return this.guardCount;
    }

    setGuardCount(newCount: number): void{
        this.guardCount = Math.min(Math.max(0, newCount), Constants.WALL_MAX_GUARD);
        if(this.guardCount === 0){
            GameState.buildings.splice(GameState.buildings.findIndex(
                building => building === this), 1);
        }
    }

    buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined}{
        return {'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined,
            'direction': directionToString(this.facing), 'guardCount': this.guardCount, 'buildPoints': this.buildPoints};
    }
}