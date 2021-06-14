import { ITEM_SUMITEMS_REQ, ITEM_SUMITEMS_SUCCESS, ITEM_SUMITEMS_FAIL } from '../Constants/ItemConstants'

const itemReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_SUMITEMS_REQ:
            return { loading: true }
        case ITEM_SUMITEMS_SUCCESS:
            return { loading: false, itemInfo: action.payload }
        case ITEM_SUMITEMS_FAIL:
            return { loading: false, err: action.payload }
        default:
            return state
    }
}

export default itemReducer