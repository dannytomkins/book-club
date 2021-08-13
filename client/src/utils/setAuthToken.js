import axios from 'axios';

// Function that takes in token, if the token exists, then adds token to headers, if no token then deletes from headers.
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
