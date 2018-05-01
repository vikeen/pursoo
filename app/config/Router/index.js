import React from 'react';
import {connect} from 'react-redux';

//Splash Component
import Splash from '../../components/Splash/Splash';
import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';

//Import Store, actions
import store from '../../redux/store'
import {checkLoginStatus} from "../../modules/auth/actions";


class Router extends React.Component {
    state = {
        isReady: false,
        isLoggedIn: false
    };

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus(() => {
            _this.setState({isReady: true});
        }));
    }

    render() {
        if (this.state.isReady) {
            if (this.props.isLoggedIn) {
                return <MainRouter/>;
            } else {
                return <AuthRouter/>;
            }
        } else {
            return <Splash/>;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Router);