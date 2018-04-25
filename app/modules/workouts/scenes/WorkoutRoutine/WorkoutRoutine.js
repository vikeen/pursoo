import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";

class WorkoutRoutine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exerciseIndex: 0,
            exercise: props.workout.exercises[0]
        };
    }

    onDonePress = () => {
        const exerciseIndex = this.state.exerciseIndex + 1;
        const exercise = this.props.workout.exercises[exerciseIndex];

        if (exercise) {
            this.setState({
                exerciseIndex,
                exercise
            });
        } else {
            alert("Done!");
        }

    };

    render() {
        const {exercise} = this.state;

        return (
            <View style={styles.container}>
                <Image source={{uri: exercise.image}} style={styles.image}/>
                <Text style={styles.name}>{exercise.name}</Text>
                <Text style={styles.quantity}>{exercise.quantity}</Text>
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