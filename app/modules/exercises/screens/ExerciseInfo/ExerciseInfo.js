import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from "./styles";
import XpLabel from "../../../../components/XpLabel/XpLabel";
import {upperCaseFirstCharacter} from "../../../../components/Util";

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

    getMuscleGroupText = () => {
        const {exercise} = this.state;

        const {primary, secondary = []} = exercise.muscleGroups;
        const allMuscles = primary.concat(secondary);
        return allMuscles.map(upperCaseFirstCharacter).join(", ");
    };

    renderDescriptionText = () => {
        const {exercise} = this.state;
        const description = exercise.description || [];

        return (
            <View>
                {
                    description.map((text, index) => {
                        return <Text key={index} style={styles.descriptionContainer}>{text}</Text>;
                    })
                }
            </View>
        );
    };

    render() {
        const {exercise} = this.state;

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image style={styles.image} source={{uri: exercise.imageUrl}}/>
                    <Text style={styles.name}>{exercise.name}</Text>
                    <Text style={styles.muscleGroups}>{this.getMuscleGroupText()}</Text>
                    <XpLabel xp={exercise.xp}/>
                    {this.renderDescriptionText()}
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ExerciseInfo);

