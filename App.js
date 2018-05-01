import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Router from './app/config/Router';
import store from './app/redux/store';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
