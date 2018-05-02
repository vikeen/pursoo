import React from 'react';
import {WorkoutExercise} from "../../models";

const exercise = {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d",
    name: "Lunge",
    pluralizedName: "Lunges",
    xp: 2
};

it('create exercise from quantity', () => {
    const workoutExercise = new WorkoutExercise(exercise, 10, undefined);
    expect(workoutExercise).toEqual({
        name: exercise.name,
        pluralizedName: exercise.pluralizedName,
        imageUrl: exercise.imageUrl,
        duration: undefined,
        durationLabel: "",
        durationCompleted: 0,
        durationCompletedLabel: "0s",
        isDuration: false,
        quantity: 10,
        quantityLabel: "10",
        quantityCompleted: 0,
        quantityCompletedLabel: "0",
        isQuantity: true,
        xp: 20,
        xpLabel: "20xp",
        xpEarned: 0,
        xpEarnedLabel: "0xp",
        exercise: exercise
    });
});

it('create exercise from duration', () => {
    const workoutExercise = new WorkoutExercise(exercise, undefined, 30);
    expect(workoutExercise).toEqual({
        name: exercise.name,
        pluralizedName: exercise.pluralizedName,
        imageUrl: exercise.imageUrl,
        duration: 30,
        durationLabel: "30s",
        durationCompleted: 0,
        durationCompletedLabel: "0s",
        isDuration: true,
        quantity: undefined,
        quantityLabel: "",
        quantityCompleted: 0,
        quantityCompletedLabel: "0",
        isQuantity: false,
        xp: 60,
        xpLabel: "60xp",
        xpEarned: 0,
        xpEarnedLabel: "0xp",
        exercise: exercise
    });
});

it('create exercise from quantity and complete it', () => {
    let workoutExercise = new WorkoutExercise(exercise, 10, undefined);
    workoutExercise = WorkoutExercise.complete(workoutExercise, 10, undefined);

    expect(workoutExercise).toEqual({
        name: exercise.name,
        pluralizedName: exercise.pluralizedName,
        imageUrl: exercise.imageUrl,
        duration: undefined,
        durationLabel: "",
        durationCompleted: 0,
        durationCompletedLabel: "0s",
        isDuration: false,
        quantity: 10,
        quantityLabel: "10",
        quantityCompleted: 10,
        quantityCompletedLabel: "10",
        isQuantity: true,
        xp: 20,
        xpLabel: "20xp",
        xpEarned: 20,
        xpEarnedLabel: "20xp",
        exercise: exercise
    });
});

it('create exercise from duration and complete it', () => {
    let workoutExercise = new WorkoutExercise(exercise, undefined, 30);
    workoutExercise = WorkoutExercise.complete(workoutExercise, undefined, 30);

    expect(workoutExercise).toEqual({
        name: exercise.name,
        pluralizedName: exercise.pluralizedName,
        imageUrl: exercise.imageUrl,
        duration: 30,
        durationLabel: "30s",
        durationCompleted: 30,
        durationCompletedLabel: "30s",
        isDuration: true,
        quantity: undefined,
        quantityLabel: "",
        quantityCompleted: 0,
        quantityCompletedLabel: "0",
        isQuantity: false,
        xp: 60,
        xpLabel: "60xp",
        xpEarned: 60,
        xpEarnedLabel: "60xp",
        exercise: exercise
    });
});

