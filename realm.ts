class Realm {
    name: string = "";
    tag: string = "";
    color: string = "000,000,000";
    homeTurf: FieldType = FieldType.SHALLOWS;
    territory: Field[] = [];

    constructor(name: string, tag: string, color: string, homeTurf: FieldType){
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
    }
}