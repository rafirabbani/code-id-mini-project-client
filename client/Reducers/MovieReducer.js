import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, 
    MOVIE_SINGLE_REQ, MOVIE_SINGLE_SUCCESS, MOVIE_SINGLE_FAIL, MOVIE_CREATE_REQ,
    MOVIE_CREATE_SUCCESS, MOVIE_CREATE_FAIL } from '../Constants/MovieConstants'

const movieReducer = (state = { loading: true, movies: [], singleMovie: {}, createMovie: {} }, action) => {
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
        default:
            return state
    }
}

export default movieReducer