import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStatePovider } from './store/tray';

// Containers
import App from './containers/Tray/index';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <GlobalStatePovider>
    <App />
  </GlobalStatePovider>,
  rootElement,
);