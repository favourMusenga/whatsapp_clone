import { IonBadge } from '@ionic/react';
import React, { useState } from 'react';
import {
  ChatContainer,
  ChatInfo,
  ChatMessageInfo,
  ChatProfileName,
  ChatProfilePic,
  LastMessage,
  LastTimeOfLastMessage,
  OtherChatInfo,
  UnReadMesagesNumber,
} from './styledComponent/ChatsStyles';
import { getUserInfo } from '../firebaseHelperFunctions';
import { DateTime } from 'luxon';

interface ChatProps {
  contactId: string;
  lastmessage: string;
  time: number;
}
const Chat: React.FC<ChatProps> = ({ contactId, lastmessage, time }) => {
  const [profilePic, setProfilePic] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  (async () => {
    const contactInfo = await getUserInfo(contactId);
    setProfilePic(contactInfo?.profilePicUrl);
    setUsername(contactInfo?.username);
  })();

  const timeOfLastMessage = DateTime.fromJSDate(new Date(time * 1000)).toFormat(
    'HH:mm'
  );
  return (
    <ChatContainer>
      <ChatProfilePic>
        <img src={profilePic} alt='profile pic' />
      </ChatProfilePic>
      <ChatInfo>
        <ChatMessageInfo>
          <ChatProfileName>{username}</ChatProfileName>
          <LastMessage>{lastmessage}</LastMessage>
        </ChatMessageInfo>
        <OtherChatInfo>
          <LastTimeOfLastMessage>{timeOfLastMessage}</LastTimeOfLastMessage>
          <UnReadMesagesNumber>
            <IonBadge color='secondary' slot='end'>
              0
            </IonBadge>
          </UnReadMesagesNumber>
        </OtherChatInfo>
      </ChatInfo>
    </ChatContainer>
  );
};
export default Chat;
