import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import MovieReducer from './MovieReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    movie: MovieReducer
}) 

export default reducers