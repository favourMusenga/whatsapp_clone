import { IonAvatar, IonImg, IonItem, IonLabel, IonTitle } from '@ionic/react';
import React from 'react';

interface ContactsProps {
  username: string;
  pic: string;
  status: string;
  createChatRoom: () => void;
}
const Contacts: React.FC<ContactsProps> = ({
  pic,
  status,
  username,
  createChatRoom,
}) => {
  return (
    <IonItem>
      <IonAvatar slot='start'>
        <IonImg src={pic} alt='profile pic' />
      </IonAvatar>
      <IonLabel onClick={createChatRoom}>
        <h1>{username}</h1>
        <p>{status}</p>
      </IonLabel>
    </IonItem>
  );
};
export default Contacts;
