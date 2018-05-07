import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements';
import {NavigationActions} from "react-navigation";

import {createMyCharacter} from "../../../characters/actions";
import CharacterImageScrollView from "../../../characters/components/CharacterImageScrollView";
import styles from "./styles";

const error = {
    general: "",
    name: ""
};

class CreateCharacter extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Create Your Character"
        }
    };

    state = {
        error,
        isFetching: false,
        character: {}
    };

    onSubmit = () => {
        this.setState({
            error, //clear out error messages
            isFetching: true
        });

        const {user} = this.props;
        const {character} = this.state;

        this.props.dispatch(createMyCharacter(user, character.name, character.imageUrl))
            .then(() => {
                this.setState({isFetching: false});

                const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({routeName: 'Main'})],
                });
                this.props.navigation.dispatch(resetAction);
            }, this.onError)
    };

    onError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({
            error: errObj,
            isFetching: false
        });
    };

    onChangeText = (key, text) => {
        const character = Object.assign({}, this.state.character);
        character[key] = text;
        this.setState({character});
    };

    onCharacterImagePress = (imageUrl) => {
        const character = Object.assign({}, this.state.character, {imageUrl});
        this.setState({character});
    };

    render() {
        const {character, isFetching} = this.state;

        return (
            <View style={styles.container}>
                <FormLabel>Name</FormLabel>
                <FormInput
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    underlineColorAndroid={"#fff"}
                    placeholder="Name"
                    autoFocus={false}
                    onChangeText={(text) => this.onChangeText("name", text)}
                    inputStyle={styles.inputContainer}
                    value={character.name}/>
                <FormLabel>Image</FormLabel>
                <CharacterImageScrollView character={character}
                                          onSelect={this.onCharacterImagePress}/>
                <Button
                    raised
                    title="DONE"
                    borderRadius={4}
                    disabled={isFetching}
                    containerViewStyle={styles.containerView}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={this.onSubmit}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(CreateCharacter);