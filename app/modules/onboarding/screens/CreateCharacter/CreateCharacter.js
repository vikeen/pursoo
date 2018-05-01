import React from 'react';
import {connect} from 'react-redux';

import {createMyCharacter} from "../../../characters/actions";
import Form from "../../../../components/Form";
import {NavigationActions} from "react-navigation";

const fields = [
    {
        key: 'name',
        label: "Name",
        placeholder: "My Character",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    }
];

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
        error: error
    };

    onSubmit = (data) => {
        this.setState({error: error}); //clear out error messages

        const {user} = this.props;

        this.props.dispatch(createMyCharacter(user, data.name))
            .then(this.onSuccess, this.onError)
    };

    onSuccess = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: 'Main'})],
        });
        this.props.navigation.dispatch(resetAction);
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

export default connect(mapStateToProps)(CreateCharacter);