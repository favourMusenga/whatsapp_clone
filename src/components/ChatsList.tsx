import { IonFab, IonFabButton, IonIcon, IonLoading } from '@ionic/react';
import { chatboxEllipses } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firbaseConfig';
import useGetGroups from '../hooks/useGetGroups';

import Chat from './Chat';

interface ChatsListProps {}
const ChatsList: React.FC<ChatsListProps> = () => {
  const { groups, loading, error } = useGetGroups();
  const userId = auth.currentUser?.uid;
  return (
    <>
      {loading && <IonLoading isOpen={loading} />}
      {groups &&
        groups.map((group: any) => {
          const [contactId] = group.members.filter(
            (memberId: any) => userId !== memberId
          );
          const { seconds } = group.lastUpdated;
          return (
            <Link key={group.id} to={`/chatroom/${group.id}`}>
              <Chat
                key={group.id}
                contactId={contactId}
                lastmessage={group.lastMessage}
                time={+seconds}
              />
            </Link>
          );
        })}
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
