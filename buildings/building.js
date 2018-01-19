"use strict";
var BuildingType;
(function (BuildingType) {
    BuildingType[BuildingType["CASTLE"] = 0] = "CASTLE";
    BuildingType[BuildingType["CITY"] = 1] = "CITY";
    BuildingType[BuildingType["FORTRESS"] = 2] = "FORTRESS";
    BuildingType[BuildingType["CAPITAL"] = 3] = "CAPITAL";
    BuildingType[BuildingType["CAPITAL_FORT"] = 4] = "CAPITAL_FORT";
    BuildingType[BuildingType["WALL"] = 5] = "WALL";
    BuildingType[BuildingType["HARBOR"] = 6] = "HARBOR";
    BuildingType[BuildingType["BRIDGE"] = 7] = "BRIDGE";
    BuildingType[BuildingType["STREET"] = 8] = "STREET"; //"Straße"
})(BuildingType || (BuildingType = {}));
class Building extends MapEntity {
    constructor(_type, _position, _owner) {
        super(_position, _owner);
        this.type = _type;
    }
    set type(newType) {
        this.type = newType;
    }
    get type() {
        return this.type;
    }
}
