import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CLUBS,
  GET_CLUB,
  DELETE_CLUB,
  CLUB_ERROR,
  CLEAR_CLUB,
  ADD_MEMBER,
 } from './types';

// // Get clubs
export const getClubs = () => async (dispatch) => {
  // clear what is in current club, may prevent errors
  dispatch({ type: CLEAR_CLUB });

  try {
    const res = await axios.get('/api/clubs');

    dispatch({
      type: GET_CLUBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get club
export const getClub = (id) => async (dispatch) => {
  // clear what is in current club, may prevent errors
  // dispatch({ type: CLEAR_CLUB })

  try {
    const res = await axios.get(`/api/clubs/${id}`);

    dispatch({
      type: GET_CLUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete club
export const deleteClub = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete your club? This can NOT be undone!'
    )
  ) {
    try {
      const res = await axios.delete(`/api/clubs/${id}`);

      dispatch({
        type: DELETE_CLUB,
        payload: id,
      });

      dispatch(setAlert('Club Removed', 'success'));
    } catch (err) {
      dispatch({
        type: CLUB_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// @TODO: correct that double dispatch, figure out how to edit club
// Create or update club
// pass in history object that has method push that will redirect to a client side route
// in order to know if profile is new or editing, updating using a parameter named edit set to false by default
export const createClub =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      // since we are sending data we need to set up config object

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(`/api/clubs`, formData, config);

      dispatch({
        type: GET_CLUB,
        payload: res.data,
      });

      // if edit is true say club updated, else say club created
      dispatch(setAlert(edit ? 'Club Updated' : 'Club Created', 'success'));

      // if edit then stay on page, if creating then redirect
      if (!edit) {
        history.push('/dashboard');
      }

      dispatch(setAlert('Club Created', 'success'));
    } catch (err) {
      dispatch({
        type: CLUB_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// @TODO: correct that double dispatch, figure out how to edit club
// Edit club
// pass in history object that has method push that will redirect to a client side route
// in order to know if profile is new or editing, updating using a parameter named edit set to false by default
export const editClub = (id, formData, history) => async (dispatch) => {
  try {
    // since we are sending data we need to set up config object

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/clubs/${id}`, formData, config);

    //@TODO: figure out what type to dispatch on edit submit
    dispatch({
      type: GET_CLUB,
      payload: res.data,
    });

    // if edit is true say club updated, else say club created
    dispatch(setAlert('Club Updated', 'success'));

    // @TODO: redirect back to club
    // @TODO: remove edit value from createClub and editClub
    // if edit then stay on page, if creating then redirect

    history.push(`/clubs/${id}`);
  } catch (err) {
    dispatch({
      type: CLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Join club
// psuedo code
// join club, pass in in club at url.
// use current logged in user
// create type to update club?
export const joinClub = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/clubs/members/${id}`);

    dispatch({
      type: ADD_MEMBER,
      payload: { id, members: res.data },
    });

    dispatch(setAlert('Club joined', 'success'));
  } catch (err) {
    dispatch({
      type: CLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
