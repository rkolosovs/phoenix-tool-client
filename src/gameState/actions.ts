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

import {Login} from "./gameState";
import {Realm} from "../model/realm";

export interface Action<T>{
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}

export type UpdatedRealm = {id: number, updatedRealm: Realm};

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