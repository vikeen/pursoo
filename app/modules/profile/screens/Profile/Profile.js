import React from 'react';
import {ScrollView, Alert} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import styles from "./styles";
import Form from "../../../../components/Form";
import {getUser, signOut} from "../../../auth/actions";
import {updateUser} from "../../actions";

const error = {
    general: "",
    username: "",
    email: "",
    phone: ""
};

class Profile extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Profile"
        }
    };
    state = {
        error: error,
        isReady: false
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
            },
            {
                key: 'email',
                label: "Email",
                placeholder: "Email",
                autoFocus: false,
                secureTextEntry: false,
                value: props.user.email,
                type: "email"
            },
            {
                key: 'phone',
                label: "Phone",
                placeholder: "Phone",
                autoFocus: false,
                secureTextEntry: false,
                value: props.user.phone,
                type: "phone"
            }
        ];
    }

    componentWillMount() {
        this.props.dispatch(getUser(this.props.user)).then(() => {
            this.setState({
                isReady: true
            });
        });
    }

    onSignOut = () => {
        this.props.dispatch(signOut()).catch(this.onSignOutError);
    };

    onSignOutError = (error) => {
        Alert.alert('Oops!', error.message);
    };

    onProfileSubmit = (data) => {
        this.setState({error: error}); //clear out error messages

        const user = Object.assign({}, this.props.user, data);

        this.props.dispatch(updateUser(user)).then(this.onProfileSuccess, this.onProfileError);
    };

    onProfileSuccess = () => {
        this.dropdown.alertWithType('success', 'Profile saved!', "");
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
        if (!this.state.isReady) {
            return null;
        }

        return (
            <ScrollView style={styles.container}>
                <DropdownAlert ref={ref => this.dropdown = ref} zIndex={1000}/>
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
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        signOut,
        updateUser,
        getUser
    };
}

export default connect(mapStateToProps)(Profile);