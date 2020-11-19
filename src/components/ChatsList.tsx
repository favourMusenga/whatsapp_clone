import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { chatboxEllipses } from 'ionicons/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Chat from './Chat';

interface ChatsListProps {}
const ChatsList: React.FC<ChatsListProps> = ({}) => {
  return (
    <>
      <Link to='/chatroom'>
        <Chat />
      </Link>
      <Link to='/contactList'>
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton color='secondary'>
            <IonIcon icon={chatboxEllipses} />
          </IonFabButton>
        </IonFab>
      </Link>
    </>
  );
};

export default ChatsList;
