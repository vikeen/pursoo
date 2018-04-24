import React from 'react';
import {Text, View, StyleSheet, Alert, ImageBackground, Image} from 'react-native';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchMyCharacter} from "../../../characters/actions";
import MountainsBackground from '../../../../assets/images/mountains.png';

class Home extends React.Component {
    state = {
        isReady: false,
    };

    componentWillMount() {
        this.props.dispatch(fetchMyCharacter(this.props.user, () => {
            this.setState({isReady: true});
        }));
    }

    render() {
        const {character} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <ImageBackground source={MountainsBackground} style={styles.imageBackground}>
                <View style={styles.container}>
                    {/*<Image source={}/>*/}
                    <Text>{character.name}</Text>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character
    }
}

export default connect(mapStateToProps)(Home);