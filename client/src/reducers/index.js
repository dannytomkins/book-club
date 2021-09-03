import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import club from './club'
import post from './post';
import book from './book'

export default combineReducers({
  alert,
  auth,
  profile,
  club,
  post,
  book,
});
