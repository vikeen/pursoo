import * as api from './api';
import * as t from "./actionTypes";

export function fetchExercises() {
    return (dispatch) => {
        return api.fetchExercises().then(exercises => {
            dispatch({type: t.EXERCISES_LOADED, workouts: exercises});
        });
    };
}