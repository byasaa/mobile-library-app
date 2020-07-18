const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const book = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'GET_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'GET_BOOK_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: action.payload.data.data,
      };
    case 'GET_DETAIL_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'GET_DETAIL_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'GET_DETAIL_BOOK_FULFILLED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: action.payload.data.data[0],
      };
    case 'PATCH_BORROW_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'PATCH_BORROW_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'PATCH_BORROW_BOOK_FULFILLED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: action.payload.data.data[0],
      };
    case 'POST_ADD_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'POST_ADD_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'POST_ADD_BOOK_FULFILLED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: action.payload.data.data[0],
      };
    case 'PUT_UPDATE_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'PUT_UPDATE_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'PUT_UPDATE_BOOK_FULFILLED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: action.payload.data.data[0],
      };
    case 'DELETE_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'DELETE_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'DELETE_BOOK_FULFILLED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: action.payload.data.data[0],
      };
    default:
      return state;
  }
};

export default book;
