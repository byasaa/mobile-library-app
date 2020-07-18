const initialState = {
    data : [],
    isLoading : false,
    isError : false,
    isSuccess : false
}

const loan = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LOAN_BOOK_PENDING":
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : false        
            }
        case "GET_LOAN_BOOK_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        case "GET_LOAN_BOOK_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess : true,
                data : action.payload.data.data[0]
            }
        case "GET_LOAN_USER_PENDING":
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : false        
            }
        case "GET_LOAN_USER_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        case "GET_LOAN_USER_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess : true,
                data : action.payload.data.data
            }
        case "PATCH_RETURN_BOOK_PENDING":
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : false        
            }
        case "PATCH_RETURN_BOOK_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        case "PATCH_RETURN_BOOK_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess : true,
                data : action.payload.data.data
            }
        default:
            return state
    }
}

export default loan