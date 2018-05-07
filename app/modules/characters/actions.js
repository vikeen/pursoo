import * as api from './api';
import * as t from "./actionTypes";
import {updateUser} from "../profile/api";

export function fetchMyCharacter(user) {
    return (dispatch) => {
        return api.fetchMyCharacter(user).then(character => {
            dispatch({type: t.CHARACTER_LOADED, character});
            return character;
        });
    };
}

export function updateCharacter(character) {
    return (dispatch) => {
        return api.updateCharacter(character).then(() => {
            dispatch({type: t.CHARACTER_UPDATED, character});
            return character;
        });
    };
}

export function createMyCharacter(user, name, imageUrl) {
    return (dispatch) => {
        return api.createMyCharacter(user, name, imageUrl)
            .then(character => {
                user.characterUid = character.uid;
                return Promise.all([updateUser(user), character]);
            }).then(([user, character]) => {
                dispatch({type: t.CHARACTER_CREATED, character});
                return character;
            });
    };
}