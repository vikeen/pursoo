import React from 'react';
import {Text, View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchWorkout} from "../../actions";

class WorkoutDetail extends React.Component {
    state = {
        isReady: false,
        workouts: []
    };

    componentDidMount() {
        this.setState({isReady: true});
    }

    render() {
        const {workout} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Text>{workout.name}</Text>
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

export default connect(mapStateToProps)(WorkoutDetail);