import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontFamily, fontSize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: padding
    },

    workout: {
        width: '100%',
        backgroundColor: color.white,
        marginBottom: padding,
        height: 75,
        borderWidth: 1,
        borderColor: color.grey,
        borderRadius: 5
    },

    image: {
        width: 100, // 4:3
        resizeMode: 'cover',
        marginRight: padding
    },

    name: {
        marginTop: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    }
});

export default styles;