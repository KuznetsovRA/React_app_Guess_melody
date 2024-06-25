import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {legacy_createStore as createStore} from '@reduxjs/toolkit';
import {reducer} from './store/reducer';
import {Provider} from 'react-redux';
import {composeWithDevTools} from '@redux-devtools/extension';

const store = createStore(
  reducer,
  composeWithDevTools(),
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);
