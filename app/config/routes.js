import React from 'react';
import {StyleSheet} from 'react-native';
import {Scene, Router, ActionConst, Stack, Modal, Tabs, Actions} from 'react-native-router-flux';
import {StackNavigator} from 'react-navigation';
import {TabNavigator} from 'react-navigation';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import WelcomeScreen from '../modules/auth/screens/Welcome';
import RegisterScreen from '../modules/auth/screens/Register';
import CompleteProfileScreen from '../modules/auth/screens/CompleteProfile';
import LoginScreen from '../modules/auth/screens/Login';
import ForgotPasswordScreen from '../modules/auth/screens/ForgotPassword';
import ProfileScreen from "../modules/profile/scenes/Profile";

//Character Scenes
import HomeScreen from '../modules/home/screens/Home';
import CharacterEditScreen from "../modules/characters/screens/CharacterEdit";

//Workout Scenes
import WorkoutListScreen from '../modules/workouts/screens/WorkoutList';
import WorkoutDetailScreen from "../modules/workouts/screens/WorkoutDetail";
import WorkoutRoutineScreen from "../modules/workouts/screens/WorkoutRoutine";
import WorkoutRewardScreen from "../modules/workouts/screens/WorkoutReward";

//Import Store, actions
import store from '../redux/store'
import {checkLoginStatus} from "../modules/auth/actions";

import {color, navTitleStyle} from "../styles/theme";

const AuthStack = StackNavigator({
    Welcome: {screen: WelcomeScreen},
    Register: {screen: RegisterScreen},
    CompleteProfile: {screen: CompleteProfileScreen},
    Login: {screen: LoginScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
}, {
    initialRouteName: 'Welcome',
});

const WorkoutStack = StackNavigator({
    WorkoutList: {screen: WorkoutListScreen},
    WorkoutDetail: {screen: WorkoutDetailScreen},
    WorkoutRoutine: {screen: WorkoutRoutineScreen},
    WorkoutReward: {screen: WorkoutRewardScreen},
}, {
    initialRouteName: 'WorkoutList',
});

const HomeStack = StackNavigator({
    Home: {screen: HomeScreen,},
    CharacterEdit: {screen: CharacterEditScreen}
}, {
    initialRouteName: 'Home',
});

const ProfileStack = StackNavigator({
    Profile: {screen: ProfileScreen}
});

const MainTabNavigator = TabNavigator(
    {
        Home: {screen: HomeStack},
        Workouts: {screen: WorkoutStack},
        Profile: {screen: ProfileStack},
    },
    {
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
    }
);


export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    render() {
        if (this.state.isReady) {
            if (this.state.isLoggedIn) {
                return <MainTabNavigator/>;
            } else {
                return <AuthStack/>;
            }
        } else {
            return <Splash/>;
        }
    }
}
