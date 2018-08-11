import {createStore, DeepPartial} from "redux";
import {reducers} from "./reducers";

export const initialState = {
    user: undefined
};

export const store = createStore(reducers);