import { DateTime } from 'luxon';
import React from 'react';
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
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  date,
  message,
  sentBy,
  image,
  userId,
}) => {
  const time = DateTime.fromJSDate(new Date(date)).toFormat('HH:mm');
  return (
    <ChatBubbleContainer sentBy={sentBy === userId}>
      <ChatMessage>{message}</ChatMessage>
      <ChatDateSent>{time}</ChatDateSent>
    </ChatBubbleContainer>
  );
};
export default ChatBubble;
