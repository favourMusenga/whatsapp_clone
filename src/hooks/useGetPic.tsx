import { useCamera } from '@ionic/react-hooks/camera';
import {
  CameraOptions,
  CameraResultType,
  CameraSource,
  CameraPhoto,
} from '@capacitor/core';
import { useState } from 'react';

const useGetPic = () => {
  const [chosenPic, setChososePic] = useState<string | undefined>(undefined);
  const { getPhoto } = useCamera();
  const getPic = async () => {
    const options: CameraOptions = {
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 100,
      allowEditing: true,
    };
    const picSelect: CameraPhoto = await getPhoto(options);
    setChososePic(picSelect.dataUrl);
  };
  return { getPic, chosenPic };
};
export default useGetPic;
