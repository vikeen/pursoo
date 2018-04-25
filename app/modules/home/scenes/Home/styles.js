import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const xpBarHeight = 20;
const xpBarWidth = 300;

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: padding,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    characterImage: {
        width: 120,
        height: 120,
        resizeMode
    },

    name: {
        fontSize: fontSize.large * 1.5,
        fontFamily: fontFamily.regular,
        marginTop: 20,
        marginBottom: 20
    },

    level: {
        fontSize: fontSize.large,
        textAlign: 'center',
        marginBottom: 10
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