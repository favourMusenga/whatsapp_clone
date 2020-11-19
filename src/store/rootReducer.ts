import { combineReducers } from 'redux';
import preferenceReducer from './preferenceReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userPreference: preferenceReducer,
  userInfo: userReducer,
});
export type rootState = ReturnType<typeof rootReducer>;

export default rootReducer;
