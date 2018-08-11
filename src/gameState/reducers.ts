import {LOG_IN, LOG_OUT} from "./actions";
import {combineReducers} from "redux";
import {initialState} from "./gameState";

function loginReducer (state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                user: action.user
            });
        case LOG_OUT:
            return Object.assign({}, state, {
                user: undefined
            });
        default:
            return state
    }
}

export const reducers = combineReducers({
    loginReducer
});