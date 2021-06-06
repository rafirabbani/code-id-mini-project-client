import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL } from '../Constants/MovieConstants'
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

export default {
    movieList
}