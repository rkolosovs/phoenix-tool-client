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

import {BuildingType, Building, Realm} from "../types";

export class NonDestructibleBuilding extends Building{
    //as per Erkenfara rules all non-destructible buildings go over two fields
    protected secondPosition: [number, number] = [0, 0];

    constructor(type: BuildingType, position: [number, number], secondPosition: [number, number], owner: Realm){
        super(type, position, owner);
        this.secondPosition = secondPosition;
    }

    getSecondPosition(): [number, number] {
        return this.secondPosition;
    }

    buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined}{
        return {'realm': this.owner.tag, 'name': "", 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': this.secondPosition[0], 'secondY': this.secondPosition[0],
            'direction': undefined, 'guardCount': undefined, 'buildPoints': undefined};
    }
}