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