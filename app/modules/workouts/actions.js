import * as api from './api';
import * as t from "./actionTypes";

export function fetchWorkouts() {
    return (dispatch) => {
        return api.fetchWorkouts().then(workouts => {
            dispatch({type: t.WORKOUTS_LOADED, workouts});
        });
    };
}