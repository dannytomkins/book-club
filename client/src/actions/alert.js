// uuid is used to generate random universal id's
import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from "./types";

// Dispatch more than one action type from this function, use dispatch from thunk middleware
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })
}