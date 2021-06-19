import { ITEM_SUMITEMS_REQ, ITEM_SUMITEMS_SUCCESS, ITEM_SUMITEMS_FAIL, GET_ORDERED_ITEMS_REQ, 
         GET_ORDERED_ITEMS_SUCCESS, GET_ORDERED_ITEMS_FAIL } from '../Constants/ItemConstants'
import Axios from 'axios'

const sumItems = (cart_id) => async (dispatch) => {
    dispatch({ type: ITEM_SUMITEMS_REQ })
    try {
        const result = await Axios.get(`/api/transactions/cart/sum/${cart_id}`)
        dispatch({ type: ITEM_SUMITEMS_SUCCESS, payload: result.data})
        return result
    }
    catch (err) {
        dispatch({ type: ITEM_SUMITEMS_FAIL, err: err.response.data })
        return err
    }
}

const listOrderedItems = (orderName) => async (dispatch) => {
    dispatch({ type: GET_ORDERED_ITEMS_REQ })
    try {
        const result = await Axios.get(`/api/transactions/items/ordered/${orderName}`)
        dispatch({ type: GET_ORDERED_ITEMS_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: GET_ORDERED_ITEMS_FAIL, payload: err.response.data })
    }
}

export default {
    listOrderedItems,
    sumItems
}
