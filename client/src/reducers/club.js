import { GET_CLUBS, DELETE_CLUB, CLUB_ERROR } from '../actions/types';

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
      };
    default:
      return state;
  }
}
