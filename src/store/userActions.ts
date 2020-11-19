import { Dispatch } from 'redux';
import { UserActions, UserState } from './types';
import { Plugins } from '@capacitor/core';
import { UPDATE_USER_INFO } from './constants';

const { Storage } = Plugins;

const KEY = 'Whatsapp-UserInfo';

export const updateUser = (user: UserState): UserActions => {
  return {
    payload: {
      email: user.email,
      isRegistered: user.isRegistered,
      password: user.password,
      username: user.username,
      status: user.status,
    },
    type: UPDATE_USER_INFO,
  };
};

export const getUserInfo = () => async (dispatch: Dispatch) => {
  const { value } = await Storage.get({ key: KEY });

  if (value) {
    const userInfo = JSON.parse(value);
    return dispatch(updateUser(userInfo));
  } else {
    const initialState: UserState = {
      email: '',
      isRegistered: false,
      username: '',
      status: '',
      password: '',
    };
    await Storage.set({ key: KEY, value: JSON.stringify(initialState) });
    return dispatch(updateUser(initialState));
  }
};

export const setUserInfo = (userInfo: UserState) => async (
  dispatch: Dispatch
) => {
  await Storage.set({ key: KEY, value: JSON.stringify(userInfo) });
  return dispatch(updateUser(userInfo));
};
