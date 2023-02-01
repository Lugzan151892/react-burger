import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
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

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
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
