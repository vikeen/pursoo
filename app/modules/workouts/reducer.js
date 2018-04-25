import * as t from './actionTypes';

let initialState = {
    workouts: [],
    workoutHistory: []
};

const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.WORKOUTS_LOADED:
            return Object.assign({}, state, {workouts: action.workouts});
        case t.WORKOUT_HISTORY_LOADED:
            return Object.assign({}, state, {workoutHistory: action.workoutHistory});
        default:
            return state;
    }
};

export default workoutsReducer;