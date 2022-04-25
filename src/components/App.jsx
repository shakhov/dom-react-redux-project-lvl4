import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';

import io from 'socket.io-client';
import store from '../slices/index.js';

import Router from './Router.jsx';
import AuthProvider from '../providers/AuthProvider.jsx';
import SocketProvider from '../providers/SocketProvider.jsx';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const initSocket = (socket, socketStore) => {
  const emitWithAcknowledgement = (event, delay = 5000) => (data, onSuccess, onTimeout) => (
    socket.timeout(delay).emit(
      event,
      data,
      (error, response) => ((error) ? onTimeout(error) : onSuccess(response)),
    )
  );

  const api = {
    newChannel: emitWithAcknowledgement('newChannel'),
    removeChannel: emitWithAcknowledgement('removeChannel'),
    renameChannel: emitWithAcknowledgement('renameChannel'),
    newMessage: emitWithAcknowledgement('newMessage'),
  };

  socket.on('newChannel', (channel) => {
    socketStore.dispatch(channelsActions.newChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    socketStore.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    socketStore.dispatch(channelsActions.renameChannel(channel));
  });

  socket.on('newMessage', (message) => {
    socketStore.dispatch(messagesActions.newMessage(message));
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
