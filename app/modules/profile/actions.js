import * as api from './api';

export function updateUser(user) {
    return (dispatch) => {
        return api.updateUser(user);
    };
}