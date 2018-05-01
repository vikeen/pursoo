import React from 'react';
import {connect} from 'react-redux';

import Form from "../../../../components/Form";
import {login} from "../../actions";

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
    }
];

const error = {
    general: "",
    email: "",
    password: ""
};

class Login extends React.Component {
    state = {
        error: error
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Login"
        }
    };

    onForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    onSubmit = (data) => {
        this.setState({error: error}); //clear out error messages
        const {email, password} = data;

        this.props.dispatch(login(email, password)).then(() => {
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
                  buttonTitle={"LOG IN"}
                  error={this.state.error}
                  onForgotPassword={this.onForgotPassword}/>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Login);