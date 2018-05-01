import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchMyCharacter} from "../../../characters/actions";
import {getMyWorkoutHistory} from "../../../workouts/actions";
import MountainsBackground from '../../../../assets/images/mountains.png';
import {Character} from "../../../characters/models";

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
                        <Text style={styles.workoutName}>{item.xpEarnedString}</Text>
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

        const percentLevelComplete = Character.percentOfLevelComplete(character);
        const xpBarStyles = StyleSheet.flatten([styles.xpBar, {width: `${percentLevelComplete}%`}]);

        return (
            <ImageBackground source={MountainsBackground} style={styles.imageBackground}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Image source={{uri: character.imageUrl}} style={styles.characterImage}/>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {character.name}
                    </Text>
                    <Text style={styles.level}>Level {character.level}</Text>
                    <View style={styles.xpContainer}>
                        <View style={styles.xpBarContainer}/>
                        <View style={xpBarStyles}/>
                        <View style={styles.xpTextContainer}>
                            <Text>Experience</Text>
                            <Text>{character.xp} / 250</Text>
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