import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontFamily, fontSize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: padding,
        backgroundColor: color.white
    }
});

export default styles;