import {database} from "../../config/firebase";

export function updateUser(user) {
    return database.ref('users').child(user.uid)
        .update({...user})
        .then(() => user);
}