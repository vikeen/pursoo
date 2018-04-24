import * as api from './api';

export function updateUser(user, successCB, errorCB) {
    return (dispatch) => {
        api.updateUser(user, (success, data, error) => {
            if (success) {
                successCB();
            } else if (error) {
                errorCB(error);
            }
        });
    };
}