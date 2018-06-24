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
class DestructibleBuilding extends types_1.Building {
    constructor(type, position, owner, buildPoints) {
        super(type, position, owner);
        this.buildPoints = buildPoints;
    }
    getMaxBP() {
        switch (this.type) {
            case 0 /* CASTLE */: return types_1.Constants.CASTLE_BP;
            case 1 /* CITY */: return types_1.Constants.CITY_BP;
            case 2 /* FORTRESS */: return types_1.Constants.FORTRESS_BP;
            case 3 /* CAPITAL */: return types_1.Constants.CAPITAL_BP;
            case 4 /* CAPITAL_FORT */: return types_1.Constants.CAPITAL_FORTRESS_BP;
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
//# sourceMappingURL=destructibleBuilding.js.map