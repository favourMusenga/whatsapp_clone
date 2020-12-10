import { IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HomeSegments } from '../components/HomeSegments';
import { rootState } from '../store/rootReducer';
import './Home.css';

const Home: React.FC = () => {
  const { email, password } = useSelector((store: rootState) => store.userInfo);
  useEffect(() => {
    if (navigator.onLine) {
      try {
       
      } catch (error) {}
    }
  }, [email, password]);
  return (
    <IonPage>
      <HomeSegments />
    </IonPage>
  );
};

export default Home;
