import React from 'react';

import SocketContext from '../contexts/SocketContext.jsx';

function SocketProvider({ socket, children }) {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
