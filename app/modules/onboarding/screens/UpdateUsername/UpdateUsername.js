import React from 'react';
import {connect} from 'react-redux';

import {updateUser} from "../../actions";
import Form from "../../../../components/Form";

const error = {
    general: "",
    username: ""
};

class UpdateUsername extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Select Username"
        }
    };

    state = {
        error,
        isFetching: false
    };

    constructor(props) {
        super(props);

        this.fields = [{
            key: 'username',
            label: "Username",
            placeholder: "Username",
            autoFocus: false,
            secureTextEntry: false,
            value: props.user.username,
            type: "text"
        }];
    }

    onSubmit = (data) => {
        this.setState({
            error, //clear out error messages
            isFetching: true
        });

        const {user} = this.props;
        user.username = data.username;

        this.props.dispatch(updateUser(user)).then(() => {
            this.setState({isFetching: false});
            this.props.navigation.push('OnboardingCreateCharacter');
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

        this.setState({
            error: errObj,
            isFetching: false
        });
    };

    render() {
        return (
            <Form fields={this.fields}
                  onSubmit={this.onSubmit}
                  buttonTitle={"CONTINUE"}
                  isFetching={this.state.isFetching}
                  error={this.state.error}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(UpdateUsername);