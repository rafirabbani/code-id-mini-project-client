import { AUTH_SIGNIN_REQ, AUTH_SIGNIN_SUCCESS, AUTH_SIGNIN_FAIL, AUTH_SIGNOUT } from '../Constants/AuthConstants'
const authReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_SIGNIN_REQ:
            return { loading: true, isLoggedIn: false }
        case AUTH_SIGNIN_SUCCESS:
            return { isLoggedIn: true, loading: false, userInfo: action.payload }
        case AUTH_SIGNIN_FAIL:
            return { isLoggedIn: false, loading: false, error: action.payload }
        default:
            return state
    }
}

export default authReducer

