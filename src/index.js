// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOMClient from 'react-dom/client';
import init from './init.jsx';

const render = () => {
  const container = document.getElementById('chat');
  const root = ReactDOMClient.createRoot(container);

  const vdom = init();

  root.render(vdom);
};

render();
