import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType={'hashbang'}><App /></HashRouter>
  </Provider>
  , document.getElementById('app'));
serviceWorker.unregister();
