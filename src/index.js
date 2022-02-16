import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import allReducers from './redux/allReducer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(allReducers, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
