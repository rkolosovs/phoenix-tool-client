class Wall extends DestructibleBuilding{
    readonly facing: Direction;
    //TODO: Know number of soldiers inside

    constructor(type: BuildingType, position: [number, number], owner: Realm, buildPoints: number, facing: Direction, guardCount: number){
        super(type, position, owner, buildPoints);
        this.facing = facing;
        //TODO: set number of soldiers
    }

    //TODO: getter and setter for number of soldiers
}