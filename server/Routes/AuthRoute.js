import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const auth = IndexController.AuthController
const router = Router()

router.post('/signin', auth.signIn)
router.post('/signout', auth.signOut)

export default router