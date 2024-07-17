import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {applyMiddleware, legacy_createStore as createStore} from '@reduxjs/toolkit';
import {reducer} from './store/reducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {createAPI} from './services/api';
import {requireAuthorization} from './store/action';
import {AuthorizationStatus} from './const';
import {ThunkAppDispatch} from './types/action';
import {checkAuthAction, fetchQuestionAction} from './store/api-actions';
import {redirect} from './middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchQuestionAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>,
);
