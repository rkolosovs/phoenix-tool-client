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

import {Realm} from "../realm";
import {Field} from "../map/field";
import {MobileEntity} from "./mobileEntity";

export abstract class Army extends MobileEntity{
    protected troopCount: number;
    protected officerCount: number;
    protected lightCatapultCount: number = 0;
    protected heavyCatapultCount: number = 0;
    protected lightCatapultsShot: number = 0;
    protected heavyCatapultsShot: number = 0;
    multiArmyField: boolean = false;
    targetList: [number, number][] = [];
    isGuard: boolean = false;
    wasShotAt: boolean = false;
    possibleTargets: Field[] = [];

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, heightPoints: number,
                isGuard?: boolean){
        super(id, owner, position, movePoints, heightPoints);

        this.troopCount = Math.max(0, troopCount);
        this.officerCount = Math.max(0, officerCount);
        if(isGuard != undefined){this.isGuard = isGuard;}
        this.setLightCatapultCount(lightCatapultCount);
        this.setHeavyCatapultCount(heavyCatapultCount);
    }

    abstract canHaveCatapults(): boolean;

    getLightCatapultCount(): number{
        return this.lightCatapultCount;
    }

    setLightCatapultCount(value: number): void{
        if(this.canHaveCatapults()) {
            this.lightCatapultCount = Math.max(0, value);
        }
    }

    getHeavyCatapultCount(): number{
        return this.heavyCatapultCount;
    }

    setHeavyCatapultCount(value: number): void{
        if(this.canHaveCatapults()) {
            this.heavyCatapultCount = Math.max(0, value);
        }
    }
}