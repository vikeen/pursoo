import React from 'react';
import {connect} from 'react-redux';

import {register} from "../../actions";

import Form from "../../../../components/Form"

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    },
    {
        key: 'confirm_password',
        label: "Confirm Password",
        placeholder: "Confirm Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "confirm_password"
    }
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
};

class Register extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Register"
        }
    };

    state = {
        error: error
    };

    onSubmit = (data) => {
        this.setState({error: error}); //clear out error messages
        const {email, password} = data;

        this.props.dispatch(register(email, password)).then(() => {
        }, this.onError);
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
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"SIGN UP"}
                  error={this.state.error}/>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Register);