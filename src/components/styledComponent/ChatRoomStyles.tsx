import styled from 'styled-components';

export const ChatArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 15px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #eee8dc;
`;

export const InputContainer = styled.section`
  position: fixed;
  bottom: 0px;
  left: 0px;
  background: #eee8dc;
  width: 100%;
  padding: 15px 10px;
  display: flex;
`;

export const InputFieldArea = styled.section`
  background-color: white;
  border-radius: 35px;
  width: 80%;
  display: flex;
  align-items: center;
  padding: 0px 15px;
`;

export const ChatBubbleContainer = styled.article<chatContainerType>`
  margin-left: ${({ sentBy }) => (sentBy ? '50%' : '0px')};
  margin-bottom: 10px;
  background-color: ${({ sentBy }) => (sentBy ? '#E2FFC7' : '#FFFFFF')};
  max-width: 50%;
  padding: 0px 10px;
`;

export const ChatMessage = styled.p`
  margin-bottom: 5px;
`;

export const ChatDateSent = styled.p`
  margin-top: 0;
  font-size: 0.8rem;
  color: #b5b5b5;
  text-align: right;
`;

type chatContainerType = {
  sentBy: boolean;
};
