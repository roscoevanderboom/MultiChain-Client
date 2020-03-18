import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { GlobalStatePovider } from './store';
import { BrowserRouter as Router, } from 'react-router-dom';

// Containers
import App from './tray/index';

const routerHistory = createMemoryHistory();

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Router>
    <GlobalStatePovider
      routerHistory={routerHistory}>
      <App />
    </GlobalStatePovider>
  </Router>,
  rootElement,
);