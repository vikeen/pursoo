import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchMyCharacter, updateCharacter} from "../../../characters/actions";
import {createWorkoutHistory} from "../../../workouts/actions";
import {Character} from "../../../characters/models";
import {LEVEL_CONFIG} from "../../../../config/levels";

class WorkoutReward extends React.Component {
    state = {
        isReady: false,
        character: {}
    };

    componentWillMount() {
        this.props.navigation.setParams({
            backTitle: 'Home',
            onBack: this.goToHome
        });
    }

    componentDidMount() {
        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({
                character: this.props.character,
                isReady: true
            });

            const character = Character.addXp(this.props.character, this.props.workout.xpEarned);

            this.props.dispatch(updateCharacter(character));
            this.props.dispatch(createWorkoutHistory(this.props.user, this.props.workout));
            this.setState({character});

            setTimeout(() => {
                // animate experience bar
            }, 1500);
        });
    }

    goToHome = () => {
        Actions.reset("Main");
    };

    render() {
        const {character} = this.state;
        const {workout} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        const percentLevelComplete = Character.percentOfLevelComplete(character);
        const xpBarStyles = StyleSheet.flatten([styles.xpBar, {width: `${percentLevelComplete}%`}]);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>Workout Complete!</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{workout.name}</Text>
                    <Text style={styles.xp}>{workout.xpEarnedString}</Text>

                    <Image source={{uri: character.image}} style={styles.image}/>
                    <View style={styles.xpContainer}>
                        <View style={styles.xpBarContainer}/>
                        <View style={xpBarStyles}/>
                        <View style={styles.xpTextContainer}>
                            <Text style={styles.level}>{character.level}</Text>
                            <Text>{character.xp} / {LEVEL_CONFIG[character.level].xpNeeded}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character
    }
}

export default connect(mapStateToProps)(WorkoutReward);