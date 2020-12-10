import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React, { useState } from 'react';
import { firebaseApp, auth } from '../firbaseConfig';
import { SignUpContainer } from '../components/styledComponent/SignUpstyles';
import { useHistory } from 'react-router';
import { setUserInfo } from '../store/userActions';
import { useDispatch } from 'react-redux';
import { logIn } from '../firebaseHelperFunctions';
import { Link } from 'react-router-dom';
interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { push } = useHistory();
  const uiConfig: firebaseui.auth.Config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/home',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResults: any, redirectUrl: string) => {
        const user = authResults.user;
        setLoading(true);
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
  async function onSubmitHandler(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    try {
      const user = await logIn(email, password);
      if (user) {
        dispatch(
          setUserInfo({
            email,
            isRegistered: true,
            password,
            status: '',
            username: '',
          })
        );
        push('/');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonTitle>login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SignUpContainer>
          <IonLoading isOpen={loading} />
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
            {error && (
              <IonItem lines='none'>
                <p>{error}</p>
              </IonItem>
            )}
            <br />
            <IonGrid>
              <IonRow class='ion-justify-content-center ion-align-items-center'>
                <IonCol class='ion-justify-content-center ion-align-items-center'>
                  <IonButton type='submit' color='secondary'>
                    log in
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
          <p> or </p>
          <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
          <br />
          <IonText>
            do have an account sign up
            <Link
              to='/signup'
              style={{
                color: 'blue',
                textDecoration: 'underline',
                padding: '5px',
              }}>
              here
            </Link>
          </IonText>
        </SignUpContainer>
      </IonContent>
    </IonPage>
  );
};
export default Login;
