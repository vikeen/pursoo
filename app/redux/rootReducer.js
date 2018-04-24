import {combineReducers} from 'redux';

import {reducer as authReducer} from "../modules/auth";
import {reducer as homeReducer} from "../modules/home";
import {reducer as characterReducer} from "../modules/characters";
import {reducer as workoutReducer} from "../modules/workouts";

// Combine all the reducers
const rootReducer = combineReducers({
    authReducer,
    homeReducer,
    characterReducer,
    workoutReducer
});

export default rootReducer;