import React, { useState } from 'react';

import AuthContext from '../contexts/AuthContext.jsx';

function AuthProvider({ children }) {
  const userId = localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(userId);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
