import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const router = Router();
const movies = IndexController.MoviesController

// Movies Table API routes
router.post('/create', movies.createMovie)
router.get('/', movies.getAllMovies)
router.get('/:id', movies.getOneMovie)
router.put('/update/:id', movies.updateMovie)
router.delete('/delete/:id', movies.deleteMovie)
router.get('/image/download/:id', movies.downloadMovieImage)
router.get('/some/list', movies.getFewMovies)
router.get('/search/title/', movies.searchMovieByTitle)
router.get('/search/genre/', movies.searchMovieByGenre)
router.get('/similar/genre', movies.getSimilarMovies)
router.get('/all/nolimit', movies.getAllMoviesNoLimit)
router.get('/ordered/:order_name', movies.getOrderedMovies)

export default router