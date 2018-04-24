import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },

    workout: {
        width: '100%',
        backgroundColor: color.white,
        padding: padding,
        marginBottom: 10
    }
});

export default styles;