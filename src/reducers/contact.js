import { SAVE_CONTACT } from '../actions'

const initialState = {
  // fullName: 'Martín Farias',
  // phone: '+54 11 1111 1111',
  // address: '5th Ave. - 1234', apartment: 42,
  // valid: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONTACT:
      const { fullName, phone, address, apartment } = action;
      const newState = Object.assign({}, state, { fullName, phone, address, apartment, valid: true });
      return newState;
    default:
      return state;
  }
}
