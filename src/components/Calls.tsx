import React from 'react';

interface CallsProps {}
const Calls: React.FC<CallsProps> = () => {
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

export default Calls;
