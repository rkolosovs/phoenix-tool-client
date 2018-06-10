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

import {Army} from "./armies/army";
import {Field} from "./map/field";
import {Realm} from "./realm";
import {River} from "./map/river";
import {Building} from "./buildings/building";
import {PhoenixEvent} from "./events/event";

export class GameState{
    static realms: Realm[] = [];
    static fields: Field[] = [];
    static rivers: River[] = [];
    static armies: Army[] = [];
    static buildings: Building[] = [];
    static newEvents: PhoenixEvent[] = [];
    static loadedEvents: PhoenixEvent[] = [];
    static login: string = "guest"; // either realm tag, "sl", or "guest"
    //"st" for start, "fi" for finished
    static currentTurn: {'turn': number, 'realm': string, 'status': string} = {'turn': 0, 'realm': "sl", 'status': "st"};

    static reset(): void {
        this.realms = [];
        this.fields = [];
        this.rivers = [];
        this.armies = [];
        this.buildings = [];
        this.newEvents = [];
        this.loadedEvents = [];
        this.login = "guest";
        this.currentTurn = {'turn': 0, 'realm': "sl", 'status': "st"};
    }
    //TODO: containers for characters, mages, etc.
}