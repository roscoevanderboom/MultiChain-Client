// Services
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
// Containers
import App from './containers/App';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
    <App />
  </SnackbarProvider>,
  rootElement,
);
