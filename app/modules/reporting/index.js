import firebase from "react-native-firebase";

export default class Reporting {
    static track(eventName, data) {
        firebase.analytics().logEvent(eventName, data);
    }
}