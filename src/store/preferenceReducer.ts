import { UserPreferenceActions, UserPreferncesState } from './types';

const initialState: UserPreferncesState = {
  theme: 'light',
};

const preferenceReducer = (
  state: UserPreferncesState = initialState,
  action: UserPreferenceActions
) => {
  switch (action.type) {
    case 'UPDATE_USER_PREFERENCE':
      return { ...state, theme: action.payload.theme };
    default:
      return state;
  }
};

export default preferenceReducer;
