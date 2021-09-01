import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_BOOKS,
    BOOKS_ERROR
} from './types'

// Get books by title from googlebooks api
export const getBooksByTitle = term => async (dispatch) => {
    try {
        const res = await axios.get(`/api/googlebooks/${term}`)

        dispatch({
            type: GET_BOOKS,
            payload: res.data,
          });
    } catch (err) {
        dispatch({
            type: BOOKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}