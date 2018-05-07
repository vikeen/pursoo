import {StyleSheet} from 'react-native';
import {theme} from "../../index";
const {color, padding, windowWidth, normalize, fontSize, fontFamily} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerView: {
        marginVertical: padding * 3,
        width: windowWidth - 40
    },
    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(55)
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },
});


export default styles;