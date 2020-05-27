import { SAVE_PIZZAS } from '../actions'

const initialState = [
  // { id: 1, name: 'Salami', price: 5, description: 'With tomatoes and olives.', photo: 'p1' },
  // { id: 2, name: 'Margherita', price: 5, description: 'Neapolitan pizza, made with tomatoes, fresh basil and olive oil.', photo: 'p2' },
  // { id: 3, name: 'Pepperoni', price: 5, description: 'A great crust, gooey cheese, and tons of pepperoni.', photo: 'p3' },
  // { id: 4, name: 'Sausages', price: 5, description: 'Sausages', photo: 'p4' },
  // { id: 5, name: 'Mushrooms', price: 5, description: 'Mushrooms', photo: 'p5' },
  // { id: 6, name: 'Chicken', price: 5, description: 'Chicken mushroom bell peppers cheese', photo: 'p6' },
  // { id: 7, name: 'Green', price: 5, description: 'Sausages greens and parmesan', photo: 'p7' },
  // { id: 8, name: 'Shrimp', price: 5, description: 'With shrimp, salmon and olives', photo: 'p8' },
];
    
export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PIZZAS:
      let newState = state.slice().concat(action.pizzas);
      return newState;
    default:
    return state;
  }
}