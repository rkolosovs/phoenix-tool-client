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

export class FootArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 9;
    protected mountCount: number;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, mountCount: number, position: [number, number], movePoints: number,
                heightPoints: number, isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints);
        }
        this.mountCount = mountCount;
    }

    canHaveCatapults(): boolean{
        return !this.isGuard;
    }
}