import { IonBadge } from '@ionic/react';
import React from 'react';
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

interface ChatProps {}
const Chat: React.FC<ChatProps> = () => {
  return (
    <ChatContainer>
      <ChatProfilePic>
        <img src='/assets/pics/man-with-beats.jpg' alt='profile pic' />
      </ChatProfilePic>
      <ChatInfo>
        <ChatMessageInfo>
          <ChatProfileName>favour</ChatProfileName>
          <LastMessage>hello, how are you?</LastMessage>
        </ChatMessageInfo>
        <OtherChatInfo>
          <LastTimeOfLastMessage>15:00</LastTimeOfLastMessage>
          <UnReadMesagesNumber>
            <IonBadge color='secondary' slot='end'>
              2
            </IonBadge>
          </UnReadMesagesNumber>
        </OtherChatInfo>
      </ChatInfo>
    </ChatContainer>
  );
};
export default Chat;
