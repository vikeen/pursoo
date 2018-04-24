import {database} from "../../config/firebase";

export function updateCharacter(character, callback) {
    database.ref('characters').child(character.uid).update({...character})
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}

export function fetchMyCharacter(user, callback) {
    database.ref('characters').child(user.characterUid).once("value")
        .then(characyer => callback(true, characyer, null))
        .catch((error) => callback(false, null, {message: error}));
}