import React from 'react';
import {Text, View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchWorkouts} from "../../actions";

class WorkoutList extends React.Component {
    state = {
        isReady: false,
        workouts: []
    };

    componentDidMount() {
        this.props.dispatch(fetchWorkouts()).then(() => {

            const keys = Object.keys(this.props.workouts);
            const workouts = keys.map(key => this.props.workouts[key]);

            this.setState({
                isReady: true,
                workouts
            });
        });
    }

    __renderWorkout = (workout) => {
        return (
            <View key={workout.uid} style={styles.workout}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.image} source={{uri: workout.image}}/>
                    <Text style={styles.name}>{workout.name}</Text>
                </View>
            </View>
        )
    };

    render() {
        if (!this.state.isReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                {
                    this.state.workouts.map(this.__renderWorkout)
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        workouts: state.workoutReducer.workouts
    }
}

export default connect(mapStateToProps)(WorkoutList);