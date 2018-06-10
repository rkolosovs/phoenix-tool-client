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

export const enum FieldType{
    SHALLOWS = 0, //"Wasser" in Erkenfara rules
    DEEPSEA = 1, //"Tiefsee"
    LOWLANDS = 2, //"Tiefland"
    WOODS = 3, //"Wald"
    HILLS = 4, //"Hochland"
    HIGHLANDS = 5, //"Bergland"
    MOUNTAINS = 6, //"Gebirge"
    DESERT = 7, //"Wüste"
    SWAMP = 8 //"Sumpf"
}

export class Field{
    readonly coordinates: [number, number];
    type: FieldType;

    constructor(coordinates: [number, number], type: FieldType){
        this.coordinates = coordinates;
        this.type = type;
    }

    getHeight(): number{
        switch(this.type){
            case FieldType.SHALLOWS:
            case FieldType.DEEPSEA: return 0;

            case FieldType.LOWLANDS:
            case FieldType.WOODS:
            case FieldType.DESERT:
            case FieldType.SWAMP: return 1;

            case FieldType.HILLS: return 2;

            case FieldType.HIGHLANDS: return 3;

            case FieldType.MOUNTAINS: return 4;

            default: return -1;
        }
    }
}