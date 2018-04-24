import {database} from "../../config/firebase";

export function updateCharacter(character) {
    return new Promise((resolve, reject) => {
        database.ref('characters').child(character.uid).update({...character})
            .then(() => resolve(null))
            .catch((error) => reject({message: error}));
    });


}

export function fetchMyCharacter(user, callback) {
    return new Promise((resolve, reject) => {
        database.ref('characters').child(user.characterUid).once("value")
            .then(snapshot => resolve(snapshot.val()))
            .catch((error) => reject({message: error}));
    });
}