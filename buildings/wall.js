"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
class Wall extends types_1.DestructibleBuilding {
    constructor(type, position, owner, buildPoints, facing, guardCount) {
        super(type, position, owner, buildPoints);
        this.facing = facing;
        this.guardCount = guardCount;
    }
    getMaxBP() {
        return types_1.Constants.WALL_BP;
    }
    getGuardCount() {
        return this.guardCount;
    }
    setGuardCount(newCount) {
        this.guardCount = Math.min(Math.max(0, newCount), types_1.Constants.WALL_MAX_GUARD);
        if (this.guardCount === 0) {
            types_1.GameState.buildings.splice(types_1.GameState.buildings.findIndex(building => building === this), 1);
        }
    }
    buildingAsJSON() {
        return { 'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined,
            'direction': types_1.directionToString(this.facing), 'guardCount': this.guardCount, 'buildPoints': this.buildPoints };
    }
}
exports.Wall = Wall;
//# sourceMappingURL=wall.js.map