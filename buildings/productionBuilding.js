"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destructibleBuilding_1 = require("./destructibleBuilding");
class ProductionBuilding extends destructibleBuilding_1.DestructibleBuilding {
    constructor(type, name, position, owner, buildPoints) {
        super(type, position, owner, buildPoints);
        this.name = name;
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': this.name, 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined, 'direction': undefined,
            'guardCount': undefined, 'buildPoints': this.buildPoints };
    }
    setName(newName) {
        this.name = newName;
    }
    getName() {
        return this.name;
    }
}
exports.ProductionBuilding = ProductionBuilding;
