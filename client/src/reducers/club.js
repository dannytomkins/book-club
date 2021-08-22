import { GET_CLUBS, CLUB_ERROR } from '../actions/types';

const initialState = {
  clubs: [],
  club: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLUBS:
      return {
        ...state,
        clubs: payload,
        loading: false,
      };
    case CLUB_ERROR:
      return {
        ...state,
        clubs: payload,
        loading: false,
      };
    default:
      return state;
  }
}
