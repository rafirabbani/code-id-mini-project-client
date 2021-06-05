import reducers from './Reducers/IndexReducer'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//const window = global.window
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const initState = {}
const reducer = (state, action) => {
    return state
}
const store = createStore(reducers, initState, composeEnhancers(applyMiddleware(thunk)))

export default store