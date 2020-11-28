import React, { useEffect, useState } from 'react';
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import ChatBubble from '../components/ChatBubble';
import InputArea from '../components/InputArea';
import { ChatArea } from '../components/styledComponent/ChatRoomStyles';
import { auth, firestore } from '../firbaseConfig';
import { getUserInfo } from '../firebaseHelperFunctions';

interface ChatRoomProps {}
const ChatRoom: React.FC<ChatRoomProps> = () => {
  const [profilePic, setProfilePic] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const { id } = useParams<{ id: string }>();

  const currentUser = auth.currentUser;

  console.log(id);

  useEffect(() => {
    const getToolbarUserInfo = async () => {
      const groupRef = firestore.collection('group').doc(id);

      const groupInfo = await (await groupRef.get()).data();

      const [contactId] = groupInfo?.members.filter(
        (memberId: any) => currentUser !== memberId
      );
      const contactInfo = await getUserInfo(contactId);
      setProfilePic(contactInfo?.profilePicUrl);
      setUsername(contactInfo?.username);
    };
    getToolbarUserInfo();
  }, [currentUser, id]);

  const messages = [
    {
      id: 1,
      sentBy: auth.currentUser?.uid,
      message: 'hello friend',
      dateSent: Date.now(),
      image: '',
    },
    {
      id: 2,
      sentBy: 'uduyudxidsjchuidsi',
      message: 'hello friend',
      dateSent: Date.now(),
      image: '',
    },
    {
      id: 3,
      sentBy: 'uduyudxidsjchuidsi',
      message: 'how are you?',
      dateSent: Date.now(),
      image: '',
    },
    {
      id: 4,
      sentBy: auth.currentUser?.uid,
      message: 'i am fine and you?',
      dateSent: Date.now(),
      image: '',
    },
    {
      id: 5,
      sentBy: 'uduyudxidsjchuidsi',
      message: 'i am fine',
      dateSent: Date.now(),
      image: '',
    },
    {
      id: 6,
      sentBy: auth.currentUser?.uid,
      message: 'okay',
      dateSent: Date.now(),
      image: '',
    },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>

          <IonItem lines='none' color='primary'>
            <IonAvatar slot='start'>
              <IonImg src={profilePic} />
            </IonAvatar>
            <IonLabel>{username}</IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ChatArea>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              date={message.dateSent}
              message={message.message}
              sentBy={message.sentBy!}
              userId={currentUser?.uid!}
            />
          ))}
          <InputArea groupId={id} user={currentUser!} />
        </ChatArea>
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;
