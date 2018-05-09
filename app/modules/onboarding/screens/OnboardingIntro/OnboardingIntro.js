import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

import BackgroundImage from '../../../../assets/images/man-with-future-shadow.jpg';

import styles from "./styles";
import Button from "../../../../components/Button";

class OnboardingIntro extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    state = {
        isFetching: false
    };

    goToNext = () => {
        this.props.navigation.push('OnboardingUsername');
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={BackgroundImage} style={styles.background}/>
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome to Pursoo</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at leo id nibh consectetur scelerisque eget et turpis. Etiam sollicitudin mauris eget turpis rutrum commodo. Vivamus sed libero eu massa auctor venenatis.</Text>
                    <Button
                        title={"Get Started Now"}
                        containerViewStyle={{
                            marginTop: 20
                        }}
                        onPress={this.goToNext}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(OnboardingIntro);