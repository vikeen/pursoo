import React from 'react';
import {connect} from 'react-redux';
import {Workout, WorkoutExercise} from "../../models";

import QuantityExercise from "../../components/QuantityExercise";
import DurationExercise from "../../components/DurationExercise";

class WorkoutRoutine extends React.Component {
    constructor(props) {
        super(props);

        const {workout, workoutExerciseIndex} = props.navigation.state.params;

        this.state = {
            workoutExerciseIndex,
            workout
        };
    }

    onQuantityExerciseDone = (workoutExercise, quantityCompleted) => {
        WorkoutExercise.complete(workoutExercise, quantityCompleted, undefined);
        this.goToNextExercise();
    };

    onDurationExerciseDone = (workoutExercise, durationCompleted) => {
        WorkoutExercise.complete(workoutExercise, undefined, durationCompleted);
        this.goToNextExercise();
    };

    goToNextExercise = () => {
        const {workout, workoutExerciseIndex} = this.state;
        const nextWorkoutExercise = workout.exercises[workoutExerciseIndex + 1];


        if (nextWorkoutExercise) {
            return this.props.navigation.navigate("WorkoutRoutine", {
                workoutExerciseIndex: workoutExerciseIndex + 1,
                workout
            });
        } else {
            return this.props.navigation.navigate("WorkoutReward", {
                workout: Workout.complete(workout)
            });
        }
    };

    render() {
        const {workout, workoutExerciseIndex} = this.state;
        const workoutExercise = workout.exercises[workoutExerciseIndex];

        if (workoutExercise.isQuantity) {
            return <QuantityExercise
                workoutExercise={workoutExercise}
                workout={workout}
                onDone={this.onQuantityExerciseDone}
            />
        } else if (workoutExercise.isDuration) {
            return <DurationExercise
                workoutExercise={workoutExercise}
                workout={workout}
                onDone={this.onDurationExerciseDone}
            />
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(WorkoutRoutine);