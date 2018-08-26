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

import {
    LOG_IN, LOG_OUT, Action, ADD_REALMS, SET_REALMS, REMOVE_REALMS, UPDATE_REALMS, ADD_FIELDS,
    SET_FIELDS, REMOVE_FIELDS, UPDATE_FIELDS, ADD_RIVERS, SET_RIVERS, REMOVE_RIVERS, ADD_ARMIES, SET_ARMIES,
    REMOVE_ARMIES, UPDATE_ARMIES, ADD_BUILDINGS, SET_BUILDINGS, REMOVE_BUILDINGS, UPDATE_BUILDINGS, ADD_NEW_EVENTS,
    SET_NEW_EVENTS, REMOVE_NEW_EVENTS, UPDATE_NEW_EVENTS, SET_LOADED_EVENTS, UPDATE_LOADED_EVENTS, SET_CURRENT_TURN
} from "./actions";
import {GameState, initialState, Login, Turn, TurnStatus, UserGroup} from "./gameState";
import {Realm} from "../model/realm";
import {Field} from "../model/map/field";
import {River} from "../model/map/river";
import {Army} from "../model/armies/army";
import {Building} from "../model/buildings/building";
import {PhoenixEvent} from "../model/events/event";

function loginReducer (state: Login = {name: 'stranger', group: UserGroup.GUEST, realm: undefined}, action: Action<any>) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, (action as Action<LOG_IN>).payload.login);
        case LOG_OUT:
            return Object.assign({}, state, initialState.login);
        default:
            return state;
    }
}

function realmsReducer (state: Realm[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_REALMS:
            return [].concat(state.concat((action as Action<ADD_REALMS>).payload.newRealms));
        case SET_REALMS:
            return [].concat((action as Action<SET_REALMS>).payload.newRealms);
        case REMOVE_REALMS:
            return state.filter((realm, index) => {
                return (action as Action<REMOVE_REALMS>).payload.idsToRemove.indexOf(index) === -1;
            });
        case UPDATE_REALMS:
            let updatedRealms = (action as Action<UPDATE_REALMS>).payload.updatedRealms;
            return state.map((realm, index) => {
                const updateInstr = updatedRealms.find(rlm => rlm.id === index);
                if (updateInstr != undefined){
                    const updatedRealm = updateInstr.updatedRealm;
                    realm.name = updatedRealm.name;
                    realm.tag = updatedRealm.tag;
                    realm.territory = updatedRealm.territory;
                    realm.color = updatedRealm.color;
                    realm.homeTurf = updatedRealm.homeTurf;
                    realm.active = updatedRealm.active;
                    return realm;
                } else {
                    return realm;
                }
            });
        default:
            return state;
    }
}

function fieldsReducer (state: Field[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_FIELDS:
        case SET_FIELDS:
        case REMOVE_FIELDS:
        case UPDATE_FIELDS:
        default:
            return state;
    }
}

function riversReducer (state: River[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_RIVERS:
        case SET_RIVERS:
        case REMOVE_RIVERS:
        default:
            return state;
    }
}

function armiesReducer (state: Army[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_ARMIES:
        case SET_ARMIES:
        case REMOVE_ARMIES:
        case UPDATE_ARMIES:
        default:
            return state;
    }
}

function buildingsReducer (state: Building[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_BUILDINGS:
        case SET_BUILDINGS:
        case REMOVE_BUILDINGS:
        case UPDATE_BUILDINGS:
        default:
            return state;
    }
}

function newEventsReducer (state: PhoenixEvent[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_NEW_EVENTS:
        case SET_NEW_EVENTS:
        case REMOVE_NEW_EVENTS:
        case UPDATE_NEW_EVENTS:
        default:
            return state;
    }
}

function loadedEventsReducer (state: PhoenixEvent[] = [], action: Action<any>) {
    switch (action.type) {
        case SET_LOADED_EVENTS:
        case UPDATE_LOADED_EVENTS:
        default:
            return state;
    }
}

function currentTurnReducer (state: Turn = {turn: 0, realm: "sl", status: TurnStatus.STARTED}, action: Action<any>) {
    switch (action.type) {
        case SET_CURRENT_TURN:
        default:
            return state;
    }
}

export default (state: GameState = initialState, action: Action<any>): GameState => {
    return {
        realms: realmsReducer(state.realms, action),
        fields: fieldsReducer(state.fields, action),
        rivers: riversReducer(state.rivers, action),
        armies: armiesReducer(state.armies, action),
        buildings: buildingsReducer(state.buildings, action),
        newEvents: newEventsReducer(state.newEvents, action),
        loadedEvents: loadedEventsReducer(state.loadedEvents, action),
        currentTurn: currentTurnReducer(state.currentTurn, action),
        login: loginReducer(state.login, action)
    };
}