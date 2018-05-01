import {auth, database, provider} from "../../config/firebase";

export function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}

export function createUser(user) {
    return database.ref('users').child(user.uid).set({
        email: user.email,
        uid: user.uid
    });
}

export function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(getUser);
}

export function getUser(user) {
    return new Promise((resolve, reject) => {
        database.ref('users').child(user.uid).once('value')
            .then(snapshot => {
                const exists = (snapshot.val() !== null);

                // if the user exist in the DB, replace the user variable with the returned snapshot
                if (exists) {
                    user = snapshot.val();
                }

                resolve({exists, user});
            })
            .catch((error) => reject({message: error}));
    });
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const {email} = data;
    return auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut() {
    return auth.signOut();
}

//Sign user in using Facebook
export function signInWithFacebook(fbToken) {
    const credential = provider.credential(fbToken);

    return new Promise((resolve, reject) => {
        auth.signInWithCredential(credential)
            .then((user) => {
                getUser(user).then(resolve)
            })
            .catch(reject);
    });
}