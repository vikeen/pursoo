import {database} from "../../config/firebase";

export function fetchExercises() {
    return new Promise((resolve, reject) => {
        database.ref('exercises').once("value")
            .then(snapshot => resolve(snapshot.val()))
            .catch((error) => reject({message: error}));
    });
}