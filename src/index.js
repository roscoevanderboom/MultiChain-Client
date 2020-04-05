import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { GlobalStatePovider } from './store';
import { BrowserRouter as Router, } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const routerHistory = createMemoryHistory();

ReactDOM.render( 
  <Router>
    <GlobalStatePovider
      routerHistory={routerHistory}>
      <App />
    </GlobalStatePovider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
