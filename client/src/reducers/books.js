import { GET_BOOKS, BOOKS_ERROR } from '../actions/types';

const initialState = {
  books: [],
  book: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        books: payload,
        loading: false,
      };
    case BOOKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        // null needed so new users dont pick up previous info in the state.
        book: null,
      };
    default:
      return state;
  }
}
