import { ITEM_SUMITEMS_REQ, ITEM_SUMITEMS_SUCCESS, ITEM_SUMITEMS_FAIL } from '../Constants/ItemConstants'
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

export default {
    //getItemInfo
    sumItems
}
