import { createStore, combineReducers, applyMiddleware } from 'redux';

import { mainMiddleware } from './middleware'

import cart from './reducers/cart'
import currency from './reducers/currency'
import pizzas from './reducers/pizzas'
import contact from './reducers/contact'
import orders from './reducers/orders'

const reducer = combineReducers({
  cart,
  currency,
  pizzas,
  contact,
  orders
});

const customMiddleWare = store => next => action => {
  console.log(action);
  next(action);
  mainMiddleware(store, action);
}

const store = createStore(reducer, undefined, applyMiddleware(customMiddleWare));

export default store;