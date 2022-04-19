import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import store from '../slices/index.js';

import Router from './Router.jsx';
import AuthProvider from '../providers/AuthProvider.jsx';

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Router />
        </div>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;
