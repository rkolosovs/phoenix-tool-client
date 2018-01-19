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

abstract class Building extends MapEntity{

    constructor(_type: BuildingType, _position: [number, number], _owner: Realm){
        super(_position, _owner);
        this.type = _type;
    }

    set type(newType: BuildingType){
        this.type = newType;
    }
    
    get type(){//TODO see if it is realy readonly(godmode makes changes) and change here accordingly
        return this.type;
    }
}