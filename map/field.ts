export const enum FieldType{
    SHALLOWS = 0, //"Wasser" in Erkenfara rules
    DEEPSEA = 1, //"Tiefsee"
    LOWLANDS = 2, //"Tiefland"
    WOODS = 3, //"Wald"
    HILLS = 4, //"Hochland"
    HIGHLANDS = 5, //"Bergland"
    MOUNTAINS = 6, //"Gebirge"
    DESERT = 7, //"Wüste"
    SWAMP = 8 //"Sumpf"
}

export class Field{
    readonly coordinates: [number, number];
    type: FieldType;

    constructor(coordinates: [number, number], type: FieldType){
        this.coordinates = coordinates;
        this.type = type;
    }

    getHeight(): number{
        switch(this.type){
            case FieldType.SHALLOWS:
            case FieldType.DEEPSEA: return 0;

            case FieldType.LOWLANDS:
            case FieldType.WOODS:
            case FieldType.DESERT:
            case FieldType.SWAMP: return 1;

            case FieldType.HILLS: return 2;

            case FieldType.HIGHLANDS: return 3;

            case FieldType.MOUNTAINS: return 4;

            default: return -1;
        }
    }
}