import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from "./styles";
import XpLabel from "../../../../components/XpLabel/XpLabel";
import {upperCaseFirstCharacter} from "../../../../components/Util";

class ExerciseInfo extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: params.exercise.name
        };
    };

    constructor(props) {
        super();

        const {exercise} = props.navigation.state.params;

        this.state = {
            exercise
        };
    }

    getMuscleGroupText = () => {
        const {exercise} = this.state;

        const {primary, secondary = []} = exercise.muscleGroups;
        const allMuscles = primary.concat(secondary);
        return allMuscles.map(upperCaseFirstCharacter).join(", ");
    };

    render() {
        const {exercise} = this.state;

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image style={styles.image} source={{uri: exercise.imageUrl}}/>
                    <Text style={styles.name}>{exercise.name}</Text>
                    <Text style={styles.muscleGroups}>{this.getMuscleGroupText()}</Text>
                    <XpLabel xp={exercise.xp}/>
                    <Text style={styles.descriptionContainer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus sit amet est
                        blandit interdum. Morbi ut lorem urna. Maecenas at ligula convallis, fermentum enim in, cursus
                        elit. Mauris consequat commodo augue quis suscipit. Interdum et malesuada fames ac ante ipsum
                        primis in faucibus. Donec sagittis nisl odio, ut malesuada erat faucibus non. Nulla tincidunt
                        cursus libero, ut tempor lacus tempus mattis. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Vestibulum sed elementum diam. Aenean pellentesque lorem ac sapien blandit congue ut vitae
                        magna. Sed sed nisl sit amet eros ultricies viverra consectetur in metus. Suspendisse egestas
                        nulla nec urna porta iaculis. Aliquam ullamcorper est vel dolor porta, at vehicula dolor mollis.
                        Maecenas maximus nisl libero, at tincidunt nisl lobortis non. Pellentesque tempor sed enim vel
                        aliquam.

                        Sed at urna augue. Proin tristique sem ut dui tincidunt porta. Phasellus eu pretium ante. Donec
                        at libero eget ante semper molestie sed ac diam. Nullam finibus metus quis lacus accumsan
                        eleifend. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                        egestas. Aenean molestie in ante non finibus. Praesent pulvinar auctor ullamcorper. Praesent
                        tempor ante nec feugiat interdum. Cras semper pharetra hendrerit. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus. In hac habitasse platea dictumst. Sed gravida tempor dolor, a
                        sodales tortor volutpat rhoncus. Quisque venenatis cursus velit, ut varius lacus tempor rhoncus.

                        Phasellus pulvinar, metus vel sollicitudin sodales, neque dui eleifend turpis, nec tincidunt
                        sapien neque eget eros. Duis sagittis nulla mauris, id tempus tellus vehicula eget. Mauris orci
                        sapien, fringilla sit amet laoreet id, tempor in elit. Nullam orci purus, facilisis sed nisi at,
                        consectetur dapibus neque. Phasellus vitae mi non augue pharetra viverra. Nam a sapien eget
                        velit suscipit luctus vitae id risus. Fusce lobortis ligula nibh, vel elementum ante varius
                        euismod. Fusce tellus metus, laoreet sit amet aliquam at, auctor mollis purus. Etiam sit amet
                        molestie nisl. Nam tortor dolor, commodo sed est at, faucibus suscipit tellus. Nullam laoreet
                        nunc eget quam iaculis eleifend. Praesent tristique ut leo a vestibulum.

                        Vivamus ullamcorper purus quis tempus ullamcorper. Proin vitae iaculis sem. Morbi a scelerisque
                        mi. Aliquam suscipit ultrices viverra. Duis fermentum enim quis arcu convallis vulputate.
                        Quisque euismod nibh massa, id sagittis dolor posuere vel. Vivamus vel nibh rhoncus, mollis enim
                        ut, semper mi. Vestibulum molestie risus at ipsum consequat, sed pulvinar lacus ultricies. Morbi
                        a massa ac tellus euismod egestas.

                        Ut bibendum dapibus semper. Suspendisse blandit imperdiet est sit amet vestibulum. Phasellus
                        porttitor libero est, id consectetur neque vestibulum scelerisque. Donec maximus sem eget
                        dapibus maximus. Phasellus et risus faucibus, sagittis dolor eget, ultricies nisi. Maecenas erat
                        velit, commodo at felis vel, pretium lobortis tortor. Vivamus sed condimentum velit, quis
                        egestas ipsum. Cras pharetra est convallis laoreet lobortis. Suspendisse potenti. Integer ut
                        ante at erat laoreet pulvinar. Proin ullamcorper, dui in molestie aliquet, leo nisl consectetur
                        turpis, sit amet convallis neque nulla nec risus. Aliquam efficitur pharetra risus quis laoreet.
                        Ut dignissim magna quis ex iaculis dictum
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ExerciseInfo);