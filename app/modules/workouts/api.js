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
    const workoutHistoryRef = database.ref('workoutHistory');
    const childRef = workoutHistoryRef.push();
    workoutHistory.uid = childRef.key;

    return childRef.set(workoutHistory).then(() => workoutHistory);
};

export const getMyWorkoutHistory = (user, limit = 5) => {
    return new Promise((resolve, reject) => {
        const workoutHistoryRef = database.ref('workoutHistory')
            .orderByChild("addedByUser")
            .equalTo(user.uid)
            .limitToLast(limit);

        workoutHistoryRef.once("value")
            .then(snapshot => {
                const exists = (snapshot.val() !== null);

                if (exists) {
                    const workoutHistoryByUid = snapshot.val();
                    const keys = Object.keys(snapshot.val());

                    const workoutHistory = keys.map(key => {
                        return workoutHistoryByUid[key];
                    });
                    resolve(workoutHistory);
                } else {
                    resolve([]);
                }
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