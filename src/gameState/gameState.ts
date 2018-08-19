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

import {createStore} from "redux";
import {reducers} from "./reducers";
import {Realm} from "../model/realm";
import {Field} from "../model/map/field";
import {River} from "../model/map/river";
import {PhoenixEvent} from "../model/events/event";
import {Army} from "../model/armies/army";
import {Building} from "../model/buildings/building";

export const enum TurnStatus {
    STARTED = "st",
    FINISHED = "fi"
}

export const enum UserGroup {
    PLAYER = "player",
    GAME_MASTER = "sl",
    GUEST = "guest"
}

export type Turn = {
    'turn': number,
    'realm': string,
    'status': TurnStatus
}

export type Login = {
    'name': string,
    'group': UserGroup,
    'realm': Realm|undefined
}

export type GameState = {
    realms: Realm[];
    fields: Field[];
    rivers: River[];
    armies: Army[];
    buildings: Building[];
    newEvents: PhoenixEvent[];
    loadedEvents: PhoenixEvent[];
    currentTurn: Turn;
    login: Login;
};

export const initialState: GameState = {
    realms: [],
    fields: [],
    rivers: [],
    armies: [],
    buildings: [],
    newEvents: [],
    loadedEvents: [],
    currentTurn: {'turn': 0, 'realm': "sl", 'status': TurnStatus.STARTED},
    login: {'name': 'stranger', 'group': UserGroup.GUEST, 'realm': undefined}
};

export const store = createStore(reducers, initialState);