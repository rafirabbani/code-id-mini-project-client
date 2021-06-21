import { CART_CREATE_REQ, CART_CREATE_SUCCESS, CART_CREATE_FAIL, CART_USER_GET_REQ,
         CART_USER_GET_SUCCESS, CART_USER_GET_FAIL, CART_UPDATE_REQ, CART_UPDATE_SUCCESS,
         CART_UPDATE_FAIL, CART_CHECKOUT_REQ, CART_CHECKOUT_SUCCESS, CART_CHECKOUT_FAIL,
         CART_GET_BY_ID_REQ, CART_GET_BY_ID_SUCCESS, CART_GET_BY_ID_FAIL } from '../Constants/CartConstant'

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_CREATE_REQ:
            return { loading: true }
        case CART_CREATE_SUCCESS:
            return { loading: false, cartUser: action.payload }
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
        case CART_CHECKOUT_REQ:
            return { loading: true }
        case CART_CHECKOUT_SUCCESS:
            return { loading: false, checkout: action.payload }
        case CART_CHECKOUT_FAIL:
            return { loading: false, err: action.payload }
        case CART_GET_BY_ID_REQ:
            return {...state, loading: true }
        case CART_GET_BY_ID_SUCCESS:
            return {...state, loading: false, cartById: action.payload }
        case CART_GET_BY_ID_FAIL:
            return {...state, loading: false, err: action.payload }
        default:
            return state
    }   
}

export default cartReducer