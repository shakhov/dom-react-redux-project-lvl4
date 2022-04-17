// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import ReactDOMClient from 'react-dom/client';

import App from './components/App.jsx';

const render = () => {
  const container = document.getElementById('chat');

  const root = ReactDOMClient.createRoot(container);

  root.render(<App />);
};

render();
