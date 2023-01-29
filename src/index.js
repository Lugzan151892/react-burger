import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from 'react-redux';
import { rootReducer } from "./services/reducers";
import App from './components/App/App';
import { socketMiddleware } from "./services/middleware/wsMiddleware";
import reportWebVitals from './reportWebVitals';
import { WS_CONNECTION_START, WS_SEND_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from "./services/actions/wsActions";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, socketMiddleware(wsUrl)),
// });

// const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)))
);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
