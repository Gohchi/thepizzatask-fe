import { SET_CURRENCY } from '../actions'

export const currencies = {
  EUR: { code: 'EUR', base: 1, symbol: '€' },
  USD: { code: 'USD', base: 1.09, symbol: 'US$' }
}

export default (state = currencies['EUR'], action) => {
  switch (action.type) {
    case SET_CURRENCY:
      return currencies[action.code];
    default:
      return state
  }
}
