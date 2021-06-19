import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import MovieReducer from './MovieReducer'
import CartReducer from './CartReducer'
import ItemReducer from './ItemReducer'
import OrderReducer from './OrderReducer'
import CastReducer from './CastReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    movie: MovieReducer,
    cart: CartReducer,
    item: ItemReducer,
    order: OrderReducer,
    cast: CastReducer
}) 

export default reducers