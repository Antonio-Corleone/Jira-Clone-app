// React default
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Redux Store
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';
import createMiddlewareSaga from 'redux-saga';
// Import libs
import 'font-awesome/css/font-awesome.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import 'antd/dist/antd.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWareSaga = createMiddlewareSaga();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk,middleWareSaga))
);
middleWareSaga.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
