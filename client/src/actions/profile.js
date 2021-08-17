import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

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
      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

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
