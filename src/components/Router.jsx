import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import ChatPage from '../pages/ChatPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ChatPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
