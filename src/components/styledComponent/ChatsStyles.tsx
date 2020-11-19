import { type } from 'os';
import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0;
  margin-top: 10px;
`;

export const ChatProfilePic = styled.div`
  flex: 1;
  width: 70px;
  height: 70px;
  margin: 0;
  padding: 0;
  img {
    border-radius: 50%;
  }
`;

export const ChatInfo = styled.div`
  flex: 3;
  display: flex;
  margin-right: 10px;
  padding: 0 !important;
  border-bottom: 1px solid;
`;

export const ChatProfileName = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ccd2d2;
  margin: 5px;
`;

export const LastMessage = styled.p`
  margin: 5px;
  text-overflow: ellipsis;
`;

export const OtherChatInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LastTimeOfLastMessage = styled.p`
  margin: 5px;
`;

export const UnReadMesagesNumber = styled.div`
  margin: 5px;
`;

export const ChatMessageInfo = styled.div`
  flex: 2;
  text-align: left;
  margin-bottom: 10px;
`;
