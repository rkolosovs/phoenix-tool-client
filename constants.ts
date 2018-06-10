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

//This collects all the rule based "magic numbers" in addition to some useful mathematical constants.
export namespace Constants{
    export const SQRT3 = Math.sqrt(3); //about 1.732050808...
    export const SIN60 = 0.5 * SQRT3; //about 0.8660254037...
    export const OFFICER_RP: number = 100;
    export const SHIP_RP: number = 100;
    export const GUARD_RP_MULT: number = 3;
    export const LIGHT_WS_RP: number = 1000;
    export const HEAVY_WS_RP: number = 2000;
    export const SHIP_TRANSPORT_CAPACITY: number = 100;
    export const FOOTMAN_RP: number = 1;
    export const RIDER_RP: number = 2;
    export const LIGHT_CATA_RP: number = 1000;
    export const HEAVY_CATA_RP: number = 2000;
    export const MOUNT_RP: number = 1;
    export const FOOTMAN_BP: number = 0.1;
    export const MOUNT_BP: number = 0.1;
    export const RIDER_BP: number = 0.2;
    export const SHIP_BP: number = 10;
    export const LIGHT_CATA_BP: number = 200;
    export const HEAVY_CATA_BP: number = 400;
    export const LIGHT_WS_BP: number = 200;
    export const HEAVY_WS_BP: number = 400;
    export const CASTLE_BP: number = 1000;
    export const CITY_BP: number = 2000;
    export const FORTRESS_BP: number = 3000;
    export const CAPITAL_BP: number = 5000;
    export const CAPITAL_FORTRESS_BP: number = 6000;
    export const WALL_BP: number = 100;
    export const WALL_MAX_GUARD: number = 400;
    export const LIGHT_CATA_DAMAGE: number[] = [225, 200, 175, 150, 125, 100, 70, 40, 10, 5];
    export const HEAVY_CATA_DAMAGE_NEAR: number[] = [300, 270, 240, 210, 180, 150, 120, 90, 60, 30];
    export const HEAVY_CATA_DAMAGE_HIGH: number[] = [120, 100, 80, 65, 50, 40, 30, 10, 5, 0];
    export const HEAVY_CATA_DAMAGE_FARANDHIGH: number[] = [150, 120, 100, 80, 65, 50, 40, 30, 10, 5];
    export const HEAVY_CATA_DAMAGE_FAR: number[] = [150, 130, 110, 90, 70, 50, 30, 10, 5, 0];
    export const LIGHT_WS_DAMAGE: number[] = [175, 150, 125, 100, 75, 50, 25, 10, 5, 0];
    export const HEAVY_WS_DAMAGE_NEAR: number[] = [250, 220, 190, 160, 130, 100, 70, 40, 10, 5];
    export const HEAVY_WS_DAMAGE_HIGH: number[] = [100, 80, 65, 50, 40, 30, 10, 5, 0, 0];
    export const HEAVY_WS_DAMAGE_FARANDHIGH: number[] = [120, 100, 80, 65, 50, 40, 30, 10, 5, 0];
    export const HEAVY_WS_DAMAGE_FAR: number[] = [100, 80, 60, 40, 20, 10, 5, 0, 0, 0];
}