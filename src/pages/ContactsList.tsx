import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
  IonLoading,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Contacts from '../components/Contacts';
import { auth, firebaseApp, firestore } from '../firbaseConfig';

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<any>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { push } = useHistory();
  useEffect(() => {
    const docRef = firestore.collection('user');

    docRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs) {
          setContacts(querySnapshot.docs);
          setIsloading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createChatRoom(contactID: string, userId: string) {
    console.log(contactID, userId);
    const groupCollection = firestore.collection('group');
    groupCollection
      .add({
        createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
        lastUpdated: firebaseApp.firestore.FieldValue.serverTimestamp(),
        members: [contactID, userId],
        createdBy: userId,
        lastMessage: '',
      })
      .then((docRef) => {
        push(`/chatroom/${docRef.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>select contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <IonLoading isOpen={isLoading} />
        ) : isPlatform('hybrid') ? (
          <h1>contact list</h1>
        ) : (
          contacts.map((contact: any) => {
            return (
              auth.currentUser?.uid !== contact.id && (
                <Contacts
                  key={contact.data().createdAt}
                  pic={contact.data().profilePicUrl}
                  status={contact.data().status}
                  username={contact.data().username}
                  createChatRoom={() =>
                    createChatRoom(contact.id, auth.currentUser?.uid!)
                  }
                />
              )
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
};

export default ContactsList;
