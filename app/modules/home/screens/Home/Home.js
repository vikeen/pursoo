import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';

import styles from "./styles";
import {fetchMyCharacter} from "../../../characters/actions";
import {getMyWorkoutHistory} from "../../../workouts/actions";
import MountainsBackground from '../../../../assets/images/mountains.png';
import {Character} from "../../../characters/models";
import XpLabel from "../../../../components/XpLabel";
import {LEVEL_CONFIG} from "../../../../config/levels";

class Home extends React.Component {
    state = {
        isReady: false,
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('CharacterEdit')}
                    title="Edit"
                />
            )
        }
    };

    componentWillMount() {
        Promise.all([
            this.props.dispatch(fetchMyCharacter(this.props.user)),
            this.props.dispatch(getMyWorkoutHistory(this.props.user))
        ]).then(() => {
            this.setState({
                isReady: true
            });
        });
    }

    renderWorkoutHistoryItem = (item) => {
        return (
            <View key={item.uid} style={styles.workout}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.workoutImage} source={{uri: item.imageUrl}}/>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={styles.workoutName}>{item.name}</Text>
                        <XpLabel xp={item.xpEarned}/>
                    </View>
                </View>
            </View>
        )
    };

    renderWorkoutHistory = () => {
        const {workoutHistory} = this.props;

        if (workoutHistory.length) {
            return (
                <View style={styles.recentWorkoutsContainer}>
                    <Text style={styles.recentWorkoutsTitle}>Recent Workouts</Text>
                    {
                        workoutHistory.map(this.renderWorkoutHistoryItem)
                    }
                </View>
            );
        }
    };

    render() {
        if (!this.state.isReady) {
            return null;
        }

        const {character} = this.props;

        const xpProgress = Character.percentOfLevelComplete(character);

        return (
            <ImageBackground source={MountainsBackground} style={styles.imageBackground}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Image source={{uri: character.imageUrl}} style={styles.characterImage}/>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {character.name}
                    </Text>
                    <Text style={styles.level}>Level {character.level}</Text>
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
                            <Text>Experience</Text>
                            <Text>{character.xp} / {LEVEL_CONFIG[character.level].xpNeeded}</Text>
                        </View>
                    </View>
                    {this.renderWorkoutHistory()}
                </ScrollView>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        workoutHistory: state.workoutReducer.workoutHistory
    }
}

export default connect(mapStateToProps)(Home);