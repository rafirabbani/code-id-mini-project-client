import { MOVIE_LIST_REQ, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL } from '../Constants/MovieConstants'

const movieReducer = (state = { loading: true, movies: [] }, action) => {
    switch (action.type) {
        case MOVIE_LIST_REQ:
            return { loading: true }
        case MOVIE_LIST_SUCCESS:
            return { loading: false, movies: action.payload }
        case MOVIE_LIST_FAIL:
            return { loading: false, err: action.payload }
        default:
            return state
    }
}

export default movieReducer