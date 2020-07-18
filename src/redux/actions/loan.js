import axios from 'axios'

export const getLoanBook = (id, token) => {
    return {
        type : "GET_LOAN_BOOK",
        payload: axios({
            method : "GET",
            url : process.env.REACT_APP_API_URL + 'loans/book/' + id,
            headers : {
                Authorization : token
            }
        })
    }
}

export const getLoanByUser = (id, token) => {
    return {
        type : "GET_LOAN_USER",
        payload: axios({
            method : "GET",
            url : process.env.REACT_APP_API_URL + 'loans/user/' + id,
            headers : {
                Authorization : token
            }
        })
    }
}

export const patchReturnBook = (id, book_id, token) => {
    return {
        type : "PATCH_RETURN_BOOK",
        payload: axios({
            method : "PATCH",
            url : process.env.REACT_APP_API_URL + 'loans/' + id,
            headers : {
                Authorization : token
            },
            data : {
                book_id : book_id
            }
        })
    }
}