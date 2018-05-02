import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, TextInput} from 'react-native';
import PropTypes from "prop-types";

import styles from "./styles";

export default class DurationExercise extends React.Component {
    static propTypes = {
        workoutExercise: PropTypes.object.isRequired,
        workout: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            workoutExercise: props.workoutExercise,
            workout: props.workout
        };
    }

    onDonePress = () => {
        const {workoutExercise} = this.state;
        const durationCompleted = workoutExercise.durationCompleted || workoutExercise.duration;
        this.props.onDone(workoutExercise, durationCompleted);
    };

    onChangeText = (duration) => {
        const durationCompleted = parseInt(duration, 10);
        const workoutExercise = Object.assign({}, this.state.workoutExercise, {durationCompleted});
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
                           value={workoutExercise.durationLabel}
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