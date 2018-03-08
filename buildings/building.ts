import {MapEntity} from "../map/mapEntity";
import {Realm} from "../realm";

export const enum BuildingType{
    CASTLE = 0, //"Burg" in Erkenfara rules
    CITY = 1, //"Stadt"
    FORTRESS = 2, //"Festung"
    CAPITAL = 3, //"Hauptstadt"
    CAPITAL_FORT = 4, //"Festungshauptstadt"
    WALL = 5, //"Wall"
    HARBOR = 6, //"Kaianlage"
    BRIDGE = 7, //"Brücke"
    STREET = 8 //"Straße"
}

export abstract class Building extends MapEntity{

    constructor(public type: BuildingType, position: [number, number], owner: Realm){
        super(position, owner);
    }

    abstract buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined};
}