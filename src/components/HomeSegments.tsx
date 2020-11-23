import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
  IonBadge,
  IonList,
  IonItem,
  IonPopover,
} from '@ionic/react';
import React, { useRef, useState } from 'react';
import { camera, ellipsisVertical, search } from 'ionicons/icons';
import ChatsList from './ChatsList';
import Status from './Status';
import Calls from './Calls';

import './HomeSegments.css';
import { Link } from 'react-router-dom';

interface HomeSegmentsProps {}
export const HomeSegments: React.FC<HomeSegmentsProps> = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  const [segmentIndex, setSegmentIndex] = useState<string>('ion-sb-1');
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [popoverEvent, setPopoverEvent] = useState<any>(undefined);

  const sliderRef = useRef<any>(null);
  const popoverRef = useRef<any>(null);

  const slide = sliderRef.current!;

  async function segmentchange(e: any) {
    const currentIndex: string = e.detail.value;
    const slideId = currentIndex.replace('ion-sb-', '');
    await slide.slideTo(+slideId, 100);
  }
  async function slideChane() {
    const slideId = (await slide.getActiveIndex()).toString();
    setSegmentIndex((prev) => 'ion-sb-' + slideId);
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>whatsapp</IonTitle>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon icon={search} />
            </IonButton>
            <IonButton
              onClick={(e) => {
                e.persist();
                setShowPopover(true);
                setPopoverEvent(e);
              }}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
            <IonPopover
              ref={popoverRef}
              onDidDismiss={() => setShowPopover(false)}
              event={popoverEvent}
              isOpen={showPopover}>
              <IonList>
                <Link to='/setting' onClick={() => setShowPopover(false)}>
                  <IonItem>
                    <IonLabel>Setting</IonLabel>
                  </IonItem>
                </Link>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color='primary'>
          <IonSegment
            value={segmentIndex}
            onIonChange={segmentchange}
            color='secondary'>
            <IonSegmentButton layout='icon-start'>
              <IonIcon icon={camera} />
            </IonSegmentButton>
            <IonSegmentButton>
              <IonLabel>
                CHATS <IonBadge color='secondary'>5</IonBadge>
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton>
              <IonLabel>STATUS</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton>
              <IonLabel>CALLS</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides
          ref={sliderRef}
          pager={false}
          style={{ height: '100%', overflowX: 'hidden', overflowY: 'auto' }}
          options={slideOpts}
          onIonSlideWillChange={slideChane}>
          <IonSlide className='block'>
            <h1>camera</h1>
          </IonSlide>
          <IonSlide className='block'>
            <ChatsList />
          </IonSlide>
          <IonSlide className='block'>
            <Status />
          </IonSlide>
          <IonSlide className='block'>
            <Calls />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </>
  );
};
