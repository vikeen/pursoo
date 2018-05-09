import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Logo from "../../assets/images/white_logo_transparent.png";

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={Logo}/>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}