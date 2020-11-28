import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firbaseConfig';

const useGetGroups = () => {
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, [userId]);
  const groupRef = firestore.collection('group');

  const query = groupRef
    .where('members', 'array-contains', userId)
    .orderBy('lastUpdated');

  const [groups, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  return { groups, loading, error };
};
export default useGetGroups;
