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

import {BuildingType, Realm, DestructibleBuilding} from "../types";

export class ProductionBuilding extends DestructibleBuilding{
    constructor(type: BuildingType, protected name: string, position: [number, number], owner: Realm,
                buildPoints: number){
        super(type, position, owner, buildPoints);
    }

    buildingAsJSON(): {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
        'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
        'guardCount': number|undefined, 'buildPoints': number|undefined}{
        return {'realm': this.owner.tag, 'name': this.name, 'type': this.type, 'firstX': this.position[0],
            'firstY': this.position[1], 'secondX': undefined, 'secondY': undefined, 'direction': undefined,
            'guardCount': undefined, 'buildPoints': this.buildPoints};
    }

    setName(newName: string): void{
        this.name = newName;
    }

    getName(): string{
        return this.name;
    }

    //TODO: production functions, knowing its production capacity etc.
}