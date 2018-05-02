import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles'
import FontAwesome, {Icons} from "react-native-fontawesome";
import {padding, fontSize} from "../../styles/theme";

export default class XpLabel extends React.Component {
    static propTypes: {
        xp: PropTypes.number.isRequired,
        iconSize: PropTypes.number
    };

    render() {
        const trophyStyles = {
            marginRight: padding,
            fontSize: this.props.iconSize || fontSize.regular
        };

        return (
            <View style={styles.meta}>
                <FontAwesome style={trophyStyles}>{Icons.trophy}</FontAwesome>
                <Text>{this.props.xp}xp</Text>
            </View>
        );
    }
}