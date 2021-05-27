import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const casts = IndexController.CastsController
const router = Router()

// Casts Table API Routes
router.post('/create', casts.createCast)
router.get('/', casts.getAllCast)
router.get('/:id', casts.getOneCast)
router.put('/update/:id', casts.updateCast)
router.delete('/delete/:id', casts.deleteCast)

export default router