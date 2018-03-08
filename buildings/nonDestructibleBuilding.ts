import {BuildingType, Building} from "./building";
import {Realm} from "../realm";

export class NonDestructibleBuilding extends Building{
    //as per Erkenfara rules all non-destructible buildings go over two fields
    protected secondPosition: [number, number] = [0, 0];

    constructor(type: BuildingType, position: [number, number], secondPosition: [number, number], owner: Realm){
        super(type, position, owner);
        this.secondPosition = secondPosition;
    }

    getSecondPosition(): [number, number] {
        return this.secondPosition;
    }

    buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined}{
        return {'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': this.secondPosition[0], 'secondY': this.secondPosition[0],
            'direction': undefined, 'guardCount': undefined, 'buildPoints': undefined};
    }
}