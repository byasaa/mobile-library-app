import axios from 'axios';
import {REACT_APP_API_URL} from '@env';

export const getGenre = (token) => {
  return {
    type: 'GET_GENRE',
    payload: axios({
      method: 'GET',
      url: REACT_APP_API_URL + 'genres/',
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getDetailGenre = (id, token) => {
  return {
    type: 'GET_DETAIL_GENRE',
    payload: axios({
      method: 'GET',
      url: REACT_APP_API_URL + 'genres/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const postAddGenre = (data, token) => {
  return {
    type: 'POST_ADD_GENRE',
    payload: axios({
      method: 'POST',
      url: REACT_APP_API_URL + 'genres/',
      data: data,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const putUpdateGenre = (id, data, token) => {
  return {
    type: 'PUT_UPDATE_GENRE',
    payload: axios({
      method: 'PUT',
      url: REACT_APP_API_URL + 'genres/' + id,
      data: data,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const deleteGenre = (id, token) => {
  return {
    type: 'DELETE_GENRE',
    payload: axios({
      method: 'DELETE',
      url: REACT_APP_API_URL + 'genres/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};
