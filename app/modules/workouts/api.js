import {database} from "../../config/firebase";

export function fetchWorkouts() {
    return new Promise((resolve, reject) => {
        database.ref('workouts').once("value")
            .then(snapshot => resolve(snapshot.val()))
            .catch((error) => reject({message: error}));
    });
}