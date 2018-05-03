import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontFamily, fontSize, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: padding,
        backgroundColor: color.white
    },

    image: {
        width: 120,
        height: 120,
        marginBottom: 10
    },

    name: {
        fontSize: normalize(30),
        fontFamily: fontFamily.regular
    },

    duration: {
        fontSize: normalize(70),
        fontFamily: fontFamily.bold,
        marginTop: 20
    },

    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(45),
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },
});

export default styles;