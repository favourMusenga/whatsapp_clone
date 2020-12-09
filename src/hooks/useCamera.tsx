import { useCamera as Camera } from '@ionic/react-hooks/camera';
import { useFilesystem } from '@ionic/react-hooks/filesystem';
import {
  CameraOptions,
  CameraResultType,
  CameraSource,
  Capacitor,
  CameraPhoto,
  FilesystemDirectory,
} from '@capacitor/core';
import { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';

interface Photo {
  filepath: string;
  webViewPath?: string;
}
const useCamera = (sourceOfPic: 'prompt' | 'camera' = 'camera') => {
  // state to store the picture taken
  const [pic, setPic] = useState<Photo>({ filepath: '' });

  // get the functions for the filesystem and camera from the hooks
  const { getPhoto } = Camera();
  const { writeFile, readFile } = useFilesystem();

  const options: CameraOptions = {
    resultType: CameraResultType.Uri,
    source:
      sourceOfPic === 'prompt' ? CameraSource.Prompt : CameraSource.Camera,
    quality: 100,
  };
  const takePic = async () => {
    const cameraPic: CameraPhoto = await getPhoto(options);
    const fileName = new Date().getTime() + 'jpeg';
    let newPic: Photo;
    // if the app is run using capacitor on moblie
    if (isPlatform('hybrid')) {
      const file = await readFile({
        path: cameraPic.path!,
      });
      const savedFile = await writeFile({
        path: 'whatsapp_clone/pics/sent/' + fileName,
        data: file.data,
        directory: FilesystemDirectory.Documents,
      });
      newPic = {
        filepath: savedFile.uri,
        webViewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      newPic = {
        filepath: fileName,
        webViewPath: cameraPic.webPath,
      };
    }
    setPic(() => {
      return newPic;
    });
  };
  return { takePic, photo: pic };
};

export default useCamera;
