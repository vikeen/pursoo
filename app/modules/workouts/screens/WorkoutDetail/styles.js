import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontFamily, normalize, fontSize, windowWidth} = theme;

const cellWidth = 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: padding,
        backgroundColor: color.white
    },

    title: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.medium
    },

    containerView: {
        marginVertical: padding * 3,
        width: windowWidth - 40 - padding
    },

    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(55),
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    exerciseNameLabel: {
        flex: 1,
        fontSize: fontSize.small
    },

    exerciseName: {
        flex: 1
    },

    exerciseRepsLabel: {
        width: cellWidth,
        textAlign: 'right',
        fontSize: fontSize.small
    },

    exerciseReps: {
        width: cellWidth,
        textAlign: 'right'
    },

    exerciseRewardLabel: {
        width: cellWidth + 20,
        textAlign: 'right',
        fontSize: fontSize.small
    },

    exerciseReward: {
        width: cellWidth + 20,
        textAlign: 'right'
    },

    exerciseSetsLabel: {
        width: cellWidth,
        textAlign: 'right'
    },

    exerciseSets: {
        width: cellWidth,
        textAlign: 'right'
    },

    exerciseRoutineContainer: {
        marginTop: 40
    },

    exerciseRowHeader: {
        flex: 0,
        flexDirection: 'row',
        padding: padding,
        borderBottomWidth: 1,
        borderBottomColor: color.light_grey
    },

    exerciseRow: {
        flex: 1,
        flexDirection: 'row',
        padding: padding,
        borderBottomWidth: 1,
        borderBottomColor: color.light_grey
    }
});

export default styles;