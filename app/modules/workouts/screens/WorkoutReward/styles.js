import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontFamily, fontSize, normalize} = theme;

const xpBarHeight = 20;
const xpBarWidth = 300;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.white,

    },

    content: {
        flex: 1,
        flexDirection: 'column',
        padding: padding,
        backgroundColor: color.white,
        alignItems: 'center',
    },

    banner: {
        height: 50,
        backgroundColor: color.brandPrimary,
        padding: 12
    },

    bannerTitle: {
        color: color.white,
        fontFamily: fontFamily.regular,
        fontSize: normalize(18),
        textAlign: 'center'
    },

    title: {
        textAlign: 'center',
        fontSize: normalize(25),
        marginTop: 10,
        marginBottom: 30
    },

    xp: {
        textAlign: 'center',
        fontSize: normalize(40),
        marginTop: 5
    },

    trophy: {
        fontSize: normalize(50),
    },

    image: {
        width: 70,
        height: 70,
        marginTop: 70,
        marginBottom: 10,
        resizeMode: 'contain'
    },

    level: {
        fontSize: normalize(25),
        fontFamily: fontFamily.bold
    },

    xpContainer: {
        flex: 1,
        flexDirection: 'column',
        width: xpBarWidth
    },

    xpBarContainer: {
        backgroundColor: color.white,
        height: xpBarHeight + 2,
        width: '100%',
        borderWidth: 2,
        borderColor: color.black,
        marginBottom: -xpBarHeight
    },

    xpBar: {
        backgroundColor: '#674ea7',
        height: xpBarHeight
    },

    xpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;