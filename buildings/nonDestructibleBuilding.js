"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
class NonDestructibleBuilding extends building_1.Building {
    constructor(type, position, secondPosition, owner) {
        super(type, position, owner);
        //as per Erkenfara rules all non-destructible buildings go over two fields
        this.secondPosition = [0, 0];
        this.secondPosition = secondPosition;
    }
    getSecondPosition() {
        return this.secondPosition;
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': this.secondPosition[0], 'secondY': this.secondPosition[0],
            'direction': undefined, 'guardCount': undefined, 'buildPoints': undefined };
    }
}
exports.NonDestructibleBuilding = NonDestructibleBuilding;
