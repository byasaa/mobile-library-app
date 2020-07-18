import axios from 'axios';

export const getBook = (search, limit, page, order, sort, token) => {
  return {
    type: 'GET_BOOK',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_API_URL + 'books/',
      params: {
        search: search,
        limit: limit,
        page: page,
        orderBy: order,
        sort: sort,
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
      url: process.env.REACT_APP_API_URL + 'books/' + id,
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
      url: process.env.REACT_APP_API_URL + 'books/' + id + '/borrow',
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const postAddBook = (formData, token) => {
  return {
    type: 'POST_ADD_BOOK',
    payload: axios({
      method: 'POST',
      url: process.env.REACT_APP_API_URL + 'books/',
      data: formData,
      headers: {
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
      url: process.env.REACT_APP_API_URL + 'books/' + id,
      data: formData,
      headers: {
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
      url: process.env.REACT_APP_API_URL + 'books/' + id,
      headers: {
        Authorization: token,
      },
    }),
  };
};
