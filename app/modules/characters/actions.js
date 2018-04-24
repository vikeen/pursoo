import * as api from './api';
import * as t from "./actionTypes";

export function fetchMyCharacter(user, successCB, errorCB) {
    return (dispatch) => {
        api.fetchMyCharacter(user, (success, data, error) => {
            if (success) {
                dispatch({type: t.CHARACTER_LOADED, data});
                successCB(data);
            } else if (error) {
                errorCB(error);
            }
        });
    };
}

export function updateCharacter(character, successCB, errorCB) {
    return (dispatch) => {
        api.updateCharacter(user, (success, data, error) => {
            if (success) {
                successCB();
            } else if (error) {
                errorCB(error);
            }
        });
    };
}