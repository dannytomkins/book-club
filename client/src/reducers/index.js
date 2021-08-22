import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import club from '/club'
import post from '/post';

export default combineReducers({
  alert,
  auth,
  profile,
  club,
  post,
});
