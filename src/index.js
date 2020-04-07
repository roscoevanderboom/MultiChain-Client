import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStatePovider } from './store';
import { BrowserRouter as Router, } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const routerHistory = createMemoryHistory();

ReactDOM.render(
  <Router>
    <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
      <GlobalStatePovider>
        <App />
      </GlobalStatePovider>
    </SnackbarProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
