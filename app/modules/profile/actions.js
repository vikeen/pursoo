import * as api from './api';
import * as t from "../auth/actionTypes";

export function updateUser(user) {
    return (dispatch) => {
        return api.updateUser(user).then(() => {
            dispatch({type: t.LOGGED_IN, data: user});
        });
    };
}