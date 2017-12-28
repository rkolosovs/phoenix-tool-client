enum BuildingType{
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

class Building extends MapEntity{
    readonly type: BuildingType;

    constructor(type: BuildingType, position: [number, number], owner: Realm){
        super(position, owner);
        this.type = type;
    }
}