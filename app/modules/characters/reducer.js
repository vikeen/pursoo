import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {character: null};

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.CHARACTER_LOADED:
            return Object.assign({}, state, {character: action.character});
        case t.CHARACTER_UPDATED:
            return Object.assign({}, state, {character: action.character});
        case t.CHARACTER_CREATED:
            return Object.assign({}, state, {character: action.character});
        default:
            return state;
    }
};

export default characterReducer;