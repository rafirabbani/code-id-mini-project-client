import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const router = Router();
const users = IndexController.UsersRoute

router.post('/create', users.createUser)
router.get('/', users.getAllUser)
router.get('/:id', users.getOneUser)
router.put('/update/:id', users.updateUser)
router.delete('/delete/:id', users.deleteUser)

export default router