import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React, { useState } from 'react';
import { firebaseApp, auth, firebaseUi } from '../firbaseConfig';
import { SignUpContainer } from '../components/styledComponent/SignUpstyles';
import { useHistory } from 'react-router';
import { setUserInfo } from '../store/userActions';
import { useDispatch } from 'react-redux';
interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const { push } = useHistory();
  const uiConfig: firebaseui.auth.Config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/profile',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResults: any, redirectUrl: string) => {
        const user = authResults.user;
        try {
          dispatch(
            setUserInfo({
              email: user.email,
              isRegistered: true,
              password: '',
              status: '',
              username: '',
            })
          );
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    },
  };
  function onSubmitHandler(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        try {
          dispatch(
            setUserInfo({
              email,
              isRegistered: true,
              password,
              status: '',
              username: '',
            })
          );
          push('/profile');
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonTitle>sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SignUpContainer>
          <form onSubmit={onSubmitHandler}>
            <IonItem>
              <IonLabel position='floating'>enter email address</IonLabel>
              <IonInput
                type='email'
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>
            <br />
            <IonItem>
              <IonLabel position='floating'>password</IonLabel>
              <IonInput
                type='password'
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>
            <br />
            <IonText>{error}</IonText>
            <br />
            <IonButton type='submit' color='secondary'>
              sign up
            </IonButton>
          </form>
          <p> or </p>
          <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
        </SignUpContainer>
      </IonContent>
    </IonPage>
  );
};
export default SignUp;
