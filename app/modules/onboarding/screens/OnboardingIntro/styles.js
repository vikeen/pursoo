import {StyleSheet} from 'react-native';
import {fontFamily, normalize, padding, windowWidth} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: windowWidth - 40,
        paddingTop: padding,
        paddingBottom: padding,
    },

    background: {
        flex: 1,
        resizeMode: 'contain'
    },

    title: {
        fontFamily: fontFamily.medium,
        fontSize: normalize(35),
        marginBottom: 20
    }
});

export default styles;