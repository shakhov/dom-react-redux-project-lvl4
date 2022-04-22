import React from 'react';

import io from 'socket.io-client';

import { Provider as ReduxProvider } from 'react-redux';
import store from '../slices/index.js';

import Router from './Router.jsx';
import AuthProvider from '../providers/AuthProvider.jsx';
import SocketProvider from '../providers/SocketProvider.jsx';

import { actions as messagesActions } from '../slices/messagesSlice.js';

const initSocket = (socket, socketStore) => {
  const api = {
    addMessage: (message) => socket.emit('newMessage', message),
  };

  socket.on('newMessage', (message) => {
    socketStore.dispatch(messagesActions.addMessage(message));
  });

  return api;
};

function App() {
  const socket = io();
  const socketApi = initSocket(socket, store);

  return (
    <SocketProvider socket={socketApi}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <Router />
          </div>
        </AuthProvider>
      </ReduxProvider>
    </SocketProvider>
  );
}

export default App;
