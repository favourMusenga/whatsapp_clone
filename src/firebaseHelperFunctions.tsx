import { auth } from './firbaseConfig';

export async function logIn(email: string, password: string) {
  const user = await auth.signInWithEmailAndPassword(email, password);

  return user;
}
