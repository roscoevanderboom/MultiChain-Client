// Services
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
// State
import { GlobalStatePovider } from './state';

// Containers
import App from './containers/App';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
    <Router>
      <GlobalStatePovider>
        <App />
      </GlobalStatePovider>
    </Router>
  </SnackbarProvider>,
  rootElement
);
