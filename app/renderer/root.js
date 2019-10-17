// Services
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
// State
import { GlobalStatePovider } from './state/state';

// Containers
import App from './containers/App';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
    <GlobalStatePovider>
      <App />
    </GlobalStatePovider>
  </SnackbarProvider>
  ,
  rootElement,
);
