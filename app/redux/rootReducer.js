import {combineReducers} from 'redux';

import {reducer as authReducer} from "../modules/auth";
import {reducer as homeReducer} from "../modules/home";
import {reducer as characterReducer} from "../modules/characters";

// Combine all the reducers
const rootReducer = combineReducers({
    authReducer,
    homeReducer,
    characterReducer
});

export default rootReducer;