import * as t from './actionTypes';

let initialState = {
    workouts: []
};

const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.WORKOUTS_LOADED:
            return Object.assign({}, state, {workouts: action.workouts});
        default:
            return state;
    }
};

export default workoutsReducer;