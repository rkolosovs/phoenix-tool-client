import {BuildingType, Building} from "./building";
import {Realm} from "../realm";

export class NonDestructibleBuilding extends Building{
    protected secondPosition: [number, number]; //as per Erkenfara rules all non-destructible buildings go over two fields

    constructor(type: BuildingType, position: [number, number], secondPosition: [number, number], owner: Realm){
        super(type, position, owner);
        this.secondPosition = secondPosition;
    }

    getSecondPosition(): [number, number] {
        return this.secondPosition;
    }

    //TODO: useful helper functions e.g.:
    //      position, position -> position, direction converter
    //      factory methods for bridges, streets, harbors. possibly with db format as input
}