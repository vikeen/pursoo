import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Router from './app/config/routes'
import store from './app/redux/store';

// function cacheFonts(fonts) {
//     return fonts.map(font => Font.loadAsync(font));
// }

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    render() {
        if (!this.state.isReady) {
            // return (
            //     <AppLoading
            //         startAsync={this._loadAssetsAsync}
            //         onFinish={() => this.setState({isReady: true})}
            //         onError={console.warn}
            //     />
            // );
        }

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
