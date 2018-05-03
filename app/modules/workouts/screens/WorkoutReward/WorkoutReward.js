import React from 'react';
import {Text} from 'react-native-elements';
import {View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';
import FontAwesome, {Icons} from "react-native-fontawesome";

import styles from "./styles";
import {fetchMyCharacter, updateCharacter} from "../../../characters/actions";
import {createWorkoutHistory} from "../../../workouts/actions";
import {Character} from "../../../characters/models";
import {LEVEL_CONFIG} from "../../../../config/levels";
import Reporting from "../../../reporting";

class WorkoutReward extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: null,
            headerRight: null
        }
    };

    constructor(props) {
        super(props);

        const {workout} = props.navigation.state.params;

        this.state = {
            workout,
            isReady: false,
            character: {}
        };
    }

    componentWillMount() {
        const {user} = this.props;
        const {workout} = this.props.navigation.state.params;

        Reporting.track("workout__end", {name: workout.name});

        this.props.dispatch(fetchMyCharacter(user)).then(character => {
            this.setState({
                character,
                isReady: true
            });

            const characterWithNewXp = Character.addXp(character, workout.xpEarned);

            this.props.dispatch(updateCharacter(characterWithNewXp));
            this.props.dispatch(createWorkoutHistory(user, workout));

            this.setState({character: characterWithNewXp});

            setTimeout(() => {
                // animate experience bar
            }, 1500);
        });
    }

    render() {
        const {workout, character} = this.state;

        if (!this.state.isReady) {
            return null;
        }

        const xpProgress = Character.percentOfLevelComplete(character);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>Workout Complete!</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{workout.name}</Text>
                    <FontAwesome style={styles.trophy}>{Icons.trophy}</FontAwesome>
                    <Text style={styles.xp}>{workout.xpEarnedLabel}</Text>

                    <Image source={{uri: character.imageUrl}} style={styles.image}/>
                    <View style={styles.xpContainer}>
                        <Progress.Bar
                            progress={xpProgress}
                            width={null}
                            height={20}
                            borderRadius={0}
                            borderColor={"#000000"}
                            borderWidth={2}
                            unfilledColor={"#ffffff"}
                            color={"#674ea7"}
                        />
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