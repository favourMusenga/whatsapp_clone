import { IonItem, IonLabel, IonSkeletonText, IonThumbnail } from '@ionic/react';
import React from 'react';

const SkeletonChatBox: React.FC = () => {
  return (
    <IonItem>
      <IonThumbnail slot='start'>
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonLabel>
        <h2>
          <IonSkeletonText animated style={{ width: '50%' }} />
        </h2>
        <p>
          <IonSkeletonText animated style={{ width: '100%' }} />
        </p>
        <p>
          <IonSkeletonText animated style={{ width: '80%' }} />
        </p>
      </IonLabel>
    </IonItem>
  );
};
export default SkeletonChatBox;
