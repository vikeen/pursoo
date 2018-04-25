import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";

class WorkoutRoutine extends React.Component {
    state = {};

    constructor() {
        super();

        console.log(this.props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{JSON.stringify(this.props.workout)}</Text>
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