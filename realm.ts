class Realm {
    name: string = "";
    tag: string = "";
    color: string = "000,000,000";
    homeTurf: FieldType = FieldType.SHALLOWS;
    territory: Field[] = [];
    active: boolean;

    constructor(name: string, tag: string, color: string, homeTurf: FieldType, active: boolean){
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
        this.active = active;
    }

    getTerritoryCoordinates(): [number, number][]{
        return this.territory.map(field => field.coordinates);
    }
}