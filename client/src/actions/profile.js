import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  // clear what is in current profile, may prevent flashing of past users profiles
  dispatch({ type: CLEAR_PROFILE })
  
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
// pass in history object that has method push that will redirect to a client side route
// in order to know if profile is new or editing, updating using a parameter named edit set to false by default
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      // since we are sending data we need to set up config object
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // make a post request to profile, can also update with that route
      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      // if edit is true say profile updated, else say profile created
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      // if edit then stay on page, if creating then redirect
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete account and profile.
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete your account? This can NOT be undone!'
    )
  ) {
    try {
      const res = await axios.delete(`api/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted.'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
