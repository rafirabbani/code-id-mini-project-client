import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer
}) 

export default reducers