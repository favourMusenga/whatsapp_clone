import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';

interface ChatRoomProps {}
const ChatRoom: React.FC<ChatRoomProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>contact list</h1>
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;
