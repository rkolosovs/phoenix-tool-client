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
//This collects all the rule based "magic numbers" in addition to some useful mathematical constants.
var Constants;
(function (Constants) {
    Constants.SQRT3 = Math.sqrt(3); //about 1.732050808...
    Constants.SIN60 = 0.5 * Constants.SQRT3; //about 0.8660254037...
    Constants.OFFICER_RP = 100;
    Constants.SHIP_RP = 100;
    Constants.GUARD_RP_MULT = 3;
    Constants.LIGHT_WS_RP = 1000;
    Constants.HEAVY_WS_RP = 2000;
    Constants.SHIP_TRANSPORT_CAPACITY = 100;
    Constants.FOOTMAN_RP = 1;
    Constants.RIDER_RP = 2;
    Constants.LIGHT_CATA_RP = 1000;
    Constants.HEAVY_CATA_RP = 2000;
    Constants.MOUNT_RP = 1;
    Constants.FOOTMAN_BP = 0.1;
    Constants.MOUNT_BP = 0.1;
    Constants.RIDER_BP = 0.2;
    Constants.SHIP_BP = 10;
    Constants.LIGHT_CATA_BP = 200;
    Constants.HEAVY_CATA_BP = 400;
    Constants.LIGHT_WS_BP = 200;
    Constants.HEAVY_WS_BP = 400;
    Constants.CASTLE_BP = 1000;
    Constants.CITY_BP = 2000;
    Constants.FORTRESS_BP = 3000;
    Constants.CAPITAL_BP = 5000;
    Constants.CAPITAL_FORTRESS_BP = 6000;
    Constants.WALL_BP = 100;
    Constants.WALL_MAX_GUARD = 400;
    Constants.LIGHT_CATA_DAMAGE = [225, 200, 175, 150, 125, 100, 70, 40, 10, 5];
    Constants.HEAVY_CATA_DAMAGE_NEAR = [300, 270, 240, 210, 180, 150, 120, 90, 60, 30];
    Constants.HEAVY_CATA_DAMAGE_HIGH = [120, 100, 80, 65, 50, 40, 30, 10, 5, 0];
    Constants.HEAVY_CATA_DAMAGE_FARANDHIGH = [150, 120, 100, 80, 65, 50, 40, 30, 10, 5];
    Constants.HEAVY_CATA_DAMAGE_FAR = [150, 130, 110, 90, 70, 50, 30, 10, 5, 0];
    Constants.LIGHT_WS_DAMAGE = [175, 150, 125, 100, 75, 50, 25, 10, 5, 0];
    Constants.HEAVY_WS_DAMAGE_NEAR = [250, 220, 190, 160, 130, 100, 70, 40, 10, 5];
    Constants.HEAVY_WS_DAMAGE_HIGH = [100, 80, 65, 50, 40, 30, 10, 5, 0, 0];
    Constants.HEAVY_WS_DAMAGE_FARANDHIGH = [120, 100, 80, 65, 50, 40, 30, 10, 5, 0];
    Constants.HEAVY_WS_DAMAGE_FAR = [100, 80, 60, 40, 20, 10, 5, 0, 0, 0];
})(Constants = exports.Constants || (exports.Constants = {}));
//# sourceMappingURL=constants.js.map