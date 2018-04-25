import {stringifyXp} from "../../components/Util";

export class Workout {
    constructor(workout, exercises) {
        workout.exercises = [];
        workout.xp = 0;

        workout.exerciseRoutineConfig.map(exerciseRoutine => {
            const exercise = exercises[exerciseRoutine.key];
            const workoutExercise = new WorkoutExercise(exercise, exerciseRoutine.quantity);
            workout.exercises.push(workoutExercise);
            workout.xp += workoutExercise.xp
        });

        workout.xpString = stringifyXp(workout.xp);

        return workout;
    }

    static complete = (workout) => {
        workout.xpEarned = 0;

        workout.exercises.forEach(workoutExercise => {
            workout.xpEarned += workoutExercise.xpEarned;
        });

        workout.xpEarnedString = stringifyXp(workout.xpEarned);
        return workout;
    };
}

export class WorkoutExercise {
    constructor(exercise, quantity) {
        this.name = exercise.name;
        this.pluralizedName = exercise.pluralizedName;
        this.image = exercise.image;
        this.quantity = quantity;
        this.quantityCompleted = 0;
        this.xp = exercise.xp * quantity;
        this.xpString = stringifyXp(exercise.xp);
        this.xpEarned = 0;
        this.xpEarnedString = stringifyXp(0);
        this.exercise = exercise;
    }

    static complete = (exercise, quantityCompleted) => {
        exercise.xpEarned = exercise.xp * quantityCompleted;
        exercise.quantityCompleted = quantityCompleted;
        exercise.xpEarnedString = stringifyXp(exercise.xpEarned);
        return exercise;
    };
}

export class WorkoutHistory {
    constructor(user, workout) {
        this.name = workout.name;
        this.image = workout.image;
        this.xpEarned = workout.xpEarned;
        this.xpEarnedString = workout.xpEarnedString;
        this.addedByUser = user.uid;
    }

    toJSON = () => {
        return {
            name: this.name,
            image: this.image,
            xpEarned: this.xpEarned,
            xpEarnedString: this.xpEarnedString,
            addedByUser: this.addedByUser
        }
    };
}