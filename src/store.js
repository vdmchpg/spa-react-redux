import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger'
import { promiseMiddleware } from './middleware';
import reducer from './reducer';
import categoriesMock from './mocks/categories'

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware);
  } else {
    return applyMiddleware(promiseMiddleware, createLogger())
  }
};

const store = createStore(reducer, categoriesMock, getMiddleware(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
