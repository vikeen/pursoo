import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        resizeMode
    },

    container: {
        backgroundColor: color.white,
        flex: 1,
        padding
    },

    name: {
        fontSize: fontSize.large + 2,
        fontFamily: fontFamily.bold,
        marginTop: 10
    },

    muscleGroups: {
        fontSize: fontSize.large - 4,
        fontFamily: fontFamily.medium,
        marginTop: 10
    },

    descriptionContainer: {
        marginTop: 10
    }
});

export default styles;