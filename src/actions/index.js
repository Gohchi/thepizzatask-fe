export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const CLEAR_FROM_CART = 'CLEAR_FROM_CART'
export const SET_CURRENCY = 'SET_CURRENCY'
export const SAVE_CONTACT = 'SAVE_CONTACT'
export const ADD_ORDER = 'ADD_ORDER'

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id
  }
}

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const clearFromCart = (id) => {
  return {
    type: CLEAR_FROM_CART,
    id
  }
}

export const setCurrency = (code) => {
  return {
    type: SET_CURRENCY,
    code
  }
}

export const setContact = (fullName, phone, address, apartment) => {
  return {
    type: SAVE_CONTACT,
    fullName, phone, address, apartment
  }
}


export const addOrder = (items, currency) => {
  return {
    type: ADD_ORDER,
    items,
    currency,
  }
}