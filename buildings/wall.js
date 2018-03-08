"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../map/direction");
const destructibleBuilding_1 = require("./destructibleBuilding");
const constants_1 = require("../constants");
const gameState_1 = require("../gameState");
class Wall extends destructibleBuilding_1.DestructibleBuilding {
    constructor(type, position, owner, buildPoints, facing, guardCount) {
        super(type, position, owner, buildPoints);
        this.facing = facing;
        this.guardCount = guardCount;
    }
    getMaxBP() {
        return constants_1.Constants.WALL_BP;
    }
    getGuardCount() {
        return this.guardCount;
    }
    setGuardCount(newCount) {
        this.guardCount = Math.min(Math.max(0, newCount), constants_1.Constants.WALL_MAX_GUARD);
        if (this.guardCount === 0) {
            gameState_1.GameState.buildings.splice(gameState_1.GameState.buildings.findIndex(building => building === this), 1);
        }
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined,
            'direction': direction_1.directionToString(this.facing), 'guardCount': this.guardCount, 'buildPoints': this.buildPoints };
    }
}
exports.Wall = Wall;
