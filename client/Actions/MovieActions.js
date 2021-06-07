import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, 
    MOVIE_SINGLE_REQ, MOVIE_SINGLE_SUCCESS, MOVIE_SINGLE_FAIL } from '../Constants/MovieConstants'
import Axios from 'axios'

const movieList = () => async (dispatch) => {
    dispatch({ type: MOVIE_LIST_REQ })
    try {
        const result = await Axios.get('/api/movies')
        dispatch({ type: MOVIE_LIST_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: MOVIE_LIST_FAIL, payload: err.response.data })
    }
}

const singleMovie = (id) => async(dispatch) => {
    dispatch({ type: MOVIE_SINGLE_REQ })
    try {
        const result = await Axios.get(`/api/movies/${id}`)
        dispatch({ type: MOVIE_SINGLE_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: MOVIE_SINGLE_FAIL, err: err.response.data })
    }
}

export default {
    movieList,
    singleMovie
}