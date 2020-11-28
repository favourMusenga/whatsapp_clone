import React from 'react';

interface StatusProps {}
const Status: React.FC<StatusProps> = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <p>the developer is still working on it</p>
    </div>
  );
};
export default Status;
