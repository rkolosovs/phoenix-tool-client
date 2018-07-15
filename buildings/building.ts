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

import {MapEntity} from "../map/mapEntity";
import {Realm} from "../realm";

export const enum BuildingType{
    CASTLE = 0, //"Burg" in Erkenfara rules
    CITY = 1, //"Stadt"
    FORTRESS = 2, //"Festung"
    CAPITAL = 3, //"Hauptstadt"
    CAPITAL_FORT = 4, //"Festungshauptstadt"
    WALL = 5, //"Wall"
    HARBOR = 6, //"Kaianlage"
    BRIDGE = 7, //"Brücke"
    STREET = 8 //"Straße"
}

export abstract class Building extends MapEntity{

    constructor(public type: BuildingType, position: [number, number], owner: Realm){
        super(position, owner);
    }

    abstract buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined};
}