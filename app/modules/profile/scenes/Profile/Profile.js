import React from 'react';

import {View, StyleSheet, Alert, TextInput, Text} from 'react-native';

import {Button} from 'react-native-elements'
import {connect} from 'react-redux';

import styles from "./styles";
import Form from "../../../../components/Form";

import {actions as auth, theme} from "../../../auth/index";
import {updateUser} from "../../actions";

const {signOut} = auth;

const {color} = theme;

const error = {
    general: "",
    username: ""
};

class Profile extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Profile"
        }
    };
    state = {
        error: error
    };

    constructor(props) {
        super(props);

        this.fields = [
            {
                key: 'username',
                label: "Username",
                placeholder: "Username",
                autoFocus: false,
                secureTextEntry: false,
                value: props.user.username,
                type: "text"
            }
        ];
    }

    onSignOut = () => {
        this.props.dispatch(signOut(this.onSignOutSuccess, this.onSignOutError));
    };

    onSignOutSuccess = () => {
        this.props.navigation.reset('Welcome');
    };

    onSignOutError = (error) => {
        Alert.alert('Oops!', error.message);
    };

    onProfileSubmit = (data) => {
        this.setState({error: error}); //clear out error messages

        const user = Object.assign({}, this.props.user, data);

        this.props.dispatch(updateUser(user, this.onProfileSuccess, this.onProfileError));
    };

    onProfileSuccess = () => {
    };

    onProfileError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    };

    render() {
        return (
            <View style={styles.container}>
                <Form fields={this.fields}
                      showLabel={true}
                      onSubmit={this.onProfileSubmit}
                      buttonTitle={"SAVE"}
                      error={this.state.error}/>
                <Button
                    raised
                    borderRadius={4}
                    title={'LOG OUT'}
                    style={styles.signOutButton}
                    onPress={this.onSignOut}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        signOut,
        updateUser
    };
}

export default connect(mapStateToProps)(Profile);