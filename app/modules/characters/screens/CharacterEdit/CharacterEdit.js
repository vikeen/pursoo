import React from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements';
import {connect} from 'react-redux';
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
        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({
                isReady: true,
                character: this.props.character
            });
        })
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

    render() {
        const {character} = this.state;

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