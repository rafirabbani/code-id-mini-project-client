import reducers from './Reducers/IndexReducer'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//const window = global.window
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const initState = {
    auth: {
        isLoggedIn:
            typeof window !== "undefined"
            ? localStorage.getItem('data') ? true : false 
            : false,
        userType: 
            typeof window !== "undefined"
            ? localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).user_type : null
            : null,
        userID:
            typeof window !== "undefined"
            ? localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).user_id : null
            : null,
        
    },
}

const store = createStore(reducers, initState, composeEnhancers(applyMiddleware(thunk)))

export default store