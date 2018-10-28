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

import {LandArmy} from "./landArmy";
import {Realm} from "../realm";

export class RiderArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 21;
    static readonly MAX_HEIGHT_POINTS = 2;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, position: [number, number], 
        movePoints: number, heightPoints: number, isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints);
        }
    }

    canHaveCatapults(): boolean{
        return false;
    }

    getMaxMovePoints(): number{
        return RiderArmy.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return RiderArmy.MAX_HEIGHT_POINTS;
    }
}