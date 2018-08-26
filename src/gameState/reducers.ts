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

import {LOG_IN, LOG_OUT, Action, ADD_REALMS, SET_REALMS, REMOVE_REALMS, UPDATE_REALMS} from "./actions";
import {GameState, initialState, Login, TurnStatus, UserGroup} from "./gameState";
import {Realm} from "../model/realm";

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

export default (state: GameState = initialState, action: Action<any>): GameState => {
    return {
        realms: realmsReducer(state.realms, action),
        fields: [],
        rivers: [],
        armies: [],
        buildings: [],
        newEvents: [],
        loadedEvents: [],
        currentTurn: {turn: 0, realm: "sl", status: TurnStatus.STARTED},
        login: loginReducer(state.login, action)
    };
}