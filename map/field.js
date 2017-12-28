var FieldType;
(function (FieldType) {
    FieldType[FieldType["SHALLOWS"] = 0] = "SHALLOWS";
    FieldType[FieldType["DEEPSEA"] = 1] = "DEEPSEA";
    FieldType[FieldType["LOWLANDS"] = 2] = "LOWLANDS";
    FieldType[FieldType["WOODS"] = 3] = "WOODS";
    FieldType[FieldType["HILLS"] = 4] = "HILLS";
    FieldType[FieldType["HIGHLANDS"] = 5] = "HIGHLANDS";
    FieldType[FieldType["MOUNTAINS"] = 6] = "MOUNTAINS";
    FieldType[FieldType["DESERT"] = 7] = "DESERT";
    FieldType[FieldType["SWAMP"] = 8] = "SWAMP"; //"Sumpf"
})(FieldType || (FieldType = {}));
class Field {
    constructor(coordinates, type) {
        this.coordinates = coordinates;
        this.type = type;
    }
    getHeight() {
        switch (this.type) {
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
