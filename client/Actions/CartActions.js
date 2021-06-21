import { CART_CREATE_REQ, CART_CREATE_SUCCESS, CART_CREATE_FAIL, CART_USER_GET_REQ,
         CART_USER_GET_SUCCESS, CART_USER_GET_FAIL, CART_UPDATE_REQ, CART_UPDATE_SUCCESS,
         CART_UPDATE_FAIL, CART_CHECKOUT_REQ, CART_CHECKOUT_SUCCESS, CART_CHECKOUT_FAIL, 
         CART_GET_BY_ID_REQ, CART_GET_BY_ID_SUCCESS, CART_GET_BY_ID_FAIL
    } from '../Constants/CartConstant'
import Axios from 'axios'

const createCart = (user_id, movie_id, movie_qty) => async (dispatch) => {
    //console.log(user_id, movie_id, movie_qty)
    dispatch({ type: CART_CREATE_REQ })
    const data = {
        cart_user_id: user_id,
        line_item_movie_id: movie_id,
        line_item_qty: movie_qty
    }
    //console.log(data)
    try {
        const result = await Axios.post('/api/transactions/cart/create', data)
        dispatch({ type: CART_CREATE_SUCCESS, payload: result.data })
        return result
    }
    catch (err) {
        dispatch({ type: CART_CREATE_FAIL, payload: err.response.data })
        return err.response
    }
}

const getCartUser = (user_id) => async (dispatch) => {
    dispatch({ type: CART_USER_GET_REQ })
    try {
        const result = await Axios.get(`/api/transactions/cart/user/${user_id}`)
        //console.log(result)
        if (result.data.length > 0) {
            //localStorage.setItem('cartID', JSON.stringify(result.data[0].cart_id))
        }
        dispatch ({ type: CART_USER_GET_SUCCESS, payload: result.data })
        
    }
    catch (err) {
        //console.log(err)
        dispatch ({ type: CART_USER_GET_FAIL, payload: err.message  })
    }
}

const updateCart = (cart_id, movie_id, movie_qty) => async (dispatch) => {
    dispatch({ type: CART_UPDATE_REQ })
    const data = {
        line_item_movie_id: movie_id,
        line_item_qty: movie_qty
    }

    try {
        const result = await Axios.put(`/api/transactions/cart/update/additem/${cart_id}`, data)
        dispatch({ type: CART_UPDATE_SUCCESS, payload: result.data })
        return result

    }
    catch(err) {
        dispatch({ type: CART_UPDATE_FAIL, payload: err.response })
        return err.response
    }
}

const checkOut = (cartID, orderName) => async (dispatch) => {
    dispatch({ type: CART_CHECKOUT_REQ })
    const data = {
        cart_status: 'CLOSE',
        line_item_status: "ORDERED",
        line_item_order_name: orderName
    }
    try {
        const result = await Axios.put(`/api/transactions/cart/checkout/${cartID}`, data)
        dispatch({ type: CART_CHECKOUT_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: CART_CHECKOUT_FAIL, payload: err.response.data })
        return err.response
    }
}

const getCartById = (cartID) => async (dispatch) => {
    dispatch({ type: CART_GET_BY_ID_REQ })
    try {
        const result = await Axios.get(`/api/transactions/cart/${cartID}`)
        dispatch({ type: CART_GET_BY_ID_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: CART_GET_BY_ID_FAIL, payload: err.response.data })
    }
}





export default {
    createCart,
    getCartUser,
    updateCart,
    checkOut,
    getCartById
}