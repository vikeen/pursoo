import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";

class WorkoutReward extends React.Component {

    render() {
        const {workout} = this.props;

        return (
            <View style={styles.container}>
                <Text h1>Workout Reward</Text>
                <Text h2>{workout.xp}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(WorkoutReward);