import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, 
         MOVIE_SINGLE_REQ, MOVIE_SINGLE_SUCCESS, MOVIE_SINGLE_FAIL, MOVIE_CREATE_REQ,
         MOVIE_CREATE_SUCCESS, MOVIE_CREATE_FAIL, MOVIE_UPDATE_REQ, MOVIE_UPDATE_SUCCESS,
         MOVIE_UPDATE_FAIL, MOVIE_DELETE_REQ, MOVIE_DELETE_SUCCESS, MOVIE_DELETE_FAIL, MOVIE_SEARCH_BY_TITLE_REQ,
         MOVIE_SEARCH_BY_TITLE_FAIL, MOVIE_SEARCH_BY_TITLE_SUCCESS } from '../Constants/MovieConstants'


const movieReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case MOVIE_LIST_REQ:
            return { loading: true }
        case MOVIE_LIST_SUCCESS:
            return { loading: false, movies: action.payload, }
        case MOVIE_LIST_FAIL:
            return { loading: false, err: action.payload, }
        case MOVIE_SINGLE_REQ:
            return { loading: true }
        case MOVIE_SINGLE_SUCCESS:
            return { loading: false, singleMovie: action.payload, }
        case MOVIE_SINGLE_FAIL:
            return { loading: false, err: action.payload, }
        case MOVIE_CREATE_REQ:
            return { loading: true }
        case MOVIE_CREATE_SUCCESS:
            return { loading: false, createMovie: action.payload, }
        case MOVIE_CREATE_FAIL:
            return { loading: false, err: action.payload, }
        case MOVIE_UPDATE_REQ:
            return { loading: true }
        case MOVIE_UPDATE_SUCCESS:
            return { loading: false, updateMovie: action.payload }
        case MOVIE_UPDATE_FAIL:
            return { loading: false, err: action.payload }
        case MOVIE_DELETE_REQ:
            return { loading: true }
        case MOVIE_DELETE_SUCCESS:
            return { loading: false, deleteMovie: action.payload }
        case MOVIE_DELETE_FAIL:
            return { loading: false, err: action.payload }
        case MOVIE_SEARCH_BY_TITLE_REQ:
            return { loading: true }
        case MOVIE_SEARCH_BY_TITLE_SUCCESS:
            return { loading: false, moviesByTitle: action.payload }
        case MOVIE_SEARCH_BY_TITLE_FAIL:
            return { loading: false, err: action.payload }
        default:
            return state
    }
}

export default movieReducer