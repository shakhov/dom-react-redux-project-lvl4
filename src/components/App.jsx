import React from 'react';

import Router from './Router.jsx';
import AuthProvider from '../providers/AuthProvider.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
