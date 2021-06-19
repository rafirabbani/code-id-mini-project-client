import { GET_CASTS_LIST_REQ, GET_CASTS_LIST_SUCCESS, GET_CASTS_LIST_FAIL, CREATE_CAST_REQ,
         CREATE_CAST_SUCCESS, CREATE_CAST_FAIL } from '../Constants/CastConstant'

const castReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CASTS_LIST_REQ:
            return { loading: true }
        case GET_CASTS_LIST_SUCCESS:
            return { loading: false, casts: action.payload }
        case GET_CASTS_LIST_FAIL:
            return { loading: false, error: action.payload}
        case CREATE_CAST_REQ:
            return { loading: true }
        case CREATE_CAST_SUCCESS:
            return { loading: false, createCast: action.payload }
        case CREATE_CAST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export default castReducer