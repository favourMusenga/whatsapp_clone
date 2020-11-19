import { Dispatch } from 'redux';
import { UPDATE_USER_PREFERENCE } from './constants';
import { UserPreferenceActions, UserPreferncesState } from './types';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export const updatePreferences = (
  preference: UserPreferncesState
): UserPreferenceActions => {
  return {
    payload: {
      theme: preference.theme,
    },
    type: UPDATE_USER_PREFERENCE,
  };
};

const KEY = 'Whatsapp-UserPreference';

export const getPreferences = () => async (dispatch: Dispatch) => {
  const { value } = await Storage.get({ key: KEY });
  if (value) {
    return dispatch(updatePreferences(JSON.parse(value)));
  } else {
    const initialState: UserPreferncesState = { theme: 'light' };
    await Storage.set({ key: KEY, value: JSON.stringify(initialState) });
    return dispatch(updatePreferences(initialState));
  }
};

export const setPreferences = (userPreference: UserPreferncesState) => async (
  dispatch: Dispatch
) => {
  await Storage.set({ key: KEY, value: JSON.stringify(userPreference) });
  return dispatch(updatePreferences(userPreference));
};
