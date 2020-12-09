import { Plugins } from '@capacitor/core';

const { Toast } = Plugins;

export async function getDataUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}

// regex for checking if the url is a dataUrl
export const isDataUrl = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

export async function displayToast(message: string) {
  await Toast.show({ text: message, duration: 'long', position: 'center' });
}
