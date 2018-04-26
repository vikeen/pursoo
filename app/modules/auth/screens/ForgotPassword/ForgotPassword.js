import React from 'react';
import {connect} from 'react-redux';

import {actions as auth} from "../../index"

const {resetPassword} = auth;

import Form from "../../../../components/Form"

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    }
];

const error = {
    general: "",
    email: ""
};

class ForgotPassword extends React.Component {
    state = {
        error: error
    };
    static navigationOptions = ({navigation}) => {
        return {
            title: "Forgot Password"
        }
    };

    onSubmit = (data) => {
        this.setState({error: error}); //clear out error messages

        this.props.resetPassword(data, this.onSuccess, this.onError)
    };

    onSuccess = () => {
        alert("Password Reminder Sent");
        this.props.navigation.goBack();
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

        this.setState({error: errObj});
    };

    render() {
        return (
            <Form fields={fields}
                  onSubmit={this.onSubmit}
                  buttonTitle={"SUBMIT"}
                  error={this.state.error}/>
        );
    }
}

export default connect(null, {resetPassword})(ForgotPassword);
