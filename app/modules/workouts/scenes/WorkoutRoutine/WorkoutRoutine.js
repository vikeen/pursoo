import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Workout, WorkoutExercise} from "../../models";

import styles from "./styles";

class WorkoutRoutine extends React.Component {
    constructor(props) {
        super(props);

        const workoutExerciseIndex = props.workoutExerciseIndex || 0;
        const workoutExercise = props.workout.exercises[workoutExerciseIndex];

        this.state = {
            workoutExerciseIndex,
            workoutExercise,
            workout: props.workout
        };
    }

    onDonePress = () => {
        const {workout, workoutExercise, workoutExerciseIndex} = this.state;
        const quantityCompleted = workoutExercise.quantityCompleted || workoutExercise.quantity;
        const nextWorkoutExercise = this.state.workout.exercises[workoutExerciseIndex + 1];
        WorkoutExercise.complete(workoutExercise, quantityCompleted);

        if (nextWorkoutExercise) {
            return Actions.push("WorkoutRoutine", {
                workoutExerciseIndex: workoutExerciseIndex + 1,
                workout
            });
        } else {
            return Actions.push("WorkoutReward", {
                workout: Workout.complete(workout)
            });
        }
    };

    onChangeText = (text) => {
        const quantityCompleted = parseInt(text, 10);
        const workoutExercise = Object.assign({}, this.state.workoutExercise, {quantityCompleted});
        this.setState({workoutExercise});
    };

    render() {
        const {workoutExercise} = this.state;

        return (
            <View style={styles.container}>
                <Image source={{uri: workoutExercise.image}} style={styles.image}/>
                <Text style={styles.name}>{workoutExercise.name}</Text>
                <TextInput style={styles.quantity}
                           autoCapitalize="none"
                           autoCorrect={false}
                           keyboardType="numeric"
                           returnKeyType="done"
                           onChangeText={this.onChangeText}
                           value={workoutExercise.quantity.toString()}
                           selectTextOnFocus={true}/>
                <Button
                    raised
                    title={"DONE"}
                    borderRadius={4}
                    style={styles.button}
                    containerViewStyle={styles.containerView}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={this.onDonePress}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(WorkoutRoutine);