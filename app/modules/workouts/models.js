import {stringifyXp} from "../../components/Util";

export class Workout {
    constructor(workout, exercises) {
        workout.exercises = [];
        workout.xp = 0;

        workout.exerciseRoutineConfig.map(exerciseRoutine => {
            const exercise = exercises[exerciseRoutine.key];
            const workoutExercise = new WorkoutExercise(exercise, exerciseRoutine.quantity, exerciseRoutine.duration);
            workout.exercises.push(workoutExercise);
            workout.xp += workoutExercise.xp
        });

        workout.xpLabel = stringifyXp(workout.xp);

        return workout;
    }

    static complete = (workout) => {
        workout.xpEarned = 0;

        workout.exercises.forEach(workoutExercise => {
            workout.xpEarned += workoutExercise.xpEarned;
        });

        workout.xpEarnedLabel = stringifyXp(workout.xpEarned);
        return workout;
    };
}

export class WorkoutExercise {
    constructor(exercise, quantity, duration) {
        // base
        this.name = exercise.name;
        this.pluralizedName = exercise.pluralizedName;
        this.imageUrl = exercise.imageUrl;

        // durations
        this.duration = duration;
        this.durationLabel = duration ? `${duration}s` : "";
        this.durationCompleted = 0;
        this.durationCompletedLabel = "0s";
        this.isDuration = !!duration;

        // quantities
        this.quantity = quantity;
        this.quantityLabel = quantity ? `${quantity}` : "";
        this.quantityCompleted = 0;
        this.quantityCompletedLabel = "0";
        this.quantity = quantity;
        this.isQuantity = !!quantity;

        // xp
        this.xp = __calcWorkoutExerciseXp(exercise, quantity, duration);
        this.xpLabel = stringifyXp(this.xp);
        this.xpEarned = 0;
        this.xpEarnedLabel = stringifyXp(this.xpEarned);

        this.exercise = exercise;
    }

    static complete = (workoutExercise, quantityCompleted, durationCompleted) => {
        workoutExercise.xpEarned = __calcWorkoutExerciseXp(workoutExercise.exercise, quantityCompleted, durationCompleted);
        workoutExercise.xpEarnedLabel = stringifyXp(workoutExercise.xpEarned);

        if (quantityCompleted) {
            workoutExercise.quantityCompleted = quantityCompleted;
            workoutExercise.quantityCompletedLabel = `${quantityCompleted}`;
            return workoutExercise;
        } else if (durationCompleted) {
            workoutExercise.durationCompleted = durationCompleted;
            workoutExercise.durationCompletedLabel = `${durationCompleted}s`;
            return workoutExercise;
        } else {
            throw new Error("workout exercise complete must have a quantityComplete or durationComplete value");
        }
    };
}

export class WorkoutHistory {
    constructor(user, workout) {
        this.name = workout.name;
        this.imageUrl = workout.imageUrl;
        this.xpEarned = workout.xpEarned;
        this.xpEarnedLabel = workout.xpEarnedLabel;
        this.addedByUser = user.uid;
    }

    toJSON = () => {
        return {
            name: this.name,
            imageUrl: this.imageUrl,
            xpEarned: this.xpEarned,
            xpEarnedLabel: this.xpEarnedLabel,
            addedByUser: this.addedByUser
        }
    };
}

/*
 * PRIVATE API
 */

function __calcWorkoutExerciseXp(exercise, quantity, duration) {
    if (quantity) {
        return exercise.xp * quantity;
    } else if (duration) {
        return exercise.xp * duration;
    } else {
        throw new Error("workout exercise must have a quantity or duration value");
    }
}