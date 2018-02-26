"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destructibleBuilding_1 = require("./destructibleBuilding");
class Wall extends destructibleBuilding_1.DestructibleBuilding {
    //TODO: Know number of soldiers inside
    constructor(type, position, owner, buildPoints, facing, guardCount) {
        super(type, position, owner, buildPoints);
        this.facing = facing;
        //TODO: set number of soldiers
    }
}
exports.Wall = Wall;
