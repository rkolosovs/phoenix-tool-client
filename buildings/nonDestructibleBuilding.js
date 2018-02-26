"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
class NonDestructibleBuilding extends building_1.Building {
    constructor(type, position, secondPosition, owner) {
        super(type, position, owner);
        this.secondPosition = secondPosition;
    }
    getSecondPosition() {
        return this.secondPosition;
    }
}
exports.NonDestructibleBuilding = NonDestructibleBuilding;
