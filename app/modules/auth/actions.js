import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../config/firebase";

import {AsyncStorage} from 'react-native';

export function register(email, password) {
    return (dispatch) => {
        return api.register(email, password)
            .then((user) => api.createUser(user))
            .then(() => api.login(email, password))
            .then(response => {
                dispatch({type: t.LOGGED_IN, data: response.user})
            });
    };
}

export function getUser(user) {
    return (dispatch) => {
        return api.getUser(user).then(response => {
            if (response.exists) {
                dispatch({type: t.LOGGED_IN, data: response.user});
            }
        });
    }
}

export function login(email, password) {
    return (dispatch) => {
        return api.login(email, password).then(response => {
            if (response.exists) {
                dispatch({type: t.LOGGED_IN, data: response.user});
            }
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, (success, data, error) => {
            if (success) {
                successCB();
            } else if (error) {
                errorCB(error);
            }
        });
    };
}

export function signOut() {
    return (dispatch) => {
        return api.signOut().then(() => {
            dispatch({type: t.LOGGED_OUT});
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);

            if (isLoggedIn) {
                //get the user object from the Async storage
                AsyncStorage.getItem('user', (err, user) => {
                    if (user === null) {
                        isLoggedIn = false;
                    } else {
                        dispatch({type: t.LOGGED_IN, data: JSON.parse(user)})
                    }

                    callback(isLoggedIn);
                });
            } else {
                dispatch({type: t.LOGGED_OUT});
                callback(isLoggedIn);
            }
        });
    };
}

export function signInWithFacebook(facebookToken, successCB, errorCB) {
    return (dispatch) => {
        api.signInWithFacebook(facebookToken, function (success, data, error) {
            if (success) {
                if (data.exists) {
                    dispatch({type: t.LOGGED_IN, data: data.user});
                }
                successCB(data);
            } else if (error) {
                errorCB(error);
            }
        });
    };
}
