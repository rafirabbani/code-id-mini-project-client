import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const router = Router();
const orders = IndexController.OrdersController

//Orders Table API Routes
router.post('/create', orders.createOrder);

export default router