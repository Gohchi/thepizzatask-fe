import { ADD_ORDER } from '../actions'

const initialState = [{
  date: new Date(2020, 2, 12, 19, 22),
  items: [
    { id: 3, amount: 2, price: 5 },
    { id: 2, amount: 1, price: 3 },
    { id: 1, amount: 1, price: 8 }
  ],
  currency: {
    base: 1.12, code: 'USD'
  }
},
{
  date: new Date(2020, 3, 2, 11, 12),
  items: [
    { id: 3, amount: 2, price: 5 },
    { id: 4, amount: 1, price: 6 },
    { id: 2, amount: 1, price: 3 },
    { id: 1, amount: 1, price: 14 }
  ],
  currency: {
    base: 1.12, code: 'USD'
  }
}];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      let newState = state.slice();
      newState.push({
        date: new Date(),
        items: action.items.map(i => { return { id: i.id, amount: i.amount, price: i.price * i.amount}; }),
        currency: { base: action.currency.base, code: action.currency.code }
      })
      return newState;
    default:
      return state;
  }
}