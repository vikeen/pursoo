import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        padding,
        marginTop: padding,
        flex: 1
    },

    image: {
        height: 150,
        width: 150,
        resizeMode: 'contain'
    },

    checkmark: {
        position: 'absolute',
        fontSize: normalize(40),
        color: color.brandPrimary
    }
});

export default styles;