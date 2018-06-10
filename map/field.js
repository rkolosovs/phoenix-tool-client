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
class Field {
    constructor(coordinates, type) {
        this.coordinates = coordinates;
        this.type = type;
    }
    getHeight() {
        switch (this.type) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */: return 0;
            case 2 /* LOWLANDS */:
            case 3 /* WOODS */:
            case 7 /* DESERT */:
            case 8 /* SWAMP */: return 1;
            case 4 /* HILLS */: return 2;
            case 5 /* HIGHLANDS */: return 3;
            case 6 /* MOUNTAINS */: return 4;
            default: return -1;
        }
    }
}
exports.Field = Field;
//# sourceMappingURL=field.js.map