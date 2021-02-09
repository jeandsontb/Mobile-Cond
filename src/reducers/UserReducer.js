import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: '',
  user: {},
  property: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'setToken':
      AsyncStorage.setItem('token', action.payload.token);
      return {...state, token: action.payload.token};
      // eslint-disable-next-line no-unreachable
      break;
    case 'setUser':
      return {...state, user: action.payload.user};
      // eslint-disable-next-line no-unreachable
      break;
    case 'setProperty':
      return {...state, property: action.payload.property};
      // eslint-disable-next-line no-unreachable
      break;
  }

  return state;
};
