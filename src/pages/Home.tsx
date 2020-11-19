import { IonPage } from '@ionic/react';
import React from 'react';
import { HomeSegments } from '../components/HomeSegments';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <HomeSegments />
    </IonPage>
  );
};

export default Home;
