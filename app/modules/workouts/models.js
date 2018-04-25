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

        workout.xpString = __xpStringify(workout.xp);

        return workout;
    }

    static complete = (workout) => {
        workout.xpEarned = 0;

        workout.exercises.forEach(workoutExercise => {
            workout.xpEarned += workoutExercise.xpEarned;
        });

        workout.xpEarnedString = __xpStringify(workout.xpEarned);
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
        this.xpString = __xpStringify(exercise.xp);
        this.xpEarned = 0;
        this.xpEarnedString = __xpStringify(0);
        this.exercise = exercise;
    }

    static complete = (exercise, quantityCompleted) => {
        exercise.xpEarned = exercise.xp * quantityCompleted;
        exercise.quantityCompleted = quantityCompleted;
        exercise.xpEarnedString = __xpStringify(exercise.xpEarned);
        return exercise;
    };
}

function __xpStringify(xp) {
    return `${xp}xp`;
}