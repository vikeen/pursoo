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
        this.imageUrl = exercise.imageUrl;
        this.quantity = quantity;
        this.quantityCompleted = 0;
        this.xp = exercise.xp * quantity;
        this.xpString = stringifyXp(this.xp);
        this.xpEarned = 0;
        this.xpEarnedString = stringifyXp(this.xpEarned);
        this.exercise = exercise;
    }

    static complete = (workoutExercise, quantityCompleted) => {
        workoutExercise.xpEarned = workoutExercise.exercise.xp * quantityCompleted;
        workoutExercise.quantityCompleted = quantityCompleted;
        workoutExercise.xpEarnedString = stringifyXp(workoutExercise.xpEarned);
        return workoutExercise;
    };
}

export class WorkoutHistory {
    constructor(user, workout) {
        this.name = workout.name;
        this.imageUrl = workout.imageUrl;
        this.xpEarned = workout.xpEarned;
        this.xpEarnedString = workout.xpEarnedString;
        this.addedByUser = user.uid;
    }

    toJSON = () => {
        return {
            name: this.name,
            imageUrl: this.imageUrl,
            xpEarned: this.xpEarned,
            xpEarnedString: this.xpEarnedString,
            addedByUser: this.addedByUser
        }
    };
}