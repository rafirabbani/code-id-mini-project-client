import { CART_CREATE_REQ, CART_CREATE_SUCCESS, CART_CREATE_FAIL, CART_USER_GET_REQ,
    CART_USER_GET_SUCCESS, CART_USER_GET_FAIL, CART_UPDATE_REQ, CART_UPDATE_SUCCESS,
    CART_UPDATE_FAIL } from '../Constants/CartConstant'

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_CREATE_REQ:
            return { loading: true }
        case CART_CREATE_SUCCESS:
            return { loading: false, cartUser: action.payload,  }
        case CART_CREATE_FAIL:
            return { loading: false, err: action.payload }
        case CART_USER_GET_REQ:
            return { loading:true }
        case CART_USER_GET_SUCCESS:
            return { loading: false, cartUser: action.payload }
        case CART_USER_GET_FAIL:
            return { loading: false, err: action.payload }
        case CART_UPDATE_REQ:
            return { loading: true }
        case CART_UPDATE_SUCCESS:
            return { loading: false, cartUser: action.payload }
        case CART_UPDATE_FAIL:
            return { loading: false, err: action.payload }
        default:
            return state
    }   
}

export default cartReducer