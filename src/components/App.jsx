import React, { useState } from 'react';
import Router from './Router.jsx';

import AuthContext from '../contexts/AuthContext.jsx';
import useAuth from '../hooks/useAuth.jsx';

function AuthProvider({ children }) {
  const userId = localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(userId ? true : false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

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
