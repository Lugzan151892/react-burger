import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./services/reducers";
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
