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

        const exerciseIndex = props.exerciseIndex || 0;
        const exercise = props.workout.exercises[exerciseIndex];

        this.state = {
            exerciseIndex,
            exercise,
            workout: props.workout
        };
    }

    onDonePress = () => {
        let {workout, exerciseIndex} = this.state;
        let exercise = workout.exercises[exerciseIndex];
        const quantityCompleted = exercise.quantityCompleted || exercise.quantity;
        exercise = WorkoutExercise.complete(exercise, quantityCompleted);

        console.log(exercise);

        const nextExercise = this.state.workout.exercises[exerciseIndex + 1];

        if (nextExercise) {
            return Actions.push("WorkoutRoutine", {
                exerciseIndex: exerciseIndex + 1,
                workout
            });
        } else {
            workout = Workout.complete(workout);
            console.log(workout);
            return Actions.push("WorkoutReward", {workout});
        }
    };

    onChangeText = (text) => {
        const quantityCompleted = parseInt(text, 10);
        const exercise = Object.assign({}, this.state.exercise, {quantityCompleted});
        this.setState({exercise});
    };

    render() {
        const {exercise} = this.state;

        return (
            <View style={styles.container}>
                <Image source={{uri: exercise.image}} style={styles.image}/>
                <Text style={styles.name}>{exercise.name}</Text>
                <TextInput style={styles.quantity}
                           autoCapitalize="none"
                           autoCorrect={false}
                           keyboardType="numeric"
                           returnKeyType="done"
                           onChangeText={this.onChangeText}
                           value={exercise.quantity.toString()}
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