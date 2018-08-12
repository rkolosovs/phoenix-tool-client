import {createStore} from "redux";
import {reducers} from "./reducers";

type GameState = {
    user: string|undefined;
};

export const initialState: GameState = {
    user: undefined
};

export const store = createStore(reducers, initialState);