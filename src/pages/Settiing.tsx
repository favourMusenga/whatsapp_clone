import React, { useEffect, useState } from 'react';
import {
  IonAlert,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { auth, firestore } from '../firbaseConfig';
import { getUserInfo, signOut } from '../firebaseHelperFunctions';
import { setPreferences } from '../store/preferenceActions';
import {
  CameraIcon,
  ProfileImage,
} from '../components/styledComponent/ProfileDetailsStyles';
import {
  callSharp,
  camera,
  informationCircleOutline,
  pencil,
  personSharp,
} from 'ionicons/icons';
import { SettingContainer } from '../components/styledComponent/SettingStyles';
import { displayToast, getDataUrl } from '../utli';
import useCamera from '../hooks/useCamera';
import useFirebaseStorage from '../hooks/useFirebaseStorage';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../store/rootReducer';
import { useHistory } from 'react-router';
interface SettiingProps {}

const Settiing: React.FC<SettiingProps> = () => {
  const [userStatus, setUserStatus] = useState('');
  const [username, setUsername] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isOpenUserNameAlert, setIsOpenUserNameAlert] = useState<boolean>(
    false
  );
  const [openUserStatusAlert, setIsOpenUserStatusAlert] = useState<boolean>(
    false
  );
  const [isloading, setIsloading] = useState<boolean>(false);

  const { photo, takePic } = useCamera('prompt');
  const { uploadImage } = useFirebaseStorage();

  const dispatch = useDispatch();
  const { theme } = useSelector((store: rootState) => store.userPreference);
  const { push } = useHistory();

  const currentUser = auth.currentUser;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const getInfo = async () => {
          const userInfo = await getUserInfo(user.uid);
          setUserPhoneNumber(userInfo?.phoneNumber);
          setProfilePic(userInfo?.profilePicUrl);
          setUserStatus(userInfo?.status);
          setUsername(userInfo?.username);
        };
        getInfo();
      }
    });
  }, []);

  async function updateUserInfo(
    fieldName: 'status' | 'username',
    valueTooChangeTo: string
  ) {
    const userDocRef = firestore.collection('user').doc(currentUser?.uid);

    try {
      if (fieldName === 'status') {
        if (valueTooChangeTo === userStatus) return false;
        await userDocRef.update({ [fieldName]: valueTooChangeTo });
        return true;
      } else {
        if (valueTooChangeTo === userStatus) return false;
        await userDocRef.update({ [fieldName]: valueTooChangeTo });
        await currentUser?.updateProfile({ displayName: valueTooChangeTo });
        return true;
      }
    } catch (err) {
      console.log(err.message);
      displayToast('something went wrong');
    }
  }
  async function uploadImageToFireStorage() {
    await takePic();
    console.log(photo);

    if (photo.webViewPath) {
      const dataUrl: any = await getDataUrl(photo.webViewPath);
      setIsloading(true);

      try {
        await uploadImage(
          dataUrl,
          'profile',
          currentUser?.uid!,
          async (url) => {
            await currentUser?.updateProfile({ photoURL: url });
            await firestore
              .collection('user')
              .doc(currentUser?.uid!)
              .update({ profilePicUrl: url });

            setProfilePic(dataUrl);
            setIsloading(false);
            await displayToast('profile pic updated');
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/home' />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isloading && <IonLoading isOpen={isloading} />}
        <SettingContainer>
          <ProfileImage>
            <img alt='profile preview' src={profilePic} />
            <CameraIcon onClick={uploadImageToFireStorage}>
              <IonIcon icon={camera} style={{ color: '#fff' }} />
            </CameraIcon>
          </ProfileImage>

          <br />
          <IonItem
            style={{ width: '100%' }}
            color='light'
            onClick={() => setIsOpenUserNameAlert(true)}>
            <IonIcon color='primary' slot='start' icon={personSharp} />
            <IonLabel>
              <IonText>username</IonText>
              <IonTitle>{username.trim()}</IonTitle>
            </IonLabel>
            <IonIcon slot='end' icon={pencil} />
          </IonItem>

          <IonItem
            style={{ width: '100%' }}
            color='light'
            onClick={() => setIsOpenUserStatusAlert(true)}>
            <IonIcon
              color='primary'
              slot='start'
              icon={informationCircleOutline}
            />
            <IonLabel style={{ width: '150px' }} position='fixed'>
              <IonText>status</IonText>
              <IonTitle>{userStatus.trim()}</IonTitle>
            </IonLabel>
            <IonIcon slot='end' icon={pencil} />
          </IonItem>
          <IonItem style={{ width: '100%' }} color='light'>
            <IonIcon color='primary' slot='start' icon={callSharp} />
            <IonLabel>
              <IonText>phone</IonText>
              <IonTitle>{userPhoneNumber.trim()}</IonTitle>
            </IonLabel>
          </IonItem>
          <IonAlert
            isOpen={isOpenUserNameAlert}
            onDidDismiss={() => setIsOpenUserNameAlert(false)}
            inputs={[
              {
                name: 'username',
                label: 'enter username: ',
                value: username,
                max: 20,
                type: 'text',
                attributes: { required: true, autoFocus: true },
              },
            ]}
            buttons={[
              { text: 'cancel', role: 'cancel' },
              {
                text: 'ok',
                handler: (data) => {
                  console.log(data.username);
                  const results = updateUserInfo('username', data.username);
                  if (results) {
                    setUsername(data.username);
                    displayToast('username successafully updated');
                  }
                },
              },
            ]}
          />
          <IonAlert
            isOpen={openUserStatusAlert}
            onDidDismiss={() => setIsOpenUserStatusAlert(false)}
            inputs={[
              {
                name: 'status',
                max: 140,
                label: 'enter status: ',
                value: userStatus,
                type: 'textarea',
                attributes: { autoFocus: true },
              },
            ]}
            buttons={[
              { text: 'cancel', role: 'cancel' },
              {
                text: 'ok',
                handler: (data) => {
                  const results = updateUserInfo('status', data.status);
                  if (results) {
                    setUserStatus(data.status);
                    displayToast('status successafully updated');
                  }
                },
              },
            ]}
          />

          <br />
          <IonItem style={{ width: '100%' }} color='light'>
            <IonLabel>theme: </IonLabel>
            <IonSelect
              value={theme}
              onIonChange={(e) => {
                const selectedTheme = e.detail.value;
                if (selectedTheme === theme) return;
                dispatch(setPreferences({ theme: selectedTheme }));
              }}>
              <IonSelectOption value='light'>light</IonSelectOption>
              <IonSelectOption value='dark'>dark</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem
            style={{ width: '100%' }}
            color='light'
            onClick={() =>
              signOut(() => {
                console.log('signed out');
              })
            }>
            <IonLabel>sign out</IonLabel>
          </IonItem>
        </SettingContainer>
      </IonContent>
    </IonPage>
  );
};

export default Settiing;
