import { useState, useEffect } from 'react';
import { fireStorage } from '../firbaseConfig';

interface useFirebaseStorageProps {}
const useFirebaseStorage = (
  imageDataUrl: string,
  fileName: string,
  userId: string,
  callback: (url: string) => void
) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const rootRef = fireStorage.ref();
    const storageRef = rootRef.child(`user/${userId}/${fileName}`);

    storageRef.putString(imageDataUrl, 'data_url').on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 1;

        setProgress(percentage);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const downloadUrl = await storageRef.getDownloadURL();
        setUrl(downloadUrl);
        callback(downloadUrl);
      }
    );
  }, [imageDataUrl]);

  return { url, error, progress };
};
export default useFirebaseStorage;
