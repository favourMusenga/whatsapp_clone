import { UserActions, UserState } from './types';

const initialState: UserState = {
  email: '',
  isRegistered: false,
  username: '',
  status: '',
  password: '',
};

const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        email: action.payload.email,
        isRegistered: action.payload.isRegistered,
        username: action.payload.username,
        status: action.payload.status,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

export default userReducer;
