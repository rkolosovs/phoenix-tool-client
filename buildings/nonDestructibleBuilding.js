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
//# sourceMappingURL=nonDestructibleBuilding.js.map