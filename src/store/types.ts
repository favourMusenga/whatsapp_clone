import { ADD, UPDATE_USER_INFO, UPDATE_USER_PREFERENCE } from './constants';

// initial state for the authState
export type UserState = {
  isRegistered: boolean;
  username: string;
  status: string;
  email: string;
  password: string;
};
// type for the action authState
export type UserActions = {
  type: typeof UPDATE_USER_INFO;
  payload: UserState;
};
// initial state for the UserPreferncesState
export type UserPreferncesState = {
  theme: 'dark' | 'light';
};

export type UserPreferenceActions = {
  type: typeof UPDATE_USER_PREFERENCE;
  payload: UserPreferncesState;
};
