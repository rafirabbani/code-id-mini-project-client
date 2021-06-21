import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, 
         MOVIE_SINGLE_REQ, MOVIE_SINGLE_SUCCESS, MOVIE_SINGLE_FAIL, MOVIE_CREATE_REQ, MOVIE_CREATE_SUCCESS,
         MOVIE_CREATE_FAIL, MOVIE_UPDATE_REQ, MOVIE_UPDATE_SUCCESS, MOVIE_UPDATE_FAIL, MOVIE_DELETE_REQ,
         MOVIE_DELETE_SUCCESS, MOVIE_DELETE_FAIL, MOVIE_SEARCH_BY_TITLE_REQ, MOVIE_SEARCH_BY_TITLE_SUCCESS,
         MOVIE_SEARCH_BY_TITLE_FAIL, MOVIE_SEARCH_BY_GENRE_REQ, MOVIE_SEARCH_BY_GENRE_SUCCESS,
         MOVIE_SEARCH_BY_GENRE_FAIL, MOVIE_SIMILAR_BY_GENRE_REQ, MOVIE_SIMILAR_BY_GENRE_SUCCESS,
         MOVIE_SIMILAR_BY_GENRE_FAIL, MOVIE_LIST_NO_LIMIT_REQ, MOVIE_LIST_NO_LIMIT_SUCCESS,
         MOVIE_LIST_NO_LIMIT_FAIL} from '../Constants/MovieConstants'
import Axios from 'axios'

const movieList = (page) => async (dispatch) => {
    dispatch({ type: MOVIE_LIST_REQ })
    try {
        const result = await Axios.get(`/api/movies/?page=${page}`)
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
        //return result.data
    }
    catch (err) {
        dispatch({ type: MOVIE_SINGLE_FAIL, err: err.response.data })
    }
}

const createMovie = (data) => async (dispatch) => {
    dispatch({ type: MOVIE_CREATE_REQ })
    //console.log(data)
    const create = new FormData()
    for (const key in data) {
        data[key] && create.append(`${key}`, data[key])
    }
    /* data.movie_title && create.append('movie_title', data.movie_title)
    data.movie_episode && create.append('movie_episode', data.movie_episode)
    data.movie_director && create.append('movie_director', data.movie_director)
    data.movie_studio && create.append('movie_studio', data.movie_studio)
    data.movie_tv_status && create.append('movie_tv_status', data.movie_tv_status)
    data.movie_duration && create.append('movie_duration', data.movie_duration)
    data.movie_release_status && create.append('movie_release', data.movie_release_status)
    data.movie_country && create.append('movie_country', data.movie_country)
    data.movie_genre && create.append('movie_genre', data.movie_genre)
    data.movie_rating && create.append('movie_rating', data.movie_rating)
    data.movie_network && create.append('movie_network', data.movie_network)
    data.movie_trailer && create.append('movie_trailer', data.movie_trailer)
    data.movie_views && create.append('movie_views', data.movie_views)
    data.movie_price && create.append('movie_price', data.movie_price)
    data.movie_image && create.append('movie_image', data.movie_image) */
    try {
        const result = await Axios.post('/api/movies/create', create)
        dispatch({ type: MOVIE_CREATE_SUCCESS, payload: result.data})
        return result
    }
    catch (err) {
        dispatch({ type: MOVIE_CREATE_FAIL, err: err.response.data })
        return err.response
    }
}

const updateMovie = (id, data) => async (dispatch) => {
    //console.log(id, data)
    dispatch({ type: MOVIE_UPDATE_REQ })
    const update = new FormData()
    for (const key in data) {
        data[key] && update.append(`${key}`, data[key])
    }
    try {
        const result = await Axios.put(`/api/movies/update/${id}`, update)
        dispatch({ type: MOVIE_UPDATE_SUCCESS, payload: result.data })
        return result
    }
    catch (err) {
        dispatch({ type: MOVIE_UPDATE_FAIL, err: err.response.data })
        return err.response
    }

}

const deleteMovie = (id) => async (dispatch) => {
    dispatch({ type: MOVIE_DELETE_REQ })
    try {
        const result = await Axios.delete(`/api/movies/delete/${id}`)
        dispatch({ type: MOVIE_DELETE_SUCCESS, payload: result.data })
        return result
    }
    catch (err) {
        dispatch({ type: MOVIE_DELETE_FAIL, payload: err.response.data })
        return err.response
    }
}

const searchMovieTitle = (title, page) => async (dispatch) => {
    dispatch({ type: MOVIE_SEARCH_BY_TITLE_REQ })
    try {
        const result = await Axios.get(`/api/movies/search/title/?movie_title=${title}&page=${page}`)
        dispatch({ type: MOVIE_SEARCH_BY_TITLE_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: MOVIE_SEARCH_BY_TITLE_FAIL, payload: err.response.data }) 
    }
}

const searchMovieGenre = (genre, page) => async (dispatch) => {
    dispatch({ type: MOVIE_SEARCH_BY_GENRE_REQ })
    try {
        const result = await Axios.get(`/api/movies/search/genre/?movie_genre=${genre}&page=${page}`)
        dispatch({ type: MOVIE_SEARCH_BY_GENRE_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: MOVIE_SEARCH_BY_GENRE_FAIL, payload: err.response.data }) 
    }
}

const similarMovieGenre = (genre, id) => async (dispatch) => {
    dispatch({ type: MOVIE_SIMILAR_BY_GENRE_REQ })
    try {
        const result = await Axios.get(`/api/movies/similar/genre?movie_genre=${genre}&movie_id=${id}`)
        dispatch({ type: MOVIE_SIMILAR_BY_GENRE_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: MOVIE_SIMILAR_BY_GENRE_FAIL, payload: err.response.data })
    }
}

const movieListNoLimit = () => async (dispatch) => {
    dispatch({ type: MOVIE_LIST_NO_LIMIT_REQ })
    try {
        const result = await Axios.get(`/api/movies/all/nolimit`)
        dispatch({ type: MOVIE_LIST_NO_LIMIT_SUCCESS, payload: result.data })
    }
    catch (err) {
        dispatch({ type: MOVIE_LIST_NO_LIMIT_FAIL, payload: err.response.data })
    }
}

export default {
    movieList,
    singleMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovieTitle, 
    searchMovieGenre,
    similarMovieGenre,
    movieListNoLimit
}