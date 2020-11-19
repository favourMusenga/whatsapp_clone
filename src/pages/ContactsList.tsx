import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

interface ContactsListProps {}

const ContactsList: React.FC<ContactsListProps> = () => {
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

export default ContactsList;
