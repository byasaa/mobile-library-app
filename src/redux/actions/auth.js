import axios from 'axios';
import {REACT_APP_API_URL} from '@env';
export const login = (data) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: REACT_APP_API_URL + 'auth/login/',
      data: {
        username: data.username,
        password: data.password,
      },
    }),
  };
};

export const register = (data) => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: REACT_APP_API_URL + 'auth/register/',
      data: {
        username: data.username,
        password: data.password,
      },
    }),
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
