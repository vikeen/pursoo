import {database} from "../../config/firebase";
import {Character} from "./models";

export const updateCharacter = (character) => {
    return database.ref('characters').child(character.uid).update({...character});
};

export const fetchMyCharacter = (user) => {
    return database.ref('characters').child(user.characterUid).once("value")
        .then(snapshot => snapshot.val());
};

export const createMyCharacter = (user, name) => {
    const charactersRef = database.ref('characters');
    const childRef = charactersRef.push();
    const character = new Character(childRef.key, user, name).toJSON();

    return childRef.set(character).then(() => character);
};