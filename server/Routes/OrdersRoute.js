import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const router = Router();
const orders = IndexController.OrdersController

router.post('/create', orders.createOrder);

export default router