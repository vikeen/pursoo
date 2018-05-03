import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {Workout, WorkoutExercise} from "../../models";

import QuantityExercise from "../../components/QuantityExercise";
import DurationExercise from "../../components/DurationExercise";

class WorkoutRoutine extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <TouchableOpacity
                    onPress={params.goToExerciseHelp}>
                    <FontAwesome
                        style={{
                            color: '#007AFF',
                            fontSize: 22,
                            marginRight: 10
                        }}>{Icons.infoCircle}</FontAwesome>
                </TouchableOpacity>
            )
        }
    };

    constructor(props) {
        super(props);

        const {workout, workoutExerciseIndex} = props.navigation.state.params;

        this.state = {
            workoutExerciseIndex,
            workout
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({ goToExerciseHelp: this.goToExerciseHelp.bind(this) });
    }

    onQuantityExerciseDone = (workoutExercise, quantityCompleted) => {
        WorkoutExercise.complete(workoutExercise, quantityCompleted, undefined);
        this.goToNextExercise();
    };

    onDurationExerciseDone = (workoutExercise, durationCompleted) => {
        WorkoutExercise.complete(workoutExercise, undefined, durationCompleted);
        this.goToNextExercise();
    };

    goToExerciseHelp = () => {
        const {workout, workoutExerciseIndex} = this.state;
        const exercise = workout.exercises[workoutExerciseIndex].exercise;

        this.props.navigation.navigate('ExerciseInfo', {exercise});
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