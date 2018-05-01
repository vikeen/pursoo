import {actionTypes as AuthActionTypes} from '../auth';
import * as api from './api';

export function updateUser(user) {
    return (dispatch) => {
        return api.updateUser(user).then(() => {
            dispatch({type: AuthActionTypes.LOGGED_IN, data: user});
        });
    }
}