// Services
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
// Containers
import App from './containers/App';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
    <App useSnackbar={useSnackbar} />
  </SnackbarProvider>,
  rootElement,
);
