import { CREATE_ORDER_REQ, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, GET_ORDER_BY_NAME_REQ,
         GET_ORDER_BY_NAME_SUCCESS, GET_ORDER_BY_NAME_FAIL, GET_OPEN_ORDER_BY_USER_REQ,
         GET_OPEN_ORDER_BY_USER_SUCCESS, GET_OPEN_ORDER_BY_USER_FAIL, UPDATE_ORDER_BY_NAME_REQ,
         UPDATE_ORDER_BY_NAME_SUCCESS, UPDATE_ORDER_BY_NAME_FAIL } from '../Constants/OrderConstant'
import Axios from 'axios'

const createOrder = (data) => async (dispatch) => {
    //console.log(data)
    dispatch({ type: CREATE_ORDER_REQ })
    try {
        const result = await Axios.post(`/api/orders/create`, data)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: result.data })
        return result
    }
    catch (err) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: err.response.data })
        return err.response
    }
}

const getOrderByName = (orderName) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_NAME_REQ })
    try {
        const result = await Axios.get(`/api/orders/${orderName}`)
        dispatch({ type: GET_ORDER_BY_NAME_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: GET_ORDER_BY_NAME_FAIL, payload: err.response.data })
    }
}

const getOpenOrderByUser = (userID) => async (dispatch) => {
    dispatch({ type: GET_OPEN_ORDER_BY_USER_REQ })
    try {
        const result = await Axios.get(`/api/orders/open/user/${userID}`)
        dispatch({ type: GET_OPEN_ORDER_BY_USER_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: GET_OPEN_ORDER_BY_USER_FAIL, payload: err.response.data })
    }
}

const updateOrderByName = (orderNum, trxNum) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_BY_NAME_REQ })
    const data = {
        order_status: 'PAID',
        order_pay_trx_num: trxNum
    }
    try {
        const result = await Axios.put(`/api/orders/update/${orderNum}`, data)
        dispatch({ type: UPDATE_ORDER_BY_NAME_SUCCESS, payload: result.payload })
        return result
    }
    catch (err) {
        dispatch({ type: UPDATE_ORDER_BY_NAME_FAIL, payload: err.response.data })
        return err.response
    }
}

export default {
    createOrder,
    getOrderByName,
    getOpenOrderByUser,
    updateOrderByName
}