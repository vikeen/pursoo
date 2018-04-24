import {database} from "../../config/firebase";

export function updateUser(user, callback) {
    database.ref('users').child(user.uid).update({...user})
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}