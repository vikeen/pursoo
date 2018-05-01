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
            headerLeft: null,
            title: "Select Username"
        }
    };

    state = {
        error: error
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
        this.setState({error: error}); //clear out error messages

        const {user} = this.props;
        user.username = data.username;

        this.props.dispatch(updateUser(user)).then(this.onSuccess, this.onError);
    };

    onSuccess = () => {
        this.props.navigation.push('OnboardingCreateCharacter');
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
            <Form fields={this.fields}
                  onSubmit={this.onSubmit}
                  buttonTitle={"CONTINUE"}
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