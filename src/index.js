import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


import { createStore,compose,applyMiddleware } from 'redux';
import allReducers from './Redux/Reducers';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Redux/Sagas';
const sagas= createSagaMiddleware();
const store = createStore(allReducers,applyMiddleware(sagas))
sagas.run(rootSaga);

//const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
          <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
