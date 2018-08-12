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

import {combineReducers} from "redux";
import {LOG_IN, LOG_OUT, Action} from "./actions";
import {initialState} from "./gameState";

function userReducer (state = initialState, action: Action<any>) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                user: (action as Action<LOG_IN>).payload.username
            });
        case LOG_OUT:
            return Object.assign({}, state, {
                user: undefined
            });
        default:
            return state;
    }
}

// for when there is a need to separate the reducers into multiple modules
// export const reducers = combineReducers({
//     loginReducer
// });
export const reducers = userReducer;