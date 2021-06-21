import { AUTH_SIGNIN_REQ, AUTH_SIGNIN_SUCCESS, AUTH_SIGNIN_FAIL, AUTH_SIGNOUT_REQ, AUTH_SIGNOUT_SUCCESS,
    AUTH_SIGNOUT_FAIL } from '../Constants/AuthConstants'
    
const authReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_SIGNIN_REQ:
            return { loading: true, isLoggedIn: false }
        case AUTH_SIGNIN_SUCCESS:
            //console.log(action.payload)
            return { isLoggedIn: true, loading: false, userID: action.payload.user_id, userType: action.payload.user_type }
        case AUTH_SIGNIN_FAIL:
            return { isLoggedIn: false, loading: false, error: action.payload }
        case AUTH_SIGNOUT_REQ:
            return { loading: true, isLoggedIn: true }
        case AUTH_SIGNOUT_SUCCESS:
            return { loading: false, isLoggedIn: false, message: action.payload }
        case AUTH_SIGNOUT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export default authReducer

