import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './config';
import { MsalProvider } from '@azure/msal-react';

import store from './store'

import { icons } from './assets/icons'

React.icons = icons

const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <MsalProvider instance={msalInstance}>
    <App/>
  </MsalProvider>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
