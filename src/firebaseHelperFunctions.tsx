import { auth, firestore } from './firbaseConfig';

export async function logIn(email: string, password: string) {
  const user = await auth.signInWithEmailAndPassword(email, password);

  return user;
}

export async function signOut(callback: () => void) {
  auth
    .signOut()
    .then(() => {
      // a callback to call after a sign call
      callback();
    })
    .catch((err) => {
      throw err;
    });
}

export async function getUserInfo(id: string) {
  const userRef = firestore.collection('user');

  const userInfo = await userRef.doc(id).get();

  return userInfo.data();
}
