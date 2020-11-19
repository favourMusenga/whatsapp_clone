import { IonProgressBar, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import useFirebaseStorage from '../hooks/useFirebaseStorage';

interface UpLoadImageProps {
  dataUrl: string;
  userId: string;
  fileName: string;
  callback: (url: string) => void;
  setProgress?: React.Dispatch<React.SetStateAction<number>>;
  progressionBar: boolean;
}
const UpLoadImage: React.FC<UpLoadImageProps> = ({
  callback,
  dataUrl,
  userId,
  progressionBar,
  setProgress,
  fileName,
}) => {
  const [message, setMessage] = useState<string>('');
  const { progress, error, url } = useFirebaseStorage(
    dataUrl,
    fileName,
    userId,
    callback
  );
  useEffect(() => {
    if (url) {
      setMessage('almost done');
    }
    if (setProgress) {
      setProgress(progress);
    }
  }, [progress, setProgress, setMessage]);
  return (
    <>
      {progressionBar && (
        <IonProgressBar color='secondary' value={progress} type='determinate' />
      )}
      {error && <IonText>{error}</IonText>}
      {message !== '' && <IonText>{message}</IonText>}
    </>
  );
};
export default UpLoadImage;
