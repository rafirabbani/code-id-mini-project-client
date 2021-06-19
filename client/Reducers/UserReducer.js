import { USER_CREATE_REQ, USER_CREATE_SUCCESS, USER_CREATE_FAILURE, USER_HOLD_MAIL, USER_HOLD_PASSWORD_MAIL,
         USER_FIND_BY_ID_REQ, USER_FIND_BY_ID_SUCCESS, USER_FIND_BY_ID_FAIL } from '../Constants/UserConstants'

const userReducer =(state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQ:
            return { loading: true, user: {} }
        case USER_CREATE_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_CREATE_FAILURE:
            return { loading: false, err: action.payload, user: {} }
        case USER_HOLD_MAIL:
            return { loading: false, user: action.payload }
        case USER_HOLD_PASSWORD_MAIL:
            return { loading: false, user: action.payload }
        case USER_FIND_BY_ID_REQ:
            return { loading: true }
        case USER_FIND_BY_ID_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_FIND_BY_ID_FAIL:
            return { loading: false, err: action.payload }
        default:
            return state
    }
}

export default userReducer