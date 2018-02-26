"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destructibleBuilding_1 = require("./destructibleBuilding");
class ProductionBuilding extends destructibleBuilding_1.DestructibleBuilding {
    constructor(type, position, owner, buildPoints) {
        super(type, position, owner, buildPoints);
    }
}
exports.ProductionBuilding = ProductionBuilding;
