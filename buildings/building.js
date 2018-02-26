"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEntity_1 = require("../map/mapEntity");
class Building extends mapEntity_1.MapEntity {
    constructor(type, position, owner) {
        super(position, owner);
        this.type = type;
    }
}
exports.Building = Building;
