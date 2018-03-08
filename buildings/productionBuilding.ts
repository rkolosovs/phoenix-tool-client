import {BuildingType} from "./building";
import {Realm} from "../realm";
import {DestructibleBuilding} from "./destructibleBuilding";

export class ProductionBuilding extends DestructibleBuilding{
    constructor(type: BuildingType, protected name: string, position: [number, number], owner: Realm,
                buildPoints: number){
        super(type, position, owner, buildPoints);
    }

    buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined}{
        return {'realm': this.owner.tag, 'name': this.name, 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined, 'direction': undefined,
            'guardCount': undefined, 'buildPoints': this.buildPoints};
    }

    setName(newName: string): void{
        this.name = newName;
    }

    getName(): string{
        return this.name;
    }

    //TODO: production functions, knowing its production capacity etc.
}