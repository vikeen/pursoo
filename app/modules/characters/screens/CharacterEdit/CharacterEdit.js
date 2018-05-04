import React from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import DropdownAlert from 'react-native-dropdownalert';

import styles from "./styles";
import {fetchMyCharacter, updateCharacter} from "../../actions";

class CharacterEdit extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Character"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            character: {}
        };
    }

    componentWillMount() {
        return Promise.all([
            firebase.database().ref('characterImages').once('value'),
            this.props.dispatch(fetchMyCharacter(this.props.user))
        ]).then((response) => {
            this.setState({
                isReady: true,
                imageUrls: response[0].val(),
                character: this.props.character
            });
        });
    }

    onSubmit = () => {
        const {character} = this.state;

        this.props.dispatch(updateCharacter(character)).then(() => {
            this.props.navigation.goBack();
        }).catch(() => {
            this.dropdown.alertWithType('error', 'Oops! Something got messed up', "");
        });
    };

    onChangeText = (key, text) => {
        const character = Object.assign({}, this.state.character);
        character[key] = text;
        this.setState({character});
    };

    onImagePress = (imageUrl) => {
        const character = Object.assign({}, this.state.character, {
            imageUrl
        });

        this.setState({character});
    };

    render() {
        const {character, imageUrls} = this.state;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                <DropdownAlert ref={ref => this.dropdown = ref} zIndex={1000}/>
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
                <ScrollView horizontal={true} bounces={false} style={{
                    padding: 10,
                    marginTop: 10,
                    flex: 1
                }}>
                    {
                        imageUrls.map(imageUrl => {
                            return <TouchableOpacity key={imageUrl} onPress={() => this.onImagePress(imageUrl)}>
                                <Image source={{uri: imageUrl}}
                                       style={{
                                           height: 100,
                                           width: 100,
                                           resizeMode: 'contain'
                                       }}
                                />
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
                <Button
                    raised
                    title="SAVE"
                    borderRadius={4}
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
        user: state.authReducer.user,
        character: state.characterReducer.character
    }
}

export default connect(mapStateToProps)(CharacterEdit);