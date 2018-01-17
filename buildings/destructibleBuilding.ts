abstract class DestructibleBuilding extends Building{
    //TODO: know own BP

    constructor(type: BuildingType, position: [number, number], owner: Realm, buildPoints: number){
        super(type, position, owner);
        //TODO: set own BP
    }

    //TODO: setter and getter for BP, getter for own maxBP
}