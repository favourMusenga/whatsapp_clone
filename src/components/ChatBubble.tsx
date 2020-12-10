import { DateTime } from 'luxon';
import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../store/rootReducer';
import {
  ChatBubbleContainer,
  ChatMessage,
  ChatDateSent,
} from './styledComponent/ChatRoomStyles';

interface ChatBubbleProps {
  message: string;
  sentBy: string;
  date: number;
  image?: string;
  userId: string;
  pic: string;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  date,
  message,
  sentBy,
  image,
  userId,
  pic,
}) => {
  const time = DateTime.fromJSDate(new Date(date * 1000)).toFormat('HH:mm');
  const { theme } = useSelector((store: rootState) => store.userPreference);
  return (
    <ChatBubbleContainer theme={theme} sentBy={sentBy === userId}>
      {pic && <img src={pic} alt='message pic' />}
      {message && <ChatMessage>{message}</ChatMessage>}
      <ChatDateSent>{time}</ChatDateSent>
    </ChatBubbleContainer>
  );
};
export default ChatBubble;
