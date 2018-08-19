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
import {Move} from "../../gameLogic/move";

export abstract class MobileEntity extends MapEntity{
    static readonly MAX_MOVE_POINTS: number = 42;
    static readonly MAX_HEIGHT_POINTS: number = 2;
    protected oldPosition: [number, number] = [0, 0];
    protected movePoints: number = MobileEntity.MAX_MOVE_POINTS;
    protected heightPoints: number = MobileEntity.MAX_HEIGHT_POINTS;
    protected id: number;
    public possibleMoves: Move[] = [];
    public onMultifield: boolean = false;

    constructor(id: number, owner: Realm, position: [number, number], movePoints: number, heightPoints: number){
        super(position, owner);
        // copy the position so that this object doesn't share a reference with anything else
        this.id = id;
        this.oldPosition[0] = position[0];
        this.oldPosition[1] = position[1];
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }

    getMaxMovePoints(): number{
        return MobileEntity.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return MobileEntity.MAX_HEIGHT_POINTS;
    }

    setMovePoints(value: number): void{
        this.movePoints = Math.min(this.getMaxMovePoints(), Math.max(0, value));
    }

    getHeightPoints(): number {
        return this.heightPoints;
    }

    setHeightPoints(value: number): void{
        this.heightPoints = Math.min(this.getMaxHeightPoints(), Math.max(0, value));
    }

    getID(): number{
        return this.id;
    }

    setID(value: number): void{
        this.id = value%100;
    }
}