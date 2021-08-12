// uuid is used to generate random universal id's
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Dispatch more than one action type from this function, use dispatch from thunk middleware
export const setAlert = (msg, alertType) => (dispatch) => {
  // generate random string id with uuid
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
