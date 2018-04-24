import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1
    }
});

export default styles;