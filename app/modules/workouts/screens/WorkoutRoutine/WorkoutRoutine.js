import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Workout, WorkoutExercise} from "../../models";

import styles from "./styles";

class WorkoutRoutine extends React.Component {
    constructor(props) {
        super(props);

        const {workout, workoutExerciseIndex} = props.navigation.state.params;
        const workoutExercise = workout.exercises[workoutExerciseIndex];

        this.state = {
            workoutExerciseIndex,
            workoutExercise,
            workout
        };
    }

    onDonePress = () => {
        const {workout, workoutExercise, workoutExerciseIndex} = this.state;
        const quantityCompleted = workoutExercise.quantityCompleted || workoutExercise.quantity;
        const nextWorkoutExercise = workout.exercises[workoutExerciseIndex + 1];
        WorkoutExercise.complete(workoutExercise, quantityCompleted);

        // if (nextWorkoutExercise) {
        //     return this.props.navigation.navigate("WorkoutRoutine", {
        //         workoutExerciseIndex: workoutExerciseIndex + 1,
        //         workout
        //     });
        // } else {
            return this.props.navigation.navigate("WorkoutReward", {
                workout: Workout.complete(workout)
            });
        // }
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
                <Image source={{uri: workoutExercise.imageUrl}} style={styles.image}/>
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