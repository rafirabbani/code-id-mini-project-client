import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import MovieReducer from './MovieReducer'
import CartReducer from './CartReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    movie: MovieReducer,
    cart: CartReducer
}) 

export default reducers