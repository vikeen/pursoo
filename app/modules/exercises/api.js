import {database} from "../../config/firebase";

export function fetchExercises() {
    return database.ref('exercises').once("value")
        .then(snapshot => snapshot.val());
}