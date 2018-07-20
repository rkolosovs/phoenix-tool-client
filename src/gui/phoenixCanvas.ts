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

import {mouseDown, mouseMove, mouseWheel} from "../controls/mouseFunctions";

export class PhoenixCanvas{
    private element: HTMLCanvasElement;

    constructor(id: string){
        this.element = document.getElementById(id) as HTMLCanvasElement;
        this.element.addEventListener('mousedown', mouseDown, true );
        this.element.addEventListener('mousemove', mouseMove, true );
        this.element.addEventListener('wheel', mouseWheel, true );
    }

    resize(): void{
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

    clear(): void{
        (this.element.getContext('2d') as CanvasRenderingContext2D).
            clearRect(0, 0, this.element.width, this.element.height);
    }
}