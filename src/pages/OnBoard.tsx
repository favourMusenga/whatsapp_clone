import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import IntroSlider from '../components/IntroSlider';

interface OnBoardProps {}
const OnBoard: React.FC<OnBoardProps> = () => {
  return (
    <IonPage>
      <IonContent>
        <IntroSlider />
      </IonContent>
    </IonPage>
  );
};
export default OnBoard;
