import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
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
            const workouts = keys.map(key => {
                return Object.assign({}, this.props.workouts[key], {key});
            });

            this.setState({
                isReady: true,
                workouts
            });
        });
    }

    goToitem = (workout) => {
        Actions.WorkoutDetail({workout});
    };

    renderWorkoutItem = ({item}) => {
        return (
            <TouchableOpacity key={item.uid} style={styles.workout}
                onPress={() => this.goToitem(item)}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.image} source={{uri: item.image}}/>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        if (!this.state.isReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.workouts}
                    renderItem={this.renderWorkoutItem}
                />
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