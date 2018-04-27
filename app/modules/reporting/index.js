import firebase from "react-native-firebase";

export default class Reporting {
    static track(eventName, data) {
        return new Promise((resolve, reject) => {
            firebase.analytics().logEvent(eventName, data);
        });
    }
}