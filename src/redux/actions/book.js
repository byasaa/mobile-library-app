import axios from 'axios';
import {REACT_APP_API_URL} from '@env';

export const getBook = (token, page, search) => {
  return {
    type: 'GET_BOOK',
    payload: axios({
      method: 'GET',
      url: REACT_APP_API_URL + 'books/',
      params: {
        page: page,
        limit: 4,
        search: search,
      },
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getDetailBook = (id, token) => {
  return {
    type: 'GET_DETAIL_BOOK',
    payload: axios({
      method: 'GET',
      url: REACT_APP_API_URL + 'books/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const patchBorrowBook = (id, token) => {
  return {
    type: 'PATCH_BORROW_BOOK',
    payload: axios({
      method: 'PATCH',
      url: REACT_APP_API_URL + 'books/' + id + '/borrow',
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const postAddBook = (formData, token) => {
  console.log(REACT_APP_API_URL);
  return {
    type: 'POST_ADD_BOOK',
    payload: axios({
      method: 'POST',
      url: REACT_APP_API_URL + 'books/',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    }),
  };
};

export const putUpdateBook = (id, formData, token) => {
  return {
    type: 'PUT_UPDATE_BOOK',
    payload: axios({
      method: 'PUT',
      url: REACT_APP_API_URL + 'books/' + id,
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    }),
  };
};

export const deleteBook = (id, token) => {
  return {
    type: 'DELETE_BOOK',
    payload: axios({
      method: 'DELETE',
      url: REACT_APP_API_URL + 'books/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};
