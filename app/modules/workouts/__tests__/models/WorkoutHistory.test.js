import React from 'react';
import {WorkoutHistory} from "../../models";

const user = {
    uid: "s8iwMDpipGMqRnFfn9HJgAHPoLT2"
};

const workout = {
    name: "Beginner's Boogie (Part 1)",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fworkouts%2Fpushup.jpg?alt=media&token=2d665391-662f-449b-9440-da3ec7dfe293",
    uid: "beginners-boogie-part-1",
    xpEarned: 200
};

it('create workout history', () => {
    const workoutHistory = new WorkoutHistory(user, workout);


    expect(workoutHistory.name).toEqual(workout.name);
    expect(workoutHistory.imageUrl).toEqual(workout.imageUrl);
    expect(workoutHistory.xpEarned).toEqual(200);
    expect(workoutHistory.xpEarnedLabel).toEqual(workout.xpEarnedLabel);
    expect(workoutHistory.addedByUser).toEqual(user.uid);
});

it('create workout history and serialize to JSON', () => {
    const workoutHistory = new WorkoutHistory(user, workout).toJSON();

    expect(workoutHistory).toEqual({
        name: workout.name,
        imageUrl: workout.imageUrl,
        xpEarned: 200,
        addedByUser: user.uid
    });
});