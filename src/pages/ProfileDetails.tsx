import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  camera,
  cameraOutline,
  closeOutline,
  imageOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';

import { useHistory as History } from 'react-router';

import {
  CameraIcon,
  ProfileContainer,
  ProfileImage,
} from '../components/styledComponent/ProfileDetailsStyles';
import UpLoadImage from '../components/UpLoadImage';
import { auth, firestore, firebaseApp } from '../firbaseConfig';
import useCamera from '../hooks/useCamera';
import useGetPic from '../hooks/useGetPic';
import { getDataUrl, isDataUrl } from '../utli';

interface ProfileDetailsProps {}
const ProfileDetails: React.FC<ProfileDetailsProps> = () => {
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { takePic, photo } = useCamera();
  const { getPic, chosenPic } = useGetPic();
  const [dataUrl, setDataUrl] = useState<string>('');
  const { push } = History();

  let imageUrl: string;

  if (photo.webViewPath) {
    imageUrl = photo.webViewPath!;
  } else if (chosenPic) {
    imageUrl = chosenPic;
  } else {
    imageUrl = '/assets/pics/avatar.png';
  }
  console.log(imageUrl);

  async function onSubmitHandler(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    if (username === ' ') {
      setErrorMsg('username is required');
      return;
    } else if (phoneNumber === ' ') {
      setErrorMsg('phone numner required');
      return;
    } else if (phoneNumber.length !== 10) {
      setErrorMsg('phone number must have 10 numbers');
      return;
    }
    if (status === '') {
      setStatus('Hey there! I am using WhatsApp');
      return;
    }

    const file: any = !isDataUrl.test(imageUrl)
      ? await getDataUrl(imageUrl)
      : imageUrl;
    setDataUrl(file);
    setFormSubmitted(true);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonTitle>profile information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProfileContainer>
          <form encType='' onSubmit={onSubmitHandler}>
            <ProfileImage onClick={() => setShowActionSheet(true)}>
              <img alt='profile preview' src={imageUrl} />
              <CameraIcon>
                <IonIcon icon={camera} style={{ color: '#fff' }} />
              </CameraIcon>
            </ProfileImage>
            <br />
            <IonItem>
              <IonLabel position='floating'>username</IonLabel>
              <IonInput
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                color='secondary'
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>status message:</IonLabel>
              <IonInput
                value={status}
                onIonChange={(e) => setStatus(e.detail.value!)}
                color='secondary'
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>phone number:</IonLabel>
              <IonInput
                value={phoneNumber}
                onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                color='secondary'
                required
              />
            </IonItem>
            <br />
            <IonText>{errorMsg}</IonText>
            <br />
            <IonButton type='submit' color='secondary' expand='full'>
              submit
            </IonButton>
          </form>
          <br />
          {formSubmitted && (
            <UpLoadImage
              dataUrl={dataUrl}
              userId={auth.currentUser?.uid!}
              callback={async (url) => {
                const db = firestore.collection('user');
                const user = auth.currentUser;
                await db.doc(user?.uid!).set({
                  username,
                  status,
                  profilePicUrl: url,
                  createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
                  phoneNumber,
                });
                await user?.updateProfile({
                  displayName: username,
                  photoURL: url,
                });
                push('/home');
              }}
              progressionBar={true}
              fileName={username}
            />
          )}
        </ProfileContainer>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              handler: () => setShowActionSheet(false),
              role: 'destructive',
              text: 'cancel',
              icon: closeOutline,
            },
            {
              text: 'take a picture',
              handler: () => {
                takePic();
              },
              icon: cameraOutline,
            },
            {
              text: 'choose a picture',
              handler: () => {
                console.log('choose a picture');
                getPic();
              },
              icon: imageOutline,
            },
          ]}></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};
export default ProfileDetails;
