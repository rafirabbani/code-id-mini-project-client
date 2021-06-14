//import IndexQuery from '../ApiQuery/IndexQuery'
import { AUTH_SIGNIN_REQ, AUTH_SIGNIN_SUCCESS, AUTH_SIGNIN_FAIL, 
    AUTH_SIGNOUT_REQ, AUTH_SIGNOUT_SUCCESS, AUTH_SIGNOUT_FAIL } from '../Constants/AuthConstants'
import Axios from 'axios'

//const auth = IndexQuery.AuthQuery

const signIn = (data) => async (dispatch) => {
    dispatch({ type: AUTH_SIGNIN_REQ })
    try {
        const result = await Axios.post('/api/auth/signin', data)
        dispatch({ type: AUTH_SIGNIN_SUCCESS, payload: {
            token: result.data.token, 
            user_type: result.data.users.user_type, 
            user_id: result.data.users.user_id } 
        })
        localStorage.setItem('data', JSON.stringify({
            token: result.data.token, 
            user_type: result.data.users.user_type,
            user_id: result.data.users.user_id
        }))
        return result
    }
    catch (err) {
        //console.log(err)
        dispatch({ type: AUTH_SIGNIN_FAIL, payload: err.response.data })
        return err.response
    }
}

const signOut = () => async (dispatch) => {
    dispatch({ type: AUTH_SIGNOUT_REQ })
    
    try {
        localStorage.removeItem('data')
        localStorage.removeItem('cartID')
        const result = await Axios.get('/api/auth/signout')
        dispatch({ type: AUTH_SIGNOUT_SUCCESS, payload: result.data })
        //return result
    }
    catch (err) {
        dispatch({ type: AUTH_SIGNOUT_FAIL, err: err.response.data })
        //return err.response
    }
} 

export default {
    signIn, 
    signOut
}