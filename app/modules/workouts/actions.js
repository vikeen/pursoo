import * as api from './api';
import * as t from "./actionTypes";
import {WorkoutHistory} from "./models";

export const fetchWorkouts = () => {
    return (dispatch) => {
        return api.fetchWorkouts().then(workouts => {
            dispatch({type: t.WORKOUTS_LOADED, workouts});
        });
    };
};

export const createWorkoutHistory = (user, workout) => {
    const workoutHistory = new WorkoutHistory(user, workout).toJSON();

    return (dispatch) => {
        return api.createWorkoutHistory(workoutHistory).then(() => {
            // dispatch({type: t.WORKOUTS_LOADED, workouts});
        });
    };
};