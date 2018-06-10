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
class Realm {
    constructor(name, tag, color, homeTurf, active) {
        this.name = "";
        this.tag = "";
        this.color = "000,000,000";
        this.homeTurf = 0 /* SHALLOWS */;
        this.territory = [];
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
        this.active = active;
    }
    getTerritoryCoordinates() {
        return this.territory.map(field => field.coordinates);
    }
}
exports.Realm = Realm;
//# sourceMappingURL=realm.js.map