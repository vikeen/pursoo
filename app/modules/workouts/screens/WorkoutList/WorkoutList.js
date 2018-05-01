import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchWorkouts} from "../../actions";

class WorkoutList extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Workouts"
        }
    };

    state = {
        isReady: false,
        workouts: []
    };

    componentDidMount() {
        this.props.dispatch(fetchWorkouts()).then(() => {
            this.setState({
                isReady: true
            });
        });
    }

    goToItem = (workout) => {
        this.props.navigation.navigate("WorkoutDetail", {workout});
    };

    renderWorkoutItem = ({item}) => {
        return (
            <TouchableOpacity key={item.uid} style={styles.workout}
                              onPress={() => this.goToItem(item)}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.image} source={{uri: item.imageUrl}}/>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.name}>{item.difficulty}</Text>
                        <Text style={styles.name}>{item.xpString}</Text>
                    </View>
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
                    data={this.props.workouts}
                    keyExtractor={(item) => item.uid}
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