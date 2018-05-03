import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const xpBarHeight = 20;
const xpBarWidth = 300;

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        flex: 1
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        padding: padding,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        width: xpBarWidth,
    },

    xpBarContainer: {
        backgroundColor: color.white,
        height: xpBarHeight + 2,
        width: '100%',
        borderWidth: 2,
        borderColor: color.black,
        marginBottom: -xpBarHeight,
    },

    xpBar: {
        backgroundColor: '#674ea7',
        height: xpBarHeight
    },

    xpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    // recent workouts

    recentWorkoutsContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 10
    },

    recentWorkoutsTitle: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.regular
    },

    workout: {
        width: '100%',
        backgroundColor: color.white,
        marginBottom: padding,
        height: 50,
        borderWidth: 1,
        borderColor: color.grey,
        borderRadius: 5
    },

    workoutImage: {
        width: 70,
        resizeMode: 'cover',
        marginRight: padding
    },

    workoutName: {
        marginTop: 3,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    }
});

export default styles;