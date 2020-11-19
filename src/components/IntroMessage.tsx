import React from 'react';

interface IntroMessageProps {
  image: string;
  message: string;
}
const IntroMessage: React.FC<IntroMessageProps> = ({ image, message }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <img
        src={image}
        alt={`${image} slide `}
        style={{ height: '300px', width: '300px' }}
      />
      <p>{message}</p>
    </div>
  );
};
export default IntroMessage;
