import {StyleSheet} from 'react-native';
import {padding, color, fontSize, fontFamily, windowWidth, normalize} from "../../styles/theme";

const styles = StyleSheet.create({
    containerView: {
        width: windowWidth - 40
    },
    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(55)
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    }
});

export default styles;