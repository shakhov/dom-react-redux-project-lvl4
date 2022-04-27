import React, { useState, useMemo } from 'react';

import AuthContext from '../contexts/AuthContext.jsx';

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')));
  const [loggedIn, setLoggedIn] = useState(userId?.token);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUserId(data);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    setLoggedIn(false);
  };

  const providerValue = useMemo(() => ({
    userId,
    loggedIn,
    logIn,
    logOut,
  }), [
    loggedIn,
    userId,
  ]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
