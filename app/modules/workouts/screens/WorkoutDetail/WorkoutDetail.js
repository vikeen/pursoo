import React from 'react';
import {View, FlatList} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import Reporting from "../../../reporting";

import styles from "./styles";
import XpLabel from "../../../../components/XpLabel";

class WorkoutDetail extends React.Component {
    constructor(props) {
        super(props);
        const {workout} = props.navigation.state.params;
        this.state = {
            workout: workout
        };
    }

    startWorkoutRoutine = (workout) => {
        Reporting.track("workout__start", {name: workout.name});

        this.props.navigation.navigate("WorkoutRoutine", {
            workout,
            workoutExerciseIndex: 0
        })
    };

    renderWorkoutExerciseItem = ({item, index}) => {
        return (
            <View key={index} style={styles.exerciseRow}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseSets}>1</Text>
                <Text style={styles.exerciseReps}>{item.quantityLabel || item.durationLabel}</Text>
                <Text style={styles.exerciseReward}>{item.xpLabel}</Text>
            </View>
        )
    };

    render() {
        const {workout} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{workout.name}</Text>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <XpLabel xp={workout.xp} iconSize={21}/>
                    <View style={styles.exerciseRoutineContainer}>
                        <View style={styles.exerciseRowHeader}>
                            <Text style={styles.exerciseNameLabel}/>
                            <Text style={styles.exerciseSetsLabel}>Sets</Text>
                            <Text style={styles.exerciseRepsLabel}>Reps</Text>
                            <Text style={styles.exerciseRewardLabel}>Reward</Text>
                        </View>
                        <FlatList
                            data={workout.exercises}
                            keyExtractor={(item, index) => `${item.key}-${index}`}
                            renderItem={this.renderWorkoutExerciseItem}

                        />
                    </View>
                </View>
                <Button
                    raised
                    title={"START WORKOUT"}
                    borderRadius={4}
                    style={styles.button}
                    containerViewStyle={styles.containerView}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => this.startWorkoutRoutine(workout)}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(WorkoutDetail);