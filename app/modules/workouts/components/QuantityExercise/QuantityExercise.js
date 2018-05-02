import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, TextInput} from 'react-native';
import PropTypes from "prop-types";

import styles from "./styles";

export default class QuantityExercise extends React.Component {
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
        const quantityCompleted = workoutExercise.quantityCompleted || workoutExercise.quantity;
        this.props.onDone(workoutExercise, quantityCompleted);
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
                           value={workoutExercise.quantityLabel}
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