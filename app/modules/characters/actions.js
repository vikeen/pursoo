import * as api from './api';
import * as t from "./actionTypes";

export function fetchMyCharacter(user) {
    return (dispatch) => {
        return api.fetchMyCharacter(user).then(character => {
            dispatch({type: t.CHARACTER_LOADED, character});
        });
    };
}

export function updateCharacter(character) {
    return (dispatch) => {
        return api.updateCharacter(character).then(() => {
            dispatch({type: t.CHARACTER_UPDATED, character});
        });
    };
}