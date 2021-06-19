import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const router = Router();
const orders = IndexController.OrdersController
const lineItems = IndexController.LineItemsController

//Orders Table API Routes
router.post('/create', orders.createOrder)
router.get('/all/user/:user_id', orders.getAllOrdersUser)
router.put('/update/:order_name', orders.updateOrder, orders.getOrderByName)
router.get('/:order_name', orders.getOrderByName)
router.get('/open/user/:user_id', orders.getOpenOrderByUser)

export default router