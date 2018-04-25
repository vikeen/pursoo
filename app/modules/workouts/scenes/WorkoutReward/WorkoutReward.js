import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchMyCharacter, updateCharacter} from "../../../characters/actions";
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

            const workout = JSON.parse(`{"difficulty":2,"exerciseRoutineConfig":[{"key":"jumping-jack","quantity":20},{"key":"lunge","quantity":10},{"key":"pushup-knees","quantity":20},{"key":"jumping-jack","quantity":20},{"key":"hip-raise","quantity":10},{"key":"lunge","quantity":10},{"key":"pushup-knees","quantity":10}],"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fworkouts%2Fpushup.jpg?alt=media&token=2d665391-662f-449b-9440-da3ec7dfe293","name":"Beginner's Boogie (Part 2)","uid":"beginners-boogie-part-2","exercises":[{"name":"Jumping Jack","pluralizedName":"Jumping Jacks","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":20,"quantityCompleted":20,"xp":20,"xpString":"1xp","xpEarned":400,"xpEarnedString":"400xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Jumping Jack","pluralizedName":"Jumping Jacks","xp":1}},{"name":"Lunge","pluralizedName":"Lunges","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":20,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Lunge","pluralizedName":"Lunges","xp":2}},{"name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":20,"quantityCompleted":0,"xp":40,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","xp":2}},{"name":"Jumping Jack","pluralizedName":"Jumping Jacks","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":20,"quantityCompleted":0,"xp":20,"xpString":"1xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Jumping Jack","pluralizedName":"Jumping Jacks","xp":1}},{"name":"Hip Raise","pluralizedName":"Hip Raises","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":10,"xpString":"1xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Hip Raise","pluralizedName":"Hip Raises","xp":1}},{"name":"Lunge","pluralizedName":"Lunges","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":20,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Lunge","pluralizedName":"Lunges","xp":2}},{"name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":20,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","xp":2}}],"xp":150,"xpString":"150xp", "xpEarned": 110, "xpEarnedString": "110xp"}`);

            const character = Character.addXp(this.props.character, workout.xpEarned);

            this.props.dispatch(updateCharacter(character));
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

        const workout = JSON.parse(`{"difficulty":2,"exerciseRoutineConfig":[{"key":"jumping-jack","quantity":20},{"key":"lunge","quantity":10},{"key":"pushup-knees","quantity":20},{"key":"jumping-jack","quantity":20},{"key":"hip-raise","quantity":10},{"key":"lunge","quantity":10},{"key":"pushup-knees","quantity":10}],"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fworkouts%2Fpushup.jpg?alt=media&token=2d665391-662f-449b-9440-da3ec7dfe293","name":"Beginner's Boogie (Part 2)","uid":"beginners-boogie-part-2","exercises":[{"name":"Jumping Jack","pluralizedName":"Jumping Jacks","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":20,"quantityCompleted":20,"xp":20,"xpString":"1xp","xpEarned":400,"xpEarnedString":"400xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Jumping Jack","pluralizedName":"Jumping Jacks","xp":1}},{"name":"Lunge","pluralizedName":"Lunges","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":20,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Lunge","pluralizedName":"Lunges","xp":2}},{"name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":20,"quantityCompleted":0,"xp":40,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","xp":2}},{"name":"Jumping Jack","pluralizedName":"Jumping Jacks","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":20,"quantityCompleted":0,"xp":20,"xpString":"1xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Jumping Jack","pluralizedName":"Jumping Jacks","xp":1}},{"name":"Hip Raise","pluralizedName":"Hip Raises","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":10,"xpString":"1xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Hip Raise","pluralizedName":"Hip Raises","xp":1}},{"name":"Lunge","pluralizedName":"Lunges","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":20,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Lunge","pluralizedName":"Lunges","xp":2}},{"name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","quantity":10,"quantityCompleted":0,"xp":20,"xpString":"2xp","xpEarned":0,"xpEarnedString":"0xp","exercise":{"image":"https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d","name":"Pushup (Knees)","pluralizedName":"Pushups (Knees)","xp":2}}],"xp":150,"xpString":"150xp", "xpEarned": 110, "xpEarnedString": "110xp"}`);

        if (!this.state.isReady) {
            return null;
        }

        const percentLevelComplete = Character.percentOfLevelComplete(character);
        const xpBarStyles = StyleSheet.flatten([styles.xpBar, {width: `${percentLevelComplete}%`}]);

        return (
            <View style={styles.container}>
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
            </View>
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