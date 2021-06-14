import { CART_CREATE_REQ, CART_CREATE_SUCCESS, CART_CREATE_FAIL, CART_USER_GET_REQ,
    CART_USER_GET_SUCCESS, CART_USER_GET_FAIL, CART_UPDATE_REQ, CART_UPDATE_SUCCESS,
    CART_UPDATE_FAIL } from '../Constants/CartConstant'
import Axios from 'axios'

const createCart = (user_id, movie_id, movie_qty) => async (dispatch) => {
    console.log(user_id, movie_id, movie_qty)
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
            localStorage.setItem('cartID', JSON.stringify(result.data[0].cart_id))
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
        dispatch({ type: CART_UPDATE_FAIL, err: err.response })
        return err.response
    }
}



export default {
    createCart,
    getCartUser,
    updateCart,
}