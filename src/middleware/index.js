import { ADD_ORDER, CLEAR_CART } from '../actions'

export const mainMiddleware = (store, action) => {
  switch (action.type){
    case ADD_ORDER:
      store.dispatch({
        type: CLEAR_CART
      });
      break;
    default:
  }
}