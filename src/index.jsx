// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('chat'),
);
