import axios from 'axios';
import { setAlert } from './alert';

import { GET_CLUBS, DELETE_CLUB, CLUB_ERROR } from './types';

// // Get clubs
export const getClubs = () => async (dispatch) => {
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
