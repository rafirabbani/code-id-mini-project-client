import { USER_CREATE_REQ, USER_CREATE_SUCCESS, USER_CREATE_FAILURE, USER_HOLD_MAIL, USER_HOLD_PASSWORD_MAIL } from '../Constants/UserConstants'

const userReducer =(state = { loading: true }, action) => {
    switch (action.type) {
        case USER_CREATE_REQ:
            return { loading: true }
        case USER_CREATE_SUCCESS:
            //console.log(action)
            //console.log(action.payload)
            return { loading: false, user: action.payload }
        case USER_CREATE_FAILURE:
            return { loading: false, error: action.payload }
        case USER_HOLD_MAIL:
            //console.log(action)
            return { loading: false, user: action.payload }
        case USER_HOLD_PASSWORD_MAIL:
            console.log(action)
            return { loading: false, user: action.payload }
        default:
            return state
    }
}

export default userReducer