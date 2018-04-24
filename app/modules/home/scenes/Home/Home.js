import React from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
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
        this.props.navigation.setParams({
            rightTitle: 'Edit',
            onRight: this.handleNavEditTouch
        });

        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({
                isReady: true,
            });
        });
    }

    handleNavEditTouch = () => {
        Actions.CharacterEdit();
    };

    render() {
        const {character} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <ImageBackground source={MountainsBackground} style={styles.imageBackground}>
                <View style={styles.container}>
                    <Image source={{uri: character.image}} style={styles.characterImage}/>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {character.name}
                    </Text>
                    <Text style={styles.level}>Level {character.level}</Text>
                    <View style={styles.xpContainer}>
                        <View style={styles.xpBarContainer}/>
                        <View style={styles.xpBar}/>
                        <View style={styles.xpTextContainer}>
                            <Text>Experience</Text>
                            <Text>{character.xp} / 250</Text>
                        </View>
                    </View>
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