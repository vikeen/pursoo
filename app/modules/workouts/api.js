import {database} from "../../config/firebase";
import {fetchExercises} from "../exercises/api";
import {Workout} from "./models";

export function fetchWorkouts() {
    return Promise.all([
        fetchExercises(),
        __fetchWorkouts()
    ]).then(results => {
        const exercises = results[0];
        const workouts = results[1];

        return workouts.map(workout => new Workout(workout, exercises))
    });
}

export const createWorkoutHistory = (workoutHistory) => {
    return new Promise((resolve, reject) => {
        const workoutHistoryRef = database.ref('workoutHistory');
        const childRef = workoutHistoryRef.push();

        workoutHistory.uid = childRef.key;

        childRef.set(workoutHistory)
            .then(() => resolve(workoutHistory))
            .catch((error) => reject({message: error}));
    });
};

export const getMyWorkoutHistory = (user, limit = 5) => {
    return new Promise((resolve, reject) => {
        const workoutHistoryRef = database.ref('workoutHistory')
            .orderByChild("addedByUser")
            .equalTo(user.uid)
            .limitToLast(limit);

        workoutHistoryRef.once("value")
            .then(snapshot => {
                const workoutHistoryByUid = snapshot.val();
                const keys = Object.keys(snapshot.val());

                const workoutHistory = keys.map(key => {
                    return workoutHistoryByUid[key];
                });

                resolve(workoutHistory);
            })
            .catch((error) => reject({message: error}));
    });
};

function __fetchWorkouts() {
    return new Promise((resolve, reject) => {
        database.ref('workouts').once("value")
            .then(snapshot => {
                const workoutsByUid = snapshot.val();
                const keys = Object.keys(snapshot.val());

                const workouts = keys.map(key => {
                    return workoutsByUid[key];
                });

                resolve(workouts);
            })
            .catch((error) => reject({message: error}));
    });
}