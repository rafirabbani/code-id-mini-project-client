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

export default router