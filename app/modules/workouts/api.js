import {database} from "../../config/firebase";
import {fetchExercises} from "../exercises/api";

export function fetchWorkouts() {
    return Promise.all([
        fetchExercises(),
        __fetchWorkouts()
    ]).then(results => {
        const exercises = results[0];
        const workouts = results[1];

        return workouts.map(workout => {
            workout.exercises = [];
            workout.xp = 0;

            workout.exerciseRoutineConfig.map(exerciseRoutine => {
                const exercise = exercises[exerciseRoutine.key];
                const workoutExercise = new WorkoutExercise(exercise, exerciseRoutine.quantity);
                workout.exercises.push(workoutExercise);
                workout.xp += workoutExercise.xp
            });

            workout.xpString = `${workout.xp}xp`;

            return workout;
        })
    });
}

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

class WorkoutExercise {
    constructor(exercise, quantity) {
        this.name = exercise.name;
        this.pluralizedName = exercise.pluralizedName;
        this.image = exercise.image;
        this.quantity = quantity;
        this.xp = exercise.xp * quantity;
        this.xpString = `${exercise.xp}xp`;
        this.xpEarned = 0;
        this.xpEarnedString = "0xp";
    }
}