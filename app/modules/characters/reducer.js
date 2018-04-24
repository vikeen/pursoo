import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {character: null};

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.CHARACTER_LOADED:
            state = Object.assign({}, state, {character: action.data});
            return state;
        default:
            return state;
    }
};

export default characterReducer;