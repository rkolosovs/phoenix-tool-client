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

import {PhoenixCanvas} from "./phoenixCanvas";

export class GUI{
    //this holds all our UI elements and their getters (with on-demand fetching from DOM)
    private static mapCanvas: PhoenixCanvas;

    static getMapCanvas(): PhoenixCanvas{
        if(this.mapCanvas == undefined){
            this.mapCanvas = new PhoenixCanvas("mapCanvas");
        }
        return this.mapCanvas;
    }
}