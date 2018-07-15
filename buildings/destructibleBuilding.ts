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

import {BuildingType, Building} from "./building";
import {Realm} from "../realm";
import {Constants} from "../constants";

export abstract class DestructibleBuilding extends Building{

    constructor(type: BuildingType, position: [number, number], owner: Realm, protected buildPoints: number){
        super(type, position, owner);
    }

    getMaxBP(): number{
        switch(this.type){
            case BuildingType.CASTLE: return Constants.CASTLE_BP;
            case BuildingType.CITY: return Constants.CITY_BP;
            case BuildingType.FORTRESS: return Constants.FORTRESS_BP;
            case BuildingType.CAPITAL: return Constants.CAPITAL_BP;
            case BuildingType.CAPITAL_FORT: return Constants.CAPITAL_FORTRESS_BP;
            default: return 0;
        }
    }

    setBuildPoints(newBP: number): void{
        this.buildPoints = Math.min(Math.max(0, newBP), this.getMaxBP());
    }

    getBuildPoints(): number{
        return this.buildPoints;
    }
}