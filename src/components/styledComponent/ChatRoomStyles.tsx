import styled from 'styled-components';

export const ChatArea = styled.div<InputThemeType>`
  width: 100%;
  position: relative;
  padding: 15px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => (theme === 'dark' ? ' #101d25' : '#eee8dc')};
`;

export const InputContainer = styled.section<InputThemeType>`
  position: sticky;
  bottom: 0px;
  left: 0px;
  background: ${({ theme }) => (theme === 'dark' ? ' #101d25' : '#eee8dc')};
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
  background-color: ${({ sentBy, theme }) =>
    sentBy
      ? theme === 'dark'
        ? '#00b09c'
        : '#E2FFC7'
      : theme === 'dark'
      ? ' #303838'
      : '#FFFFFF'};
  max-width: 50%;
  color: ${({ theme }) => (theme === 'dark' ? ' #ffffff' : '')};
  padding: 5px 10px 0px 10px;
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
  theme: string;
};

type InputThemeType = {
  theme: string;
};
