class ProductionBuilding extends DestructibleBuilding{
    constructor(type: BuildingType, position: [number, number], owner: Realm, buildPoints: number){
        super(type, position, owner, buildPoints);
    }

    //TODO: production functions, knowing its production capacity etc.
}