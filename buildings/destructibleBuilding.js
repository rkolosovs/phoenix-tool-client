"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
class DestructibleBuilding extends building_1.Building {
    //TODO: know own BP
    constructor(type, position, owner, buildPoints) {
        super(type, position, owner);
        //TODO: set own BP
    }
}
exports.DestructibleBuilding = DestructibleBuilding;
