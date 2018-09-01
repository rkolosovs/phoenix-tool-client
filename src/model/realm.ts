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

import {Field, FieldType} from "./map/field";

export class Realm {
    name: string = "";
    tag: string = "";
    color: string = "000,000,000";
    homeTurf: FieldType = FieldType.SHALLOWS;
    territory: Field[] = [];
    active: boolean;

    constructor(name: string, tag: string, color: string, homeTurf: FieldType, active: boolean){
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
        this.active = active;
    }

    getTerritoryCoordinates(): [number, number][]{
        return this.territory.map(field => field.coordinates);
    }
}