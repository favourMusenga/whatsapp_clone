import React, { useEffect, useRef, useState } from 'react';
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import ChatBubble from '../components/ChatBubble';
import InputArea from '../components/InputArea';
import { ChatArea } from '../components/styledComponent/ChatRoomStyles';
import { auth, firestore } from '../firbaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getUserInfo } from '../firebaseHelperFunctions';
import { useSelector } from 'react-redux';
import { rootState } from '../store/rootReducer';

interface ChatRoomProps {}
const ChatRoom: React.FC<ChatRoomProps> = () => {
  const [profilePic, setProfilePic] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const { theme } = useSelector((store: rootState) => store.userPreference);

  const spanRef = useRef<HTMLSpanElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const { id } = useParams<{ id: string }>();

  const messageRef = firestore
    .collection('message')
    .doc(id)
    .collection('messages')
    .orderBy('timeSent');

  const [messages, loading, error] = useCollectionData(messageRef, {
    idField: 'id',
  });

  const currentUser = auth.currentUser;

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
  useEffect(() => {
    spanRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatAreaRef.current?.clientHeight, messages]);
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
        {loading ? (
          <IonLoading isOpen={loading} />
        ) : (
          <ChatArea theme={theme} ref={chatAreaRef}>
            {messages &&
              messages.map((message: any) => (
                <ChatBubble
                  key={message.id}
                  date={
                    message.timeSent ? message.timeSent.seconds : Date.now()
                  }
                  message={message.message}
                  sentBy={message.sentby!}
                  userId={currentUser?.uid!}
                  pic={message.Pic}
                />
              ))}
            <span ref={spanRef}></span>
          </ChatArea>
        )}
        <InputArea groupId={id} user={currentUser!} />
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;
