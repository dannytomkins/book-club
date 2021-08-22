import axios from 'axios';
import { setAlert } from './alert';

import { GET_CLUBS, CLUB_ERROR } from './types';

// // Get clubs
export const getClubs = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/clubs')

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
}