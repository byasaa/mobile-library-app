import axios from 'axios';

export const getAuthor = (token) => {
  return {
    type: 'GET_AUTHOR',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_API_URL + 'authors/',
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getDetailAuthor = (id, token) => {
  return {
    type: 'GET_DETAIL_AUTHOR',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_API_URL + 'authors/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const postAddAuthor = (data, token) => {
  return {
    type: 'POST_ADD_AUTHOR',
    payload: axios({
      method: 'POST',
      url: process.env.REACT_APP_API_URL + 'authors/',
      data: data,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const putUpdateAuthor = (id, data, token) => {
  return {
    type: 'PUT_UPDATE_AUTHOR',
    payload: axios({
      method: 'PUT',
      url: process.env.REACT_APP_API_URL + 'authors/' + id,
      data: data,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const deleteAuthor = (id, token) => {
  return {
    type: 'DELETE_AUTHOR',
    payload: axios({
      method: 'DELETE',
      url: process.env.REACT_APP_API_URL + 'authors/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};
