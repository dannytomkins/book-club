import { GET_CLUB, GET_CLUBS, DELETE_CLUB, CLUB_ERROR, CLEAR_CLUB } from '../actions/types';

const initialState = {
  clubs: [],
  club: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLUB:
      return {
        ...state,
        club: payload,
        loading: false,
      }
    case GET_CLUBS:
      return {
        ...state,
        clubs: payload,
        loading: false,
      };
    // @TODO: may need to change filter if delete button is moved to club page
    case DELETE_CLUB:
      return {
        ...state,
        // filter through, for each post return all except the one that matches payload
        clubs: state.clubs.filter((club) => club._id !== payload),
        loading: false,
      };
    case CLUB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        // club: null needed so new users dont pick up previous club info in the state.
        club: null,
      };
    case CLEAR_CLUB:
      return {
        ...state,
        club: null,
        loading: false,
      }
    default:
      return state;
  }
}
