import { IonButton, IonContent, IonSlide, IonSlides } from '@ionic/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import conversationPic from '../assets/Conversation-rafiki.svg';
import groupChatPic from '../assets/Group Chat-bro.svg';
import IntroMessage from './IntroMessage';
import { useHistory as History } from 'react-router';

interface IntroSliderProps {}
const IntroSlider: React.FC<IntroSliderProps> = () => {
  const { push } = History();
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  const [buttonnMsg, setButtonnMsg] = useState<string>('next');
  const slideRef = useRef<any>(null);
  const slider = slideRef.current!;
  async function handleOnClick() {
    if (await slider.isEnd()) {
      push('/login');
      return;
    }

    setButtonnMsg('get started');
    await slider.slideNext();
  }
  const onSlideChange = async () => {
    if (await slider.isBeginning()) {
      setButtonnMsg('next');
      return;
    }
    setButtonnMsg('get started');
  };
  return (
    <IonContent>
      <IonSlides
        ref={slideRef}
        pager={true}
        style={{ height: '80%' }}
        options={slideOpts}
        onIonSlideDidChange={onSlideChange}>
        <IonSlide>
          <IntroMessage
            image={conversationPic}
            message='chat with your friends and family all day long'
          />
        </IonSlide>
        <IonSlide>
          <IntroMessage
            image={groupChatPic}
            message='form chat groups with your friends'
          />
        </IonSlide>
      </IonSlides>
      <IonButton expand='full' color='secondary' onClick={handleOnClick}>
        {buttonnMsg}
      </IonButton>
    </IonContent>
  );
};

export default IntroSlider;
