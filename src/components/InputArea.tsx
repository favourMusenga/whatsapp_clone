import { IonButton, IonIcon, IonTextarea } from '@ionic/react';
import { sendSharp, cameraSharp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Plugins } from '@capacitor/core';
import { firebaseApp, firestore } from '../firbaseConfig';
import useCamera from '../hooks/useCamera';
import useFirebaseStorage from '../hooks/useFirebaseStorage';
import { getDataUrl } from '../utli';
import {
  InputContainer,
  InputFieldArea,
} from './styledComponent/ChatRoomStyles';

const { Toast } = Plugins;

interface InputAreaProps {
  groupId: string;
  user: firebase.User | null;
}

const InputArea: React.FC<InputAreaProps> = ({ groupId, user }) => {
  const [message, setMessage] = useState<string>('');
  const [showCameraIcon, setShowCameraIcon] = useState<boolean>(true);
  const { uploadImage } = useFirebaseStorage();

  const { photo, takePic } = useCamera();
  useEffect(() => {
    if (message.length > 0) {
      setShowCameraIcon(() => false);
    } else if (message.length === 0) {
      setShowCameraIcon(() => true);
    }
  }, [message]);

  async function sendMessage() {
    const messagesRef = firestore
      .collection('message')
      .doc(groupId.trim())
      .collection('messages');

    if (message.trim() === '') {
      return await Toast.show({
        text: 'message is required',
        duration: 'long',
        position: 'bottom',
      });
    }

    try {
      const results = await messagesRef.add({
        message,
        sentby: user?.uid!,
        Pic: '',
        timeSent: firebaseApp.firestore.FieldValue.serverTimestamp(),
      });
      if (results) {
        setMessage('');
        await Toast.show({
          text: 'message is sent',
          duration: 'long',
          position: 'bottom',
        });
      }
    } catch (error) {
      await Toast.show({
        text: 'something went wrong',
        duration: 'long',
        position: 'bottom',
      });
    }
  }
  async function sendPic() {
    try {
      await takePic();

      if (photo.webViewPath) {
        const dataUri: any = await getDataUrl(photo.webViewPath);
        const { error } = uploadImage(
          dataUri,
          photo.filepath,
          user?.uid!,
          async (uri) => {
            const messagesRef = firestore
              .collection('message')
              .doc(groupId.trim())
              .collection('messages');

            try {
              const results = await messagesRef.add({
                message: '',
                sentby: user?.uid!,
                Pic: uri,
                timeSent: firebaseApp.firestore.FieldValue.serverTimestamp(),
              });
              if (results) {
                await Toast.show({
                  text: 'pic is sent',
                  duration: 'long',
                  position: 'bottom',
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
        );
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      await Toast.show({
        text: 'something went wrong',
        duration: 'long',
        position: 'bottom',
      });
    }
  }
  return (
    <InputContainer>
      <InputFieldArea>
        <IonTextarea
          autoGrow={true}
          placeholder='Type a message'
          rows={1}
          maxlength={600}
          value={message}
          onIonChange={(e) => setMessage(() => e.detail.value!)}></IonTextarea>
        <div onClick={sendPic}>
          {showCameraIcon && <IonIcon icon={cameraSharp} size='large' />}
        </div>
      </InputFieldArea>
      <IonButton color='secondary' shape='round' onClick={sendMessage}>
        <IonIcon icon={sendSharp} />
      </IonButton>
    </InputContainer>
  );
};
export default InputArea;
