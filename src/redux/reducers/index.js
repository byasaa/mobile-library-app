import { combineReducers } from "redux";
import auth from './auth'
import book from './book'
import loan from './loan'
import genre from './genre'
import author from './author'

export default combineReducers({
    auth,
    book,
    loan,
    genre,
    author
})