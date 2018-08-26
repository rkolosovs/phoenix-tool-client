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

import {Login, Turn} from "./gameState";
import {Realm} from "../model/realm";
import {Field} from "../model/map/field";
import {River} from "../model/map/river";
import {Army} from "../model/armies/army";
import {Building} from "../model/buildings/building";
import {PhoenixEvent} from "../model/events/event";

export interface Action<T>{
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}

export type UpdatedRealm = {id: number, updatedRealm: Realm};
export type UpdatedBuilding = {id: number, updatedBuilding: Building};
export type UpdatedField = {id: number, updatedField: Field};
export type UpdatedArmy = {id: number, updatedArmy: Army};
export type UpdatedEvent = {id: number, updatedNewEvent: PhoenixEvent};
export type UpdatedLoadedEvent = {id: number, updatedLoadedEvent: PhoenixEvent};

// Action types
export const LOG_IN: string = 'LOG_IN';
export type LOG_IN = {login: Login};
export const LOG_OUT: string = 'LOG_OUT';
export type LOG_OUT = {};

export const ADD_REALMS: string = 'ADD_REALMS';
export type ADD_REALMS = {newRealms: Realm[]};
export const SET_REALMS: string = 'SET_REALMS';
export type SET_REALMS = {newRealms: Realm[]};
export const REMOVE_REALMS: string = 'REMOVE_REALMS';
export type REMOVE_REALMS = {idsToRemove: number[]};
export const UPDATE_REALMS: string = 'UPDATE_REALMS';
export type UPDATE_REALMS = {updatedRealms: UpdatedRealm[]};

export const ADD_FIELDS: string = 'ADD_FIELDS';
export type ADD_FIELDS = {newFields: Field[]};
export const SET_FIELDS: string = 'SET_FIELDS';
export type SET_FIELDS = {newFields: Field[]};
export const REMOVE_FIELDS: string = 'REMOVE_FIELDS';
export type REMOVE_FIELDS = {idsToRemove: number[]};
export const UPDATE_FIELDS: string = 'UPDATE_FIELDS';
export type UPDATE_FIELDS = {updatedFields: UpdatedField[]};

export const ADD_RIVERS: string = 'ADD_RIVERS';
export type ADD_RIVERS = {newRivers: River[]};
export const SET_RIVERS: string = 'SET_RIVERS';
export type SET_RIVERS = {newRivers: River[]};
export const REMOVE_RIVERS: string = 'REMOVE_RIVERS';
export type REMOVE_RIVERS = {idsToRemove: number[]};

export const ADD_ARMIES: string = 'ADD_ARMIES';
export type ADD_ARMIES = {newArmies: Army[]};
export const SET_ARMIES: string = 'SET_ARMIES';
export type SET_ARMIES = {newArmies: Army[]};
export const REMOVE_ARMIES: string = 'REMOVE_ARMIES';
export type REMOVE_ARMIES = {idsToRemove: number[]};
export const UPDATE_ARMIES: string = 'UPDATE_ARMIES';
export type UPDATE_ARMIES = {updatedArmies: UpdatedArmy[]};

export const ADD_BUILDINGS: string = 'ADD_BUILDINGS';
export type ADD_BUILDINGS = {newBuildings: Building[]};
export const SET_BUILDINGS: string = 'SET_BUILDINGS';
export type SET_BUILDINGS = {newBuildings: Building[]};
export const REMOVE_BUILDINGS: string = 'REMOVE_BUILDINGS';
export type REMOVE_BUILDINGS = {idsToRemove: number[]};
export const UPDATE_BUILDINGS: string = 'UPDATE_BUILDINGS';
export type UPDATE_BUILDINGS = {updatedBuildings: UpdatedBuilding[]};

export const ADD_NEW_EVENTS: string = 'ADD_NEW_EVENTS';
export type ADD_NEW_EVENTS = {newEvents: PhoenixEvent[]};
export const SET_NEW_EVENTS: string = 'SET_NEW_EVENTS';
export type SET_NEW_EVENTS = {newEvents: PhoenixEvent[]};
export const REMOVE_NEW_EVENTS: string = 'REMOVE_NEW_EVENTS';
export type REMOVE_NEW_EVENTS = {idsToRemove: number[]};
export const UPDATE_NEW_EVENTS: string = 'UPDATE_NEW_EVENTS';
export type UPDATE_NEW_EVENTS = {updatedNewEvents: UpdatedEvent[]};

export const SET_LOADED_EVENTS: string = 'SET_LOADED_EVENTS';
export type SET_LOADED_EVENTS = {newLoadedEvents: PhoenixEvent[]};
export const UPDATE_LOADED_EVENTS: string = 'UPDATE_LOADED_EVENTS';
export type UPDATE_LOADED_EVENTS = {updatedLoadedEvents: UpdatedLoadedEvent[]};

export const SET_CURRENT_TURN: string = 'SET_CURRENT_TURN';
export type SET_CURRENT_TURN = {newCurrentTurn: Turn};

// Action creators
export function logIn(login: Login): Action<LOG_IN> {
    return {
        type: LOG_IN,
        payload: {
            login: login
        }
    };
}

export function logOut(): Action<LOG_OUT> {
    return {
        type: LOG_OUT,
        payload: {}
    };
}

export function addRealms(newRealms: Realm[]): Action<ADD_REALMS> {
    return {
        type: ADD_REALMS,
        payload: {
            newRealms: newRealms
        }
    };
}

export function setRealms(newRealms: Realm[]): Action<SET_REALMS> {
    return {
        type: SET_REALMS,
        payload: {
            newRealms: newRealms
        }
    };
}

export function removeRealms(idsToRemove: number[]): Action<REMOVE_REALMS> {
    return {
        type: REMOVE_REALMS,
        payload: {
            idsToRemove: idsToRemove
        }
    };
}

export function updateRealms(updatedRealms: UpdatedRealm[]): Action<UPDATE_REALMS> {
    return {
        type: UPDATE_REALMS,
        payload: {
            updatedRealms: updatedRealms
        }
    };
}

export function addFields(newFields: Field[]): Action<ADD_FIELDS> {
    return {
        type: ADD_FIELDS,
        payload: {
            newFields: newFields
        }
    };
}

export function setFields(newFields: Field[]): Action<SET_FIELDS> {
    return {
        type: SET_FIELDS,
        payload: {
            newFields: newFields
        }
    };
}

export function removeFields(idsToRemove: number[]): Action<REMOVE_FIELDS> {
    return {
        type: REMOVE_FIELDS,
        payload: {
            idsToRemove: idsToRemove
        }
    };
}

export function updateFields(updatedFields: UpdatedField[]): Action<UPDATE_FIELDS> {
    return {
        type: UPDATE_FIELDS,
        payload: {
            updatedFields: updatedFields
        }
    };
}

export function addRivers(newRivers: River[]): Action<ADD_RIVERS> {
    return {
        type: ADD_RIVERS,
        payload: {
            newRivers: newRivers
        }
    };
}

export function setRivers(newRivers: River[]): Action<SET_RIVERS> {
    return {
        type: SET_RIVERS,
        payload: {
            newRivers: newRivers
        }
    };
}

export function removeRivers(idsToRemove: number[]): Action<REMOVE_RIVERS> {
    return {
        type: REMOVE_RIVERS,
        payload: {
            idsToRemove: idsToRemove
        }
    };
}

export function addArmies(newArmies: Army[]): Action<ADD_ARMIES> {
    return {
        type: ADD_ARMIES,
        payload: {
            newArmies: newArmies
        }
    };
}

export function setArmies(newArmies: Army[]): Action<SET_ARMIES> {
    return {
        type: SET_ARMIES,
        payload: {
            newArmies: newArmies
        }
    };
}

export function removeArmies(idsToRemove: number[]): Action<REMOVE_ARMIES> {
    return {
        type: REMOVE_ARMIES,
        payload: {
            idsToRemove: idsToRemove
        }
    };
}

export function updateArmies(updatedArmies: UpdatedArmy[]): Action<UPDATE_ARMIES> {
    return {
        type: UPDATE_ARMIES,
        payload: {
            updatedArmies: updatedArmies
        }
    };
}

export function addBuildings(newBuildings: Building[]): Action<ADD_BUILDINGS> {
    return {
        type: ADD_BUILDINGS,
        payload: {
            newBuildings: newBuildings
        }
    };
}

export function setBuildings(newBuildings: Building[]): Action<SET_BUILDINGS> {
    return {
        type: SET_BUILDINGS,
        payload: {
            newBuildings: newBuildings
        }
    };
}

export function removeBuildings(idsToRemove: number[]): Action<REMOVE_BUILDINGS> {
    return {
        type: REMOVE_BUILDINGS,
        payload: {
            idsToRemove: idsToRemove
        }
    };
}

export function updateBuildings(updatedBuildings: UpdatedBuilding[]): Action<UPDATE_BUILDINGS> {
    return {
        type: UPDATE_BUILDINGS,
        payload: {
            updatedBuildings: updatedBuildings
        }
    };
}

export function addNewEvents(newEvents: PhoenixEvent[]): Action<ADD_NEW_EVENTS> {
    return {
        type: ADD_NEW_EVENTS,
        payload: {
            newEvents: newEvents
        }
    };
}

export function setNewEvents(newEvents: PhoenixEvent[]): Action<SET_NEW_EVENTS> {
    return {
        type: SET_NEW_EVENTS,
        payload: {
            newEvents: newEvents
        }
    };
}

export function removeNewEvents(idsToRemove: number[]): Action<REMOVE_NEW_EVENTS> {
    return {
        type: REMOVE_NEW_EVENTS,
        payload: {
            idsToRemove: idsToRemove
        }
    };
}

export function updateNewEvents(updatedNewEvents: UpdatedEvent[]): Action<UPDATE_NEW_EVENTS> {
    return {
        type: UPDATE_NEW_EVENTS,
        payload: {
            updatedNewEvents: updatedNewEvents
        }
    };
}

export function setLoadedEvents(newLoadedEvents: PhoenixEvent[]): Action<SET_LOADED_EVENTS> {
    return {
        type: SET_LOADED_EVENTS,
        payload: {
            newLoadedEvents: newLoadedEvents
        }
    };
}

export function updateLoadedEvents(updatedLoadedEvents: UpdatedLoadedEvent[]): Action<UPDATE_LOADED_EVENTS> {
    return {
        type: UPDATE_LOADED_EVENTS,
        payload: {
            updatedLoadedEvents: updatedLoadedEvents
        }
    };
}

export function setCurrentTurn(newCurrentTurn: Turn): Action<SET_CURRENT_TURN> {
    return {
        type: SET_CURRENT_TURN,
        payload: {
            newCurrentTurn: newCurrentTurn
        }
    };
}