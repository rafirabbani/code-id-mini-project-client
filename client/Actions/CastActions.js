import { GET_CASTS_LIST_REQ, GET_CASTS_LIST_SUCCESS, GET_CASTS_LIST_FAIL, CREATE_CAST_REQ,
         CREATE_CAST_SUCCESS, CREATE_CAST_FAIL, UPDATE_CAST_REQ, UPDATE_CAST_SUCCESS,
         UPDATE_CAST_FAIL } from '../Constants/CastConstant'
import Axios from 'axios'

const getCastsList = (page) => async (dispatch) => {
    dispatch({ type: GET_CASTS_LIST_REQ })
    try {
        const result = await Axios.get(`/api/casts/?page=${page}`)
        dispatch({ type: GET_CASTS_LIST_SUCCESS, payload: result.data})
    }
    catch (err) {
        dispatch({ type: GET_CASTS_LIST_FAIL, payload: err.response.data })
    }
}

const createCast = (data) => async (dispatch) => {
    dispatch({ type: CREATE_CAST_REQ })
    const create = new FormData()
    for (const key in data) {
        data[key] && create.append(`${key}`, data[key])
    }
    //console.log(create.getAll('cast_image'))
    try {
        const result = await Axios.post('/api/casts/create', create)
        dispatch({ type: CREATE_CAST_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: CREATE_CAST_FAIL, payload: err.response.data })
    }
}

const updateCast = (id, data) => async (dispatch) => {
    dispatch({ type: UPDATE_CAST_REQ })
    const update = new FormData()
    console.log(data)
    for (const key in data) {
        data[key] && update.append(`${key}`, data[key])
    }
     try {
        const result = await Axios.put(`/api/casts/update/${id}`, update)
        dispatch({ type: UPDATE_CAST_SUCCESS, payload: result.data })
        return result
    }
    catch (err) {
        dispatch({ type: UPDATE_CAST_FAIL, payload: err.response.data })
        return err.response
    }
}

export default {
    getCastsList,
    createCast,
    updateCast
}