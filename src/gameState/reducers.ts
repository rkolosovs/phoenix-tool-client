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
            return Object.assign({}, state, action.payload.login);
        case LOG_OUT:
            return Object.assign({}, state, initialState.login);
        default:
            return state;
    }
}

function realmsReducer (state: Realm[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_REALMS:
            return [].concat(state.concat(action.payload.newRealms));
        case SET_REALMS:
            return [].concat(action.payload.newRealms);
        case REMOVE_REALMS:
            return state.filter((realm, index) => {
                return action.payload.idsToRemove.indexOf(index) === -1;
            });
        case UPDATE_REALMS:
            let updatedRealms = action.payload.updatedRealms;
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
            return [].concat(state.concat(action.payload.newFields));
        case SET_FIELDS:
            return action.payload.newFields;
        case REMOVE_FIELDS:
            return state.filter((realm, index) => {
                return action.payload.idsToRemove.indexOf(index) === -1;
            });
        case UPDATE_FIELDS:
            let updatedFields = action.payload.updatedFields;
            return state.map((field, index) => {
                const updateInstr = updatedFields.find(fld => fld.id === index);
                if (updateInstr != undefined){
                    const updatedField = updateInstr.updatedField;
                    field.type = updatedField.type;
                    return field;
                } else {
                    return field;
                }
            });
        default:
            return state;
    }
}

function riversReducer (state: River[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_RIVERS:
            return [].concat(state.concat(action.payload.newRivers));
        case SET_RIVERS:
            return action.payload.newRivers;
        case REMOVE_RIVERS:
            return state.filter((realm, index) => {
                return action.payload.idsToRemove.indexOf(index) === -1;
            });
        default:
            return state;
    }
}

function armiesReducer (state: Army[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_ARMIES:
            return [].concat(state.concat(action.payload.newArmies));
        case SET_ARMIES:
            return action.payload.newArmies;
        case REMOVE_ARMIES:
            return state.filter((realm, index) => {
                return action.payload.idsToRemove.indexOf(index) === -1;
            });
        case UPDATE_ARMIES:
            let updatedArmies = action.payload.updatedArmies;
            return state.map((army, index) => {
                const updateInstr = updatedArmies.find(arm => arm.id === index);
                if (updateInstr != undefined){
                    return updateInstr.updatedArmy;
                } else {
                    return army;
                }
            });
        default:
            return state;
    }
}

function buildingsReducer (state: Building[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_BUILDINGS:
            return [].concat(state.concat(action.payload.newBuildings));
        case SET_BUILDINGS:
            return action.payload.newBuildings;
        case REMOVE_BUILDINGS:
            return state.filter((realm, index) => {
                return action.payload.idsToRemove.indexOf(index) === -1;
            });
        case UPDATE_BUILDINGS:
            let updatedBuildings = action.payload.updatedBuildings;
            return state.map((building, index) => {
                const updateInstr = updatedBuildings.find(bld => bld.id === index);
                if (updateInstr != undefined){
                    return updateInstr.updatedBuilding;
                } else {
                    return building;
                }
            });
        default:
            return state;
    }
}

function newEventsReducer (state: PhoenixEvent[] = [], action: Action<any>) {
    switch (action.type) {
        case ADD_NEW_EVENTS:
            return [].concat(state.concat(action.payload.newEvents));
        case SET_NEW_EVENTS:
            return action.payload.newEvents;
        case REMOVE_NEW_EVENTS:
            return state.filter((realm, index) => {
                return action.payload.idsToRemove.indexOf(index) === -1;
            });
        case UPDATE_NEW_EVENTS:
            let updatedNewEvents = action.payload.updatedNewEvents;
            return state.map((newEvent, index) => {
                const updateInstr = updatedNewEvents.find(evt => evt.id === index);
                if (updateInstr != undefined){
                    return updateInstr.updatedNewEvent;
                } else {
                    return newEvent;
                }
            });
        default:
            return state;
    }
}

function loadedEventsReducer (state: PhoenixEvent[] = [], action: Action<any>) {
    switch (action.type) {
        case SET_LOADED_EVENTS:
            return action.payload.newLoadedEvents;
        case UPDATE_LOADED_EVENTS:
            let updatedLoadedEvents = action.payload.updatedLoadedEvents;
            return state.map((loadedEvent, index) => {
                const updateInstr = updatedLoadedEvents.find(evt => evt.id === index);
                if (updateInstr != undefined){
                    return updateInstr.updatedLoadedEvent;
                } else {
                    return loadedEvent;
                }
            });
        default:
            return state;
    }
}

function currentTurnReducer (state: Turn = {turn: 0, realm: "sl", status: TurnStatus.STARTED}, action: Action<any>) {
    switch (action.type) {
        case SET_CURRENT_TURN:
            return action.payload.newCurrentTurn;
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