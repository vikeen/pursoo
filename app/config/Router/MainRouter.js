import React from "react";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {StackNavigator, TabNavigator} from 'react-navigation';

// Onboarding
import OnboardingIntro from "../../modules/onboarding/screens/OnboardingIntro";
import UpdateUsername from "../../modules/onboarding/screens/UpdateUsername";
import CreateCharacter from "../../modules/onboarding/screens/CreateCharacter";

//Character Scenes
import HomeScreen from '../../modules/home/screens/Home';
import CharacterEditScreen from "../../modules/characters/screens/CharacterEdit";

//Workout Scenes
import WorkoutListScreen from '../../modules/workouts/screens/WorkoutList';
import WorkoutDetailScreen from "../../modules/workouts/screens/WorkoutDetail";
import WorkoutRoutineScreen from "../../modules/workouts/screens/WorkoutRoutine";
import WorkoutRewardScreen from "../../modules/workouts/screens/WorkoutReward";
import ExerciseInfoScreen from "../../modules/exercises/screens/ExerciseInfo";

// Profile
import ProfileScreen from "../../modules/profile/screens/Profile";

import MainInitScreen from "./MainInitScreen";

import {color, tabIconStyle} from "../../styles/theme";
import {StyleSheet} from "react-native";

function getTabIconStyle(tintColor) {
    return StyleSheet.flatten([tabIconStyle, {color: tintColor}]);
}

export default StackNavigator({
    Initial: {
        screen: MainInitScreen
    },
    Onboarding: StackNavigator({
        OnboardingIntro: {screen: OnboardingIntro},
        OnboardingUsername: {screen: UpdateUsername},
        OnboardingCreateCharacter: {screen: CreateCharacter}
    }, {
        initialRouteName: 'OnboardingIntro',
    }),
    Main: TabNavigator({
        Home: {
            screen: StackNavigator({
                Home: {screen: HomeScreen,},
                CharacterEdit: {screen: CharacterEditScreen}
            }, {
                initialRouteName: 'Home',
            }),
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.home}</FontAwesome>
            })
        },
        Workouts: {
            screen: StackNavigator({
                WorkoutList: {screen: WorkoutListScreen},
                WorkoutDetail: {screen: WorkoutDetailScreen},
                WorkoutRoutine: {screen: WorkoutRoutineScreen},
                WorkoutReward: {screen: WorkoutRewardScreen},
                ExerciseInfo: {screen: ExerciseInfoScreen}
            }, {
                initialRouteName: 'WorkoutList',
            }),
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.heartbeat}</FontAwesome>
            })
        },
        Profile: {
            screen: StackNavigator({
                Profile: {screen: ProfileScreen}
            }),
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.userCircleO}</FontAwesome>
            })
        },
    }, {
        tabBarOptions: {
            style: {
                backgroundColor: color.brandPrimary
            },
            activeTintColor: color.white
        },
        navigationOptions: ({navigation}) => ({
            tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
                navigation.popToTop();
                jumpToIndex(scene.index);
            }
        }),
        animationEnabled: false,
        swipeEnabled: false
    })
}, {
    initialRouteName: 'Initial',
    headerMode: 'none'
});