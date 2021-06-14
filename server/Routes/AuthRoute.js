import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const auth = IndexController.AuthController
const router = Router()

router.post('/signin', auth.signIn)
router.get('/signout', auth.signOut)

export default router