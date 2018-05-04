import React from "react";
import {connect} from "react-redux";

class InitialScreen extends React.Component {
    constructor(props) {
        super(props);

        const {user} = props;

        if (!user.username || !user.characterUid) {
            props.navigation.navigate('Onboarding');
        } else {
            props.navigation.navigate('Main');
            // props.navigation.navigate('Workouts');
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(InitialScreen);