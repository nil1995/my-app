import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const user = (state = '', action) => {
  switch (action.type) {
    case 'AUTH':
      return { ...state, ...action};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App auth={store.auth} login={store.login}/>
  </Provider>,
  document.getElementById('root')
);
