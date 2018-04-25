import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchMyCharacter} from "../../../characters/actions";

class WorkoutReward extends React.Component {
    state = {
        isReady: false
    };

    componentWillMount() {
        this.props.navigation.setParams({
            backTitle: 'Home',
            onBack: this.goToHome
        });

        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({
                isReady: true,
            });
        });
    }

    goToHome = () => {
        Actions.reset("Main")
    };

    render() {
        const {workout, character} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Text h1>Workout Reward</Text>
                <Text h2>{workout.xp}</Text>
                <Text h3>{character.name}</Text>
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