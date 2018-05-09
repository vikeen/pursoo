import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button as ReactNativeButton} from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from "./styles";



export default class Button extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        containerViewStyle: PropTypes.object,
    };

    render() {
        const containerViewStyle = StyleSheet.flatten([styles.containerView, this.props.containerViewStyle || {}]);

        return (
            <ReactNativeButton
                raised
                borderRadius={4}
                title={this.props.title}
                containerViewStyle={containerViewStyle}
                buttonStyle={[styles.button]}
                textStyle={styles.buttonText}
                onPress={this.props.onPress}/>
        )
    }
}