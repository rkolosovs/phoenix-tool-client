export interface Action<T>{
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}

// Action types
export const LOG_IN: string = 'LOG_IN';
export type LOG_IN = {username: string};
export const LOG_OUT: string = 'LOG_OUT';
export type LOG_OUT = {};

// Action creators
export function logIn(user: string): Action<LOG_IN> {
    return {
        type: LOG_IN,
        payload: {
            username: user
        }
    };
}

export function logOut(): Action<LOG_OUT> {
    return {
        type: LOG_OUT,
        payload: {}
    };
}