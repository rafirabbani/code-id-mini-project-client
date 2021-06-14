import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, 
    MOVIE_SINGLE_REQ, MOVIE_SINGLE_SUCCESS, MOVIE_SINGLE_FAIL, MOVIE_CREATE_REQ,
    MOVIE_CREATE_SUCCESS, MOVIE_CREATE_FAIL, MOVIE_UPDATE_REQ, MOVIE_UPDATE_SUCCESS,
    MOVIE_UPDATE_FAIL } from '../Constants/MovieConstants'
//import { useSelector } from 'react-redux'

//const { movie } = useSelector((state) => state)

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
        default:
            return state
    }
}

export default movieReducer