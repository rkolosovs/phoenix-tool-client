"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
const constants_1 = require("../constants");
class DestructibleBuilding extends building_1.Building {
    constructor(type, position, owner, buildPoints) {
        super(type, position, owner);
        this.buildPoints = buildPoints;
    }
    getMaxBP() {
        switch (this.type) {
            case 0 /* CASTLE */: return constants_1.Constants.CASTLE_BP;
            case 1 /* CITY */: return constants_1.Constants.CITY_BP;
            case 2 /* FORTRESS */: return constants_1.Constants.FORTRESS_BP;
            case 3 /* CAPITAL */: return constants_1.Constants.CAPITAL_BP;
            case 4 /* CAPITAL_FORT */: return constants_1.Constants.CAPITAL_FORTRESS_BP;
            default: return 0;
        }
    }
    setBuildPoints(newBP) {
        this.buildPoints = Math.min(Math.max(0, newBP), this.getMaxBP());
    }
    getBuildPoints() {
        return this.buildPoints;
    }
}
exports.DestructibleBuilding = DestructibleBuilding;
