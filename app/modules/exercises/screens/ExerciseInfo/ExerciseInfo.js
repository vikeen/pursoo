import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from "./styles";

class ExerciseInfo extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: params.exercise.name
        };
    };

    constructor(props) {
        super();

        const {exercise} = props.navigation.state.params;

        this.state = {
            exercise
        };
    }

    render() {
        const {exercise} = this.state;

        return (
            <View>
                <Image style={styles.image} source={{uri: exercise.imageUrl}}/>
                <Text>{exercise.name}</Text>
                <Text>{exercise.pluralizedName}</Text>
                <Text>{exercise.muscleGroups.primary}</Text>
                <Text>{exercise.muscleGroups.secondary}</Text>
                <Text>{exercise.xp}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ExerciseInfo);