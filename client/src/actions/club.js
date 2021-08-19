import axios from 'axios';
import { setAlert } from './alert';

// TO DO: import types

// Get clubs current user is member of
export const clubsIn = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/clubs/members/:user')

        dispatch({
            type: GET_CLUBS_IN,
            payload: res.data,
          });
    } catch (err) {
        dispatch({
            type: CLUBS_IN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}